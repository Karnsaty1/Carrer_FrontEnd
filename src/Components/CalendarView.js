// CalendarView.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import 'react-calendar/dist/Calendar.css'; 
import Loading from './Loading';

const CalendarView = () => {
  const token = Cookies.get('authToken');
  const [events, setEvents] = useState([]);
  const [loader, setLoader]=useState(false);

  useEffect(() => {
    setLoader(true);
   
    const mount = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/user/data/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        credentials:'include',
      });
      if (!response.ok) console.log("Failed To fetch Events !!!");
      else {
        const data = await response.json();
        console.log(data);
        setEvents(data);
        console.log("setting events")
      }
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoader(false);
      }
    };
    mount();
  }, []);

  
 

  return (
    <div >

      {loader?(<Loading/>):(

        <>
        
        
      <Navbar />

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
            margin: auto;
            width: 37%;
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
          
          .card-img-top{
            margin:auto;
            text-align:center
          }
          
          .card-img-top {
            width: 40%; 
            height: auto; 
          }
          
          .container_001{
            display: flex;
            flex-wrap: wrap;  
            justify-content: center; 
            gap: 20px;  
            width: 100%; 
            padding: 20px; 
            }

            .card{
              width: calc(33.333% - 20px); 
              margin: 10px; 
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
              border-radius: 8px; 
              overflow: hidden; 
            }
            .card-body{
              padding: 10px; 
            }
            `}
      </style>

     
  <div className='container_001'>
     {events.map((element,index)=>(
       <div className="card" key={index} >
      <img className="card-img-top" src="https://cdn1.vectorstock.com/i/1000x1000/63/75/event-planning-logotype-vector-48806375.jpg" alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">{element.title}</h5>
        <p className='card-venue'>{element.venue}</p>
        <p className="card-text">{element.description}</p>
        <p className="card-date">{element.eventDate.slice(0,10)
}</p>
       
      </div>
    </div>
     ))}
     </div>


  

     </>
   )}
    </div>
  );
};

export default CalendarView;
