//initial Data

let currentQuestion = 0;
let correctAnswers = 0;


showQuestion();
document.querySelector('.scoreArea button').addEventListener('click',resetEvent);

//FUNCTIONS 
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length)*100); // this is to calcultate the % of the bar on the screen according to the amount of questions I have

        document.querySelector('.progress--bar').style.width = `${pct}%` // this is to expand the width progress bar
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHtml = '';
        for (let i in q.options){
            optionsHtml += `<div data-op="${i}"class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;
        document.querySelectorAll('.options .option').forEach(item => { //this comand is to add comands on each option on the quiz
            item.addEventListener('click',optionClickEvent);
        }); 

    } else{ // this is when the questions are finished
        finishQuiz();        
    }
}
function optionClickEvent (e){ // this is the function that shows if you got right or wrong
    let clickedOption = parseInt(e.target.getAttribute('data-op')); 
    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    }
    currentQuestion++;
    showQuestion();   
};
function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length)*100); // this is the total of correct answers
    if (points<30){
        document.querySelector('.scoreText1').innerHTML = `Precisa melhorar!`;
        document.querySelector('.scorePct').style.color = 'red';
    }
    else if (points>=30 && points<70){
        document.querySelector('.scoreText1').innerHTML = `Muito bom!`;
        document.querySelector('.scorePct').style.color = 'Yellow';
    }
    else if (points>= 70){
        document.querySelector('.scoreText1').innerHTML = `Parabens!!`;
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questoes e acertou ${correctAnswers}`

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
};
function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}