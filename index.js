'use strict';

const QUESTIONS = [
  {
    title: "What is Eleven's favorite food?",
    choiceA: "french toast",
    choiceB: "salad",
    choiceC: "Eggos",
    choiceD: "Pad Thai",
    answer: "Eggos",
  },
  
  {
    title: "What is the Hawkins middle school mascot?",
    choiceA: "Buffalo",
    choiceB: "Tigers",
    choiceC: "Cubs",
    choiceD: "Wolves",
    answer: "Cubs",
  },

  {
    title: "Who is the high score holder in the game `Dig Dug` in the arcade?",
    choiceA: "Mad Max",
    choiceB: "Lucas",
    choiceC: "Steve Harrington",
    choiceD: "TRON",
    answer: "Mad Max",
  },

  {
    title: "Who dances with Dustin at the snow ball?",
    choiceA: "Jane",
    choiceB: "Nancy",
    choiceC: "Mrs.Wheeler",
    choiceD: "Barb",
    answer: "Nancy",
  },

  {
    title: "What is Eleven's actual name?",
    choiceA: "Jane",
    choiceB: "Terry",
    choiceC: "Diane",
    choiceD: "Karen",
    answer: "Jane",
  },

  {
    title: "What is the name of the monster that the kids encounter in season 1?",
    choiceA: "Thanos",
    choiceB: "Xenomorph",
    choiceC: "Smaug",
    choiceD: "Demogorgon",
    answer: "Demogorgon",
  },

  {
    title: "What game do the kids play in the Wheeler's basement?",
    choiceA: "Dungeons & Dragons",
    choiceB: "Pictionary",
    choiceC: "Battleship",
    choiceD: "Connect 4",
    answer: "Dungeons & Dragons",
  },

  {
    title: "What is the hair product that Steve Harrington reccomends to Dustin?",
    choiceA: "Head & Shoulders",
    choiceB: "Mane 'n tail",
    choiceC: "Old Spice",
    choiceD: "Paul Mitchel",
    answer: "Mane 'n tail",
  },

  {
    title: "How did Will communicate with everyone when the mind flayer took over him?",
    choiceA: "Christmas lights",
    choiceB: "Sign language",
    choiceC: "Morse code",
    choiceD: "a pager",
    answer: "Morse code",
  },

  {
    title: "What does Dustin's pet `dart` turn out to be?",
    choiceA: "a snake",
    choiceB: "a demodog",
    choiceC: "a frog",
    choiceD: "an alien",
    answer: "a demodog",
  },

];


let questionNum = 0;

let numberCorrect = 0;

function showQuestion(question) {

    let questionHtml = `
      <form>
        <fieldset>
          <legend>
            <h1>${question.title}</h1>
          </legend>
          <div class="questionbox">
            <label id="question.choiceA">
              <input type="radio" name="option" value="${question.choiceA}">
              ${question.choiceA}
            </label>
            <label id="question.choiceB">
              <input type="radio" name="option" value="${question.choiceB}">
              ${question.choiceB}
            </label>
            <label id="question.choiceC">
              <input type="radio" name="option" value="${question.choiceC}">
              ${question.choiceC}
            </label>
            <label id="question.choiceD">
              <input type="radio" name="option" value="${question.choiceD}">
              ${question.choiceD}
            </label>
          </div>

        <input type="submit" value ="Submit" id="submit"></input>

        </fieldset>
        
        <ul class ="scoreboard">
          <div id="numcorrectfloat">
            <li>Score:${numberCorrect}</li>
          </div>
          <div id="questionnumfloat">
            <li>Question:${questionNum + 1}/10</li>
          </div>
        </ul>
      </form>
    `;
    $(".questionsAnswerApp").html(questionHtml);
    handleSubmit();
}

function handleStartButton() {
  $('main').on('click', `button`, event => {
    $('.startPage').remove();

    if (questionNum === 10) {
      showResults();
    }
    else {
    showQuestion(QUESTIONS[questionNum]);
    }
  });
  
}

function handleSubmit() {
  $('form').on('submit', event => {
    event.preventDefault();
    let answerInput = $('input:checked').val();
    let rightAnswer =`${QUESTIONS[questionNum].answer}`;
    if (answerInput){
      if (answerInput === rightAnswer) {
        numberCorrect++;
        whenCorrect();
      }
      else {
        whenFalse();
      }
    }
    else {
      $('.questionsAnswerApp').append('<div id="resubmit">Please select an answer and resubmit</div>');
      
      setTimeout(function(){
       $('.questionsAnswerApp > #resubmit').fadeOut(); 
        },1200);

    }
    
  });
  
}


function whenCorrect() {
  //numberCorrect++;
  let correctHtml = `
  <section class="correctfalsebox">
    <div class="resultimg">
    <h1>CORRECT!</h1>
    <img src="https://media.giphy.com/media/WSsUgLins3y2Q/giphy.gif">
    </div>
    <button type="button" class="continue">Continue</button>
  </section>
  `;
  $(".questionsAnswerApp").html(correctHtml);
  progressQuiz();
}

function whenFalse() {
  let falseHtml = `
  <section class="correctfalsebox">
    <div class="resultimg">
    <h1>OUCH!</h1>
    <h2>The correct answer was: ${QUESTIONS[questionNum].answer}<h2>
    <img src="https://media.giphy.com/media/3ohhwqsP6BOP6mKDyU/giphy.gif">
    </div>
    <button type="button" class="continue">Continue</button>
  </section>
  `;
  $(".questionsAnswerApp").html(falseHtml);
  progressQuiz();
}

function progressQuiz() {
  questionNum++;
}


function showResults() {
  let resultsHtml = `
  <section class="correctfalsebox">
    <div class="resultimg">
    <h1>THE END</h1>
    <img src="https://media.giphy.com/media/XJyYd63jm555roJQ1C/giphy.gif">
    <h2>You got ${numberCorrect}/10 correct.</h2>
    </div>
    <button type="button" class="restart">Restart?</button>
  </section>
  `;
  $(".questionsAnswerApp").html(resultsHtml);
  reset();
}

function reset() {
  $('.correctfalsebox').on('click', 'button', event => {
    questionNum = 0;
    numberCorrect = 0;
  });
}

function runQuizApp () {
  handleStartButton();
  handleSubmit();

}

runQuizApp();


