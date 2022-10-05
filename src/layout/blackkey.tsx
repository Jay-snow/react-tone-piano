import * as Tone from 'tone'
import React, { useState } from 'react';




function BlackKey(props: any) {

    const getClass = () => {
        return (props.isPlaying ? 'black-key active' : 'black-key')

    }

    return (
        <button draggable="false" style={{ marginLeft: props.margin }} onMouseUp={props.releaseAttack} onMouseLeave={props.releaseAttack} data-id={props.id} onMouseMove={props.clickHandler} data-playing={props.isPlaying} data-note={props.note} className={getClass()}>

        </button>

    );
}

export default BlackKey;
