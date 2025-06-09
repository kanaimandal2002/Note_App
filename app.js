document.addEventListener('DOMContentLoaded', function() {
    // Initialize Quill editor
    const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ]
        },
        placeholder: 'Write your note here...'
    });

    // DOM elements
    const notesList = document.getElementById('notes-list');
    const newNoteBtn = document.getElementById('new-note-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const deleteNoteBtn = document.getElementById('delete-note-btn');
    const searchInput = document.getElementById('search-notes');

    // App state
    let notes = [];
    let currentNoteId = null;

    // Initialize the app
    init();

    function init() {
        loadNotes();
        renderNotesList();
        setupEventListeners();
    }

    function loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        notes = savedNotes ? JSON.parse(savedNotes) : [];
    }

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function renderNotesList(filter = '') {
        notesList.innerHTML = '';
        
        const filteredNotes = filter 
            ? notes.filter(note => 
                note.title.toLowerCase().includes(filter.toLowerCase()) || 
                note.content.toLowerCase().includes(filter.toLowerCase()))
            : notes;
        
        if (filteredNotes.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.textContent = 'No notes found';
            emptyMessage.classList.add('note-item');
            notesList.appendChild(emptyMessage);
            return;
        }
        
        filteredNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note-item');
            if (note.id === currentNoteId) {
                noteElement.classList.add('active');
            }
            
            // Create a temporary div to extract text from HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.content;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            const preview = textContent.substring(0, 50) + (textContent.length > 50 ? '...' : '');
            
            noteElement.innerHTML = `
                <div class="note-item-title">${note.title || 'Untitled Note'}</div>
                <div class="note-item-preview">${preview}</div>
            `;
            
            noteElement.addEventListener('click', () => openNote(note.id));
            notesList.appendChild(noteElement);
        });
    }

    function openNote(noteId) {
        const note = notes.find(n => n.id === noteId);
        if (note) {
            currentNoteId = noteId;
            quill.root.innerHTML = note.content;
            renderNotesList(searchInput.value);
        }
    }

    function createNewNote() {
        currentNoteId = Date.now().toString();
        quill.root.innerHTML = '';
        renderNotesList(searchInput.value);
    }

    function saveCurrentNote() {
        if (!currentNoteId) return;
        
        const content = quill.root.innerHTML;
        const text = quill.getText().trim();
        const title = text.split('\n')[0] || 'Untitled Note';
        
        const existingNoteIndex = notes.findIndex(n => n.id === currentNoteId);
        
        if (existingNoteIndex >= 0) {
            // Update existing note
            notes[existingNoteIndex] = {
                id: currentNoteId,
                title,
                content,
                updatedAt: new Date().toISOString()
            };
        } else {
            // Add new note
            notes.unshift({
                id: currentNoteId,
                title,
                content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
        
        saveNotes();
        renderNotesList(searchInput.value);
    }

    function deleteCurrentNote() {
        if (!currentNoteId) return;
        
        if (confirm('Are you sure you want to delete this note?')) {
            notes = notes.filter(note => note.id !== currentNoteId);
            saveNotes();
            currentNoteId = null;
            quill.root.innerHTML = '';
            renderNotesList(searchInput.value);
        }
    }

    function setupEventListeners() {
        newNoteBtn.addEventListener('click', createNewNote);
        saveNoteBtn.addEventListener('click', saveCurrentNote);
        deleteNoteBtn.addEventListener('click', deleteCurrentNote);
        
        searchInput.addEventListener('input', (e) => {
            renderNotesList(e.target.value);
        });
        
        // Auto-save when content changes (with debounce)
        let saveTimeout;
        quill.on('text-change', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                if (currentNoteId) {
                    saveCurrentNote();
                }
            }, 2000);
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                saveCurrentNote();
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                createNewNote();
            }
        });
    }
});