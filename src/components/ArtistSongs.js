import React, { useState, useEffect } from 'react';
import { GrPrevious } from "react-icons/gr";
import { BsPlayFill, BsThreeDotsVertical, BsX } from "react-icons/bs";
import axios from 'axios';

export default function ArtistSongs({ artist, onBack }) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchArtistSongs = async () => {
            try {
                setLoading(true);
                setError(null);

                // Using environment variable for API key
                const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyA8T3vCUFBbE3a4xuP_HbM_fkMpABSZUGE';
                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(artist)}&key=${apiKey}&type=video&maxResults=10`;

                const response = await axios.get(url);

                if (response.status === 403) {
                    throw new Error('Đã vượt quá giới hạn API hoặc khóa API không hợp lệ. Vui lòng thử lại sau.');
                }

                const videoItems = response.data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    channelTitle: item.snippet.channelTitle,
                    publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString()
                }));

                setSongs(videoItems);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi tải danh sách bài hát:', error);
                setError(error.response?.status === 403
                    ? 'Đã vượt quá giới hạn API hoặc khóa API không hợp lệ. Vui lòng thử lại sau.'
                    : 'Không thể tải danh sách bài hát. Vui lòng thử lại sau.');
                setLoading(false);
            }
        };

        if (artist) {
            fetchArtistSongs();
        }
    }, [artist]);

    const handlePlayVideo = (videoId) => {
        setSelectedVideo(videoId);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
            <div className="header bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 p-4 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
                <div className="flex items-center justify-between">
                    <span onClick={onBack} className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-2">
                        <GrPrevious className="text-white text-2xl" />
                        <span className="text-white text-lg font-medium">{artist}</span>
                    </span>
                </div>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-white text-center">
                            <div className="loading-spinner mb-4"></div>
                            <p>Đang tải danh sách bài hát...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center p-4">{error}</div>
                ) : (
                    <div className="space-y-4">
                        {songs.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
                                onClick={() => handlePlayVideo(song.id)}
                            >
                                <div className="relative w-16 h-16">
                                    <img
                                        src={song.thumbnail}
                                        alt={song.title}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                            <BsPlayFill className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">{song.title}</h3>
                                    <p className="text-gray-400 text-sm">{song.channelTitle}</p>
                                    <p className="text-gray-400 text-xs">{song.publishedAt}</p>
                                </div>
                                <button
                                    className="text-gray-400 hover:text-white transition-colors p-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Show more options - for future implementation
                                    }}
                                >
                                    <BsThreeDotsVertical />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-4xl mx-4 h-[65vh]">
                        <button
                            onClick={closeModal}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <BsX className="text-3xl" />
                        </button>
                        <div className="w-full h-full">
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 