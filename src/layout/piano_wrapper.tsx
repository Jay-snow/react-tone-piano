import * as Tone from 'tone'
import React, { useState } from 'react';
import Key from './key';
import BlackKey from './blackkey';

const synth = new Tone.Synth().toDestination();
//Global on mouseup, stop playing.
document.addEventListener("mouseup", e => {
    synth.triggerRelease();
})



function PianoWrapper() {

    const [notes, setNotes] = useState(initPiano())
    const [blackKeys, setblackKeys] = useState(initBlackKeys())

    //Sets up the Piano state.
    function initPiano() {

        let sound_library = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"]
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

    function initBlackKeys() {

        let sound_library = ["C#3", "D#3", "E#3", "F#3", "G#3"]
        let margin_library = [6, 36, 96, 126, 156]
        let sound_collection = []


        for (let i = 0; i < sound_library.length; i++) {
            sound_collection.push({
                note: sound_library[i],
                margin: margin_library[i],
                id: i,
                isPlaying: false,
            })
        }

        return sound_collection
    }


    //Handles the piano clicks.
    //Updates PianoWrapper state and dataset for HTML reading.
    function clickHandler(e: any) {
        let note = e.target.dataset.note;
        let id = parseInt(e.target.dataset.id);
        console.log(note)
        let isPlaying = (e.target.dataset.playing === 'true');
        if (e.buttons === 1 && !isPlaying) {
            Tone.start();
            console.log('noise')
            synth.triggerAttack(note);
            e.target.dataset.playing = 'true';
            //Update state by first making a clone.
            //This is a best practice, I forget why.
            let stateCopy = [...notes];

            stateCopy[id].isPlaying = true;
            setNotes(stateCopy);
            console.log(stateCopy)
        }

    }

    //Utility method, used to stop playing music.

    function releaseAttack(e: any) {
        e.target.dataset.playing = 'false';
        //Update state
        let stateCopy = [...notes];
        let id = parseInt(e.target.dataset.id);
        stateCopy[id].isPlaying = false;
        setNotes(stateCopy);
        synth.triggerRelease();
    }


    return (
        <div className="piano-wrapper">
            {notes.map((note, i) =>
                <Key draggable="false" key={note.id} id={note.id} releaseAttack={releaseAttack} clickHandler={clickHandler} isPlaying={note.isPlaying} note={note.note} />
            )}
            {blackKeys.map((key, i) =>
                <BlackKey draggable="false" key={key.id} id={key.id} releaseAttack={releaseAttack} clickHandler={clickHandler} margin={key.margin} isPlaying={key.isPlaying} note={key.note} />
            )
            }
            {/* <BlackKey draggable="false" id={1} releaseAttack={releaseAttack} clickHandler={clickHandler} isPlaying={false} note={"C#3"} /> */}
            {/* <div className="black-key" style={{ marginLeft: 6 }}> </div>
            <div className="black-key" style={{ marginLeft: 36 }}> </div>
            <div className="black-key" style={{ marginLeft: 96 }}> </div>
            <div className="black-key" style={{ marginLeft: 126 }}> </div>
            <div className="black-key" style={{ marginLeft: 156 }}> </div> */}
        </div>
    );
}

export default PianoWrapper;
