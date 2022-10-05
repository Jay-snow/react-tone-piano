import * as Tone from 'tone'
import React, { useState } from 'react';




function Key(props: any) {



    const getClass = () => {

        if (props.isPlaying === true) {
            console.log("GO!")
            return 'white-key active'
        } else {
            return 'white-key'
        }
    }



    return (
        <button draggable="false" onMouseUp={props.releaseAttack} onMouseLeave={props.releaseAttack} data-id={props.id} onMouseMove={props.clickHandler} data-playing={props.isPlaying} data-note={props.note} className={getClass()}>

        </button>

    );
}

export default Key;
