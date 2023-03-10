import React, { useState, useEffect, useRef } from 'react'
import '../stylesheets/searchbar.css';
import Card from './Card';

const useKeyPress = function(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  React.useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
  
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export default function SearchBar({ placeholder, data }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResult, setFilteredResult] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
    
   const refs = filteredResult.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
   }, {});

  const handleClick = id => {
    return refs[id]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  
  useEffect(() => {
    if (filteredResult?.length && downPress) {
      setCursor(prevState =>
        prevState < filteredResult?.length - 1 ? prevState + 1 : prevState
      );
      handleClick(selected?.id);
    }
  }, [downPress]);

  useEffect(() => {
    if (filteredResult?.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
    handleClick(selected?.id)
  }, [upPress]);

  useEffect(() => {
    if (filteredResult?.length) {
      setSelected(filteredResult[cursor]);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (filteredResult.length && hovered) {
      setCursor(filteredResult?.indexOf(hovered));
    }
  }, [hovered]);
  
  const handleSearch = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setFilteredResult([])
      setSearching(false);
    }
    if (value?.length > 0) {
      searchItems(value);
      setSearching(true);
    }
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput.length !== 0) {
      const filteredData = data.filter((item) => {
        return Object.values(item).join(' ').toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredResult(filteredData);
    }
  };

  return (
    <div className='search'>
      <div className='searchInput'>
        <input type="text" placeholder={placeholder} data={data} onChange={handleSearch} />
      </div>
      {
        filteredResult?.length > 0 ? (
          <div className='searchResult'>
            {filteredResult.map((data, i) => (
              <Card
                innerRef={refs[data.id]}
                key={data.id} data={data} searchInput={searchInput}
                filteredResult={filteredResult} active={i === cursor}
                setSelected={setSelected} setHovered={setHovered} />
            ))}
          </div>
          ) : (
          <>
            {searching ? (
              <div className='searchResult'>No user found</div>
            ) : (
                null
            )}
          </>  
        )
      }
    </div>  
  )
}
