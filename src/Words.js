function Words({wordList}) {
    let words = wordList.sort()
    return (
        <div className="words">
            <p>{wordList.length} Palavras</p>
            {words.map((w,i)=>{
                return <p>{w}</p>
            })}
        </div>
    );
}

export default Words