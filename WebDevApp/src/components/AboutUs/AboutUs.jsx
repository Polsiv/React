import './AboutUs.css';

function AboutUs() {
  const users = [
    {
      name: 'Juan Pablo Silvestre',
      code: 99127,
      description: 'Amante del Fizz Buzz, ejecuta "ls" cada 0.01s si está en una terminal.',
      image: '/assets/silv.png'
    },
    {
      name: 'Sebastián López Montenegro',
      code: 97500,
      description: 'Ganó $60.000 usando la técnica de la Martingala, y el resto se cuenta solo.',
      image: '/assets/seb.png'
    }
  ];

  return (
    <div className="aboutus-container">
      <h1>Sobre Nosotros</h1>
      <div className="aboutus-cards">
        {users.map((user, index) => (
          <div 
            className="aboutus-card" 
            key={index}
            style={{ '--delay': `${index * 0.3}s` }}
          >
            <img src={user.image} alt={user.name} />
            <h2>{user.name}</h2>
            <span><strong>Código:</strong> {user.code}</span>
            <p>{user.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
