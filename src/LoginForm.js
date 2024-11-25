import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering ? '/api/register' : '/api/login';
    
    try {
      const response = await axios.post(url, { email, password, name });
      localStorage.setItem('token', response.data.token);
      navigate('/urls');  
    } catch (err) {
      setError('Error ');
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
      {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Alreaady have an account? Login' : '¿Dont have an account? Register'}
      </button>
    </div>
  );
};

export default LoginForm;
