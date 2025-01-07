import React from 'react';
import musics from '../assets/data'

export default function Lyrics({ props: { open2, setOpen2,musicNumber } }) {

    return (
        <div className={`listt ${open2 ? 'show' : ''}`}>
            <div className="header">
                Lời Bài Hát:
                <i className="material-icons" onClick={() => setOpen2(false)}>close</i>
            </div >
            <div className="noidung">
                <h3 className='title'>{musics[musicNumber].title}</h3>
                <hr />
                <p style={{padding:'10px 39px'}}>
                    {musics[musicNumber].lyrics}
                </p>
            </div>
        </div >
    )
}
