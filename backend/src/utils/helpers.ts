// const t1 = '21:52';
// const t2 = '1:45';
// const t3 = null;
// const t4 = '00:45';

// console.log(convertTimeOnIce(t1));
// console.log(convertTimeOnIce(t2));
// console.log(convertTimeOnIce(t3));
// console.log(convertTimeOnIce(t4));

function convertTimeOnIce(value: string | null = null): number | null {
    
    if (value !== null) {
        const splitValue = value.split(":");
        const p1 = Number(splitValue[0]) * 60;
        const p2 = Number(splitValue[1]);
        return p1 + p2;
    }
    return null;
}

// GENERIC FETCH DATA
export async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            console.log(`Error: ${response.status}`);     
            return;       
        }
        const data = await response.json();                                
        return data;
    }
    catch (error) {
        console.log(error);        
    }
}