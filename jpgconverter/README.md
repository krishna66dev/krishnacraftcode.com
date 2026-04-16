# PixelShift — Image Converter

A full-stack image conversion tool. Converts PNG, WEBP, AVIF, BMP, GIF, TIFF → JPG/PNG/WEBP.

## Features

- **Client-side conversion** via Canvas API (works with no backend)
- **PHP backend** via GD / Imagick for AVIF, TIFF and server-side processing
- Drag-and-drop upload + multi-file selection
- Thumbnail preview grid with drag-to-reorder
- Quality slider (10–100%)
- Output format selector: JPG, PNG, WEBP
- Resize with optional aspect-ratio lock
- Prefix/suffix file rename
- Download individually or as ZIP
- Before/after preview modal
- Dark / Light mode
- Mobile responsive (Bootstrap 5)

---

## Quick Start (Client-only, no server needed)

1. Open `index.html` in any modern browser
2. Drop images → adjust settings → Convert → Download

> All conversion happens in-browser via the Canvas API. No files leave your computer.

---

## PHP Backend Setup

### Requirements

- PHP 8.0+
- GD extension (`php-gd`)  — for JPG, PNG, WEBP, GIF, BMP
- Imagick extension (`php-imagick`) — recommended; adds AVIF, TIFF support

### Steps

1. Place all files on a PHP-capable web server (Apache / Nginx)
2. Ensure `uploads/` and `converted/` are writable by the web server:
   ```bash
   chmod 750 uploads/ converted/
   chown www-data:www-data uploads/ converted/
   ```
3. In `script.js`, set:
   ```js
   state.useBackend = true;
   ```
4. The app will POST to `convert.php`, which saves and converts the file,
   returning a download token. `download.php` serves the file and deletes it.

### Nginx config snippet (if not using Apache)

```nginx
location ~* ^/(uploads|converted)/.*\.php$ { deny all; }
location /uploads/ { internal; }
location /converted/ { internal; }
```

---

## File Structure

```
/image-converter
 ├── index.html          Main UI
 ├── style.css           Stylesheet (dark/light theme)
 ├── script.js           Client-side logic + Canvas converter
 ├── convert.php         Upload handler + GD/Imagick converter
 ├── download.php        Single file download + cleanup
 ├── zip.php             Server-side ZIP bundler
 ├── .htaccess           Root security rules
 ├── /uploads            Temp upload storage (auto-cleaned)
 │   └── .htaccess       Blocks script execution
 └── /converted          Temp converted storage (auto-cleaned)
     └── .htaccess       Blocks direct access
```

---

## Security

- MIME validation via `finfo` (magic bytes, not extension)
- Path traversal prevention (`basename()` + `realpath()` checks)
- Double-extension blocking (`.php.jpg`, etc.)
- Temp files auto-deleted after 1 hour (configurable in `convert.php`)
- `.htaccess` blocks direct execution in upload dirs
- Unique filenames via `random_bytes()` to prevent conflicts
- No SQL, no eval, no shell exec

---

## Supported Input Formats

| Format | Client (Canvas) | PHP GD | PHP Imagick |
|--------|:-:|:-:|:-:|
| JPEG   | ✓ | ✓ | ✓ |
| PNG    | ✓ | ✓ | ✓ |
| WEBP   | ✓ | ✓ | ✓ |
| GIF    | ✓ | ✓ | ✓ |
| BMP    | ✓ | ✓ | ✓ |
| AVIF   | partial* | ✗ | ✓ |
| TIFF   | ✗ | ✗ | ✓ |
| SVG    | ✗ | ✗ | ✓ |

*AVIF support in Canvas depends on browser version (Chrome 85+, Firefox 93+)

---

## License

MIT — use freely in personal and commercial projects.
