import { useState, useEffect } from "react";
import "./Section.css";

function Section() {
  const [count, setCount] = useState(10);
  const [championsInfo, setChampionsInfo] = useState([]);
  const [mostrarBoton, setMostrarBoton]= useState(true)
  const totalChampions =Object.keys(championsInfo).length
  // console.log(totalChampions)
 
  const verMas=()=>{
    setCount(count+10)
  }
  
  useEffect(() => {
    if (totalChampions > 0 && count >= totalChampions) {
      setMostrarBoton(false);
    }
  }, [count, totalChampions]);

  useEffect(() => {
    fetch(
      `https://ddragon.leagueoflegends.com/cdn/15.1.1/data/en_US/champion.json`
    )
      .then((res) => res.json())
      .then((champions) => {  
        setChampionsInfo(champions.data);
        // console.log(champions.data);
      });
  }, []);
  return (
    <>
      <ul className="card">
        {Object.values(championsInfo).slice(0,count).map((champion) => (
          
          <section key={champion.id}>
            <img
              className="image"
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_0.jpg`}
              alt={`Image of ${champion.name}`}
            />
            <h1 className="text">{champion.name}</h1>
            <h2 className="text">{champion.title}</h2>
            <h3 className="text">{champion.tags}</h3>
          </section>
        ))}
      </ul>
      {mostrarBoton ? <button onClick={verMas}>Ver mas</button> : null}
      
    </>
  );
}

export default Section;
