const questions = [
    {
        question: 'Which HTML tag is used to create a hyperlink?',
        answer: [
            { text: '<link>', correct: 'False' },
            { text: '<a>', correct: 'True' },
            { text: '<href>', correct: 'False' },
            { text: '<url>', correct: 'False' }
        ]
    },
    {
        question: 'Which HTML tag is used to insert an image?',
        answer: [
            { text: '<image>', correct: 'False' },
            { text: '<img>', correct: 'True' },
            { text: '<pic>', correct: 'False' },
            { text: '<src>', correct: 'False' }
        ]
    },
    {
        question: 'Which CSS property is used to change text color?',
        answer: [
            { text: 'text-color', correct: 'False' },
            { text: 'font-color', correct: 'False' },
            { text: 'color', correct: 'True' },
            { text: 'background-color', correct: 'False' }
        ]
    },
    {
        question: 'Which CSS property controls the space inside an element?',
        answer: [
            { text: 'margin', correct: 'False' },
            { text: 'padding', correct: 'True' },
            { text: 'border', correct: 'False' },
            { text: 'spacing', correct: 'False' }
        ]
    },
    {
        question: 'Which JavaScript keyword is used to declare a variable?',
        answer: [
            { text: 'var', correct: 'True' },
            { text: 'int', correct: 'False' },
            { text: 'string', correct: 'False' },
            { text: 'define', correct: 'False' }
        ]
    },
    {
        question: 'Which symbol is used for single-line comments in JavaScript?',
        answer: [
            { text: '<!-- -->', correct: 'False' },
            { text: '#', correct: 'False' },
            { text: '//', correct: 'True' },
            { text: '/* */', correct: 'False' }
        ]
    },
    {
        question: 'Which HTML element is used to include JavaScript code?',
        answer: [
            { text: '<javascript>', correct: 'False' },
            { text: '<js>', correct: 'False' },
            { text: '<script>', correct: 'True' },
            { text: '<code>', correct: 'False' }
        ]
    },
    {
        question: 'Which CSS property is used to make text bold?',
        answer: [
            { text: 'font-style', correct: 'False' },
            { text: 'font-weight', correct: 'True' },
            { text: 'text-bold', correct: 'False' },
            { text: 'bold', correct: 'False' }
        ]
    },
    {
        question: 'Which JavaScript method is used to write content into the browser?',
        answer: [
            { text: 'console.log()', correct: 'False' },
            { text: 'document.write()', correct: 'True' },
            { text: 'window.alert()', correct: 'False' },
            { text: 'print()', correct: 'False' }
        ]
    },
    {
        question: 'Which HTML attribute is used to provide additional information about an element?',
        answer: [
            { text: 'class', correct: 'False' },
            { text: 'id', correct: 'False' },
            { text: 'meta', correct: 'False' },
            { text: 'title', correct: 'True' }
        ]
    }
];

const questionElement=document.querySelector('.question');
const answerButton=document.querySelector('.answer-btn');

const nextButton=document.querySelector('.next-btn');

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];

    let questionNo=currentQuestionIndex+1;

    questionElement.innerHTML=`${questionNo}.${currentQuestion.question}`;

    currentQuestion.answer.forEach((answer)=>{
        const button=document.createElement('button');
        button.textContent=answer.text;
        button.classList.add('ans-btn')
        answerButton.append(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    })
}

function resetState(){
    nextButton.style.display='none';
    while(answerButton.firstElementChild){
        answerButton.removeChild(answerButton.firstElementChild);
    }
    
}

function selectAnswer(e){
    const selectedButton=e.target;
    if(selectedButton.dataset.correct==='True'){
        selectedButton.classList.add('correct-ans-btn');
        score++;
    }else{
        selectedButton.classList.add('incorrect-ans-btn')
    }
    Array.from(answerButton.children).forEach((button)=>{
        if(button.dataset.correct==='True'){
            button.classList.add('correct-ans-btn');
        }
        button.disabled=true;
    })
    nextButton.style.display='block';
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML='Play Again!';
    nextButton.style.display='block';

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();