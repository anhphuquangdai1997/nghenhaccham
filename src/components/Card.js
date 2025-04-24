import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/card.css';
import musics from '../assets/data';
import { timer } from '../utils/timer';
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { FaCloudUploadAlt } from "react-icons/fa";

const Card = ({ props: { musicNumber, setMusicNumber, setOpen, setOpen1, setOpen2, setOpen3, setOpenUpload } }) => {
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [volume, setVolume] = useState(50);
    const [showImage, setShowImage] = useState(true);
    const [repeat, setRepeat] = useState('repeat');
    const [currentLyricLine, setCurrentLyricLine] = useState(''); // Dòng lời hiện tại  
    const [nextLyricLine, setNextLyricLine] = useState(''); // Dòng lời tiếp theo  
    const [nextLyric, setNextLyric] = useState(10);
    const [errorLoading, setErrorLoading] = useState(false);
    const audioRed = useRef();

    // Kiểm tra xem nguồn bài hát có phải là base64 không
    const isBase64Source = (src) => {
        return typeof src === 'string' && src.startsWith('data:');
    };

    // Kiểm tra xem nguồn bài hát có phải là blob URL không
    const isBlobSource = (src) => {
        return typeof src === 'string' && src.startsWith('blob:');
    };

    // Tải và thiết lập thông tin bài hát  
    function handleLoadStart(e) {
        try {
            setErrorLoading(false);
            // Lấy nguồn bài hát
            const src = e.nativeEvent.srcElement.src;
            const audio = new Audio(src);

            audio.onloadedmetadata = function () {
                if (audio.readyState > 0) {
                    setDuration(audio.duration);
                }
            };

            audio.onerror = function (error) {
                console.error('Lỗi khi tải audio:', error);
                setErrorLoading(true);
                setPlay(false);
            };

            if (play) {
                const playPromise = audioRed.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(_ => {
                            // Bài hát bắt đầu phát thành công
                        })
                        .catch(error => {
                            console.error('Lỗi khi phát nhạc:', error);
                            setPlay(false);
                            setErrorLoading(true);
                        });
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải bài hát:', error);
            setErrorLoading(true);
            setPlay(false);
        }
    }

    // Bắt đầu hoặc tạm dừng phát nhạc  
    function handlePlayingAudio() {
        if (errorLoading) {
            // Nếu có lỗi tải nhạc, thông báo và không làm gì cả
            alert('Không thể phát bài hát này. Có thể do định dạng hoặc nguồn bài hát không hợp lệ.');
            return;
        }

        try {
            if (play) {
                audioRed.current.pause();
                setPlay(false);
            } else {
                const playPromise = audioRed.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(_ => {
                            setPlay(true);
                        })
                        .catch(error => {
                            console.error('Lỗi khi phát nhạc:', error);
                            setErrorLoading(true);
                            alert('Không thể phát bài hát này. Có thể do định dạng hoặc nguồn bài hát không hợp lệ.');
                        });
                }
            }
        } catch (error) {
            console.error('Lỗi khi phát/dừng nhạc:', error);
            setErrorLoading(true);
        }
    }

    // Cập nhật thời gian khi bài hát đang phát  
    function handleTimeUpdate() {
        if (!audioRed.current) return;

        const currentTime = audioRed.current.currentTime;
        setCurrentTime(currentTime);

        try {
            // Cập nhật dòng lời bài hát để hiển thị
            const currentSong = musics[musicNumber];
            if (!currentSong || !currentSong.lyrics || !currentSong.timerer) return;

            const lyrics = currentSong.lyrics.split('\n');
            const timerArray = currentSong.timerer;

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
        } catch (error) {
            console.error('Lỗi khi cập nhật lời bài hát:', error);
        }
    }

    // Thay đổi thời gian bài hát  
    const handleChangeTime = (e) => {
        if (errorLoading) return;

        try {
            const currentTime = Number(e.target.value);
            if (audioRed.current) {
                audioRed.current.currentTime = currentTime;
                setCurrentTime(currentTime);
            }
        } catch (error) {
            console.error('Lỗi khi thay đổi thời gian:', error);
        }
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
        setNextLyric('');
        setPlay(false); // Đảm bảo bài hát mới không tự động phát
        setErrorLoading(false); // Reset trạng thái lỗi
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

    // Lấy nguồn bài hát (base64 hoặc file)
    const getSongSource = () => {
        try {
            const currentSong = musics[musicNumber];
            if (!currentSong) return '';

            const src = currentSong.src;

            // Kiểm tra nếu là blob URL và trả về giá trị an toàn nếu không phải
            if (isBlobSource(src)) {
                console.error('Phát hiện blob URL không hợp lệ:', src);
                setErrorLoading(true);
                return '';
            }

            return src;
        } catch (error) {
            console.error('Lỗi khi lấy nguồn bài hát:', error);
            setErrorLoading(true);
            return '';
        }
    };

    // Lấy ảnh thumbnail (base64 hoặc URL)
    const getThumbnail = () => {
        try {
            const currentSong = musics[musicNumber];
            if (!currentSong) return '';

            return currentSong.thumbnail || '';
        } catch (error) {
            console.error('Lỗi khi lấy ảnh thumbnail:', error);
            return '';
        }
    };

    useEffect(() => {
        if (audioRed.current) {
            audioRed.current.volume = volume / 100;
        }
    }, [volume]);

    // Reset audio khi chuyển bài hát
    useEffect(() => {
        if (audioRed.current) {
            setCurrentTime(0);
            audioRed.current.currentTime = 0;
            setDuration(1); // Đặt lại duration mặc định
            setErrorLoading(false);
        }
    }, [musicNumber]);

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
                <p onClick={() => setOpenUpload(prev => !prev)} className="text-blue-500 hover:text-blue-700">
                    <FaCloudUploadAlt />
                </p>
            </div>
            <div onClick={() => setShowImage(prev => !prev)} className='detailss'>
                {showImage && ( // Chỉ hiển thị khi `showImage` là true
                    <div className={`img ${play ? 'playing' : ''}`}>
                        <img src={getThumbnail()} alt="" className={`${play ? 'playing' : ''}`} />
                        <div className="equalizer">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div className='details'>
                    <p className='text-red-500'>{musics[musicNumber]?.title || ''}</p>
                    <p className='artist'>{musics[musicNumber]?.artist || ''}</p>
                    {errorLoading && (
                        <p className="text-red-500 mt-2">Không thể tải bài hát này. Có thể do định dạng hoặc nguồn không hợp lệ.</p>
                    )}
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
            <audio src={getSongSource()} hidden onLoadStart={handleLoadStart} ref={audioRed} onTimeUpdate={handleTimeUpdate} />
        </div>
    );
}

export default Card;
