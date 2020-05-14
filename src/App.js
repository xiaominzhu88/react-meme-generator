import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [textFirstInput, setTextFirstInput] = useState('');
  const [textSecondInput, setTextSecondInput] = useState('');
  const [selectUrl, setSelectUrl] = useState([]);
  const [imgUrl, setImgUrl] = useState(
    'https://memegen.link/tried/at_least/you_tried.jpg?preview=true&watermark=none',
  );

  // fetch url and get data values
  useEffect(() => {
    fetch('https://memegen.link/api/templates/', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // Object.values shows all the links, KEYS should show all the names
        const imgData = Object.values(data);

        // Here undate the dropdown list urls into NEW selectUrl, it is an Array, in return map over this Array to get each of url
        setSelectUrl(imgData);
      })
      .catch((e) => console.log(e));
  }, []);

  // get input possible
  function inputText(event) {
    setTextFirstInput(event.target.value);
  }

  function inputText2(event) {
    setTextSecondInput(event.target.value);
  }
  // update imgUrl with input value, get the hole Path, used  with button event
  function createURL(e) {
    setImgUrl(imgUrl + '/' + textFirstInput + '/' + textSecondInput + '.jpg');
  }

  return (
    <div className="App">
      <h1>React-meme-Generator</h1>

      <br />

      {/* Create Dropdown List to show all the fetched data-links */}
      <select
        onChange={(e) => {
          setImgUrl(e.target.value);
        }}
      >
        {/* Show all the Dropdown List Values */}

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
      <input value={textSecondInput} onChange={inputText2} />

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

      {/* Good idea : check the current imgUrl */}

      {/*<p>{imgUrl}</p>*/}
      <br />
      <img src={imgUrl + '.jpg'} alt=" " />
    </div>
  );
}

export default App;
