import { useState, useRef, useEffect } from "react";
import type { Player, CardSet } from "../api/types";
import { fetchPlayers, addPlayerToCache, addCardToTable } from "../api/fetchData";
import { createPortal } from "react-dom";
import toast from 'react-hot-toast';
import { ApiError } from "../api/errors";
import puck from '../assets/nhl-puck.png';

interface PlayerSearchProps {
    onCardCreated: () => void;
    onClose: () => void;
    isOpen: boolean;
    sets: CardSet[];
}

export default function PlayerSearch( { onCardCreated, onClose, isOpen, sets }: PlayerSearchProps ) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [playerList, setPlayerList] = useState<Player[]>([]);    
    const dialogRef = useRef<HTMLDialogElement>(null);    
    const [selectedSetId, setSelectedSetId] = useState<string>(sets.length > 0 ? String(sets[0].id) : '');
    const [loadingState, setLoadingState] = useState(false);
            
    // FORM SUBMIT TO DISPLAY PLAYERS
    async function handleSubmit(event: any) {
            event.preventDefault();
            setLoadingState(true);                 
            const playerListData = await fetchPlayers(firstName, lastName);            
            setLoadingState(false);       
            setPlayerList(playerListData);            
    }            

    // TODO: DOUBLE CHECK THE LOADING STATE ISNT STUCK
    // TODO: HANDLE NO-INFO PLAYER ERROR

    // ON PLAYER SELECTION
    async function playerSelected(player: Player) {
        setLoadingState(true);
        await addPlayerToCache(player);
        try {
            await addCardToTable(player, selectedSetId);
        }
        catch(error) {                                             
            if (error instanceof ApiError && error.status === 409) {
                toast.error('Error: Player already exists');
            }
            cleanComponent();
            return;
        }        
        setLoadingState(false);
        onCardCreated();           
        cleanComponent();
        onClose();
        toast.success('Player added!');
    }
    function cleanComponent() {
        setFirstName('');
        setLastName('');
        setPlayerList([]);
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();            
        } else {
            dialog.close();
        }
    }, [isOpen]);


    
    return createPortal(
        <dialog ref={dialogRef}>
            <div className="search-container">
                <h2>Player Search</h2>    
                {/* FORM */}
                <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input 
                type="text" 
                required
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                type="text" 
                required
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
                />                
                <button type="submit">Search</button>
                </form>

                {/* SEARCH LIST */}
                <table className="search">
                    <thead>
                        {loadingState &&
                            <tr><img id="puck" src={puck} alt="Puck" /></tr>
                        }                        
                        <tr>
                            <td>Name</td>
                            <td>Team</td>
                            <td>Position</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    {playerList && !loadingState &&
                        <tbody>
                            {playerList.map((player) => (
                                <tr key={player.id} onClick={() => playerSelected(player)}>
                                    <td>{ player.fullName }</td>
                                    <td>{ player.currentTeamId }</td>
                                    <td>{ player.positionCode }</td>
                                    <td>{ player.sweaterNumber }</td>
                                </tr>
                            )
                        )}
                        </tbody>
                    }                     
                </table>
                                
                <div className="set-list">
                    <h3>Pick Set</h3>
                    {sets && sets.map((set) => (
                        <ul key={set.id}>
                            <li>
                                <label htmlFor={`set-${set.id}`}>{set.name}</label>
                                <input 
                                    type="radio"
                                    name="set"
                                    id={`set-${set.id}`}
                                    value={set.id}
                                    checked={selectedSetId === String(set.id)}
                                    onChange={(e) => setSelectedSetId(e.target.value)}
                                />
                            </li>
                        </ul>
                    ))} 
                </div>

                <button onClick={onClose} className="close-btn">Cancel</button>

            </div>

            </dialog>, 
            document.body   
    )
} 

