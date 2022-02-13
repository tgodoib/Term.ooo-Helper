import "./style/Instructions.css"
import {useState} from "react";

function Instructions({gameRef}) {

    const [visible, setVisible] = useState(true);

    return (
        <div className="instructions" style={{display: visible ? "block" : "none"}}>
            <span onClick={() => {setVisible(false); gameRef.current.focus();}}>&#10006;</span>
            <h1>Como usar</h1>
            <p>A ideia é copiar o que aparece no term.ooo conforme você vai jogando!</p>
            <p>Para inserir uma palavra, digite as 5 letras e aperte "Enter".</p>
            <p>A fileira vai ficar com um contorno em volta, simbolizando que
                está pronta para receber o resultado que apareceu no jogo.</p>
            <p>Para escolher a cor referente a cada letra, basta clicar nelas até que apareça a cor certa.</p>
            <p>Conforme você define as cores certas, a caixa à direita atualiza sozinha com as palavras possíveis.</p>
            <p>Boa Sorte!</p>
            <h4>Feito com ❤ por TiagoGB</h4>
            <a href="https://github.com/tgodoib/Term.ooo-Helper">⛓ Codigo do projeto</a>
        </div>
    );
}

export default Instructions;