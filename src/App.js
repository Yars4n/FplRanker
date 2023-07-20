import Header from './Header';
import React from 'react';
import './App.css';
import Player from './Player';
import dat from './dat';
import domtoimage from 'dom-to-image';  
import { saveAs } from 'file-saver';
 
function App() {

  const [data, setData] = React.useState (dat);

  

  async function handlePrint() {
    const printContent = document.getElementById('print-content');
    if (printContent) {
      try {
        const imgDataUrl = await domtoimage.toPng(printContent);
        saveAs(imgDataUrl, 'scores.png'); // Save the image using file-saver
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  }
   
   
  function addPlayer (event) {
    event.preventDefault()
    const playerName = event.target.playerName.value
    const points  = parseInt (event.target.points.value)
    
    const newPlayer = {
      id : data.length +1,
      name: playerName,
      points : points
    }

    if (playerName && !isNaN(points))
    {
      setData (prevState => [...prevState, newPlayer])
    }

    event.target.playerName.value = '';
    event.target.points.value = '';

    
  }

  const updateData = () => 
  { const sortedPlayers =  [...data].sort((a, b) => b.points - a.points);
    setData(sortedPlayers)
  }

let i = 0;
const handlePointsChange = (id, value) => {
  setData((prevPlayers) => {
    const updatedPlayers = prevPlayers.map((player) => {
      if (player.id === id) {
        return { ...player, points: value };
      }
      return player;
    });
    return updatedPlayers;
  });
};

  
 const players = data.map (player => {
  i++;
  return ( 
    <Player
      rank = {i}
      id = {player.id}
      key = {player.id}
      name = {player.name}
      score = {player.points}
      updateScores = {updateData}
      handleChange = {handlePointsChange}
    />
  );
 })





  return (<div >
    <div id = 'print-content'   className="print"  >
    <Header/>
    {players}
    </div>


    <section className='container'>

    <form className = 'addP' onSubmit={addPlayer}>
    <input placeholder='Player Name' name = "playerName" type="text" />
    <input placeholder='PTS' name = "points" type="number" />
    <button type='submit'>Add</button>
    </form>

     <div className='twins'>
    <button onClick={updateData}>Update Scores</button>
    <button onClick={handlePrint}>Print</button>
    </div>
    </section>

    </div>
  );
}

export default App;
