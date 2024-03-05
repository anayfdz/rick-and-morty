import "./styles/App.css";
import title from "./assets/title.svg";
import  { Resumen } from './Resumen'
import { useEffect, useState } from "react";
import React from "react";

interface Character {
  id: number;
  name: string;
  gender: string;
  species: string;
  status: string;
}

interface ApiResponse {
  results: Character[];
}

function App() {
  const [users, setUsers] = useState<Character[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showCharacters, setShowCharacters] = useState(false);
  const [filter, setFilter] = useState<string | null>(null)
  const fetchUsers = async() => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data: ApiResponse = await response.json();
      console.log("Fetched data:", data);
      setUsers(data.results)
    } catch(e) {
      console.log('error en la data de la api', e)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleShowCharacters = async() => {
    setShowCharacters(true);
    fetchUsers();
  }
  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  const applyFilter = () => {
    if (!filter) return users

  switch (filter) {
    case "A-Z": return [...users].slice().sort((a,b) => a.name.localeCompare(b.name))
    case "Z-A": return [...users].slice().sort((a,b) => b.name.localeCompare(a.name))
    case "Gender": return [...users].slice().sort((a,b) =>a.gender.localeCompare(b.gender))
    case "Species": return[...users].slice().sort((a,b) => a.species.localeCompare(b.species))
    case "Status": return [...users].slice().sort((a,b) => a.status.localeCompare(b.status))
    default: return users
  }
}
  const filteredUsers = applyFilter();
  return (
    <div className="App">
      <Resumen/>
       <div className="search">
        <button className="prueba">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="characters">
        <div className="filter-drowdown">
          <label htmlFor="filterSelect" >Filtrar Por:</label>
          <select id="filterSelect" onChange={(e) => handleFilterChange(e.target.value)} >
            <option value="">Seleccionar Filtro</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Gender">Generos</option>
            <option value="Species">Especie</option>
            <option value="Status">Status</option>
          </select>
        </div>
        <button>¡Conoce a los personajes!</button>
        <ul>
          {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>))}       
           </ul>
      </div>
      <section className="title">
        <img src={title} />
      </section>
      <div className="resumen">
        <button>¡Aquí un resumen!</button>
      </div>
    </div>
  );
}

export default App;