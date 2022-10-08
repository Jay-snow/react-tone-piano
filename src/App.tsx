
import './App.css';
import React from 'react';

import PianoWrapper from './layout/piano_wrapper';

function App() {
  return (
    <div className="App">
      <h1 style={{ margin: "0 auto", textAlign: "center" }}>Synth Keyboard</h1>
      <PianoWrapper />

      <p style={{ textAlign: 'center' }} className={"animate__animated  animate__fadeIn"}>A virtual piano created with React and ToneJS.</p>
      <p style={{ textAlign: 'center' }} className={"animate__animated  animate__fadeInUp animate__delay-3s "}>Created By Marcus Snow | Source Code</p>

    </div>
  );
}

export default App;
