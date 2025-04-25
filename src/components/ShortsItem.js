import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiOutlineShareAlt, AiOutlineClose } from 'react-icons/ai';
import { BsPlay, BsPause } from 'react-icons/bs';
import { MdMusicNote } from 'react-icons/md';

const ShortsItem = ({ item, index, isActive, onTogglePlay }) => {
    const [liked, setLiked] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const handleLikeClick = (e) => {
        e.stopPropagation();
        setLiked(!liked);
    };

    // Hide controls after a few seconds when playing
    useEffect(() => {
        let timer;
        if (item.isPlaying) {
            timer = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        } else {
            setShowControls(true);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [item.isPlaying]);

    // Show controls on mouse movement
    const handleMouseMove = () => {
        if (item.isPlaying) {
            setShowControls(true);
            // Reset the timer when there's mouse movement
            const timer = setTimeout(() => {
                setShowControls(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    };

    return (
        <div
            className={`relative h-full w-full snap-start shrink-0 rounded-xl overflow-hidden 
                ${isActive ? 'opacity-100' : 'opacity-70'}`}
            style={{
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${item.image}) no-repeat center/cover`
            }}
            onMouseMove={handleMouseMove}
        >
            {item.isPlaying && item.videoId ? (
                <div className="absolute inset-0 z-10 bg-black">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&controls=1&showinfo=0&rel=0`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                    {showControls && (
                        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black to-transparent z-20">
                            <h3 className="text-white font-medium truncate mr-2">{item.title}</h3>
                            <button
                                onClick={() => onTogglePlay(index)}
                                className="text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
                            >
                                <AiOutlineClose />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                    <div className="flex justify-end">
                        <button
                            onClick={() => onTogglePlay(index)}
                            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                            <BsPlay className="text-2xl ml-1" />
                        </button>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <MdMusicNote />
                            </div>
                            <span className="font-medium">{item.artist}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm opacity-80 mb-6">{item.description}</p>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 cursor-pointer" onClick={handleLikeClick}>
                                    {liked ?
                                        <AiFillHeart className="text-red-500 text-xl" /> :
                                        <AiOutlineHeart className="text-xl" />
                                    }
                                    {liked ? item.likes + 1 : item.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                    <AiOutlineComment className="text-xl" /> {item.comments}
                                </span>
                            </div>
                            <button
                                className="text-white p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50"
                                onClick={() => {
                                    if (item.videoId) {
                                        window.open(`https://www.youtube.com/watch?v=${item.videoId}`, '_blank');
                                    }
                                }}
                            >
                                <AiOutlineShareAlt className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShortsItem; 