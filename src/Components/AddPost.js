import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from './Navbar';

const AddPost = () => {

  const [details, setDetails] = useState({ jobTitle: '', description: '', companyName: '', postedAt: '', note: '',jobType:'',Location:'',requirement:'',link:'' });
  const [checked,setChecked]=useState(false);
 const [error,setError]=useState('');

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const isChecked=()=>{
       setChecked(prev=>!prev);
  }

  const isValidForm=()=>{
    return checked && details.companyName && details.postedAt && details.description && details.jobTitle && details.jobType && details.requirement && details.postedAt && details.Location;
  }

  const onSubmit=async (e)=>{
   try {
    e.preventDefault();
   
  
    const token=Cookies.get('authToken');
    

    const response=await fetch(`${process.env.REACT_APP_URL}/user/data/addOne`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'authorization':`Bearer ${token}`
      },
      credentials:'include',
      body:JSON.stringify(details)
    })

   if(!response.ok){
    console.log("Failed To Add Post")
   }

   } catch (error) {
    console.log(error);
    setError(error.message);
   }
    
  }
  return (
    <div>
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

          .input_jobTitle_01 {
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

          .form-control {
            margin: auto;
            margin-top: 10px;
            width: 60%;
            text-align: center;
          }


          .check_01{
            margin: auto;
          margin-top: 5px;
          width: 60%;
          text-align: center;
          margin-right: 62%;
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

          .text_area{
            display:block;
          }

          .desc_01{
            
            text-align : center;

          }

          .label_034{
            display:flex;
            justify-content:center;
          }
        `}
      </style>

      {error?(<><p>Failed to Add Post</p><p>{error}</p></>):
      (

        <form className='form_03 text_form' onSubmit={onSubmit}>
          <h1>Add Posting </h1>
          <div className="form-group label_002">
            <label htmlFor="exampleInputTitle01">Company's Name</label>
            <input type="text" value={details.companyName} name ='companyName'onChange={onChange} className="form-control input_jobTitle_01" id="exampleInputTitle1" aria-describedby="TitleHelp" placeholder="Company's Name" required={true} />
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputTitle1">Job Title</label>
            <input type="text" value={details.jobTitle} name ='jobTitle'onChange={onChange} className="form-control input_jobTitle_01" id="exampleInputTitle1" aria-describedby="TitleHelp" placeholder="Enter Title" required={true} />
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputDescription1 " className='text_area'>Description</label>
            <textarea id="description" className='desc_01' value={details.description} name="description" rows="4" cols="50" required={true} placeholder='Job Description' onChange={onChange}/>
          </div>
    
          <div className="form-group label_02">
  <label htmlFor="exampleInputDescription1">Last Date Form Submission</label>
  <input 
    type="date" 
    value={details.postedAt ? details.postedAt.slice(0, 10) : ''} 
    name='postedAt' 
    onChange={onChange} 
    className="form-control input_jobTitle_01" 
    id="exampleInputdate1" 
    placeholder="YYYY-MM-DD" 
    required={true} 
  />
</div>
          <div className="form-group label_020">
            <label htmlFor="exampleInputDescription10">Requirements </label>
            <input type="text" value={details.requirement} name='requirement' onChange={onChange} className="form-control  Reuirement_01" id="exampleInputdate1" placeholder="Requirement" required={true} />
          </div>
          <div className="form-group label_0200">
            <label htmlFor="exampleInputDescription100">Location : </label>
            <input type="text" value={details.Location} name='Location' onChange={onChange} className="form-control  Location_01" id="exampleInputdate1" placeholder="Location" required={true} />
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputDescription1">Job Type </label>
            <input type="text" value={details.jobType} name ='jobType' onChange={onChange} className="form-control  input_jobType_01" id="exampleNote1" placeholder="Job Type"  required={true}/>
          </div>
          <div className="form-group label_0201">
            <label htmlFor="exampleInputDescription12">link </label>
            <input type="text" value={details.link} name ='link' onChange={onChange} className="form-control  input_link_01" id="exampleNote1" placeholder="link"  required={true}/>
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputDescription1">Note (if any) </label>
            <input type="text" value={details.note} name ='note' onChange={onChange} className="form-control  input_jobTitle_01" id="exampleNote1" placeholder="Important"  />
          </div>


          
          <div className="form-check label_02 label_034">
            <input type="checkbox" className="form-check-input check_01" id="check" checked={checked} onChange={isChecked}/>
            <label className="form-check-label  input_jobTitle_01" htmlFor="exampleCheck1">I hearby declare that all the above informations are correct</label>
          </div>
          <button type="submit" className="btn btn-primary "disabled={!isValidForm()}>Submit</button>
        </form>)}
    </div>
  )
}

export default AddPost
