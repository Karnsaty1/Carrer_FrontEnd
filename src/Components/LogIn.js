import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LogIn = () => {
  const navigate = useNavigate();
  const uniqueId = uuidv4();
  const [cred, setCred] = useState({ email: '', password: '' });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader]=useState(false);
  const [showPassword, setShowPassword]=useState(false);
  const toggleVisibility=()=>{
    setShowPassword((prev)=>!prev);
   }

  const handleBrandClick = () => {
    navigate(`/home/${uniqueId}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/user/auth/logIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(cred),
      });

      console.log(process.env.REACT_APP_URL);
      if (response.ok) {
        setShowOtp(true);
        setError('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    finally{
      setLoader(false);
    };
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await fetch(`${process.env.REACT_APP_URL}/user/auth/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ email: cred.email, otp, signUp: false }),
      });

      if (response.ok) {
        navigate(`/card/${uniqueId}`);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      console.log(err)
      setError('An error occurred. Please try again.');
    }
   
  };

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1
        onClick={handleBrandClick}
        style={{ cursor: 'pointer', marginTop: '0' }}
      >
        LogIn
      </h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      { loader? (<Loading/>):(<>
      
      
      
      {showOtp ? (
        <form onSubmit={onOtpSubmit} style={{ marginTop: '10%' }}>
          <label htmlFor="otp" style={{marginTop:'-100px', display: 'block', marginBottom: '5px' }}>
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: '30%', padding: '8px',display:'block',margin:'auto', marginBottom: '15px', textAlign: 'center' }}
            placeholder="Enter OTP"
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
      ) : (
        <form
        onSubmit={onSubmit}
        style={{
          display: 'grid',
          justifyContent: 'center',
          marginTop: '10%',
          textAlign: 'center',
        }}
        >
          <div style={{ marginTop: '10%' }}>
            <label htmlFor="email" style={{ marginTop:'-100px', display: 'block', marginBottom: '5px' }}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={cred.email}
              onChange={onChange}
              placeholder="Enter email"
              style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
              aria-label="Email Address"
              />
          </div>
          <div style={{position:'relative', marginTop: '10%' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password
            </label>
            <input
              type={showPassword?'text':'password'}
              id="password"
              name="password"
              value={cred.password}
              onChange={onChange}
              placeholder="Password"
              style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
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
          <button
            type="submit"
            style={{
              marginTop: '30px',
              padding: '10px 20px',
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
      )}
            </>)}
    </div>
  );
};

export default LogIn;
