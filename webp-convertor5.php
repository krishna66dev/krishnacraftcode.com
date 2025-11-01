<?php
// image_converter.php - Main PHP handler

session_start();
error_reporting(E_ALL);
ini_set('display_errors', 0);

define('UPLOAD_DIR', 'uploads/');
define('CONVERTED_DIR', 'converted/');
define('MAX_FILE_SIZE', 5242880); // 5MB
define('ALLOWED_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
define('FILE_RETENTION_DAYS', 7); // Auto-delete files older than 7 days
define('CLEANUP_INTERVAL', 24); // Run cleanup every 24 hours

// Generate unique user ID for session
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = uniqid('user_', true);
}

$userId = $_SESSION['user_id'];

// Create directories if they don't exist
if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);
if (!is_dir(CONVERTED_DIR)) mkdir(CONVERTED_DIR, 0755, true);

class ImageConverter {
    private $uploadDir;
    private $convertedDir;
    private $retentionDays;
    private $cleanupInterval;
    private $userId;
    
    public function __construct($uploadDir, $convertedDir, $userId, $retentionDays = 7, $cleanupInterval = 24) {
        $this->uploadDir = $uploadDir;
        $this->convertedDir = $convertedDir;
        $this->userId = $userId;
        $this->retentionDays = $retentionDays;
        $this->cleanupInterval = $cleanupInterval;
    }
    
    public function autoCleanup() {
        $lockFile = sys_get_temp_dir() . '/webp_converter_cleanup.lock';
        
        // Check if cleanup ran recently
        if (file_exists($lockFile)) {
            $lastCleanup = filemtime($lockFile);
            $hoursSinceCleanup = (time() - $lastCleanup) / 3600;
            
            if ($hoursSinceCleanup < $this->cleanupInterval) {
                return;
            }
        }
        
        // Run cleanup
        $this->cleanupDirectory($this->convertedDir);
        $this->cleanupDirectory($this->uploadDir);
        
        // Update lock file
        touch($lockFile);
    }
    
    private function cleanupDirectory($directory) {
        if (!is_dir($directory)) return;
        
        $cutoffTime = time() - ($this->retentionDays * 24 * 60 * 60);
        $deletedCount = 0;
        $deletedSize = 0;
        
        foreach (glob($directory . '*') as $file) {
            if (is_file($file) && filemtime($file) < $cutoffTime) {
                $deletedSize += filesize($file);
                unlink($file);
                $deletedCount++;
            }
        }
        
        if ($deletedCount > 0) {
            error_log("Auto-cleanup: Deleted $deletedCount files (" . round($deletedSize / 1024 / 1024, 2) . " MB) from $directory");
        }
        
        return ['deleted' => $deletedCount, 'size' => $deletedSize];
    }
    
    public function forceCleanup() {
        $convertedResult = $this->cleanupDirectory($this->convertedDir);
        $uploadResult = $this->cleanupDirectory($this->uploadDir);
        
        return [
            'success' => true,
            'converted_deleted' => $convertedResult['deleted'],
            'upload_deleted' => $uploadResult['deleted']
        ];
    }
    
    public function getCleanupStats() {
        // Only count current user's files
        $userFiles = count(glob($this->convertedDir . $this->userId . '_*.webp'));
        
        $stats = [
            'converted_files' => $userFiles,
            'upload_files' => count(glob($this->uploadDir . '*')),
            'retention_days' => $this->retentionDays,
            'cleanup_interval' => $this->cleanupInterval . ' hours',
            'last_cleanup' => $this->getLastCleanupTime()
        ];
        return $stats;
    }
    
    private function getLastCleanupTime() {
        $lockFile = sys_get_temp_dir() . '/webp_converter_cleanup.lock';
        if (file_exists($lockFile)) {
            return date('Y-m-d H:i:s', filemtime($lockFile));
        }
        return 'Never';
    }
    
    public function convertToWebP($filePath, $quality = 80) {
        try {
            if (!file_exists($filePath)) {
                return ['success' => false, 'message' => 'File not found'];
            }
            
            $imageInfo = getimagesize($filePath);
            if (!$imageInfo) {
                return ['success' => false, 'message' => 'Invalid image file'];
            }
            
            $mimeType = $imageInfo['mime'];
            
            // Load image based on type
            switch($mimeType) {
                case 'image/jpeg':
                    $image = imagecreatefromjpeg($filePath);
                    break;
                case 'image/png':
                    $image = imagecreatefrompng($filePath);
                    break;
                case 'image/gif':
                    $image = imagecreatefromgif($filePath);
                    break;
                case 'image/webp':
                    $image = imagecreatefromwebp($filePath);
                    break;
                default:
                    return ['success' => false, 'message' => 'Unsupported image format'];
            }
            
            if (!$image) {
                return ['success' => false, 'message' => 'Failed to load image'];
            }
            
            // Generate output filename with user ID
            $filename = pathinfo($filePath, PATHINFO_FILENAME);
            $uniqueId = uniqid();
            $outputFile = $this->convertedDir . $this->userId . '_' . $uniqueId . '_' . time() . '.webp';
            
            // Convert to WebP
            if (!imagewebp($image, $outputFile, $quality)) {
                imagedestroy($image);
                return ['success' => false, 'message' => 'Failed to convert image to WebP'];
            }
            
            imagedestroy($image);
            
            $fileSize = filesize($outputFile);
            $originalSize = filesize($filePath);
            $reduction = round((1 - $fileSize / $originalSize) * 100, 2);
            
            return [
                'success' => true,
                'message' => 'Conversion successful',
                'filename' => basename($outputFile),
                'path' => $outputFile,
                'size' => $fileSize,
                'originalSize' => $originalSize,
                'reduction' => $reduction
            ];
        } catch (Exception $e) {
            return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
        }
    }
    
    public function getConvertedFiles() {
        $files = [];
        if (is_dir($this->convertedDir)) {
            // Only get files that belong to current user
            foreach (glob($this->convertedDir . $this->userId . '_*.webp') as $file) {
                $files[] = [
                    'name' => basename($file),
                    'size' => filesize($file),
                    'time' => filemtime($file),
                    'path' => $file
                ];
            }
        }
        return array_reverse($files);
    }
    
    public function deleteFile($filename) {
        $filepath = $this->convertedDir . basename($filename);
        
        // Security check: Only allow deletion of user's own files
        if (!str_starts_with(basename($filename), $this->userId . '_')) {
            return ['success' => false, 'message' => 'Unauthorized'];
        }
        
        if (file_exists($filepath) && unlink($filepath)) {
            return ['success' => true, 'message' => 'File deleted'];
        }
        return ['success' => false, 'message' => 'Failed to delete file'];
    }
}

// Initialize converter
$converter = new ImageConverter(UPLOAD_DIR, CONVERTED_DIR, $userId, FILE_RETENTION_DAYS, CLEANUP_INTERVAL);

// Run auto cleanup
$converter->autoCleanup();

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'upload') {
        $response = ['success' => false, 'files' => []];
        
        if (isset($_FILES['images'])) {
            $uploadedFiles = $_FILES['images'];
            $fileCount = count($uploadedFiles['name']);
            
            for ($i = 0; $i < $fileCount; $i++) {
                if ($uploadedFiles['error'][$i] !== UPLOAD_ERR_OK) {
                    $response['files'][] = [
                        'success' => false,
                        'message' => 'Upload error'
                    ];
                    continue;
                }
                
                if ($uploadedFiles['size'][$i] > MAX_FILE_SIZE) {
                    $response['files'][] = [
                        'success' => false,
                        'message' => 'File too large'
                    ];
                    continue;
                }
                
                if (!in_array($uploadedFiles['type'][$i], ALLOWED_TYPES)) {
                    $response['files'][] = [
                        'success' => false,
                        'message' => 'Invalid file type'
                    ];
                    continue;
                }
                
                $tmpFile = $uploadedFiles['tmp_name'][$i];
                $uploadedFile = UPLOAD_DIR . uniqid() . '_' . basename($uploadedFiles['name'][$i]);
                
                if (move_uploaded_file($tmpFile, $uploadedFile)) {
                    $convertResult = $converter->convertToWebP($uploadedFile, 80);
                    unlink($uploadedFile);
                    $response['files'][] = $convertResult;
                    $response['success'] = true;
                } else {
                    $response['files'][] = [
                        'success' => false,
                        'message' => 'Upload failed'
                    ];
                }
            }
        }
        
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
    
    if ($action === 'delete') {
        $filename = $_POST['filename'] ?? '';
        $result = $converter->deleteFile($filename);
        header('Content-Type: application/json');
        echo json_encode($result);
        exit;
    }
}

// Handle file download
if (isset($_GET['download'])) {
    $filename = basename($_GET['download']);
    $filepath = CONVERTED_DIR . $filename;
    
    // Security check: Only allow download of user's own files
    if (file_exists($filepath) && str_starts_with($filename, $userId . '_')) {
        header('Content-Type: image/webp');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Content-Length: ' . filesize($filepath));
        readfile($filepath);
        exit;
    }
}
if (isset($_GET['download_all'])) {
    $files = $converter->getConvertedFiles();
    
    if (empty($files)) {
        die('No files to download');
    }
    
    $zip = new ZipArchive();
    $zipFile = 'webp_images_' . time() . '.zip';
    
    if ($zip->open($zipFile, ZipArchive::CREATE) === true) {
        foreach ($files as $file) {
            $zip->addFile($file['path'], $file['name']);
        }
        $zip->close();
        
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $zipFile . '"');
        header('Content-Length: ' . filesize($zipFile));
        readfile($zipFile);
        unlink($zipFile);
        exit;
    }
}

$convertedFiles = $converter->getConvertedFiles();
$cleanupStats = $converter->getCleanupStats();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image to WebP Converter</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: #667eea;
            --secondary: #764ba2;
            --success: #48bb78;
            --danger: #f56565;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px 0;
        }
        
        .container-main {
            max-width: 1000px;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
            animation: slideDown 0.6s ease;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.95;
        }
        
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            overflow: hidden;
            animation: fadeIn 0.6s ease;
        }
        
        .card-header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            border: none;
            padding: 25px;
            font-size: 1.25rem;
            font-weight: 600;
        }
        
        .card-body {
            padding: 30px;
        }
        
        .upload-zone {
            border: 3px dashed #667eea;
            border-radius: 10px;
            padding: 40px 20px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            background: #f8f9ff;
        }
        
        .upload-zone:hover, .upload-zone.active {
            border-color: var(--secondary);
            background: #f0f0ff;
            transform: translateY(-5px);
        }
        
        .upload-zone i {
            font-size: 3rem;
            color: var(--primary);
            margin-bottom: 15px;
        }
        
        .upload-zone p {
            margin: 0;
            color: #666;
            font-size: 1rem;
        }
        
        .file-input {
            display: none;
        }
        
        .btn-upload {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 15px;
        }
        
        .btn-upload:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        
        .progress-item {
            margin-bottom: 15px;
            animation: slideIn 0.3s ease;
        }
        
        .progress-bar {
            background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
            animation: progress 2s ease-in-out;
        }
        
        .files-list {
            display: grid;
            gap: 15px;
            margin-top: 20px;
        }
        
        .file-card {
            background: #f8f9ff;
            border-left: 5px solid var(--primary);
            border-radius: 8px;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            animation: slideIn 0.3s ease;
        }
        
        .file-card:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .file-info {
            flex: 1;
        }
        
        .file-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        
        .file-meta {
            font-size: 0.85rem;
            color: #888;
        }
        
        .btn-action {
            margin-left: 10px;
            padding: 8px 15px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        
        .btn-download {
            background: var(--success);
            color: white;
        }
        
        .btn-download:hover {
            background: #38a169;
            transform: translateY(-2px);
        }
        
        .btn-delete {
            background: var(--danger);
            color: white;
        }
        
        .btn-delete:hover {
            background: #e53e3e;
            transform: translateY(-2px);
        }
        
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #999;
        }
        
        .empty-state i {
            font-size: 3rem;
            margin-bottom: 15px;
            opacity: 0.5;
        }
        
        .alert {
            border-radius: 8px;
            border: none;
            animation: slideDown 0.3s ease;
        }
        
        .success-badge {
            display: inline-block;
            background: var(--success);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-left: 10px;
        }
        
        .btn-download-all {
            width: 100%;
            background: linear-gradient(135deg, var(--success) 0%, #38a169 100%);
            border: none;
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
        }
        
        .btn-download-all:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(72, 187, 120, 0.4);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes progress {
            0% { width: 0; }
            50% { width: 100%; }
        }
    </style>
</head>
<body>
    <div class="container container-main">
        <div class="header">
            <h1><i class="fas fa-image"></i> WebP Converter</h1>
            <p>Convert your images to modern WebP format effortlessly</p>
            <small style="opacity: 0.8; font-size: 0.9rem;">Session ID: <?php echo substr($userId, 0, 12); ?>...</small>
        </div>
        
        <div class="card">
            <div class="card-header">
                <i class="fas fa-cloud-upload-alt"></i> Upload Images
            </div>
            <div class="card-body">
                <div class="upload-zone" id="uploadZone">
                    <i class="fas fa-images"></i>
                    <p><strong>Click to browse or drag & drop</strong></p>
                    <small>Supported: JPG, PNG, GIF, WebP (Max 5MB each)</small>
                </div>
                <input type="file" id="fileInput" class="file-input" multiple accept="image/*">
                <button class="btn-upload" onclick="document.getElementById('fileInput').click()">
                    <i class="fas fa-plus"></i> Select Images
                </button>
                
                <div id="selectedFiles" style="margin-top: 15px;"></div>
                
                <button class="btn-upload" id="submitBtn" style="background: linear-gradient(135deg, var(--success) 0%, #38a169 100%); display: none; margin-top: 15px;">
                    <i class="fas fa-arrow-right"></i> Convert to WebP
                </button>
                
                <div id="uploadProgress" style="margin-top: 20px;"></div>
            </div>
        </div>
        
        <div class="card" style="margin-top: 30px;">
            <div class="card-header">
                <i class="fas fa-cog"></i> Cleanup Settings
            </div>
            <div class="card-body">
                <div style="background: #f8f9ff; padding: 20px; border-radius: 8px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                        <div>
                            <small style="color: #666;">Files in Converted Folder</small>
                            <div style="font-size: 1.8rem; font-weight: 700; color: var(--primary);">
                                <?php echo $cleanupStats['converted_files']; ?>
                            </div>
                        </div>
                        <div>
                            <small style="color: #666;">Files Retention Period</small>
                            <div style="font-size: 1.8rem; font-weight: 700; color: var(--secondary);">
                                <?php echo $cleanupStats['retention_days']; ?> days
                            </div>
                        </div>
                        <div>
                            <small style="color: #666;">Auto Cleanup Interval</small>
                            <div style="font-size: 1.8rem; font-weight: 700; color: var(--success);">
                                <?php echo $cleanupStats['cleanup_interval']; ?>
                            </div>
                        </div>
                        <div>
                            <small style="color: #666;">Last Cleanup Run</small>
                            <div style="font-size: 1.1rem; font-weight: 600; color: #333;">
                                <?php echo $cleanupStats['last_cleanup']; ?>
                            </div>
                        </div>
                    </div>
                    <button class="btn-download-all" style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);" onclick="manualCleanup()">
                        <i class="fas fa-trash-alt"></i> Run Manual Cleanup Now
                    </button>
                </div>
                <div style="margin-top: 15px; padding: 15px; background: #e8f5e9; border-left: 4px solid var(--success); border-radius: 4px;">
                    <small><i class="fas fa-info-circle"></i> <strong>Auto Cleanup:</strong> Files older than <?php echo FILE_RETENTION_DAYS; ?> days are automatically deleted every <?php echo CLEANUP_INTERVAL; ?> hours to save storage space.</small>
                </div>
            </div>
        </div>
            <div class="card-header">
                <i class="fas fa-check-circle"></i> Converted Files
                <span class="badge bg-light text-dark float-end"><?php echo count($convertedFiles); ?> files</span>
            </div>
            <div class="card-body">
                <div id="filesList">
                    <?php if (empty($convertedFiles)): ?>
                        <div class="empty-state">
                            <i class="fas fa-inbox"></i>
                            <p>No converted files yet. Upload images to get started!</p>
                        </div>
                    <?php else: ?>
                        <div class="files-list">
                            <?php foreach ($convertedFiles as $file): ?>
                                <div class="file-card">
                                    <div class="file-info">
                                        <div class="file-name">
                                            <i class="fas fa-image"></i> <?php echo htmlspecialchars($file['name']); ?>
                                            <span class="success-badge">WebP</span>
                                        </div>
                                        <div class="file-meta">
                                            Size: <?php echo round($file['size'] / 1024, 2); ?> KB | 
                                            Time: <?php echo date('M d, Y H:i', $file['time']); ?>
                                        </div>
                                    </div>
                                    <div>
                                        <a href="?download=<?php echo urlencode($file['name']); ?>" class="btn-action btn-download">
                                            <i class="fas fa-download"></i> Download
                                        </a>
                                        <button class="btn-action btn-delete" onclick="deleteFile('<?php echo urlencode($file['name']); ?>')">
                                            <i class="fas fa-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        <?php if (count($convertedFiles) > 0): ?>
                            <a href="?download_all=1" class="btn-download-all">
                                <i class="fas fa-download"></i> Download All as ZIP
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script>
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        const uploadProgress = document.getElementById('uploadProgress');

        // Drag and drop
        uploadZone.addEventListener('dragover', e => {
            e.preventDefault();
            uploadZone.classList.add('active');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('active');
        });

        uploadZone.addEventListener('drop', e => {
            e.preventDefault();
            uploadZone.classList.remove('active');
            fileInput.files = e.dataTransfer.files;
            handleFiles();
        });

        // File input change
        fileInput.addEventListener('change', handleFileSelect);
        uploadZone.addEventListener('click', () => fileInput.click());
        document.getElementById('submitBtn').addEventListener('click', handleFiles);

        function handleFileSelect() {
            const files = fileInput.files;
            const selectedFilesDiv = document.getElementById('selectedFiles');
            const submitBtn = document.getElementById('submitBtn');
            
            if (files.length === 0) {
                selectedFilesDiv.innerHTML = '';
                submitBtn.style.display = 'none';
                return;
            }

            let html = '<div style="margin-top: 15px; padding: 15px; background: #f0f0ff; border-radius: 8px;"><strong>Selected Files:</strong><ul style="margin: 10px 0 0 20px; list-style: disc;">';
            
            for (let i = 0; i < files.length; i++) {
                html += `<li>${files[i].name} (${(files[i].size / 1024).toFixed(2)} KB)</li>`;
            }
            
            html += '</ul></div>';
            selectedFilesDiv.innerHTML = html;
            submitBtn.style.display = 'inline-block';
        }

        function handleFiles() {
            const files = fileInput.files;
            if (files.length === 0) {
                showAlert('Please select at least one image!', 'warning');
                return;
            }

            const formData = new FormData();
            formData.append('action', 'upload');

            for (let i = 0; i < files.length; i++) {
                formData.append('images[]', files[i]);
            }

            uploadProgress.innerHTML = '';
            
            for (let i = 0; i < files.length; i++) {
                uploadProgress.innerHTML += `
                    <div class="progress-item">
                        <small>${files[i].name}</small>
                        <div class="progress">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                `;
            }

            document.getElementById('submitBtn').disabled = true;

            $.ajax({
                url: window.location.href,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    document.getElementById('submitBtn').disabled = false;
                    uploadProgress.innerHTML = '';
                    
                    if (response.success) {
                        response.files.forEach(file => {
                            if (file.success) {
                                showAlert('Image converted to WebP successfully!', 'success');
                            } else {
                                showAlert('Error: ' + file.message, 'danger');
                            }
                        });
                        
                        fileInput.value = '';
                        document.getElementById('selectedFiles').innerHTML = '';
                        document.getElementById('submitBtn').style.display = 'none';
                        
                        setTimeout(() => location.reload(), 1500);
                    }
                },
                error: function() {
                    document.getElementById('submitBtn').disabled = false;
                    showAlert('Upload failed. Please try again.', 'danger');
                }
            });
        }

        function deleteFile(filename) {
            if (!confirm('Delete this file?')) return;

            $.ajax({
                url: window.location.href,
                type: 'POST',
                data: {
                    action: 'delete',
                    filename: filename
                },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        showAlert('File deleted successfully!', 'success');
                        setTimeout(() => location.reload(), 1000);
                    } else {
                        showAlert('Failed to delete file.', 'danger');
                    }
                }
            });
        }

        function showAlert(message, type) {
            const alertHtml = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            const container = $('<div></div>').insertAfter('.header');
            container.html(alertHtml);
            
            setTimeout(() => container.fadeOut(() => container.remove()), 4000);
        }
        
        function manualCleanup() {
            if (!confirm('Run manual cleanup now? Files older than 7 days will be deleted.')) return;
            
            showAlert('Running cleanup...', 'info');
            
            $.ajax({
                url: 'webp-convertor5.php?manual_cleanup=1',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log('Cleanup response:', response);
                    if (response.success) {
                        const total = (response.converted_deleted || 0) + (response.upload_deleted || 0);
                        showAlert(`Cleanup completed! Deleted ${total} old files.`, 'success');
                        setTimeout(() => location.reload(), 1500);
                    } else {
                        showAlert('Cleanup completed but no old files found.', 'info');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Cleanup error:', error);
                    console.error('Response:', xhr.responseText);
                    showAlert('Cleanup failed! Error: ' + error, 'danger');
                }
            });
        }
    </script>
</body>
</html>