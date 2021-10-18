import React, { useState, useEffect } from 'react'
import '../scss/NotesApp.scss'

const NotesApp = () => {
    const [Notes, setNotes] = useState();
    const [Title, setTitle] = useState('');
    const [Header, setHeader] = useState('');
    const [Text, setText] = useState('');
    const [ActiveTitle, setActiveTitle] = useState('');
    const [ActiveHeader, setActiveHeader] = useState('');
    const [ActiveText, setActiveText] = useState('');
    const [ActiveNote, setActiveNote] = useState();

    var storage = window.localStorage;
    useEffect(() => {
        if(storage.notes === undefined || storage.notes === null) return;
        var notes = JSON.parse(storage.notes);
        setNotes(notes.reverse());
    }, [storage.notes])

    useEffect(() => {
        if(ActiveNote === undefined || ActiveNote === null) {
            setActiveTitle();
            setActiveHeader();
            setActiveText();
        }else {
            setActiveTitle(ActiveNote.title);
            setActiveHeader(ActiveNote.header);
            setActiveText(ActiveNote.text);
        }
    }, [ActiveNote])

    const UpdateNotes = () => {
        if(storage.notes === undefined || storage.notes === null) return;
        var notes = JSON.parse(storage.notes);
        setNotes(notes.reverse());
    }

    const addNote = (e) => {
        e.preventDefault();
        if(storage.notes !== undefined && storage.notes !== null) {
            var prevValue = JSON.parse(storage.notes);
            var element = {title: Title, header: Header, text: Text, id: prevValue.length + 1};
            prevValue.push(element);
            storage.setItem('notes', JSON.stringify(prevValue));
        }else {
            var arr = [];
            var elem = {title: Title, header: Header, text: Text, id: 1};
            arr.push(elem);
            storage.setItem('notes', JSON.stringify(arr));
        }
        UpdateNotes();
        window.location.reload();
    }

    const editNote = (e) => {
        e.preventDefault();
        var prevValue = JSON.parse(storage.notes);
        var noteToEdit = prevValue.findIndex(index => index.id === ActiveNote.id);
        prevValue[noteToEdit] = {title: ActiveTitle, header: ActiveHeader, text: ActiveText};
        console.log(prevValue[noteToEdit]);
        storage.setItem('notes', JSON.stringify(prevValue))
        UpdateNotes();
        window.location.reload();
    }

    const deleteNote = (item) => {
        var prevValue = JSON.parse(storage.notes);
        console.log(item.id);
        var noteToDelte = prevValue.findIndex(index => index.id === item.id);
        console.log(noteToDelte)
        prevValue.splice(noteToDelte, 1)
        storage.setItem('notes', JSON.stringify(prevValue))
        UpdateNotes();
        window.location.reload();
    }

    return (
        
       <section className="notes-section">
            <div className="notes">
                <li><button className="fullwidth" onClick={() => setActiveNote()}><ion-icon name="add-outline"></ion-icon>New Note</button></li>
                {Notes !== undefined && Notes !== null ?
                Notes.map((item, index) => {
                    return (
                        <li key={'index: ' + index}><button onClick={() => deleteNote(item)}><ion-icon name="trash-outline"></ion-icon></button><button className="fullwidth note-button" onClick={() => setActiveNote(item)}>{item.title}</button></li>
                    )
                }) 
                // <></>
                : <><p>notes empty</p></>}

            
            </div>
            <div className="ActiveNote">
                {ActiveNote !== undefined && ActiveNote !== null ? 
                    <form className="note-form" onSubmit={editNote}>
                        <input name="title" defaultValue={ActiveNote.title} placeholder="Title" onChange={e => setActiveTitle(e.target.value)} />
                        <input name="header" defaultValue={ActiveNote.header} placeholder="Header" onChange={e => setActiveHeader(e.target.value)} />
                        <textarea name="text" defaultValue={ActiveNote.text} placeholder="Text" onChange={e => setActiveText(e.target.value)} />
                        <div className="submit-btn">
                            <button className="">Submit changes</button>
                        </div>
                    </form>
                :
                    <form className="note-form" onSubmit={addNote}>
                        <input name="title" defaultValue={Title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                        <input name="header" defaultValue={Header} placeholder="Header" onChange={e => setHeader(e.target.value)} />
                        <textarea name="text" defaultValue={Text} placeholder="Text" onChange={e => setText(e.target.value)} />
                        <div className="submit-btn">
                            <button className="">Submit</button>
                        </div>
                    </form>
                }
            </div>
        {/*  */}
       </section>
    )
}

export default NotesApp;