import { useState, useEffect } from 'react'
import heroImg from './assets/hockey-stick.svg';
import './App.css'
import CardsTable from './components/CardsTable'
import PlayerSearch from './components/PlayerSearch';
import type { CardDetails } from './api/types';
import { fetchCards } from './api/fetchData';

function App() {

  const [cards, setCards] = useState<CardDetails[]>([]);

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
        <CardsTable cards={cards}></CardsTable>           
        <PlayerSearch onCardCreated={loadCards}></PlayerSearch>
      </main>
    </>
  )
}

export default App


