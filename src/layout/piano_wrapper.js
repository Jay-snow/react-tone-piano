
function PianoWrapper() {


    const createKeys = () => {

        let final_html = []

        for (let i = 0; i < 12; i++) {
            final_html.push(
                <div className="black-key" key={i} style={{ marginLeft: 30 * i }}> </div>
            )
            final_html.push(
                <div className="white-key" key={i}> </div>
            )
        }

        return final_html

    }




    return (
        <div className="piano-wrapper">
            {createKeys()}
        </div>
    );
}

export default PianoWrapper;
