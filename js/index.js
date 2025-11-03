const correctAnswer = "APPLE"

let attempts = 0;
let index = 0;

function appStart(){
    const nextLine = () => {
        if(attempts === 6) return gameOver();
        attempts++;
        index = 0;
    }

    const gameOver = () => {
        window.removeEventListener("keydown", handleKeydown);
    }

    const handleEnterKey = () => {
        let cCount = 0;
        for(let i = 0; i < 5; i++){
            const block = document.querySelector(`.board-column[data-index='${attempts}${i}']`);
            const letter = block.innerText;
            const cAnswer = correctAnswer[i];

            if(letter === cAnswer) {
                cCount++;
                block.style.backgroundColor = "#6AAA64";
            }
            else if(correctAnswer.includes(letter)) block.style.background = "#C9B458";
            else block.style.background = "#787C7E";
            block.style.color = "white";
        }

        if(cCount === 5) gameOver();
        else nextLine();
    }

    const handleKeydown = (e) => {
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
        
        if(index === 5){
            if(e.key === "Enter") handleEnterKey();
            else return;
        }
        else if(65 <= keyCode && keyCode <= 90){
            thisBlock.innerText = key;
            index++;
        }
    }

    window.addEventListener("keydown", handleKeydown);
}

appStart();