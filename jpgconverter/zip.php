<?php
/**
 * PixelShift — zip.php
 * Creates a ZIP of converted files and streams it to the browser
 * POST body: JSON { "files": ["token1.jpg", "token2.jpg", ...] }
 */

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$body  = file_get_contents('php://input');
$data  = json_decode($body, true);
$files = $data['files'] ?? [];

if (empty($files) || !is_array($files)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No files specified']);
    exit;
}

$convertDir = realpath(__DIR__ . '/converted');
if (!$convertDir) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Converted directory not found']);
    exit;
}

// Build temp ZIP
$zipPath = sys_get_temp_dir() . '/pixelshift_' . bin2hex(random_bytes(8)) . '.zip';
$zip = new ZipArchive();
if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Could not create ZIP']);
    exit;
}

$added = 0;
foreach ($files as $file) {
    $file     = basename($file); // strip any path traversal
    $realFile = realpath($convertDir . '/' . $file);

    if ($realFile && strpos($realFile, $convertDir) === 0 && is_file($realFile)) {
        $zip->addFile($realFile, $file);
        $added++;
    }
}
$zip->close();

if ($added === 0) {
    @unlink($zipPath);
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No valid files found']);
    exit;
}

// Stream ZIP
$zipSize = filesize($zipPath);
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="pixelshift-converted-' . date('Ymd-His') . '.zip"');
header('Content-Length: ' . $zipSize);
header('Cache-Control: no-cache, no-store');
readfile($zipPath);

// Cleanup
@unlink($zipPath);

// Also delete source converted files
foreach ($files as $file) {
    $file     = basename($file);
    $realFile = realpath($convertDir . '/' . $file);
    if ($realFile && strpos($realFile, $convertDir) === 0) {
        @unlink($realFile);
    }
}
