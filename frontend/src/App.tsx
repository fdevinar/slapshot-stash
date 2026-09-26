import heroImg from './assets/hockey-stick.svg';
// import { fetchCards } from './api/fetchData';
import './App.css'
import CardsTable from './components/CardsTable'
import PlayerSearch from './components/PlayerSearch';

function App() {
  

  return (
    <>
      <main>
        <div className="hero">
          <img src={heroImg} alt="Hero" />
          <h1>SLAPSHOT STASH</h1>     
        </div>
        <CardsTable></CardsTable>   
        <PlayerSearch></PlayerSearch>
                       

      </main>
    </>
  )
}

export default App
