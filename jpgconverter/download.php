<?php
/**
 * PixelShift — download.php
 * Serves a single converted file and deletes it after sending
 */

$file = $_GET['file'] ?? '';

// Sanitise: strip path traversal
$file = basename($file);

$path = __DIR__ . '/converted/' . $file;

// Validate file exists and is in the converted dir
$realBase = realpath(__DIR__ . '/converted');
$realPath = realpath($path);

if (!$realPath || strpos($realPath, $realBase) !== 0 || !is_file($realPath)) {
    http_response_code(404);
    echo json_encode(['error' => 'File not found']);
    exit;
}

// Determine MIME
$ext = strtolower(pathinfo($realPath, PATHINFO_EXTENSION));
$mimeMap = [
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png'  => 'image/png',
    'webp' => 'image/webp',
    'gif'  => 'image/gif',
];
$mime = $mimeMap[$ext] ?? 'application/octet-stream';

// Send
header('Content-Type: ' . $mime);
header('Content-Disposition: attachment; filename="' . $file . '"');
header('Content-Length: ' . filesize($realPath));
header('Cache-Control: no-cache, no-store');
header('X-Content-Type-Options: nosniff');
readfile($realPath);

// Delete after serving
@unlink($realPath);
