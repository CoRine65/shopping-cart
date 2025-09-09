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

  const pickRandomSix = (array) => {
    return [...array].sort(() => Math.random() - 0.5).slice(0,6);
  }

//handle card click
const handleClick = (id) => {
  if (clicked.includes(id)){
    //click duplicate end game
    setScore(0);
    setClicked([]);
    setMessage("Oops! You clicked that Pokémon already!");

  } else {
    //new click
    const newScore = score + 1;
    setScore(newScore);
    setClicked([...clicked, id]);
    setMessage('');

    if (newScore > bestScore) setBestScore(newScore);
    //shuffle cards
  
    setCards(pickRandomSix(allCards));
    //win condition
    if(newScore === cards.length){
      setMessage("You got them all!");
      setClicked([]);
      setScore(0);
    }

  } //end else
}//end click

  return (
    <>
    <Score score={score} bestScore={bestScore} message={message} />
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
