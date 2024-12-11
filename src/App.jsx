import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

export const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState('');

  const handleLogin = async () => {
    try{
      const response = await axios.post('http://jwt.sulla.hu/login', { username, password });
      setToken(response.data.token);
      } catch (error) {
        console.error("Hitelesítés sikertelen: ", error)
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('http://jwt.sulla.hu/termekek', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Adatok betöltése sikertelen: ", error)
      }
    };

  return(
    <div>
      <h2>Bejelentkezés</h2>
      Felhasználónév: <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br />
      Jelszó: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Bejelentkezés</button>
      {token && (
        <div>
          <div>
            <h2>Védett végpont</h2>
            <button onClick={fetchData}>Adatok betöltése</button>
            {data && (
              <ul>
                {data.map((item) => (
                  <li key={item.id}>{item.nev} - {item.price}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
};
