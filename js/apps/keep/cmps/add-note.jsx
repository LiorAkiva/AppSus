import { noteService } from "../services/note.service.js";
import { DynamicNoteInput } from './note-input.jsx';
const { withRouter } = ReactRouterDOM;



class _AddNote extends React.Component {
  state = {
    noteType: 'note-txt',
    note: {
      isPinned: false,
      info: {
        txt:'',
        title:'',
        url:'',
        todos:[]
      },
      backgroundColor: 'whitesmoke'
    },
  };

  // componentDidMount(){
  //   const query
  // }

  handleBtnClick(e, noteType) {
    this.setState({ noteType });
  }

  handleInputSubmit = (ev) => {
    // if user hit enter
    if (ev.keyCode === 13) {
      this.setState({ noteType: "note-txt" });
      noteService.createNote(ev.target.value, this.state.noteType);
      this.props.loadNotes();
      this.clearInput(ev.target);
    }
  };

  

  clearInput(target) {
    target.value = "";
  }

  render() {
    const { noteType, title } = this.state;
    return (
      <div className="note-create flex align-center">
        <div className="note-input-container">
          
   
          
          {
            <DynamicNoteInput
              noteType={noteType}
              title={title}
              handleInputSubmit={this.handleInputSubmit}
            />
          }
        </div>

        <div className="note-control-panel flex">
          <div className="note-btn-container ">
            <button
              className={
                this.state.noteType === "note-txt" ? "active" : "undefined"
              }
              onClick={(e) => {
                this.handleBtnClick(e, "note-txt");
              }}
            > text
              <i className="note-btn"></i>
            </button>
          </div>
          <div className="note-btn-container">
            <button
              className={
                this.state.noteType === "note-img" ? "active" : "undefined"
              }
              onClick={(e) => {
                this.handleBtnClick(e, "note-img");
              }}
            > img
              <i className="note-btn"></i>
            </button>
          </div>
          <div className="note-btn-container">
            <button
              className={
                this.state.noteType === "note-video" ? "active" : "undefined"
              }
              onClick={(e) => {
                this.handleBtnClick(e, "note-video");
              }}
            >video
              <i className="note-btn"></i>
            </button>
          </div>
          <div className="note-btn-container">
            <button
              className={
                this.state.noteType === "note-todo" ? "active" : "undefined"
              }
              onClick={(e) => {
                this.handleBtnClick(e, "note-todo");
              }}
            >todo
              <i className="note-btn list-ul"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const AddNote = withRouter(_AddNote);