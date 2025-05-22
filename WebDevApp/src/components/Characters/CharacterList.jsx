import { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('name_filter') || '');
  const [speciesSearchTerm, setSpeciesSearchTerm] = useState(() => localStorage.getItem('species_filter') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => 
  {
      const fetchCharacters = async () => 
      {
        try 
        {
            const response = await fetch('https://api.sampleapis.com/futurama/characters');
            
            if (!response.ok) 
            {
                throw new Error('Error al obtener los personajes');
            }
            
            const data = await response.json();
            setCharacters(data);
            setFilteredCharacters(data);
            setLoading(false);
        } 
        catch (err) 
        {
            setError(err.message);
            setLoading(false);
        }
  };

    fetchCharacters();
  }, []); //It tells React: "Run this useEffect only once — when the component first loads."


  useEffect(() => 
  {
      const results = characters.filter(character =>
          (character.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
          character.name.last.toLowerCase().includes(searchTerm.toLowerCase())) &&
          character.species.toLowerCase().includes(speciesSearchTerm.toLowerCase())
      );
      setFilteredCharacters(results);
  },  [searchTerm,speciesSearchTerm, characters]);

  const handleSearch = (e) => 
  {
      setSearchTerm(e.target.value);
      localStorage.setItem("name_filter", e.target.value);
  };
  
  const handleSpeciesSearch = (e) => 
  {
    setSpeciesSearchTerm(e.target.value);
    localStorage.setItem("species_filter", e.target.value);
  };


  if (loading) 
  {
      return <div className="loading">Cargando personajes...</div>;
  }

  if (error) 
  {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="character-container">
        <h1>Personajes de Futurama</h1>
        
        <div className='search-wrapper'>
          <div className="search-container">
              <input
                type="text"
                placeholder="Buscar personaje por nombre"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
          </div>
          
          <div className="search-container">
              <input
                type="text"
                placeholder="Buscar personaje por especie"
                value={speciesSearchTerm}
                onChange={handleSpeciesSearch}
                className="search-input"
              />
          </div>
        </div >
        
        {filteredCharacters.length === 0 ? (
          <div className="no-results">No se encontraron personajes con ese nombre</div>
        ) : (
          <div className="character-grid">
            {filteredCharacters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
    </div>
  );
}

export default CharacterList;