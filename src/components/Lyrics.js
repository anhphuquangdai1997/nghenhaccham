import React from 'react';
import musics from '../assets/data';

export default function Lyrics({ props: { open2, setOpen2, musicNumber } }) {
  return (
    <div className={`listt ${open2 ? 'show' : ''}`}>
      <div className="header">
        Lời Bài Hát:
        <i className="material-icons" onClick={() => setOpen2(false)}>close</i>
      </div>
      <div className="noidung">
        <h3 className="title text-red-500 text-xl">{musics[musicNumber].title}</h3>
        <hr />
        <div className="text-[#fff]" style={{ padding: '10px 39px' }}>
          {musics[musicNumber].lyrics.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
