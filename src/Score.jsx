// keeps and displays the scores
function Score({ score, bestScore, message, coins }) {
  return (
    <div className="scoreboard">
      <p>Score: {score} | Best: {bestScore}</p>
      <p>💰 Coins: {coins}</p>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Score;
