import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const noteService = {
  query,
  createNote,
  removeNote,
  getNoteById,
  duplicateNote,
  changeColor,
  setPinnedNotes,
  togglePin,
  toggleTodo,
};

const NOTES_KEY = 'notesDB';
const PINNED_KEY= 'pinnedDB';
var gNotes;

_createNotes();

function query(filterBy = null) {
  const notes = _loadNotesFromStorage();
  if (!filterBy) return Promise.resolve(notes);
  // else const notesToDisplay = _getFilteredNotes(notes, filterBy);
  //   return Promise.resolve(notesToDisplay);
}

function setPinnedNotes(){
    const pinnedNotes = _loadPinnedNotesFromStorage();
    return Promise.resolve(pinnedNotes);
}

function getNoteById(noteId) {
    const notes = _loadNotesFromStorage();
    const note = notes.find(note => note.id === noteId);
    return note;
 }

function addNote(noteToAdd) {
  let notes = _loadNotesFromStorage();
  gNotes.push(noteToAdd);
  notes.unshift(noteToAdd);
  _saveNotesToStorage(notes);
  return Promise.resolve(noteToAdd);
}

function removeNote(currNote) {
  let notes = _loadNotesFromStorage();
  let pinnedNotes = _loadPinnedNotesFromStorage();
  if(!currNote.isPinned){
    notes = notes.filter((note) => note.id !== currNote.id);
    _saveNotesToStorage(notes);
    return Promise.resolve(notes);
  } else if(currNote.isPinned) {
      pinnedNotes = pinnedNotes.filter((note) => note.id !== currNote.id);
      _savePinnedNotesToStorage(pinnedNotes)
      return Promise.resolve(pinnedNotes);
  }
}

function duplicateNote(currNote) {
    const notes = _loadNotesFromStorage();
    const pinnedNotes= _loadPinnedNotesFromStorage();
    if(!currNote.isPinned){
    const note = notes.find((note) => note.id === currNote.id);
    notes.unshift({...note, id: utilService.makeId()});
    _saveNotesToStorage(notes);
    return Promise.resolve(notes);
    } else if (currNote.isPinned) {
        const pinnedNote = pinnedNotes.find((note) => note.id === currNote.id);
        pinnedNotes.unshift({...pinnedNote, id:utilService.makeId()});
        _savePinnedNotesToStorage(pinnedNotes)
      return Promise.resolve(pinnedNotes);
    }

}

// changes color only after manually refreshing the page
function changeColor(noteId, color){
    console.log(noteId, color)
    const notes = _loadNotesFromStorage();
    const note = notes.find(note => note.id === noteId);
    note.backgroundColor = color;
    _saveNotesToStorage(notes);
    return Promise.resolve(note);
}

function togglePin(note) {
    const noteId = note.id
    let notes = _loadNotesFromStorage()
    let pinnedNotes = _loadPinnedNotesFromStorage()
    if(!pinnedNotes) pinnedNotes = []
    if(!note.isPinned){
        let noteIdx = notes.findIndex(note => note.id === noteId)
        notes.splice(noteIdx,1)
        pinnedNotes = [note,...pinnedNotes]
    }else{
        let noteIdx = pinnedNotes.findIndex(note => note.id === noteId)
        pinnedNotes.splice(noteIdx,1)
        notes = [note,...notes]
    }
    note.isPinned = !note.isPinned
    _saveNotesToStorage(notes)
    _savePinnedNotesToStorage(pinnedNotes)
    return Promise.resolve()
 }

 function toggleTodo(note, todoId){
    //  console.log(note, todoId)
     let currNote;
     let todo;
     const notes = _loadNotesFromStorage();
     const pinnedNotes = _loadPinnedNotesFromStorage();
    if(!note.isPinned){
        const idx = notes.findIndex(n=> n.id === note.id);
        currNote = notes[idx];
        todo = currNote.info.todos.find(todo=> todo.id === todoId);
    } else if (note.isPinned){
        idx = pinnedNotes.findIndex(n=> n.id === note.id);
        currNote = pinnedNotes[idx];
        todo = currNote.info.todos.find(todo => todo.id === todoId);
    }

    if(todo.doneAt) todo.doneAt= null;
    else if(!todo.dontAt) todo.doneAt= Date.now();
    // console.log(todo.doneAt)
    _saveNotesToStorage(notes)
    _savePinnedNotesToStorage(pinnedNotes)
    return Promise.resolve(currNote);
 }


function createNote(inputVal, noteType) {
  if (!inputVal) return;
  let note = {
    id: utilService.makeId(),
    type: noteType,
    isPinned: false,
    backgroundColor: "whitesmoke",
  };

  switch (noteType) {
    case "note-txt":
      note.info = {
        title: "New note",
        txt: inputVal,
        todos: [],
      };
      break;
    case "note-img":
      note.info = {
        url: inputVal,
        title: "New note",
        todos: [],
      };
      break;
    case "note-video":
      note.info = {
        video: inputVal,
        title: "New note",
        todos: [],
      };
      break;
    case "note-todo":
      note.info = {
        todos: [],
        title: "New note",
      };
      break;

    default:
      return "Error";
  }

  addNote(note);
}

function _createNotes() {
  let notes = _loadNotesFromStorage();
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
          title: "Sprint #3",
          url: "https://media.giphy.com/media/28lD0jH5emdr7r5ooD/giphy.gif",
          txt: "lets go!",
          todos: [],
        },
        backgroundColor: "rgb(209, 172, 204)",
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
          title: "Don't forget!",
          url: "https://media.giphy.com/media/DhstvI3zZ598Nb1rFf/giphy.gif",
          txt: "We are in 2022!",
          todos: [],
        },
        backgroundColor: "lightgrey",
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
          title: "WARNING!",
          url: "https://ih1.redbubble.net/image.747123881.8034/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
          txt: "This code is not for the faint of heart. Deep breaths are advised as a precaution!",
          todos: [],
        },
        backgroundColor: "rgb(246, 198, 47)",
      },
      {
        id: utilService.makeId(),
        type: "note-todo",
        isPinned: false,
        info: {
          title: "To Do:",
          url: "https://see.news/wp-content/uploads/2021/05/%D8%A9-750x375.jpg",
          todos: [
            {
              id: utilService.makeId(),
              txt: "Buy a ticket to Japan",
              doneAt: Date.now(),
            },
            { id: utilService.makeId(), txt: "Never come back", doneAt: null },
          ],
        },
        backgroundColor: "lightsteelblue",
      },
      {
        id: utilService.makeId(),
        type: "note-video",
        isPinned: false,
        info: {
          title: "They said sprint 3 will be fun!",
          txt: "I'm not superstitious, but I am a little stitious.",
          todos: [],
        },
        backgroundColor: "silver",
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
          title: "Look at this!",
          todos: [],
          video: "https://www.youtube.com/embed/i93Z7zljQ7I",
        },
        backgroundColor: "lightgreen",
      },
      {
        id: utilService.makeId(),
        type: "note-todo",
        isPinned: false,
        info: {
          title: "Coding ninja 101",
          todos: [{id: utilService.makeId(), txt: "Learn the basics", doneAt: Date.now()},
          {id: utilService.makeId(), txt: "Crash the code one hour before deadline", doneAt: Date.now()},
          {id: utilService.makeId(), txt: "Cry yourself to sleep", doneAt: Date.now()},
          {id: utilService.makeId(), txt: "Break the computer", doneAt: Date.now()},
          {id: utilService.makeId(), txt: "Become the computer", doneAt: null}],
        },
        backgroundColor: "rgb(236, 199, 168)",
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
          title:'Small kitty, worm kitty, little ball of fur. Happy kitty, sleepy kitty, purr purr purr . . .',
          url:'',
          txt: '',
          todos: [],
        },
        backgroundColor: "rgb(209, 172, 204)",
      },
      {
        id: utilService.makeId(),
        type: "note-video",
        isPinned: false,
        info: {
          title: "MOOD",
          url: "https://media.giphy.com/media/6Q3M4BIK0lX44/giphy.gif",
          txt: "Me when Elhanan asks me how I'm doing . . .",
          todos: [],
        },
        backgroundColor: "rgb(240, 240, 196)",
      },
      {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: false,
        backgroundColor: "pink",
        info: {
          title: "Spidey!",
          url: "https://assets-prd.ignimgs.com/2021/11/08/fdo0mohvqaap5td-1636343382417.jpg",
          txt: " Spider-Man, Spider-Man Does whatever a spider can. Spins a web, any size, Catches thieves just like flies. Look Out! Here comes the Spider-Man.",
          source:
            "https://www.lyricsondemand.com/tvthemes/spidermanlyrics.html!",
          todos: [],
        },
      },
      {
        id: utilService.makeId(),
        type: "note-todo",
        isPinned: false,
        info: {
          title: "My bucket list",

          todos: [
            {
              id: utilService.makeId(),
              txt: "Travel to Africa",
              doneAt: null,
            },
            {
              id: utilService.makeId(),
              txt: "Stay at home all day",
              doneAt: Date.now(),
            },
            {
              id: utilService.makeId(),
              txt: "Binge Brooklyn 99 (again)",
              doneAt: Date.now(),
            },
          ],
        },
        backgroundColor: "lightblue",
      },
    ];
  }
  gNotes =notes;
  let pinnedNotes = _loadPinnedNotesFromStorage();
  if(!pinnedNotes || !pinnedNotes.length) {
      pinnedNotes = notes.filter(note => note.isPinned);
      
    //   console.log(pinnedNotes)
      _savePinnedNotesToStorage(pinnedNotes)
    }
    notes = notes.filter(note => !note.isPinned)
    _saveNotesToStorage(notes);
    return notes, pinnedNotes;
}

function _saveNotesToStorage(notes) {
  storageService.save(NOTES_KEY, notes);
}
function _savePinnedNotesToStorage(notes) {
  storageService.save(PINNED_KEY, notes);
}

function _loadNotesFromStorage() {
  return storageService.load(NOTES_KEY);
}
function _loadPinnedNotesFromStorage() {
  return storageService.load(PINNED_KEY);
}
