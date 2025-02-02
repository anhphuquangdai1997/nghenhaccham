import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/card.css';
import musics from '../assets/data';
import { timer } from '../utils/timer';
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";

const Card = ({ props: { musicNumber, setMusicNumber, setOpen, setOpen1, setOpen2, setOpen3 } }) => {
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [volume, setVolume] = useState(50);
    const [showImage, setShowImage] = useState(true);
    const [repeat, setRepeat] = useState('repeat');
    const [currentLyricLine, setCurrentLyricLine] = useState(''); // Dòng lời hiện tại  
    const [nextLyricLine, setNextLyricLine] = useState(''); // Dòng lời tiếp theo  
    const [nextLyric, setNextLyric] = useState(10)
    const audioRed = useRef();

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
        const timerArray = musics[musicNumber].timerer;

        // Tìm dòng lời cần hiển thị tương ứng với thời gian bài hát hiện tại
        for (let i = 0; i < timerArray.length; i++) {
            if (currentTime >= timerArray[i]) {
                setCurrentLyricLine(lyrics[i]); // Cập nhật dòng lời hiện tại
                setNextLyricLine(lyrics[i + 1] || ''); // Cập nhật dòng lời tiếp theo
                const nextLyrics = lyrics.slice(i + 1, i + 5);
                setNextLyric(nextLyrics)
            } else {
                break;
            }
        }
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
        setCurrentLyricLine(''); // Reset dòng lời khi chuyển bài hát mới  
        setNextLyricLine(''); // Reset dòng lời tiếp theo
        setNextLyric('')
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
            <div onClick={() => setShowImage(prev => !prev)} className='detailss'>
                {showImage && ( // Chỉ hiển thị khi `showImage` là true
                    <div className='img'>
                        <img src={musics[musicNumber].thumbnail} alt="" className={`${play ? 'playing' : ''}`} />
                    </div>
                )}
                <div className='details'>
                    <p className='text-red-500'>{musics[musicNumber].title}</p>
                    <p className='artist'>{musics[musicNumber].artist}</p>
                    <div className='lyrics text-[20px] py-5'>
                        {currentLyricLine && (  // Chỉ hiển thị dòng lời nếu có
                            <p className='text-[20px] text-green-500'>{currentLyricLine}</p>
                        )}
                    </div>
                    {showImage ? (<div className='lyrics text-[20px]'>
                        {nextLyricLine && (  // Chỉ hiển thị dòng tiếp theo nếu có
                            <p className='text-[15px] justify-center text-gray-400'>{nextLyricLine}</p>
                        )}
                    </div>) : (<div className='lyrics text-[40px]'>
                        {nextLyric && (  // Chỉ hiển thị dòng tiếp theo nếu có
                            <p className='text-[20px] text-gray-400 leading-[2.5] '>{nextLyric}</p>
                        )}
                    </div>)}
                </div>
            </div>
            {showImage ? (
                <div className='daiphu'>
                    <div>
                        <input
                            className="w-full h-2 bg-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleChangeTime}
                            style={{
                                accentColor: 'gray',
                            }}
                        />
                    </div>
                    <div className='timer'>
                        <span>{timer(currentTime)}</span>
                        <span>{timer(duration)}</span>
                    </div>
                    <div className='controls'>
                        <i className="material-icons" onClick={handleRepeat}>{repeat}</i>
                        <i className="material-icons" id='prev' onClick={() => handleNextPrev(-1)}>skip_previous</i>
                        <div className='text-md cursor-pointer p-3 rounded-full border-2 border-gray-400 hover:border-green-400' onClick={handlePlayingAudio}>{play ? (<CiPause1 />) : (<CiPlay1 />)}</div>
                        <i className="material-icons" id='next' onClick={() => handleNextPrev(1)}>skip_next</i>
                        <i className="material-icons" onClick={() => setShowVolume(prev => !prev)}>
                            {volume === 0 ? 'volume_off' : 'volume_up'}
                        </i>
                        <div className={`volume ${showVolume ? 'show' : ''}`}>
                            <input type='range' min={0} max={100} onChange={(e) => setVolume(Number(e.target.value))} value={volume} />
                        </div>
                    </div>
                </div>) : (<><div>
                    <input className='w-full h-1' type='range' min={0} max={duration} value={currentTime} onChange={handleChangeTime} />
                </div>
                    <div className='timer'>
                        <span>{timer(currentTime)}</span>
                        <span>{timer(duration)}</span>
                    </div></>)}
            <audio src={musics[musicNumber].src} hidden onLoadStart={handleLoadStart} ref={audioRed} onTimeUpdate={handleTimeUpdate} />
        </div>
    );
}

export default Card;
