import * as Tone from 'tone'
import React, { useState } from 'react';

const synth = new Tone.Synth().toDestination();
document.addEventListener("mouseup", e => {
    synth.triggerRelease();
})



function PianoWrapper() {

    const [notes, setNotes] = useState(["C3", "D3", "E3", "F3", "G3", "A3", "B3"])

    let isPlaying = false;

    function clickHandler(e: any) {
        let note = e.target.dataset.note;
        let isPlaying = (e.target.dataset.playing === 'true');
        console.log(isPlaying)
        if (e.buttons === 1 && !isPlaying) {
            Tone.start();
            synth.triggerAttack(note);
            e.target.dataset.playing = 'true';
            console.log(e.target.dataset.playing)
        }



    }

    function releaseAttack(e: any) {
        e.target.dataset.playing = 'false';
        synth.triggerRelease();
    }

    function test() {
        console.log("HEllo");
    }


    return (
        <div className="piano-wrapper">
            {notes.map((note, i) =>
                <button draggable="false" key={i} onMouseLeave={releaseAttack} onMouseMove={clickHandler} data-playing={false} data-note={note} className="white-key"> </button>
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
