var ScoreDisplay = document.getElementById('highscores');
function printHighscores() {
  // either get scores from localstorage or set to empty array
  var StoredScores = JSON.parse(localStorage.getItem("userScore"));
  var Initials = storedScores[0].Initials;
  var Score = storedScores[0].score;

  var listEl = document.createElement('li');

  listEl.setAttribute('id', 'initialScore');
  ScoreDisplay.append(listEl);
  document.getElementById('initialsScore').textContent = initials + ": " + score;
}
  // (optional) sort highscores by score property in descending order

  // for each score
    // create li tag for each high score

    // display on page

    printHighscores()

function clearHighscores() {
  // (and reload)
}

// attache clear event to clear score button

// run printhighscore when page loads
var ClearBtn = document.getElementById('clear');
ClearBtn.addEventListener('click', clearHighscores);
function clearHighscores() {
  ScoreDisplay.remove();
}