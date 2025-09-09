// keeps and displays the scores
function Score({ score, bestScore, message }) {
  return (
    <div className="scoreboard">
      <p>Score: {score} | Best: {bestScore}</p>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Score;
