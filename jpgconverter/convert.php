<?php
/**
 * PixelShift — convert.php
 * Handles image upload, validation, and conversion to JPG/PNG/WEBP
 * Requires: PHP GD (php-gd) or Imagick (php-imagick)
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// ──────────────────────────────────────────────
// Config
// ──────────────────────────────────────────────
define('UPLOAD_DIR',    __DIR__ . '/uploads/');
define('CONVERT_DIR',   __DIR__ . '/converted/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024);  // 5MB
define('CLEANUP_AGE',   3600);             // Seconds before temp files are purged

$ALLOWED_MIME = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'image/avif', 'image/bmp', 'image/gif', 'image/tiff',
    'image/svg+xml',
];
$ALLOWED_EXT  = ['jpg','jpeg','png','webp','avif','bmp','gif','tiff','tif','svg'];
$OUTPUT_FORMATS = ['jpg','jpeg','png','webp'];

// ──────────────────────────────────────────────
// Ensure dirs exist
// ──────────────────────────────────────────────
foreach ([UPLOAD_DIR, CONVERT_DIR] as $dir) {
    if (!is_dir($dir)) mkdir($dir, 0750, true);
}

// ──────────────────────────────────────────────
// Request guard
// ──────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (empty($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

// ──────────────────────────────────────────────
// Cleanup old temp files
// ──────────────────────────────────────────────
cleanup_old_files(UPLOAD_DIR);
cleanup_old_files(CONVERT_DIR);

// ──────────────────────────────────────────────
// Read & Validate params
// ──────────────────────────────────────────────
$quality     = isset($_POST['quality'])    ? max(10, min(100, (int)$_POST['quality'])) : 85;
$format      = isset($_POST['format'])     ? strtolower(trim($_POST['format'])) : 'jpg';
$resize_w    = isset($_POST['resize_w'])   ? max(1, min(9999, (int)$_POST['resize_w'])) : null;
$resize_h    = isset($_POST['resize_h'])   ? max(1, min(9999, (int)$_POST['resize_h'])) : null;
$aspect_lock = isset($_POST['aspect_lock'])? ($_POST['aspect_lock'] === '1') : true;
$prefix      = preg_replace('/[^a-zA-Z0-9_\-]/', '', $_POST['prefix'] ?? '');
$suffix      = preg_replace('/[^a-zA-Z0-9_\-]/', '', $_POST['suffix'] ?? '');

if (!in_array($format, $OUTPUT_FORMATS)) {
    http_response_code(400);
    echo json_encode(['error' => "Unsupported output format: $format"]);
    exit;
}

// ──────────────────────────────────────────────
// File validation
// ──────────────────────────────────────────────
$upload   = $_FILES['image'];
$origName = basename($upload['name']);
$origExt  = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
$tmpPath  = $upload['tmp_name'];
$fileSize = $upload['size'];

if ($upload['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => upload_error_message($upload['error'])]);
    exit;
}
if ($fileSize > MAX_FILE_SIZE) {
    http_response_code(400);
    echo json_encode(['error' => 'File exceeds 5MB limit']);
    exit;
}
if (!in_array($origExt, $ALLOWED_EXT)) {
    http_response_code(400);
    echo json_encode(['error' => "Extension .$origExt not allowed"]);
    exit;
}

// MIME check via finfo (magic bytes — cannot be spoofed)
$finfo    = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($tmpPath);
if (!in_array($mimeType, $ALLOWED_MIME)) {
    http_response_code(400);
    echo json_encode(['error' => "File type not allowed: $mimeType"]);
    exit;
}

// Prevent double extensions like image.php.jpg
if (preg_match('/\.(php|phtml|phar|html|htm|js|cgi|sh|bash|exe|py|rb)/i', $origName)) {
    http_response_code(400);
    echo json_encode(['error' => 'Suspicious filename rejected']);
    exit;
}

// ──────────────────────────────────────────────
// Save uploaded file with unique name
// ──────────────────────────────────────────────
$uid      = bin2hex(random_bytes(12));
$safeName = $uid . '.' . $origExt;
$uploadPath = UPLOAD_DIR . $safeName;

if (!move_uploaded_file($tmpPath, $uploadPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
    exit;
}
chmod($uploadPath, 0640);

// ──────────────────────────────────────────────
// Convert
// ──────────────────────────────────────────────
$baseWithoutExt = $prefix . pathinfo($origName, PATHINFO_FILENAME) . $suffix;
$outputExt      = ($format === 'jpeg') ? 'jpg' : $format;
$outputName     = $uid . '_' . preg_replace('/[^a-zA-Z0-9_\-]/', '_', $baseWithoutExt) . '.' . $outputExt;
$outputPath     = CONVERT_DIR . $outputName;

$convertedOk = false;

// Try Imagick first (better AVIF/TIFF/etc. support)
if (extension_loaded('imagick') && class_exists('Imagick')) {
    $convertedOk = convert_with_imagick($uploadPath, $outputPath, $format, $quality, $resize_w, $resize_h, $aspect_lock);
}

// Fallback to GD
if (!$convertedOk && extension_loaded('gd')) {
    $convertedOk = convert_with_gd($uploadPath, $outputPath, $mimeType, $format, $quality, $resize_w, $resize_h, $aspect_lock);
}

// Clean up upload
@unlink($uploadPath);

if (!$convertedOk || !file_exists($outputPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Conversion failed — check server image libraries']);
    exit;
}

// ──────────────────────────────────────────────
// Success — return download token
// ──────────────────────────────────────────────
http_response_code(200);
echo json_encode([
    'success'    => true,
    'token'      => $outputName,
    'download'   => 'download.php?file=' . urlencode($outputName),
    'size'       => filesize($outputPath),
    'format'     => $outputExt,
]);

// ══════════════════════════════════════════════
// FUNCTIONS
// ══════════════════════════════════════════════

function convert_with_imagick($src, $dst, $format, $quality, $w, $h, $aspectLock): bool {
    try {
        $im = new Imagick($src);
        $im->setImageBackgroundColor('white');
        $im = $im->flattenImages();

        if ($w || $h) {
            $srcW = $im->getImageWidth();
            $srcH = $im->getImageHeight();
            [$tw, $th] = compute_target_dims($srcW, $srcH, $w, $h, $aspectLock);
            $im->resizeImage($tw, $th, Imagick::FILTER_LANCZOS, 1);
        }

        $fmtMap = ['jpg' => 'JPEG', 'jpeg' => 'JPEG', 'png' => 'PNG', 'webp' => 'WEBP'];
        $im->setImageFormat($fmtMap[$format] ?? 'JPEG');
        $im->setImageCompressionQuality($quality);
        $im->stripImage();
        $im->writeImage($dst);
        $im->destroy();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function convert_with_gd($src, $dst, $mimeType, $format, $quality, $w, $h, $aspectLock): bool {
    $src_img = load_gd_image($src, $mimeType);
    if (!$src_img) return false;

    $srcW = imagesx($src_img);
    $srcH = imagesy($src_img);
    [$tw, $th] = ($w || $h) ? compute_target_dims($srcW, $srcH, $w, $h, $aspectLock) : [$srcW, $srcH];

    $dst_img = imagecreatetruecolor($tw, $th);

    // White background for JPG
    $white = imagecolorallocate($dst_img, 255, 255, 255);
    imagefill($dst_img, 0, 0, $white);

    // Preserve transparency for PNG/WEBP
    if ($format === 'png' || $format === 'webp') {
        imagealphablending($dst_img, false);
        imagesavealpha($dst_img, true);
        $transparent = imagecolorallocatealpha($dst_img, 0, 0, 0, 127);
        imagefill($dst_img, 0, 0, $transparent);
    }

    imagecopyresampled($dst_img, $src_img, 0, 0, 0, 0, $tw, $th, $srcW, $srcH);

    $result = false;
    switch ($format) {
        case 'jpg': case 'jpeg':
            $result = imagejpeg($dst_img, $dst, $quality); break;
        case 'png':
            $pngQ = (int)round((100 - $quality) / 10);  // PNG compression 0-9
            $result = imagepng($dst_img, $dst, $pngQ); break;
        case 'webp':
            $result = imagewebp($dst_img, $dst, $quality); break;
    }
    imagedestroy($src_img);
    imagedestroy($dst_img);
    return $result;
}

function load_gd_image($path, $mimeType) {
    switch ($mimeType) {
        case 'image/jpeg': case 'image/jpg': return imagecreatefromjpeg($path);
        case 'image/png':  return imagecreatefrompng($path);
        case 'image/webp': return imagecreatefromwebp($path);
        case 'image/gif':  return imagecreatefromgif($path);
        case 'image/bmp':  return imagecreatefrombmp($path);
        default:
            // Try generic
            return @imagecreatefromstring(file_get_contents($path));
    }
}

function compute_target_dims($srcW, $srcH, $w, $h, $aspectLock): array {
    if ($w && $h && !$aspectLock) return [(int)$w, (int)$h];
    if ($w && !$h) {
        $ratio = $w / $srcW;
        return [(int)$w, (int)round($srcH * $ratio)];
    }
    if ($h && !$w) {
        $ratio = $h / $srcH;
        return [(int)round($srcW * $ratio), (int)$h];
    }
    if ($w && $h && $aspectLock) {
        // Fit within box
        $ratio = min($w / $srcW, $h / $srcH);
        return [(int)round($srcW * $ratio), (int)round($srcH * $ratio)];
    }
    return [$srcW, $srcH];
}

function cleanup_old_files(string $dir): void {
    if (!is_dir($dir)) return;
    $now = time();
    foreach (glob($dir . '*') as $file) {
        if (is_file($file) && ($now - filemtime($file)) > CLEANUP_AGE) {
            @unlink($file);
        }
    }
}

function upload_error_message(int $code): string {
    return match ($code) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'File too large',
        UPLOAD_ERR_PARTIAL   => 'File only partially uploaded',
        UPLOAD_ERR_NO_FILE   => 'No file uploaded',
        UPLOAD_ERR_NO_TMP_DIR=> 'Missing temp directory',
        UPLOAD_ERR_CANT_WRITE=> 'Failed to write file',
        default              => 'Upload error (code ' . $code . ')',
    };
}
