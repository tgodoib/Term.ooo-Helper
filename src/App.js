import Game from "./Game";
import React, {useEffect, useState} from "react";
import Instructions from "./Instructions"

function App() {

    const [gameRef, setGameRef] = useState();

    return (
        <>
            <Instructions gameRef={gameRef}/>
            <Game setGameRef={setGameRef}/>
        </>
    );
}

export default App;
