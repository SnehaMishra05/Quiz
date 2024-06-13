document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully");
    const questions = [
        {
            question: "Which is the largest animal in the world?",
            answers: [
                { text: "Shark", correct: false },
                { text: "Blue Whale", correct: true },
                { text: "Elephant", correct: false },
                { text: "Giraffe", correct: false },
            ]
        },
        {
            question: "Which is the smallest country in the world?",
            answers: [
                { text: "Vatican City", correct: true },
                { text: "Bhutan", correct: false },
                { text: "Nepal", correct: false },
                { text: "Sri Lanka", correct: false },
            ]
        },
        {
            question: "Which is the largest desert in the world?",
            answers: [
                { text: "Kalahari", correct: false },
                { text: "Gobi", correct: false },
                { text: "Sahara", correct: true },
                { text: "Antarctica", correct: false },
            ]
        },
        {
            question: "Which is the smallest continent in the world?",
            answers: [
                { text: "Asia", correct: false },
                { text: "Australia", correct: true },
                { text: "Europe", correct: false },
                { text: "Africa", correct: false },
            ]
        },
        {
            question: "Who discovered zero?",
            answers: [
                { text: "Isaac Newton", correct: false },
                { text: "Aryabhatta", correct: true },
                { text: "William Shakespeare", correct: false },
                { text: "Benjamin Franklin", correct: false },
            ]
        },
    ];
    console.log("Questions array initialized");

    const questionElement = document.getElementById("question");
    const answerButtonsElement = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    
    console.log("Elements selected");

    let currQIndex = 0;
    let score = 0;

    function startQuiz() {
        console.log("Quiz started");
        currQIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
    }

    function showQuestion() {
        console.log("Showing question");
        resetState();
        let currQ = questions[currQIndex];
        let quesNo = currQIndex + 1;
        questionElement.innerHTML = quesNo + "." + currQ.question;

        currQ.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtonsElement.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
        addAnswerButtonListeners();
    }

    function resetState() {
        nextButton.style.display = "none";
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function addAnswerButtonListeners() {
        const buttons = document.querySelectorAll(".btn");
        buttons.forEach(button => {
            button.removeEventListener("click", selectAnswer);
            button.addEventListener("click", selectAnswer);
        });
    }

    function selectAnswer(e) {
        console.log("Answer selected");
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showScore() {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton() {
        currQIndex++;
        if (currQIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    nextButton.addEventListener("click", () => {
        if (currQIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });
    startQuiz();
});