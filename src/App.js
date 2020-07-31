import React, { useState, useEffect } from 'react';
import './App.css';
//import Downloader from './Downloader';

function App() {
  const [textFirstInput, setTextFirstInput] = useState('');
  const [textSecondInput, setTextSecondInput] = useState('');
  const [selectUrl, setSelectUrl] = useState([]);
  const [imgUrl, setImgUrl] = useState('https://memegen.link/tried');
  const [imageFont, setImageFont] = useState([]); // font
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch('https://memegen.link/api/templates/', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // Object.values shows all the links, KEYS should show all the names
        const imgData = Object.values(data); // meme- links

        console.log('selectUrl:', imgData);
        // Update the dropdown list urls into NEW selectUrl, Array, use map to get each of url
        setSelectUrl(imgData); // set to new meme-links
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetch('https://memegen.link/api/fonts/') // get fonts
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // get 20 fonts in array ========>>>>>imageFont updated
        setImageFont(data);
      });
  }, []);

  //  input current value
  function inputText(event) {
    setTextFirstInput(event.target.value);
  }

  function inputText2(event) {
    setTextSecondInput(event.target.value);
  }

  // update imgUrl with input value, get the whole Path, used with button
  function createURL() {
    if (textFirstInput && textSecondInput !== '') {
      setImgUrl(imgUrl + '/' + textFirstInput + '/' + textSecondInput);
    } else {
      alert('Please enter your Text');
    }
  }

  const download = () => {
    const element = document.createElement('a');
    const file = new Blob(selectUrl, { type: 'image/jpg' });
    element.href = URL.createObjectURL(file);
    element.download = 'image.jpg';
    element.click();
  };

  return (
    <div className="App">
      <h1>React-meme-Generator</h1>
      <br />
      {/* Create Dropdown List to show all the fetched data-links */}
      <label
        style={{ fontFamily: 'monospace', color: 'green', fontWeight: 700 }}
      >
        Choose Image:{' '}
      </label>
      <br />
      <select onChange={(e) => setImgUrl(e.target.value)}>
        {selectUrl.map((url, i) => {
          return (
            <option key={i} value={url.replace('api/templates/', '')}>
              {/* use replace to get ONLY the img NAME in the option */}
              {url.replace('https://memegen.link/api/templates/', '')}
            </option>
          );
        })}
      </select>
      <br />
      <input
        value={textFirstInput}
        onChange={(e) => inputText(e)}
        placeholder="enter text"
      />
      <input
        value={textSecondInput}
        onChange={(e) => inputText2(e)}
        placeholder="enter text"
      />
      <br />
      <button onClick={createURL}>Add Text!</button>
      {/* reload window to default */}
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Clear
      </button>
      <br />
      <img
        src={imgUrl + '.jpg'}
        alt=" "
        style={{ display: !show ? 'block' : 'none' }}
      />{' '}
      <br />
      <img
        src={imgUrl}
        alt=" "
        style={{ display: show ? 'block' : 'none' }}
      />{' '}
      <label
        style={{ fontFamily: 'monospace', color: 'green', fontWeight: 700 }}
      >
        Choose Font:{' '}
      </label>
      <br />
      <select
        onChange={(e) => {
          if (textFirstInput && textSecondInput !== '') {
            setImgUrl(imgUrl + '.jpg?font=' + e.target.value);
            setShow(true);
          } else {
            alert('enter text');
          }
        }}
      >
        {/* Show all the Dropdown - fonts  */}

        {imageFont.map((font, i) => {
          return (
            <option key={i} value={font}>
              {font}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      <a href={imgUrl + '.jpg'} download onClick={() => download()}>
        <i className="download" />
        Download this image
      </a>
    </div>
  );
}

export default App;
