import * as Tone from 'tone'
import React, { useState, useEffect } from 'react';
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


    useEffect(() => {
        document.addEventListener("keydown", e => {
            _keydown(e);
        })


        document.addEventListener("keyup", e => {
            _keyup(e);
        })

    }, [])

    const _keydown = (e: KeyboardEvent) => {


        for (let i = 0; i < notes.length; i++) {
            if (notes[i].keyboard_libary === e.key.toUpperCase()) {
                console.log("match!");
                let note_to_play = notes[i];
                keyboardHandler(note_to_play)
            }
        }



    }


    const _keyup = (e: KeyboardEvent) => {
        let whiteKeyCopy = [...notes];

        for (let key of whiteKeyCopy) {
            key.isPlaying = false;
        }
        setNotes(whiteKeyCopy);
        synth.triggerRelease();


    }

    //Sets up the Piano state.
    function initPiano() {

        let sound_library = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"]
        let keyboard_libary = ["A", "S", "D", "G", "H"]
        let sound_collection = []
        for (let i = 0; i < sound_library.length; i++) {
            let letter = keyboard_libary[i] ? keyboard_libary[i] : null;
            sound_collection.push({
                note: sound_library[i],
                id: i,
                isPlaying: false,
                type: 'white',
                keyboard_libary: (keyboard_libary[i] ? keyboard_libary[i] : null)
            })
        }
        return sound_collection
    }

    function initBlackKeys() {

        let sound_library = ["C#3", "D#3", "F#3", "G#3", "A#3", "C#4", "D#4", "F#4", "G#4", "A#4",];
        let margin_library = [6, 36, 96, 126, 156, 216, 246, 306, 336, 366];
        let sound_collection = []

        for (let i = 0; i < sound_library.length; i++) {
            sound_collection.push({
                note: sound_library[i],
                margin: margin_library[i],
                id: i,
                isPlaying: false,
                type: 'black',
            })
        }

        return sound_collection
    }


    //Handles the piano clicks.
    //Updates PianoWrapper state and dataset for HTML reading.
    function clickHandler(e: any) {
        let note = e.target.dataset.note;
        let id = parseInt(e.target.dataset.id);
        let isPlaying = (e.target.dataset.playing === 'true');

        if (e.buttons === 1 && !isPlaying) {
            Tone.start();
            synth.triggerAttack(note);
            e.target.dataset.playing = 'true';
            //Update state by first making a clone.
            //This is a best practice, I forget why.
            console.log(e.target.dataset.type)
            if (e.target.dataset.type === 'white') {
                let stateCopy = [...notes];
                stateCopy[id].isPlaying = true;
                setNotes(stateCopy);
            } else {
                let stateCopy = [...blackKeys];
                stateCopy[id].isPlaying = true;
                setblackKeys(stateCopy);
            }


        }

    }

    function keyboardHandler(e: any) {
        console.log(e)
        let note = e.note;
        let id = parseInt(e.id);
        let isPlaying = (e.isPlaying === 'true');

        if (!isPlaying) {
            Tone.start();
            synth.triggerAttack(note);
            e.isPlaying = 'true';
            //Update state by first making a clone.
            //This is a best practice, I forget why.
            if (e.type === 'white') {
                let stateCopy = [...notes];
                stateCopy[id].isPlaying = true;
                setNotes(stateCopy);
            }


        }

    }


    //Utility method, used to stop playing music.
    function releaseAttack(e: any) {
        e.target.dataset.playing = 'false';
        //Update state
        if (e.target.dataset.type === 'white') {
            let stateCopy = [...notes];
            let id = parseInt(e.target.dataset.id);
            stateCopy[id].isPlaying = false;
            setNotes(stateCopy);
            synth.triggerRelease();
        } else {
            let stateCopy = [...blackKeys];
            let id = parseInt(e.target.dataset.id);
            stateCopy[id].isPlaying = false;
            setblackKeys(stateCopy);
            synth.triggerRelease();
        }

    }







    return (
        <div className="piano-wrapper">
            {notes.map((note, i) =>
                <Key draggable="false" keyboard_letter={note.keyboard_libary} key={note.id} id={note.id} type={note.type} releaseAttack={releaseAttack} clickHandler={clickHandler} isPlaying={note.isPlaying} note={note.note} />
            )}
            {blackKeys.map((key, i) =>
                <Key draggable="false" key={key.id} id={key.id} type={key.type} releaseAttack={releaseAttack} clickHandler={clickHandler} margin={key.margin} isPlaying={key.isPlaying} note={key.note} />
            )
            }

        </div>
    );
}

export default PianoWrapper;
