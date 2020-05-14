import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [textFirstInput, setTextFirstInput] = useState('');
  const [textSecondInput, setTextSecondInput] = useState('');
  const [selectUrl, setSelectUrl] = useState([]);
  const [imgUrl, setImgUrl] = useState(
    'https://memegen.link/tried/at_least/you_tried.jpg?preview=true&watermark=none',
  );
// fetch site and get data values
  useEffect(() => {
    fetch('https://memegen.link/api/templates/', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        const imgData = Object.values(data);
        setSelectUrl(imgData);
      })
      .catch((e) => console.log(e));
  }, []);

  function inputText(event) {
    setTextFirstInput(event.target.value);
  }

  function inputText2(event) {
    setTextSecondInput(event.target.value);
  }
  
  function createURL(e) {
    setImgUrl(imgUrl + '/' + textFirstInput + '/' + textSecondInput + '.jpg');
  }

  return (
    <div className="App">
      <h1>React-meme-Generator</h1>

      <br />
      <select
        onChange={(e) => {
          setImgUrl(e.target.value);
        }}
      >
        {selectUrl.map((name, i) => {
          return (
            <option key={i} value={name.replace('api/templates/', '')}>
              {name.replace('api/templates/', '')}
            </option>
          );
        })}
      </select>

      <br />

      <input value={textFirstInput} onChange={inputText} />
      <input
        value={textSecondInput}
        onChange={inputText2}
      
      />

      <br />
      <button onClick={createURL}>Go for text image!</button>

      <button
        onClick={() => {
          setTextFirstInput('');
          setTextSecondInput('');
        }}
      >
        Clear
      </button>
      <p>{imgUrl}</p>
      <br />
      <img src={imgUrl + '.jpg'} alt=" " />
    </div>
  );
}

export default App;
