import { useState, useEffect } from 'react'
import heroImg from './assets/hockey-stick.svg';
import './App.css'
import CardsTable from './components/CardsTable'
import PlayerSearch from './components/PlayerSearch';
import type { CardDetails, CardSet } from './api/types';
import { fetchCards, fetchSets } from './api/fetchData';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [cards, setCards] = useState<CardDetails[]>([]);
  const [sets, setSets] = useState<CardSet[]>([]);
  const [isAddCardsOpen, setAddCardsOpen] = useState(false);

  const loadCards = async () => {  
    try {      
      const data = await fetchCards();           
      setCards(data);      
      toast.success('Cards loaded!');
    } catch (error) {
      console.error("Failed to load cards:", error);
    }    
  };

  const loadSets = async () => {  
    try {      
      const data = await fetchSets();           
      setSets(data);      
      toast.success('Sets loaded!');
    } catch (error) {
      console.error("Failed to load sets:", error);
    }    
  };
  
  useEffect(() => {
    loadCards();    
    loadSets();    
  }, []);
  
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false}/>      
      <main>
        <div className="hero">
          <img src={heroImg} alt="Hero" />
          <h1 onClick={()=>{toast(<b>SLAPSHOT STASH</b>,{icon:"🏒"});}}>SLAPSHOT STASH</h1>     
        </div>
        <div className="add-player-container">
          <button className="btn-hockey btn-ice-primary" onClick={() => setAddCardsOpen(true)}>Add Player</button>
        </div>
        <CardsTable cards={cards}></CardsTable>           
        <PlayerSearch 
          onCardCreated={loadCards}
          isOpen={isAddCardsOpen}
          onClose={()=> setAddCardsOpen(false)}
          sets={sets}
        ></PlayerSearch>        
      </main>
    </>
  )
}

export default App


