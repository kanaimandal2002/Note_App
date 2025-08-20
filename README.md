# Notes App

A feature-rich notes application with rich text formatting capabilities that stores all data locally in the browser.

## Live Demo

You can view a live version of this tool at [(https://kanaimandal2002.github.io/Note_App/)]


## Features

- **Rich Text Editing**:
  - Bold, italic, underline, strikethrough
  - Headers (H1-H3)
  - Text and background colors
  - Bullet and numbered lists
  - Links and images

- **Note Management**:
  - Create, edit, and delete notes
  - Rename notes with custom titles
  - Automatic saving (2-second debounce)
  - Manual save option
  - Note preview in sidebar
  - Search functionality

- **User Experience**:
  - Clean, responsive interface
  - Keyboard shortcuts
  - Auto-creation of first note
  - Visual indication of active note
  - Confirmation for deletion

## Installation

No installation required! This is a client-side only application.

1. Download the project files
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)

## Usage

### Basic Operations

- **New Note**: Click the "New Note" button or press `Ctrl+N` (Windows) / `Cmd+N` (Mac)
- **Save Note**: Click "Save" or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
- **Delete Note**: Click "Delete" (confirmation dialog will appear)
- **Rename Note**: Edit the title field at the top of the editor
- **Search Notes**: Type in the search box to filter notes

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+S / Cmd+S | Save current note |
| Ctrl+N / Cmd+N | Create new note |
| Ctrl+T / Cmd+T | Focus note title |

### Rich Text Formatting

Use the toolbar above the editor to format your text. Hover over each button to see its function.

## Data Storage

All notes are stored in the browser's `localStorage`, meaning:

- Notes persist between sessions
- Notes are only accessible in the browser where they were created
- No data is sent to any server - everything stays on your device

## Customization

You can easily customize the app by modifying:

1. `styles.css` - Change colors, layout, and appearance
2. `app.js` - Modify note handling logic or add features
3. `index.html` - Adjust the HTML structure

## Known Limitations

- No image upload support (only URLs)
- No cloud sync or backup
- Limited to browser storage capacity (~5MB typically)

## Future Enhancements

Planned future features:

- Markdown support
- Note categories/tags
- Export/import functionality
- Dark mode
- IndexedDB for larger storage
- Note sharing options
