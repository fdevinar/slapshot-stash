import type { CardDetails } from '../api/types'

interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sortable: boolean;
}
interface StatsTableProps {
  columns: ColumnConfig<CardDetails>[];
  cards: CardDetails[];
}

export default function StatsTable( {columns, cards}: StatsTableProps ) {
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
                <th className='regular' colSpan={9}>REGULAR SEASON</th>
                <th className='playoffs' colSpan={9}>PLAYOFFS</th>                
              </tr>
            </thead>
          <thead>              
            <tr>
              {columns.map((col) =>
                <th>                        
                  {col.label}                                                
                  
                </th>
              )}
            </tr>              
          </thead>          
          <tbody>
              {cards.map((card) =>                                
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