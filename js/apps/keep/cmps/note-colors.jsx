const gColors = ['lightsteelblue', 'lightblue', 'silver', 'whitesmoke', 'rgb(209, 172, 204)', 'pink'
, 'rgb(240, 240, 196)', 'rgb(246, 198, 47)', 'rgb(168, 236, 185)', 'rgb(236, 199, 168)', 'rgb(223, 226, 175)', 'lightgrey' ]

export function NoteColors({note, noteId, onChangeColor}){
    
    return(
    <div className="colors">
        <button className="edit-btn">
            <i className="fas fa-palette"></i>
        </button>
        <div className="color-box">
        {gColors.map((color, idx) => (
                <div key={idx} id={`color-${idx}`} onClick={() => onChangeColor(note, noteId, color)} style={{ backgroundColor: color }}></div>
            ))}
        </div>
    </div>
    )
}