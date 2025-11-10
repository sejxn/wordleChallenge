
let attempts = 0;
let index = 0;
let timer;

function appStart(){
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료됐습니다.";
        div.style = "display: flex; justify-content: center; align-items: center; position: absolute; top: 40vh; left: 45vw; background-color: white; width: 200px; height: 100px;";
        document.body.appendChild(div);
    }

    const nextLine = () => {
        if(attempts === 6) return gameOver();
        attempts++;
        index = 0;
    }

    const gameOver = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    }

    const handleEnterKey = async() => {
        let cCount = 0;
        const res = await fetch("/answer");
        const ansC = await res.json();
        const correctAnswer = ansC.answer;

        for(let i = 0; i < 5; i++){
            const block = document.querySelector(`.board-column[data-index='${attempts}${i}']`);
            const letter = block.innerText;
            const cAnswer = correctAnswer[i];
            const keyBlock = document.querySelector(`.keyboard-column[data-key="${cAnswer}"]`);
            if(letter === cAnswer) {
                cCount++;
                block.style.backgroundColor = "#6AAA64";
                keyBlock.style.backgroundColor = "#6AAA64";
            }
            else if(correctAnswer.includes(letter)) {
                block.style.background = "#C9B458";
            }
            else {
                block.style.background = "#787C7E";
            }
            block.style.color = "white";
        }

        if(cCount === 5) gameOver();
        else nextLine();
    }

    const handleBackspace = () => {
        if(index > 0){
            const preBlock = document.querySelector(`.board-column[data-index='${attempts}${index - 1}']`);
            preBlock.innerText = "";
        }
        if(index !== 0) index--;
        
    }

    const handleKeydown = (e) => {
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
        
        if(e.key === "Backspace") handleBackspace();
        else if(index === 5){
            if(e.key === "Enter") handleEnterKey();
            else return;
        }
        else if(65 <= keyCode && keyCode <= 90){
            thisBlock.innerText = key;
            index++;
        }
    }

    const handleKeyClick = (e) => {
        const key = e.target.dataset.key

        if(!key) return;

        const keyCode = key.charCodeAt(0);
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
        console.log(key);
        if(key === "back") handleBackspace();
        else if(index === 5){
            if(key === "enter") handleEnterKey();
            else return;
        }
        else if(65 <= keyCode && keyCode <= 90){
            thisBlock.innerText = key;
            index++;
        }
    }

    const startTimer = () => {
        const startTime = new Date();

        function setTime() {
            const curTime = new Date();
            const pasTime = new Date(curTime - startTime);
            const min = pasTime.getMinutes().toString().padStart(2, "0");
            const sec = pasTime.getSeconds().toString().padStart(2, "0");
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `${min}:${sec}`;
        }

        timer = setInterval(setTime, 1000);
    }

    const keyBtn = document.querySelector(".keyboard");
    console.log(keyBtn);
    startTimer();
    window.addEventListener("keydown", handleKeydown);
    keyBtn.addEventListener("click", handleKeyClick);
}

appStart();