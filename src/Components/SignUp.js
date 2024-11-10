import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const uniqueId = id || uuidv4();
  const generateLink = (path) => `/${path.slice(1,6)}/${uniqueId}`;
  const [loader, setLoader]=useState(false);

  const [cred, setCred] = useState({
    email: '',
    password: '',
    passingYear: '',
    department: '',
  });
//hello_world27


  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword]=useState(false);

  
      const onSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoader(true);
          const response = await fetch('http://localhost:8080/user/auth/signUp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(cred),
            
          })
      
          if (!response.ok) {
            console.log(response);
            console.log("error !!! ");
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          else {
             setShowOtp((prev)=>!prev)
            const data = await response.json();
            console.log(data); 
          }
        }
        catch (err) {
          console.log(err);
          setError('An error occurred. Please try again.');
        }
        finally{
          setLoader(false)
        };
      }
      
     const toggleVisibility=()=>{
      setShowPassword((prev)=>!prev);
     }
    
     
    

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch('http://localhost:8080/user/auth/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ email: cred.email, otp, signUp: true }),
        credentials:'include',
      });
      
      if (response.ok) {
        navigate(`/card/${uniqueId}`);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
    }
    finally{
      setLoader(false);
    }
  };

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: '"Noto Sans", sans-serif',
       
        boxSizing: 'border-box',
      //   background:`url(${image})`,
      //   // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      // height: '120vh', 
      // width: '100%', 
      }}
    >
      <h1 style={{ marginTop: '30px' }}>SignUp</h1>
      <Link to={generateLink('/login/:id')} style={{ display: 'block', marginBottom: '10px' }}>
        <small>Already Have an Account?</small>
      </Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loader?(<Loading/>):(


<>
 

      {!showOtp ? (
        <form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%' }}
        onSubmit={onSubmit}
        >
          <div style={{ display: 'grid', width: '300px' }}>
            <div style={{ marginTop: '10%' }}>
              <label htmlFor="email" style={{ marginTop:'-100px',display: 'block', marginBottom: '15px' }}>
                Email address
              </label>
              <input
                
                type="email"
                id="email"
                name="email"
                value={cred.email}
                onChange={onChange}
                placeholder="Enter email"
                style={{ borderRadius:'10px', marginTop: '-100px',width: '100%', padding: '8px', marginBottom: '15px', textAlign: 'center' }}
                aria-label="Email Address"
              />
            </div>
            <div style={{position:'relative', marginTop: '10%' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '15px' }}>
                Password
              </label>
              <input
                
                type={showPassword?'text':'password'}
                id="password"
                name="password"
                onChange={onChange}
                placeholder="Password"
                value={cred.password}
                style={{ borderRadius:'10px', marginTop: '-100px',width: '100%', padding: '8px', marginBottom: '15px', textAlign: 'center' }}
                aria-label="Password"
                />

                <span onClick={toggleVisibility} style={{ position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        marginTop:'8px'}}>
<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                
                </span>
            </div>
            <div style={{ marginTop: '10%' }}>
              <label htmlFor="passingYear" style={{ display: 'block', marginBottom: '15px' }}>
                Passing Year
              </label>
              <input
                
                type="text"
                id="passingYear"
                name="passingYear"
                value={cred.passingYear}
                onChange={onChange}
                placeholder="Enter Passed Year"
                style={{ borderRadius:'10px', marginTop: '-100px',width: '100%', padding: '8px', marginBottom: '15px', textAlign: 'center' }}
                aria-label="Passed Year"
                />
            </div>
          
            
            <div style={{ marginTop: '10%' }}>
              <label htmlFor="department" style={{ display: 'block', marginBottom: '15px' }}>
                Department
              </label>
              <input
                
                type="text"
                id="department"
                name="department"
                value={cred.department}
                onChange={onChange}
                placeholder="Enter Department"
                style={{ borderRadius:'10px', marginTop: '-100px',width: '100%', padding: '8px', marginBottom: '15px', textAlign: 'center' }}
                aria-label="Department"
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '20px',
              padding: '12px 52px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
            >
            Submit
          </button>
        </form>
      ) : ( 
        <form onSubmit={onOtpSubmit} style={{ marginTop: '10%' }}>
          <label htmlFor="otp" style={{ display: 'block', marginBottom: '5px' }}>
            Enter OTP
          </label>
          <input
            
            type="text"
            className='text_otp'
            id="otp"
            name="otp"
            value={otp}
            
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            style={{ width: '30%', padding: '8px',display:'block',margin:'auto', marginBottom: '15px', textAlign: 'center' }}
            aria-label="OTP"
            />
          <button
            type="submit"
            style={{
              padding: '12px 52px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              marginBottom:'15px',
              border: 'none',
              borderRadius: '4px',
            }}
            >
            Verify OTP
          </button>
        </form>
      )}
  </>
  )}
    </div>
  );
};

export default SignUp;
