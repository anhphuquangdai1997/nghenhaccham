import React, { useState } from 'react';
import { IoMdSkipBackward, IoMdSkipForward, IoMdPlay, IoMdPause } from 'react-icons/io';
import { BsShuffle, BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { RiPlayListLine } from 'react-icons/ri';
import { BiVolumeFull } from 'react-icons/bi';

const Player = ({ currentSong }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [repeatMode, setRepeatMode] = useState('none'); // none, all, one
    const [isShuffle, setIsShuffle] = useState(false);
    const [volume, setVolume] = useState(100);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const toggleRepeat = () => {
        const modes = ['none', 'all', 'one'];
        const currentIndex = modes.indexOf(repeatMode);
        setRepeatMode(modes[(currentIndex + 1) % modes.length]);
    };

    const toggleShuffle = () => setIsShuffle(!isShuffle);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-gray-900/95 backdrop-blur-xl border-t border-white/10 p-4">
            {/* Main Player Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-3 items-center gap-4">
                {/* Current Song Info */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/20">
                        <img
                            src={currentSong?.image || "default-song-image.jpg"}
                            alt={currentSong?.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate text-lg">
                            {currentSong?.title || "Nhạc Chăm - Bhum Adei - Quế Em"}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">
                            {currentSong?.artist || "Quế Em - Bonnuor Trinh"}
                        </p>
                    </div>
                </div>

                {/* Player Controls */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-6">
                        <button
                            className={`text-2xl ${isShuffle ? 'text-blue-400' : 'text-gray-400'} hover:text-blue-400 transition-colors`}
                            onClick={toggleShuffle}
                        >
                            <BsShuffle />
                        </button>
                        <button className="text-2xl text-gray-400 hover:text-white transition-colors">
                            <IoMdSkipBackward />
                        </button>
                        <button
                            className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all transform hover:scale-105 active:scale-95"
                            onClick={togglePlay}
                        >
                            {isPlaying ? <IoMdPause className="text-2xl" /> : <IoMdPlay className="text-2xl ml-1" />}
                        </button>
                        <button className="text-2xl text-gray-400 hover:text-white transition-colors">
                            <IoMdSkipForward />
                        </button>
                        <button
                            className={`text-2xl ${repeatMode !== 'none' ? 'text-blue-400' : 'text-gray-400'} hover:text-blue-400 transition-colors`}
                            onClick={toggleRepeat}
                        >
                            {repeatMode === 'one' ? <BsRepeat1 /> : <BsRepeat />}
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full flex items-center gap-2 group">
                        <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                        <div className="relative flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: `${(currentTime / 335) * 100}%` }}
                            />
                            <div className="absolute left-0 top-0 bottom-0 w-full bg-blue-500/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </div>
                        <span className="text-xs text-gray-400 w-10">5:35</span>
                    </div>
                </div>

                {/* Volume & Additional Controls */}
                <div className="flex items-center justify-end gap-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <RiPlayListLine className="text-xl" />
                    </button>
                    <div className="flex items-center gap-2 group">
                        <BiVolumeFull className="text-gray-400 group-hover:text-white transition-colors" />
                        <div className="relative w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full"
                                style={{ width: `${volume}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player; 