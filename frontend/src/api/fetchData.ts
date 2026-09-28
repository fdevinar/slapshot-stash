import type { CardDetails } from '../api/types'

export async function fetchCards(): Promise<CardDetails[]> {
    const response = await fetch("http://localhost:3000/cards");
    const data = await response.json();
    if (data) {
        console.log("Cards fetched successfully");        
    }    
    return data;
  }