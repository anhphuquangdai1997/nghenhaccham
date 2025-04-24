import React from 'react';
import { motion } from 'framer-motion';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { RiPlayListLine } from 'react-icons/ri';

const NowPlaying = ({ currentSong }) => {
    const [isLiked, setIsLiked] = React.useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-gray-900 px-4">
            {/* Background Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20 scale-110 bg-center bg-cover blur-3xl"
                    style={{
                        backgroundImage: `url(${currentSong?.image || 'https://file1.dangcongsan.vn/DATA/0/2017/08/2_b_thoi_trang_dan_toc_cham-15_13_54_418.jpg'})`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-gray-900/80 to-gray-900" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Song Image */}
                <motion.div
                    className="relative w-72 h-72 mx-auto mb-8"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl transform -translate-y-4" />
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white/10 shadow-2xl shadow-blue-500/20">
                        <img
                            src={currentSong?.image || 'https://file1.dangcongsan.vn/DATA/0/2017/08/2_b_thoi_trang_dan_toc_cham-15_13_54_418.jpg'}
                            alt={currentSong?.title || 'Default Song'}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>

                    {/* Rotating Animation */}
                    <div className="absolute inset-0 rounded-full border-t-2 border-blue-500/30 animate-spin-slow" />
                </motion.div>

                {/* Song Info */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-2xl font-bold text-white mb-2 gradient-text">
                        {currentSong?.title || "Nhạc Chăm - Bhum Adei - Quế Em"}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {currentSong?.artist || "Quế Em - Bonnuor Trinh"}
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="flex justify-center gap-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <button
                        className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center group hover:scale-105"
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        {isLiked ? (
                            <BsHeartFill className="text-xl text-red-500" />
                        ) : (
                            <BsHeart className="text-xl text-white group-hover:scale-110 transition-transform" />
                        )}
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center group hover:scale-105">
                        <RiPlayListLine className="text-xl text-white group-hover:scale-110 transition-transform" />
                    </button>
                </motion.div>

                {/* Lyrics Preview */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="space-y-4 glass-effect rounded-xl p-6">
                        <p className="text-gray-400 text-sm">Đang phát lời bài hát...</p>
                        <p className="text-xl text-white font-medium">♪ Lyrics line will appear here ♪</p>
                        <p className="text-gray-400 text-sm">Next lyrics line...</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NowPlaying; 