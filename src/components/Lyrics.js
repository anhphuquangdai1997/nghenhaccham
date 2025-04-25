import React, { useState } from 'react';
import musics from '../assets/data';
import './Lyrics.css';
import { IoClose } from 'react-icons/io5';

export default function Lyrics({ props: { open2, setOpen2, musicNumber } }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`lyrics-container ${open2 ? 'show' : ''}`}>
      <div className="lyrics-header">
        <h2>Lời Bài Hát</h2>
        <button className="close-button" onClick={() => setOpen2(false)}>
          <IoClose size={24} />
        </button>
      </div>

      <div className="lyrics-content">
        <div className="title-animated">
          <h3 className="song-title">{musics[musicNumber].title}</h3>
        </div>

        <div className="lyrics-text">
          {musics[musicNumber].lyrics.split('\n').map((line, index) => (
            <p
              key={index}
              className={`lyrics-line ${hoveredIndex === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
