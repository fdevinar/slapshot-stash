import { useState } from 'react';
import type { CardDetails } from '../api/types'
import type { ColumnConfig } from './types';

interface StatsTableProps {
  columns: ColumnConfig<CardDetails>[];
  cards: CardDetails[];
}

export default function StatsTable( {columns, cards}: StatsTableProps ) {

    const [playerSort, setPlayerSort] = useState<keyof CardDetails>('first_name');
    const [playerSortOrder, setPlayerSortOrder] = useState<'asc' | 'desc'>('asc');    

    const sortedPlayerCards = [...cards].sort((a, b) => {
      // const valA = a[skaterSort] || '';
      // const valB = b[skaterSort] || '';
      const valA = a[playerSort];
      const valB = b[playerSort];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return playerSortOrder === 'asc' ?  valA - valB : valB - valA;
      }
      return playerSortOrder === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });

    const getPlayerSortSymbol = (key: keyof CardDetails) => {      
      if (key !== playerSort) {
        return;
      }
      return playerSortOrder === 'asc' ? '▲' : '▼';
    }

    function handlePlayerColumnSort(col: string) {          
      setPlayerSort(col as keyof CardDetails);
      if (col === playerSort) {
        setPlayerSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setPlayerSortOrder('asc');
      }
    }

    function convertToi(totalSeconds: number): string {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const paddedSeconds = String(seconds).padStart(2, '0');

      return `${minutes}:${paddedSeconds}`;
    }

    const phaseColumns = (columns.length - 7)/2;   

    return (
        <>        
        <table>
          <thead>
              <tr>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>                
                <th className='phase regular' colSpan={phaseColumns}>REGULAR SEASON</th>
                <th className='phase playoffs' colSpan={phaseColumns}>PLAYOFFS</th>                
              </tr>
            </thead>
          <thead>              
            <tr>
              {columns.map((col) =>
                <th key={col.key} onClick={()=>handlePlayerColumnSort(col.key)}>                        
                  {col.label}                                                
                  {getPlayerSortSymbol(col.key)}
                </th>                
              )}
            </tr>
          </thead>
          
          <tbody>
              {sortedPlayerCards.map((card) =>                                
                <tr key={card.card_id}>
                  {columns.map((col) =>
                      <td key={col.key}>                                              
                        {col.key === 'reg_time_on_ice' || col.key === 'play_time_on_ice'  ?               
                        (card[col.key] != null ? convertToi(Number(card[col.key])) : card[col.key]) 
                        // DEFAULT FIELD
                        : card[col.key]}                                          
                      </td>
                  )}
                </tr>            
              )}
          </tbody>          
        </table>
        </>
    )
}

