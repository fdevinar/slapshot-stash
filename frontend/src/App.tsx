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
      console.error('Failed to load cards:', error);
    }    
  };

  const loadSets = async () => {  
    try {      
      const data = await fetchSets();
      setSets(data);      
      toast.success('Sets loaded!');
    } catch (error) {
      console.error('Failed to load sets:', error);
    }    
  };
  
  useEffect(() => {
    loadCards();    
    loadSets();    
  }, []);

  function deleteAllCards() {
    if (confirm('Are you sure you want to delete all cards?')) {      
      // call backend here
    }
    
  }
  
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false}/>      
      <main>
        <div className="hero">
          <img src={heroImg} alt="Hero" />
          <h1 onClick={()=>{toast(<b>SLAPSHOT STASH</b>,{icon:"🏒"});}}>SLAPSHOT STASH</h1>     
        </div>
        <div className="options-container">
          <div className="add-player-container">
            <button className="btn-hockey btn-ice-primary" onClick={() => setAddCardsOpen(true)}>➕ Add Card</button>
          </div>
          <div className="delete-players-container">
            <button className="btn-hockey btn-ice-primary" onClick={() => deleteAllCards()}>❌ Delete all Cards</button>
          </div>
        </div>
        <CardsTable
          cards={cards}
          onUpsertedPlayer={loadCards}    
        ></CardsTable>           
        { sets.length &&
          <PlayerSearch
            onCardCreated={loadCards}
            isOpen={isAddCardsOpen}
            onClose={()=> setAddCardsOpen(false)}
            sets={sets}
          ></PlayerSearch>          
        }
      </main>
    </>
  )
}

export default App


