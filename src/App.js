import React, { useState, useEffect } from 'react';
import './App.css';
//import Downloader from './Downloader';

function App() {
  const [textFirstInput, setTextFirstInput] = useState('');
  const [textSecondInput, setTextSecondInput] = useState('');
  const [selectUrl, setSelectUrl] = useState([]);

  const [imgUrl, setImgUrl] = useState(
    'https://memegen.link/tried/at_least/you_tried.jpg?preview=true&watermark=none',
  );

  //const [imageFont, setImageFont] = useState([]); // font

  useEffect(() => {
    fetch('https://memegen.link/api/templates/', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // Object.values shows all the links, KEYS should show all the names
        const imgData = Object.values(data); // meme- links

        //console.log('selectUrl:', imgData);
        // Update the dropdown list urls into NEW selectUrl, Array, use map to get each of url
        setSelectUrl(imgData); // set to new meme-links
      })
      .catch((e) => console.log(e));
  }, []);

  //useEffect(() => {
  //  fetch('https://memegen.link/api/fonts/') // get fonts
  //    .then((res) => res.json())
  //    .then((data) => {
  //       // get 20 fonts in array ========>>>>>imageFont updated
  //      setImageFont(Object.values(data));
  //    });
  //}, []);

  //  input current value
  function inputText(event) {
    setTextFirstInput(event.target.value);
  }

  function inputText2(event) {
    setTextSecondInput(event.target.value);
  }

  // update imgUrl with input value, get the hole Path, used  with button event
  function createURL() {
    setImgUrl(imgUrl + '/' + textFirstInput + '/' + textSecondInput);
  }

  //function createFont(e) {
  //  setImgUrl(
  //    imgUrl + '/' + selectName + '/' +
  //      textFirstInput +
  //      '/' +
  //      textSecondInput +
  //      '.jpg?font=' +
  //      imageFont
  //  );
  //}
  //https://memegen.link/joker/pick_a_different_font/people_lose_their_minds.jpg?font=typoline-demo

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
      {/*<select onChange={(e) => {
          setImgUrl(imgUrl + '/' + selectName + '/' +
          textFirstInput +
          '/' +
          textSecondInput +
          '.jpg?font=' +
      imageFont)}} >*/}
      {/* Show all the Dropdown - fonts  */}
      {/* {imageFont.map((font, i) => {
          return (
            <option key={i} value={font.replace('api/fonts/','')}>
              {font.replace('api/fonts/','')}
            </option>
          );
        })}
      </select>*/}
      <br />
      <input
        // style={{ font: imageFont }}

        value={textFirstInput}
        onChange={inputText}
      />
      <input
        //style={{ font: imageFont }}
        value={textSecondInput}
        onChange={inputText2}
      />
      <br />
      <button onClick={createURL}>Add Text!</button>
      {/*<button onClick={createFont}>Choose your font</button>*/}
      <button
        onClick={() => {
          setTextFirstInput('');
          setTextSecondInput('');
        }}
      >
        Clear
      </button>
      <br />
      <img src={imgUrl + '.jpg'} alt=" " /> <br />
      <a href={imgUrl + '.jpg'} download onClick={() => download()}>
        <i className="download" />
        Download this image
      </a>
    </div>
  );
}

export default App;
