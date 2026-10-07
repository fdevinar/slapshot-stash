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
          console.log(col);
          setPlayerSort(col as keyof CardDetails);
          if (col === playerSort) {
            setPlayerSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
          } else {
            setPlayerSortOrder('asc');
          }
        }

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
                <th className='phase regular' colSpan={9}>REGULAR SEASON</th>
                <th className='phase playoffs' colSpan={9}>PLAYOFFS</th>                
              </tr>
            </thead>
          <thead>              
            <tr>
              {columns.map((col) =>
                <th onClick={()=>handlePlayerColumnSort(col.key)}>                        
                  {col.label}                                                
                  {getPlayerSortSymbol(col.key)}
                </th>                
              )}
            </tr>              
          </thead>          
          <tbody>
              {sortedPlayerCards.map((card) =>                                
                <tr>
                  {columns.map((col) =>
                      <td>                        
                        {card[col.key]}
                      </td>
                  )}
                </tr>            
              )}
          </tbody>          
        </table>
        </>
    )
}