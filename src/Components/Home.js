import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import image from './image.webp';


const Home = () => {
  const generateLink = (path) => {
    const uniqueId = uuidv4();
    return `/${path}/${uniqueId}`;
  };

console.log(process.env.REACT_APP_URL);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <nav style={{
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} className="navbar navbar-home navbar-expand-lg navbar-light bg-light">
        <Link style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: '#000'
        }} className="navbar-brand" to="#">Alumni</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={generateLink('signUp')}>
                <button style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }} className='btn btn-primary'>
                  SignUp
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '20px'
      }} className='image-div'>
        <img src={image} style={{
          width: '100vw',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px'
        }} />
      </div>
     
    </div>
  );
};

export default Home;
