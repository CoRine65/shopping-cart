import { useEffect, useState } from 'react'
import Card from './Card';
import './App.css'
import Score from './score';

function App() {
  //holds the Pokémon cards we fetched
  const [cards, setCards] = useState([]);
  //tracks which cards the user has clicked by id
  const [clicked, setClicked] = useState([]);
  //current score
  const [score, setScore] = useState(0);
  //best score
  const [bestScore, setBestScore] = useState(0);
  //message
  const [message, setMessage] = useState('');
  const [allCards, setAllCards] = useState([]);
  //coin state
  const [coins, setCoins] = useState(0);


  //fetching pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const pokeRes = await fetch(p.url);
          const pokeData = await pokeRes.json();
          return { id: pokeData.id, name: pokeData.name, img: pokeData.sprites.front_default};
        })
      );//end detailed
      setAllCards(detailed);
      setCards(detailed.sort(() => Math.random()-0.5).slice(0,6));
    };//end of fetch
    fetchPokemon();
  }, [])//end

  const pickRandomSix = (allCards, clicked) => {
    //separating the remaining and already clicked
    const remaining = allCards.filter(card => !clicked.includes(card.id));
    //const alreadyClicked = allCards.filter(card => clicked.includes(card.id));
    const numCards = Math.min(6, allCards.length);
    //how many card to display
    if (remaining.length === 0 ) {
      return [...allCards].sort(() => Math.random() - 0.5).slice(0, numCards);
    }
    //pick 1 new card from remaining
    const newCardIndex = Math.floor(Math.random() * remaining.length);
    const newCard = remaining[newCardIndex];
    //pick the rest randomly from the full pool 
    const pool = allCards.filter(card => card.id !== newCard.id);
    const rest = [];
    const poolCopy = [...pool];
    while (rest.length < numCards - 1 && poolCopy.length > 0) {
      const idx = Math.floor(Math.random() * poolCopy.length);
      rest.push(poolCopy[idx]);
      poolCopy.splice(idx, 1);
    }
    //combining the rest
    const finalCards = [newCard, ...rest].sort(() => Math.random() - 0.5);
    return finalCards
  }

//handle card click
  function handleClick(id) {
    if (clicked.includes(id)) {
      //click duplicate end game
      setScore(0);
      setClicked([]);
      setMessage("Oops! You clicked that Pokémon already!");

    } else {
      //new click
      const newScore = score + 1;
      setScore(newScore);
      setClicked([...clicked, id]);
      setCoins(coins + 1); //updates coin value
      setMessage('');

      if (newScore > bestScore) setBestScore(newScore);
      //shuffle cards
      setCards(pickRandomSix(allCards, clicked));
      //win condition
      if (newScore === allCards.length) {
        setMessage("You got them all!");
        setClicked([]);
        setScore(0);
      }

    } //end else
  }//end click

  return (
    <>
    <Score score={score} bestScore={bestScore} message={message} coins={coins} />
    <div className='grid-container'>
      {cards.map((card) => (
        <Card key={card.id} 
        name={card.name} 
        img={card.img} 
        onClick={() => handleClick(card.id)}
        />
      ))}
    </div>
  </>
  )
  
}

export default App
