import Row from "./Row";
import {useEffect, useState, useRef} from "react";
import wordList from './word_list.json';
import Words from "./Words";
import "./style/Game.css"

function Game() {
    let [cellIndex, setCellIndex] = useState(0);
    let [rowIndex, setRowIndex] = useState(0);

    const [wordRules, setWordRules] = useState([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ])

    const setRules = (row, sqr, color) => {
        let newRules = [...wordRules]
        newRules[row][sqr] = color
        setWordRules(newRules)

        refresh_words()
    }

    const [letters, setLetters] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ])
    const [isComplete, setComplete] = useState([
        false,
        false,
        false,
        false,
        false
    ])

    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.focus();
    });

    let onType = (event) => {

        // console.log(event.keyCode, event.key, cellIndex, rowIndex);

        if (rowIndex > 5) return;

        if (event.key === "Enter" && cellIndex >= 4) {
            let complete = [...isComplete]
            complete[rowIndex] = true;
            setComplete(complete);

            //TODO: Update words

            setCellIndex(0);
            setRowIndex(rowIndex + 1);
        }

        if (event.key === "Backspace") {
            let letts = [...letters]
            letts[rowIndex][Math.max(Math.min(5, cellIndex) - 1, 0)] = "";
            setLetters(letts);

            setCellIndex(Math.max(Math.min(5, cellIndex) - 1, 0));
        } else if (cellIndex <= 4 && /^[a-zA-Z]*$/g.test(event.key) && event.key.length === 1) {
            let letts = [...letters]
            letts[rowIndex][cellIndex] = event.key.toUpperCase();
            setLetters(letts);

            setCellIndex(cellIndex + 1);
        }
    }

    const [words, setWords] = useState([])

    let refresh_words = () => {
        const alphabet = Array.from(Array(26)).map((e, i) => i + 97).map((x) => String.fromCharCode(x));
        let blacks = [];
        let yellows = {
            "letters": [],
            "positions": {
                0: [], 1: [], 2: [], 3: [], 4: []
            }
        };
        let greens = ["", "", "", "", ""]

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                if (wordRules[i][j] === 1) {
                    blacks.push(letters[i][j].toLowerCase());
                }
                if (wordRules[i][j] === 2) {
                    yellows.positions[j].push(letters[i][j].toLowerCase());
                    yellows.letters.push(letters[i][j].toLowerCase());
                }
                if (wordRules[i][j] === 3) {
                    greens[j] = letters[i][j].toLowerCase()
                }
            }
        }

        function check_black(w) {
            return !blacks.some(l => w.includes(l) && !yellows.letters.includes(l) && !greens.includes(l));
        }

        function check_yellow(w) {
            let check = true;
            for (let i = 0; i < 5; i++) {
                check &= !yellows.positions[i].includes(w[i]);
            }
            yellows.letters.forEach(l => {
                check &= w.includes(l);
            })
            return check;
        }

        function check_green(w) {
            let check = true;
            for (let i = 0; i < 5; i++) {
                check &= greens[i] === w[i] || greens[i] === "";
            }
            return check;
        }

        setWords(wordList.word_list.filter(check_black).filter(check_yellow).filter(check_green));
    }

    return (
        <div className="game" onKeyDown={onType} ref={containerRef} tabIndex={-1}>
            <a href="https://github.com/tgodoib/Term.ooo-Helper"><img src="/github.svg"/></a>
            <div className="rows">
                <Row row_id={0} letters={letters[0]} complete={isComplete[0]} setWordRules={setRules}/>
                <Row row_id={1} letters={letters[1]} complete={isComplete[1]} setWordRules={setRules}/>
                <Row row_id={2} letters={letters[2]} complete={isComplete[2]} setWordRules={setRules}/>
                <Row row_id={3} letters={letters[3]} complete={isComplete[3]} setWordRules={setRules}/>
                <Row row_id={4} letters={letters[4]} complete={isComplete[4]} setWordRules={setRules}/>
                <Row row_id={5} letters={letters[5]} complete={isComplete[5]} setWordRules={setRules}/>
            </div>
            <Words wordList={words}/>
        </div>
    );
}

export default Game