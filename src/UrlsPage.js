import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UrlsPage.css'; // Make sure to import the CSS file

const UrlsPage = () => {
  const [urls, setUrls] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/urls', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUrls(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/url/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUrls(urls.filter((url) => url.id !== id));
    } catch (err) {
      console.error('Error when deleting', err);
    }
  };

  const handleClick = (shortCode) => {
    const fullUrl = `/redirect/${shortCode}`; // Construct the full URL
    window.open(fullUrl, '_blank'); // Open in new tab
  };

  return (
    <div className="urls-page-container">
      <h2>My Shortened URLs</h2>
      <button onClick={() => history('/create-url')}>+ Create a new shortened URL</button>
      <div className="table-container">
        <table className="urls-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Original URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id}>
                <td>{url.id}</td>
                <td>{url.short_code}</td>
                <td>{url.original_url}</td>
                <td>
                  <button onClick={() => handleClick(url.short_code)}>Open</button>
                  <button onClick={() => handleDelete(url.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlsPage;
