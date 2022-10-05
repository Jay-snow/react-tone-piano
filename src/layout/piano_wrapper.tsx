import * as Tone from 'tone'
import React, { useState } from 'react';
import Key from './key';

const synth = new Tone.Synth().toDestination();
document.addEventListener("mouseup", e => {
    synth.triggerRelease();
})



function PianoWrapper() {

    const [notes, setNotes] = useState(initPiano())

    function initPiano() {

        let sound_library = ["C3", "D3", "E3", "F3", "G3", "A3", "B3"]
        let sound_collection = []
        for (let i = 0; i < sound_library.length; i++) {
            sound_collection.push({
                note: sound_library[i],
                id: i,
                isPlaying: false,
            })
        }


        return sound_collection
    }

    function clickHandler(e: any) {
        let note = e.target.dataset.note;
        let id = parseInt(e.target.dataset.id);
        let isPlaying = (e.target.dataset.playing === 'true');
        if (e.buttons === 1 && !isPlaying) {
            Tone.start();
            synth.triggerAttack(note);
            e.target.dataset.playing = 'true';
            //Update state
            let stateCopy = [...notes];

            stateCopy[id].isPlaying = true;
            setNotes(stateCopy);
            console.log(stateCopy)
        }




    }

    function releaseAttack(e: any) {
        e.target.dataset.playing = 'false';
        //Update state
        let stateCopy = [...notes];
        let id = parseInt(e.target.dataset.id);
        stateCopy[id].isPlaying = false;
        setNotes(stateCopy);
        console.log(stateCopy)
        synth.triggerRelease();
    }


    return (
        <div className="piano-wrapper">
            {notes.map((note, i) =>
                <Key draggable="false" key={note.id} id={note.id} releaseAttack={releaseAttack} clickHandler={clickHandler} isPlaying={note.isPlaying} note={note.note} className="white-key" />
            )}

            <div className="black-key" style={{ marginLeft: 6 }}> </div>
            <div className="black-key" style={{ marginLeft: 36 }}> </div>
            <div className="black-key" style={{ marginLeft: 96 }}> </div>
            <div className="black-key" style={{ marginLeft: 126 }}> </div>
            <div className="black-key" style={{ marginLeft: 156 }}> </div>
        </div>
    );
}

export default PianoWrapper;
