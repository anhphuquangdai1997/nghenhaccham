import React, { useEffect, useRef, useState } from 'react';  
import '../assets/css/card.css';  
import musics from '../assets/data';  
import { timer } from '../utils/timer';  
import { FaSearch } from "react-icons/fa";  
import { IoHomeOutline } from "react-icons/io5";  

const Card = ({ props: { musicNumber, setMusicNumber, setOpen, setOpen1, setOpen2, setOpen3 } }) => {  
    const [duration, setDuration] = useState(1);  
    const [currentTime, setCurrentTime] = useState(0);  
    const [play, setPlay] = useState(false);  
    const [showVolume, setShowVolume] = useState(false);  
    const [volume, setVolume] = useState(50);  
    const [repeat, setRepeat] = useState('repeat');  
    const [currentLyricLine, setCurrentLyricLine] = useState(0); // Dòng lời hiện tại  
    const audioRed = useRef();  

    const linesPerPage = 3; // Số dòng lời bài hát hiển thị mỗi lần  

    // Tải và thiết lập thông tin bài hát  
    function handleLoadStart(e) {  
        const src = e.nativeEvent.srcElement.src;  
        const audio = new Audio(src);  
        audio.onloadedmetadata = function () {  
            if (audio.readyState > 0) {  
                setDuration(audio.duration);  
            }  
        };  
        if (play) { audioRed.current.play(); }  
    }  

    // Bắt đầu hoặc tạm dừng phát nhạc  
    function handlePlayingAudio() {  
        if (play) {  
            audioRed.current.pause();  
            setPlay(false);  
        } else {  
            audioRed.current.play();  
            setPlay(true);  
        }  
    }  

    // Cập nhật thời gian khi bài hát đang phát  
    function handleTimeUpdate() {  
        const currentTime = audioRed.current.currentTime;  
        setCurrentTime(currentTime);  

        // Cập nhật dòng lời bài hát để hiển thị  
        const lyrics = musics[musicNumber].lyrics.split('\n');  
        const totalLines = lyrics.length;  

        // Cập nhật chỉ số dòng lời hiện tại dựa trên thời gian  
        const newLineIndex = Math.floor(currentTime / (duration / (totalLines / linesPerPage)));  
        setCurrentLyricLine(Math.min(newLineIndex, totalLines - linesPerPage));  
    }  

    // Thay đổi thời gian bài hát  
    const handleChangeTime = (e) => {  
        const currentTime = Number(e.target.value);  
        audioRed.current.currentTime = currentTime;  
        setCurrentTime(currentTime);  
    };  

    // Chuyển bài hát tiếp theo hoặc trước đó  
    const handleNextPrev = (n) => {  
        setMusicNumber(value => {  
            if (n > 0) {  
                return value + n > musics.length - 1 ? 0 : value + n;  
            }  
            return value + n < 0 ? musics.length - 1 : value + n;  
        });  
        setCurrentLyricLine(0); // Reset dòng lời khi chuyển bài hát mới  
    };  

    // Chuyển đổi chế độ phát lại  
    const handleRepeat = () => {  
        setRepeat(value => {  
            switch (value) {  
                case 'repeat':  
                    return 'repeat_one';  
                case 'repeat_one':  
                    return 'shuffle';  
                default:  
                    return 'repeat';  
            }  
        });  
    };  

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
            <div className='img'>  
                <img src={musics[musicNumber].thumbnail} alt="" className={`${play ? 'playing' : ''}`} />  
            </div>  
            <div className='details'>  
                <p className='text-red-500'>{musics[musicNumber].title}</p>  
                <p className='artist'>{musics[musicNumber].artist}</p>  
                <div className='lyrics text-[20px] py-5'>  
                    {musics[musicNumber].lyrics.split('\n').slice(currentLyricLine, currentLyricLine + linesPerPage).map((line, index) => (  
                        <p key={index} className={index === 0 ? 'text-[20px] text-green-500' : 'text-[15px] text-gray-500'} >  
                            {line}  
                        </p>  
                    ))}  
                </div>  
            </div>  
            <div className='daiphu'>  
                <div className='progress'>  
                    <input type='range' min={0} max={duration} value={currentTime} onChange={handleChangeTime} />  
                </div>  
                <div className='timer'>  
                    <span>{timer(currentTime)}</span>  
                    <span>{timer(duration)}</span>  
                </div>  
                <div className='controls'>  
                    <i className="material-icons" onClick={handleRepeat}>{repeat}</i>  
                    <i className="material-icons" id='prev' onClick={() => handleNextPrev(-1)}>skip_previous</i>  
                    <div className='play' onClick={handlePlayingAudio}>  
                        <i className="material-icons">{play ? 'pause' : 'play_arrow'}</i>  
                    </div>  
                    <i className="material-icons" id='next' onClick={() => handleNextPrev(1)}>skip_next</i>  
                    <i className="material-icons" onClick={() => setShowVolume(prev => !prev)}>  
                        {volume === 0 ? 'volume_off' : 'volume_up'}  
                    </i>  
                    <div className={`volume ${showVolume ? 'show' : ''}`}>  
                        <i className="material-icons" onClick={() => setVolume(v => (v > 0 ? 0 : 100))}>  
                            {volume === 0 ? 'volume_off' : 'volume_up'}  
                        </i>  
                        <input type='range' min={0} max={100} onChange={(e) => setVolume(Number(e.target.value))} value={volume} />  
                        <span>{volume}</span>  
                    </div>  
                </div>  
            </div>  
            <audio src={musics[musicNumber].src} hidden onLoadStart={handleLoadStart} ref={audioRed} onTimeUpdate={handleTimeUpdate} />  
        </div>  
    );  
}  

export default Card;