import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/card.css';
import musics from '../assets/data'
import { timer } from '../utils/timer';
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const Card = ({ props: { musicNumber, setMusicNumber, setOpen, setOpen1,setOpen2,setOpen3 } }) => {
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [volume, setVolume] = useState(50);
    const [repeat, setRepeat] = useState('repeat');
    const audioRed = useRef()

    function handleLoadStart(e) {
        const src = e.nativeEvent.srcElement.src;
        const audio = new Audio(src)
        audio.onloadedmetadata = function () {
            if (audio.readyState > 0) {
                setDuration(audio.duration)
            }
        }
        if (play) { audioRed.current.play() }
    }
    function handlePlayingAudio() {
        if (play) {
            audioRed.current.pause();
            setPlay(false)
        }
        else {
            audioRed.current.play();
            setPlay(true)
        }

    }
    function handleTimeUpdate() {
        const currentTime = audioRed.current.currentTime;
        setCurrentTime(currentTime)
    }
    function handleChangetime(e) {
        const currentTime = Number(e.target.value);
        audioRed.current.currentTime = currentTime;
        setCurrentTime(currentTime)
    }
    function handleNextPrev(n) {
        setMusicNumber(value => {
            if (n > 0) {
                return value + n > musics.length - 1 ? 0 : value + n;

            }
            return value + n < 0 ? musics.length - 1 : value + n
        })
    }
    function handlerepeat() {
        setRepeat(value => {
            switch (value) {
                case 'repeat':
                    return 'repeat_one';
                case 'repeat_one':
                    return 'shuffle'
                default:
                    return 'repeat';
            }
        })
    }
    useEffect(() => {
        audioRed.current.volume = volume / 100;

    }, [volume]);

    return (
        <div className='card'>
            <div className='nav'>
                <span onClick={() => setOpen3(prev => !prev)}><IoHomeOutline /></span>
                <span>
                    nghe nhạc {musicNumber + 1}/{musics.length}
                </span>
                <i className="material-icons" onClick={() => setOpen(prev => !prev)}>
                    queue_music
                </i>
                <i className="material-icons" onClick={() => setOpen2(prev => !prev)}>
                visibility
                </i>
                <p onClick={() => setOpen1(prev => !prev)}><FaSearch /></p>
                
            </div>
            <div className='img' >
                <img src={musics[musicNumber].thumbnail} alt="" className={`${play ? 'playing' : ''}`} />
            </div>
            <div className='details'>
                <p className='title'>{musics[musicNumber].title}</p>
                <p className='artist'>{musics[musicNumber].artist}</p>
            </div>
            <div className='progress'>
                <input type='range' min={0} max={duration} value={currentTime} onChange={e => handleChangetime(e)} />
            </div>
            <div className='timer'>
                <span>{timer(currentTime)}</span>
                <span>{timer(duration)}</span>
            </div>
            <div className='controls'>
                <i className="material-icons" onClick={handlerepeat}>{repeat}</i>
                <i className="material-icons" id='prev' onClick={() => handleNextPrev(-1)}>skip_previous</i>
                <div className='play' onClick={handlePlayingAudio}>
                    <i className="material-icons">{play ? 'pause' : 'play_arrow'}</i>
                </div>
                <i className="material-icons" id='next' onClick={() => handleNextPrev(1)}>skip_next</i>
                <i className="material-icons" onClick={() => setShowVolume(prev => !prev)}>{volume === 0 ? 'volume_off' : 'volume_up'}</i>
                <div className={`volume ${showVolume ? 'show' : ''}`}>
                    <i className="material-icons" onClick={() => setVolume(v => v > 0 ? 0 : 100)}>{volume === 0 ? 'volume_off' : 'volume_up'}</i>
                    <input type='range' min={0} max={100} onChange={(e) => setVolume(Number(e.target.value))} value={volume} />
                    <span>{volume}</span>
                </div>
            </div>
            <audio src={musics[musicNumber].src} hidden onLoadStart={handleLoadStart} ref={audioRed} onTimeUpdate={handleTimeUpdate} />
        </div >
    )
}

export default Card
