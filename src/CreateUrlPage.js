import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const CreateUrlPage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const history = useNavigate();

  const handleCreateUrl = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/shorten',
        { url: originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history('/urls');  
    } catch (err) {
      console.error('Error when creating', err);
    }
  };

  return (
    <div>
      <h2>Crear Nueva URL</h2>
      <form onSubmit={handleCreateUrl}>
        <input
          type="url"
          placeholder="Original Url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUrlPage;
