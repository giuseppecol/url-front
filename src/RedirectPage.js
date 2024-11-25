import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const history = useNavigate ();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setLoading(false);
        window.location.href = axios.defaults.baseURL + `/${shortCode}`;  
      } catch (err) {
        setLoading(false);
        console.error('Error', err);
      }
    };

    fetchUrl();
  }, [shortCode]);

  return (
    <div>
      {loading ? (
        <div>
          <p>Wait a moment...</p>
          <div className="loader"></div> {

          }
        </div>
      ) : null}
    </div>
  );
};

export default RedirectPage;
