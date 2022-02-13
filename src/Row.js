import "./style/Row.css";
import {useState} from "react";

let Colors = ["#615358", "#312a2c", "#d3ad6a", "#3aa394"];

function Square({sqr_id, isWritten, letters, setWordRules}) {
    const [color, setColor] = useState(0)

    return (
      <div className="square" style={{backgroundColor: Colors[color], outline: isWritten ? "dotted #312a2c 3px" : "none"}} onClick={() => {
          if (isWritten) {
              setColor((color + 1) % 4);
              setWordRules(sqr_id[0], sqr_id[1], (color + 1) % 4)
          }
      }}>
          <p>{letters}</p>
      </div>
    );
}

function Row({row_id, letters, complete, setWordRules}) {

    return (
      <div className="row">
          <Square sqr_id={[row_id, 0]} isWritten={complete} letters={letters[0]} setWordRules={setWordRules} />
          <Square sqr_id={[row_id, 1]} isWritten={complete} letters={letters[1]} setWordRules={setWordRules} />
          <Square sqr_id={[row_id, 2]} isWritten={complete} letters={letters[2]} setWordRules={setWordRules} />
          <Square sqr_id={[row_id, 3]} isWritten={complete} letters={letters[3]} setWordRules={setWordRules} />
          <Square sqr_id={[row_id, 4]} isWritten={complete} letters={letters[4]} setWordRules={setWordRules} />
      </div>
    );
}

export default Row;