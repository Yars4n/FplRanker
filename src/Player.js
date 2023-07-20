import React from "react";



const Player = (props ) => {
    let rank = 0;
    if (props.rank === 1)
    rank =   <span className="number1">{props.rank}</span>
    else 
    rank =   <span className="number">{props.rank}</span>

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
          props.handleChange(props.id, value);
        }
      };
      
    return (
    <section className="player">
        <div className="numberCon">
        {rank}
        </div>
        <span className="name">{props.name}</span>
         
        <div className="numberInput">
        <input
              className="spinner"
              type="text"
              value={props.score}
              onChange={handleInputChange}
            />
       </div>
    </section>

    );
}



export default Player;