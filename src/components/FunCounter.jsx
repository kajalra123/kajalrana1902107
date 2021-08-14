import React,{useState} from 'react';

function FunCounter() {
    let [count,setcount]= useState(10);
    const decrement=()=>{
        setcount(count-1);
    };
    const increment=()=>{
        setcount(count+1);
    };
   
   

    return (
        <div>
       
            
            <h1>{count}</h1>
            <button onclick={decrement} className="btn btn-dark">DEcrement</button>
            <button Click={increment} className="btn btn-success">INCREMENT</button>
           
    
</div>
            
       
    );
}
export default FunCounter;
