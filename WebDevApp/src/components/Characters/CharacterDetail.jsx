    import { useParams } from 'react-router-dom';
    import { useState, useEffect } from 'react';
    import './CharacterDetail.css';


    function CharacterDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
        try {
            const response = await fetch(`https://api.sampleapis.com/futurama/characters/${id}`);
            if (!response.ok) {
            throw new Error('Error fetching character');
            }
            const data = await response.json();

            setCharacter(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
        };

        fetchCharacter();
    }, [id]);

    if (loading) return <div className="loading">Cargando personaje...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    const { name, images, species, gender, age, occupation, sayings, homePlanet } = character;
    const fullName = `${name.first} ${name.middle || ''} ${name.last}`.trim();

    return (
        <div className="character-detail">
        <img 
            src={images.main} 
            alt={fullName}
            onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
        />
        <h1>{fullName}</h1>
        <p><strong>Especie:</strong> {species}</p>
        <p><strong>Género:</strong> {gender}</p>
        <p><strong>Edad:</strong> {age || 'Desconocida'}</p>
        <p><strong>Ocupación:</strong> {occupation}</p>
        <p><strong>Planeta:</strong> {homePlanet}</p>
        <div className="sayings">
            <h2>Frases famosas:</h2>
            <ul>
            {sayings.slice(0, 5).map((saying, index) => (
                <li key={index}>"{saying}"</li>
            ))}
            </ul>
        </div>
        </div>
    );
    }

    export default CharacterDetail;
