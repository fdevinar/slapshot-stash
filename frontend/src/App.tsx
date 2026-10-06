import { useState, useEffect } from 'react'
import heroImg from './assets/hockey-stick.svg';
import './App.css'
import CardsTable from './components/CardsTable'
import PlayerSearch from './components/PlayerSearch';
import type { CardDetails } from './api/types';
import { fetchCards } from './api/fetchData';

function App() {

  const [cards, setCards] = useState<CardDetails[]>([]);
  const [isAddCardsOpen, setAddCardsOpen] = useState(false);

  const loadCards = async () => {  
    try {      
      const data = await fetchCards();           
      setCards(data);      
    } catch (error) {
      console.error("Failed to load cards:", error);
    }    
  };
  
  useEffect(() => {
    loadCards();    
  }, []);
  
  return (
    <>
      <main>
        <div className="hero">
          <img src={heroImg} alt="Hero" />
          <h1>SLAPSHOT STASH</h1>     
        </div>
        <div className="add-player-container">
          <button onClick={() => setAddCardsOpen(true)}>Add Player</button>
        </div>
        <CardsTable cards={cards}></CardsTable>           
        <PlayerSearch 
          onCardCreated={loadCards}
          isOpen={isAddCardsOpen}
          onClose={()=> setAddCardsOpen(false)}
        ></PlayerSearch>        
      </main>
    </>
  )
}

export default App


