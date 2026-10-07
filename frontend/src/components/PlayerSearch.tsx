import { useState, useRef, useEffect } from "react";
import type { Player } from "../api/types";
import { fetchPlayers, addPlayerToCache, addCardToTable } from "../api/fetchData";
import { createPortal } from "react-dom";
import toast from 'react-hot-toast';

interface PlayerSearchProps {
    onCardCreated: () => void;
    onClose: () => void;
    isOpen: boolean;
}

export default function PlayerSearch( { onCardCreated, onClose, isOpen }: PlayerSearchProps ) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [playerList, setPlayerList] = useState<Player[]>([]);    
    const dialogRef = useRef<HTMLDialogElement>(null);
        
    // FORM SUBMIT TO DISPLAY PLAYERS
    async function handleSubmit(event: any) {
            event.preventDefault();            
            const playerListData = await fetchPlayers(firstName, lastName);
            setPlayerList(playerListData);            
    }            

    // ON PLAYER SELECTION
    async function playerSelected(player: Player) {                
        await addPlayerToCache(player);        
        await addCardToTable(player);
        onCardCreated();           
        setFirstName('');
        setLastName('');
        setPlayerList([]);
        onClose();
        toast.success('Player added!');
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
                {/* <input type="submit" /> */}
                <button type="submit">Search</button>
                </form>

                {/* SEARCH LIST */}
                <table className="search">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Team</td>
                            <td>Position</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    {playerList &&
                        <tbody>
                            {playerList.map((player) => (
                                <tr key={player.id} onClick={() => playerSelected(player)}>
                                    <td> {player.fullName} </td>                            
                                    <td>{ player.currentTeamId }</td>                
                                    <td>{ player.positionCode }</td>
                                    <td>{ player.sweaterNumber }</td>
                                </tr>
                            )
                        )}                                 
                        </tbody>
                    }                     
                </table>
                <button onClick={onClose} className="close-btn">Cancel</button>
            </div>

            </dialog>, 
            document.body   
    )
} 

