import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBox from './Components/SearchBar';

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const result = await axios.get('http://www.mocky.io/v2/5ba8efb23100007200c2750c');
      setUser(result.data);
    };
    getUser();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <SearchBox placeholder='Search users by ID, place, name...' data={ user } />
      </header>
    </div>
  );
}

export default App;
