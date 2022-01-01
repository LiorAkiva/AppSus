import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, pinnedNotes, onRemoveNote, onDuplicateNote, onChangeColor, onPinNote, onTogglePin }) {
  // if (!notes.length) return <h1>no notes</h1>;
  return (
    <section>
      <h1>My pinned notes</h1>
    <section className="note-list">
      <div className="pinned-list">
      {pinnedNotes.map((note) => 
        <NotePreview onTogglePin={onTogglePin} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} onChangeColor={onChangeColor} onPinNote={onPinNote} key={note.id} note={note} />
      )}
      </div> 
      
    </section>
      <hr></hr>
      <h1>Notes</h1>
    <section className="note-list">
      <div className="notes-list">
      {notes.map((note) => 
        <NotePreview onTogglePin={onTogglePin} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} onChangeColor={onChangeColor} onPinNote={onPinNote} key={note.id} note={note} />
      )}

      </div>
    </section>
    </section>
  );
}
