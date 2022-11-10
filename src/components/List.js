import React, { useEffect, useState } from 'react';
import musics from '../assets/data';
import '../assets/css/list.css';
import { timer } from '../utils/timer';


const List = ({ props: { open, setOpen, musicNumber, setMusicNumber } }) => {
    return (
        <div className={`list ${open ? 'show' : ''}`}>
            <div className="header">
                <div>
                    <i className="material-icons">queue_music</i>
                    <span>Music list</span>
                </div>
                <i className="material-icons" onClick={() => setOpen(false)}>close</i>
            </div >
            <ul>
                {
                    musics.map((music, index) => (
                        <li key={music.id} className={`${musicNumber === index ? 'playing' : ''}`} onClick={() => setMusicNumber(index)}>
                            <div className='row'>
                                <img src={music.thumbnail} className='image' alt='hello' />
                                <div>
                                    <span>{music.title}</span>
                                    <p>{music.artist}</p>
                                </div>
                            </div>
                            <Duration music={music} />
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default List

const Duration = ({ music }) => {
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        const audio = new Audio(music.src)
        audio.onloadedmetadata = function () {
            if (audio.readyState > 0) {
                setDuration(audio.duration)
            }
        }
    }, [music]);
    return (<span className='duration'>{timer(duration)}</span>)
}
