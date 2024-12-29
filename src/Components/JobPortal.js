import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';

const JobPortal = () => {
  const uniqueId = uuidv4();
  const generateLink = (path) => `/${path.slice(1, 5)}/${uniqueId}`;
  const [cards, setCards] = useState([]);
  const [filteredCards,setFilteredCards]=useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  function serachBar(event){
    const query=event.target.value.toLowerCase();
    if(!query){
      setFilteredCards(cards);
      return;
    }
    const filteredElement=cards.filter((element)=>
      element.jobTitle.toLowerCase().includes(query) ||
      element.description.toLowerCase().includes(query)||
      element.companyName.toLowerCase().includes(query) ||
      element.jobType.toLowerCase().includes(query) ||
      element.requirement.toLowerCase().includes(query)
    );
    setFilteredCards(filteredElement);

  }

  useEffect(() => {
    setLoader(true);
    const fetchPosts = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.log('Token not available');
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/user/data/fetchPost`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          console.log('Failed to fetch posts');
          return;
        }

        const data = await response.json();
        setCards(data);
        setFilteredCards(data);
      } catch (error) {
        console.log('Error:', error);
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchPosts();
  }, []);

  const text =
    'Despite facing financial hardships, XYZ, a determined student from a small village, refused to let her dreams fade. With limited access to resources, she studied under streetlights and walked miles to attend school. Her perseverance paid off when she earned a full scholarship to a top university. There, she excelled in her studies while also mentoring others facing similar struggles. Today, XYZ is a software engineer at a leading tech company, using her success to uplift her community. Her journey from adversity to achievement is a testament to resilience, proving that determination and hard work can transform lives.';

  return (
    <div className="job-portal-container">
      {loader ? (
        <Loading />
      ) : (
        <>
          <Navbar />

          <style>
            {`
            body {
              margin: 0;
              font-family: 'Noto Sans', sans-serif;
              background-color: #f9f9f9;
            }

            .job-portal-container {
              padding: 20px;
            }

            .add {
              text-align: center;
              margin-bottom: 30px;
            }

            .add h2 {
              font-size: 1.5rem;
              margin-bottom: 15px;
              color: #333;
            }

            .btn_02 {
              padding: 10px 20px;
              font-size: 1rem;
              color: #fff;
              background-color: #007bff;
              border: none;
              border-radius: 5px;
              transition: all 0.3s;
            }

            .btn_02:hover {
              background-color: #0056b3;
              transform: scale(1.05);
            }

            .container_05 {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 20px;
            }

            .c_05 {
              background-color: #fff;
              border: 1px solid #ddd;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              padding: 20px;
              text-align: center;
              transition: transform 0.3s;
            }

            .c_05:hover {
              transform: translateY(-5px);
              box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            }

            .c_05 h3 {
              font-size: 1.25rem;
              color: #333;
              margin-bottom: 10px;
            }

            .c_05 h5 {
              font-size: 1rem;
              color: #555;
              margin-bottom: 15px;
            }

            .search-bar {
    display: block;
    width: 55%;
    max-width: 600px;
    margin: 20px auto;
    padding: 10px 15px;
    font-size: 1rem;
    color: #333;
    border: 2px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .search-bar:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
  }

  .search-bar::placeholder {
    color: #aaa;
    font-style: italic;
  }

  .search-bar-container {
    text-align: center;
    margin-bottom: 20px;
  }

            .c_05 p {
              font-size: 0.9rem;
              color: #666;
              margin-bottom: 15px;
            }

            .c_05 small {
              display: block;
              font-size: 0.8rem;
              color: #999;
              margin-bottom: 10px;
            }

            .c_05 a button {
              padding: 10px 15px;
              font-size: 0.9rem;
              color: #fff;
              background-color: #28a745;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: all 0.3s;
            }

            .c_05 a button:hover {
              background-color: #218838;
              transform: scale(1.05);
            }

            .error-message {
              text-align: center;
              color: red;
              margin-top: 20px;
            }
            `}
          </style>

          <div className="add">
            <h2>Want to add a new posting?</h2>
            <Link to={generateLink('/post/:id')}>
              <button className="btn_02">Add Here</button>
            </Link>
          </div>

          {error ? (
            <div className="error-message">
              <p>Failed To Load Postings</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="search-bar-container">
              <input type='text' onChange={serachBar} className="search-bar" placeholder="Search jobs by title, description, company..."/>
            <div className="container_05">
              {filteredCards.map((element, index) => (
                <div key={index} className="c_05">
                  <h3>{element.companyName}</h3>
                  <h5>Job Title: {element.jobTitle}</h5>
                  <p>Description: {element?.description || text}</p>
                  <p>Job Type: {element.jobType}</p>
                  <p>Requirements: {element.requirement}</p>
                  <p>Posted At: {element.postedAt.slice(0, 10)}</p>
                  <small>{element.Note}</small>
                  <a href={element.link} target="_blank" rel="noopener noreferrer">
                    <button>Apply Now</button>
                  </a>
                </div>
              ))}
            </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobPortal;
