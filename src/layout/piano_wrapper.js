import * as Tone from 'tone'


function PianoWrapper() {

    function clickHandler(e) {
        let note = e.target.dataset.note
        const synth = new Tone.Synth().toDestination();

        synth.triggerAttackRelease(note, "8n");

    }


    return (
        <div className="piano-wrapper">
            <div onMouseDown={clickHandler} data-note={"C3"} className="white-key"> </div>
            <div onMouseDown={clickHandler} data-note={"D3"} className="white-key"> </div>
            <div onMouseDown={clickHandler} data-note={"E3"} className="white-key"> </div>
            <div onMouseDown={clickHandler} data-note={"F3"} className="white-key"> </div>
            <div onMouseDown={clickHandler} data-note={"G3"} className="white-key"> </div>
            <div onMouseDown={clickHandler} data-note={"A3"} className="white-key"> </div>
            <div onMouseDown={clickHandler} data-note={"B3"} className="white-key"> </div>
            <div className="black-key" style={{ marginLeft: 6 }}> </div>
            <div className="black-key" style={{ marginLeft: 36 }}> </div>
            <div className="black-key" style={{ marginLeft: 96 }}> </div>
            <div className="black-key" style={{ marginLeft: 126 }}> </div>
            <div className="black-key" style={{ marginLeft: 156 }}> </div>
        </div>
    );
}

export default PianoWrapper;
