import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/card.css';
import musics from '../assets/data';
import { timer } from '../utils/timer';
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import TabBar from './TabBar';
const Card = ({ props: { musicNumber, setMusicNumber, setOpen, setOpen1, setOpen2, setOpen3, setOpenUpload, setOpenTabs, setCurrentPage } }) => {
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [volume, setVolume] = useState(50);
    const [showImage, setShowImage] = useState(true);
    const [repeat, setRepeat] = useState('repeat');
    const [currentLyricLine, setCurrentLyricLine] = useState(''); // Dòng lời hiện tại  
    const [nextLyricLine, setNextLyricLine] = useState(''); // Dòng lời tiếp theo  
    const [nextLyric, setNextLyric] = useState([]);
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
            const currentSong = musics[musicNumber];
            if (!currentSong || !currentSong.lyrics || !currentSong.timerer) return;

            const lyrics = currentSong.lyrics.split('\n');
            const timerArray = currentSong.timerer;

            for (let i = 0; i < timerArray.length; i++) {
                if (currentTime >= timerArray[i] && (i === timerArray.length - 1 || currentTime < timerArray[i + 1])) {
                    setCurrentLyricLine(lyrics[i]?.trim() || '');
                    setNextLyricLine(lyrics[i + 1]?.trim() || '');
                    const nextLines = lyrics.slice(i + 1, i + 4).map(line => line.trim()).filter(Boolean);
                    setNextLyric(nextLines);
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
        setNextLyric([]);
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

    const handleHomeClick = () => {
        setOpen3(true);
        setCurrentPage('home');
    };

    return (
        <div className='card w-full sm:w-[640px] h-[340px] sm:h-[440px] rounded-xl relative overflow-hidden'>
            <div className='top-bar flex items-center justify-between px-[2rem] py-[1rem]'>
                <IoHomeOutline onClick={handleHomeClick} className='text-[1.2rem] cursor-pointer hover:text-blue-500' />
                <div className='flex items-center gap-[1.7rem]'>
                    <FaSearch className='text-[1.2rem] cursor-pointer hover:text-blue-500' onClick={() => setOpen1(true)} />
                    <FaCloudUploadAlt className='text-[1.2rem] cursor-pointer hover:text-blue-500' onClick={() => setOpenUpload(true)} />
                    <SiYoutubeshorts className='text-[1.2rem] cursor-pointer hover:text-blue-500' onClick={() => setOpenTabs(true)} title="Open Tabs Demo" />
                </div>
            </div>
            <div className='nav'>
                <i className="material-icons" onClick={() => setOpen(prev => !prev)}>
                    queue_music
                </i>
                <i className="material-icons" onClick={() => setOpen2(prev => !prev)}>
                    visibility
                </i>
            </div>
            <div className='flex justify-center p-2'><TabBar setShowImage={setShowImage} /></div>
            <div className='detailss'>
                <div className="img-section">
                    {showImage && (<div className={`img ${play ? 'playing' : ''}`}>
                        <img src={getThumbnail()} alt="" className={`${play ? 'playing' : ''}`} />
                    </div>)}

                    {showImage && (<div className="audio-waves">
                        {[...Array(30)].map((_, index) => (
                            <div
                                key={index}
                                className="wave"
                                style={{
                                    height: `${Math.random() * 100}%`,
                                    animationDelay: `${index * 0.05}s`
                                }}
                            />
                        ))}
                    </div>)}
                </div>
                <div className="content-section">
                    <div className="details">
                        <div className='p-4 rounded-[12px] shadow-lg relative overflow-hidden'>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-90"></div>
                            <div className="absolute inset-0 water-droplets"></div>
                            <div className="relative z-10">
                                <p className="water-text text-2xl font-bold mb-2" data-text={musics[musicNumber]?.title || ''}>{musics[musicNumber]?.title || ''}</p>
                                <p className="water-text text-lg italic" data-text={musics[musicNumber]?.artist || ''}>({musics[musicNumber]?.artist || ''})</p>
                            </div>
                        </div>
                        {errorLoading && (
                            <p className="text-red-500 mt-2">Không thể tải bài hát này. Có thể do định dạng hoặc nguồn không hợp lệ.</p>
                        )}
                        {!showImage && (<div className="lyrics-section mt-4">
                            {currentLyricLine && (
                                <div className={`karaoke-container ${play ? 'playing' : ''}`}>
                                    <p className="current-line">
                                        {currentLyricLine.split(' ').map((word, index) => (
                                            <span
                                                key={index}
                                                className="highlight-word"
                                                style={{
                                                    '--delay': index,
                                                    animationDelay: `${index * 0.1}s`
                                                }}
                                            >
                                                {word}
                                            </span>
                                        ))}
                                    </p>
                                    {nextLyricLine && (
                                        <p className="next-line">{nextLyricLine}</p>
                                    )}
                                    {nextLyric.length > 0 && (
                                        <div className="upcoming-lyrics">
                                            {nextLyric.map((line, index) => (
                                                <p
                                                    key={index}
                                                    className="upcoming-line"
                                                    style={{
                                                        '--delay': index + 1
                                                    }}
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>)}
                    </div>
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
                                <input
                                    type='range'
                                    min={0}
                                    max={100}
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    value={volume}
                                    style={{
                                        '--volume-percentage': `${volume}%`
                                    }}
                                />
                                <span className="volume-value">{volume}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <audio src={getSongSource()} hidden onLoadStart={handleLoadStart} ref={audioRed} onTimeUpdate={handleTimeUpdate} />
        </div>
    );
}

export default Card;
