import React, {useState,useEffect} from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';

const JobPortal = () => {

  const uniqueId =  uuidv4();
  const generateLink = (path) => `/${path.slice(1,5)}/${uniqueId}`;
  const [cards, setCards]=useState([]);
  const [error, setError]=useState('');
  const [loader, setLoader]=useState(false);
useEffect( ()=>{
  setLoader(true);
  const fetchPosts = async () => {
    try {
        const token = Cookies.get('authToken'); 
        if (!token) {
            console.log('Token not available');
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/user/data/fetchPost`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log('Failed to fetch posts');
            return;
        }

        const data = await response.json();
        setCards(data);
    } catch (error) {
        console.log('Error:', error);
        setError(error.message);
    }
    finally{
      setLoader(false);
    }
};

 fetchPosts();  
},[])
  



  const text='Despite facing financial hardships, XYZ, a determined student from a small village, refused to let her dreams fade. With limited access to resources, she studied under streetlights and walked miles to attend school. Her perseverance paid off when she earned a full scholarship to a top university. There, she excelled in her studies while also mentoring others facing similar struggles. Today, XYZ is a software engineer at a leading tech company, using her success to uplift her community. Her journey from adversity to achievement is a testament to resilience, proving that determination and hard work can transform lives.'
    return (
        <div className='container_04'>


          {loader?(<Loading/>):(
            <>
            
            
            
       <Navbar/>


       <style>
        {`
          * {
            font-family: "Noto Sans", sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .nav-home {
            display: flex;
            justify-content: space-between;
          }

          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-size: cover;
          }

          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
          }

          input {
            text-align: center;
          }

          .form_01 {
            display: flex;
            justify-content: center;
            margin-top: 10%;
            text-align: center;
          }
          
          .conatiner {
            display: grid;
          }
          
          .btn {
            margin-top: 56px;
            width: 100%;
          }
          
          .Page_01 {
            text-align: center;
          }

          .Page_01 h1 {
            margin-top: 30px;
          }
          
          .btn_02 {
            width: 37%;
            margin: auto;
            margin-bottom: 40px;
            margin-top: 10px;
          }

          .form-group {
            margin-top: 10%;
          }

          .form_02 {
            text-align: center;
            display: grid;
            justify-content: center;
            margin-top: 10%;
          }
          
          .container_02 {
            display: flex;
            justify-content: center;
          }
          
          .subContainer_02 {
            margin: auto;
            margin-top: 10%;
          }
          
          .label_02 {
            margin-right: 10px;
          }
          
          .b_01 {
            margin-top: 0px;
            width: 155%;
          }

          .onlyPara {
            text-align: center;
          }
          
          .add {
            margin: auto;
            text-align: center;
          }

          .results {
            display: grid;
            justify-content: center;
          }
          
          .card {
            margin: 10px;
            width: 95%;
          }
          
          .container_03 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          
          .card-body {
            text-align: center;
          }
          
          .c_05 {
            display: grid;
            text-align: center;
            border: 3px solid black;
            width: 80%;
            margin: auto;
            margin-top: 10px;
            margin-bottom: 20px;
          }
          
          .c_05 p {
            margin: auto;
            width: 60%;
            margin-top: 20px;
            margin-bottom: 40px;
          }
          
          .sticky-navbar {
            position: sticky;
            top: 0;
            z-index: 100;
          }
          
          .input_job_01 {
            width: 60%;
            margin: auto;
          }
          
          .text_form {
            text-align: center;
          }
          
          .text_form button {
            width: 40%;
            margin: auto;
            margin-bottom: 70px;
          }
          
          .label_02 {
            margin-top: 30px;
            margin-bottom: 30px;
          }
          
          .check_01 {
            margin-left: 148px;
          }
          
          .form_03 {
            display: grid;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
          }
          
          .form_03 input {
            margin: auto;
            margin-top: 10px;
            width: 60%;
            text-align: center;
          }
          
          .calander {
            margin-top: 20px;
          }
          
          .form-group_01 {
            margin-top: 30px;
          }
          
          .events_cal {
            display: grid;
            justify-content: center;
          }
          
          .event_h3 {
            display: grid;
            justify-content: center;
            text-align: center;
          }
          
          .event-details {
            display: grid;
            width: 100%;
            justify-content: center;
          }
          
          .child_event {
            margin: auto;
            margin-top: 20px;
          }
          
          .img_qr_01 {
            width: 19%;
            height: 94%;
            margin: auto;
          }
          
          .btn_01 {
            width: 30%;
            margin: auto;
            margin-top: 30px;
            margin-bottom: 30px;
          }
          `}
      </style>
       <div className='add'>
        <h2>Want to add a new posting ? </h2>
       
       <Link to={generateLink('/post/:id')}> <button className='btn btn-primary btn_02'>Add Here </button></Link>
       </div>
       {error?(<><p>Failed To Load Postings</p><p>{error}</p></>):( <div className ='container_05'>
         {cards.map((element,index)=>(
           <div key={index} className='c_05'>
            <h3>{element.companyName}</h3>
            <h5>Job Title : {element.jobTitle}</h5>
            <p> Description : {element?.description ||text }</p>
            <p>Job Type : {element.jobType}</p>
            <p>Requirements : { element.requirement}</p>
            <p>Posted At : {element.postedAt.slice(0,10)}</p>
            <small>{element.Note}</small>
            <a href={element.link} target='_blank'><button className='btn btn-primary btn_02'>Apply Now</button></a>
           </div>
         ))}
        </div>)}
        </>
      )}
        </div>
    )
}

export default JobPortal