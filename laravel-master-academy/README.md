# Laravel Master Academy (static, Hinglish)

Laravel 11 / 12 / 13 tutorial website. Pure HTML, CSS, JS, no backend. Progress lives in your browser's localStorage.

## Run locally
Lesson data loads with `fetch()`, so open it through a local server (double-clicking `index.html` will not work).

    cd laravel-master-academy
    python -m http.server 8000     # or: npx serve   |  VS Code "Live Server"

Open http://localhost:8000. An internet connection is needed for the CDN libraries (Bootstrap, jQuery, Toastr, fonts).

## Status
- [x] Phase 1: foundation (shell, design tokens, theme, version selector, storage, data loader)
- [x] Phase 2: lesson engine, code blocks, CodeMirror
- [x] Phase 3: course page, search, Chart.js dashboard
- [x] Phase 4: practice center, my learning
- [ ] Phase 5: lesson content batches
- [ ] Phase 6: QA and polish

## Phase 1 checklist
1. Theme button toggles dark/light and survives a reload (no flash).
2. Version dropdown changes the label, shows a toast, and survives a reload.
3. Below 992px the menu button opens the module drawer; the filter box narrows the list.
4. Dashboard version cards "Select" in sync with the header dropdown.
5. Default version is set in `assets/js/core/config.js` (`defaultVersion`).

## Phase 2 checklist
1. Sidebar: "04 Routing and Controllers" opens lesson 1 and lists its lessons.
2. Lesson page: copy buttons, editable block (Reset works), right-side contents highlight while scrolling (screens ≥1200px).
3. Mark complete / Bookmark / Notes persist after reload. Sidebar shows 1/2 after completing a lesson.
4. Change the header version: the Laravel version table highlight and composer.json block change.
5. Quiz: pick an answer, Check answer; finish all for a saved score. Interview answers expand.
6. Previous / Next move between the 2 sample lessons. Playground: language switch, Before / After.

## Phase 3 checklist
1. Press Ctrl+K (or Cmd+K, or `/`, or click the search icon): type "route", use Up/Down, click or Enter to open.
2. Course page: modules accordion with progress, filters (level, status, text), Table view with DataTables sorting and search.
3. Dashboard: continue card, stats, module progress chart (redraws on theme change), recent lessons.
4. After adding or editing lessons, rebuild search: `python tools/build_search_index.py`.

## Phase 4 checklist
1. Practice > MCQs: answer, Submit, see explanations; best score persists. Assignments: tick tasks, open the sample solution. Interview: search, mark Revised.
2. My learning: bookmarks, completed (Undo), editable notes, history, scores.
3. Backup: Export, change something, Import the file, Reset progress (each asks for confirmation).
4. Practice content lives in `data/practice/<module>.json` (one file per module) and is listed in `data/practice/index.json`.

## Phase 5 progress (content)
- [x] Module 01: PHP Fundamentals and OOP (4 lessons)
- [x] Module 02: Laravel Introduction and Installation (5 lessons)
- [ ] Module 03, 04 (rest of Batch 1), then Batches 2 to 6
- After adding lessons: add them to `data/modules.json`, then run `python tools/build_search_index.py`.
