let score = JSON.parse(localStorage.getItem('score')) ||{
  Wins: 0,
  Losses: 0,
  Ties:   0
};

updateScoreElement();

// if(!score){
//  score ={
//   Wins: 0,
//   Losses: 0,
//   Ties: 0
//  };
// }

// if(score===null){
//  score ={
//   Wins: 0,
//   Losses: 0,
//   Ties: 0
//  };
// }

function pickComputerMove(){
  const randomnumber = Math.random();
  let computermove = '';

  if(randomnumber >=0 && randomnumber < 1/3){
    computermove = 'Rock';
  }
  else if(randomnumber >=1/3 && randomnumber < 2/3){
    computermove = 'Paper';
  }
  else if(randomnumber >=2/3 && randomnumber < 1){
    computermove = 'Scissors';
  }
  return computermove;
}

let isAutoPlaying = false;
let intervalId;
const autoPlayElement = document.querySelector('.js-auto-play-button');

autoPlayElement.addEventListener('click', () => {
  autoPlay();
});

function autoPlay(){
  if(!isAutoPlaying){
    autoPlayElement.innerHTML = 'Stop Playing';
    intervalId = setInterval(() => {
      pickComputerMove();
      const playerMove = pickComputerMove();
      result(playerMove)
    },1000);
    isAutoPlaying = true;
  }
  else{
    autoPlayElement.innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  result('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  result('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  result('Scissors');
});

function result(yourMove) {
  const computerMove = pickComputerMove();
  console.log(computerMove);
  let result ='';
  if((yourMove === 'Rock' && computerMove === 'Paper') || (yourMove === 'Paper' && computerMove === 'Scissors') ||
  (yourMove === 'Scissors' && computerMove === 'Rock')){
    result = 'You lose.';
  }
  else if((yourMove === 'Rock' && computerMove === 'Scissors') || (yourMove === 'Paper' && computerMove === 'Rock') ||
  (yourMove === 'Scissors' && computerMove === 'Paper')){
    result = 'You Win.';
  }

  else if((yourMove === 'Rock' && computerMove === 'Rock') || (yourMove === 'Paper' && computerMove === 'Paper') ||
  (yourMove === 'Scissors' && computerMove === 'Scissors')){
    result = 'Tie.';
  }

  if(result === 'You Win.'){
    score.Wins ++;
  }
  else if(result === 'You lose.'){
    score.Losses ++;
  }
  else{
    score.Ties ++;
  }

  localStorage.setItem('score' , JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

    document.querySelector('.js-moves')
    .innerHTML = `<div>
      <img src="images/${yourMove}-emoji2.png" class="move-result-icon">
       <p class="character">You</p>
    </div>
    <div>
      <img src="images/${computerMove}-emoji2.png" class="move-result-icon">
      <p class="character">Computer</p>
    </div>`;
}


document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  showRestConfirmation();
});

function showRestConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML = `Are you sure want to reset the score? 
  <p>
    <button class="js-reset-confirm-yes confirm-button">Yes</button>
    <button class="js-reset-confirm-no confirm-button">No</button>
  </p>`

  document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
    resetScore();
    hideRestConfirmation();
  });

  document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
    hideRestConfirmation();
  });
}

function hideRestConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}

function resetScore(){
  score.Wins=0;
  score.Losses=0;
  score.Ties=0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins} Losses: ${score.Losses} Ties: ${score.Ties}`;
}


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    result('Rock');
  }else if(event.key === 'p'){
    result('Paper');
  }else if(event.key === 's'){
    result('Scissors');
  }else if (event.key === 'Backspace'){
    showRestConfirmation();
  }else if (event.key === 'a'){
    autoPlay();
  }
  });  