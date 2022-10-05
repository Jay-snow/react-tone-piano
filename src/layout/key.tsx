import * as Tone from 'tone'
import React, { useState } from 'react';




function Key(props: any) {

    const getClasshelper = () => {
        if (props.type === 'white') {
            return 'white-key'
        } else {
            return 'black-key'
        }
    }

    const getClass = () => {
        return (props.isPlaying ? `${getClasshelper()} active` : getClasshelper())

    }

    return (
        <button draggable="false" onTouchEnd={props.clickHandler} onMouseUp={props.releaseAttack} onMouseDown={props.clickHandler} style={{ marginLeft: props.margin }} onMouseLeave={props.releaseAttack} data-id={props.id} data-type={props.type} onMouseMove={props.clickHandler} data-playing={props.isPlaying} data-note={props.note} className={getClass()}>

        </button>

    );
}

export default Key;
