import React, { useState, useRef, useEffect } from 'react';
import ShortsItem from './ShortsItem';
import './Shorts.css';
import { FaSearch } from 'react-icons/fa';

// Initial placeholder data while loading from YouTube
const placeholderData = [
    {
        id: 'loading1',
        title: "Loading...",
        artist: "Please wait",
        description: "Fetching shorts from YouTube...",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        likes: 0,
        comments: 0,
        isPlaying: false,
        videoId: null
    }
];

const Shorts = () => {
    const [shorts, setShorts] = useState(placeholderData);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('shorts music');
    const [inputValue, setInputValue] = useState('');
    const containerRef = useRef(null);

    // Fetch shorts from YouTube
    const fetchYouTubeShorts = async (term) => {
        try {
            setLoading(true);
            setShorts(placeholderData);
            // Using same API key as in Doc.js
            const apiKey = 'AIzaSyA8T3vCUFBbE3a4xuP_HbM_fkMpABSZUGE';

            // Search for shorts using proper parameters
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}&videoDuration=short&maxResults=10&type=video&key=${apiKey}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch YouTube shorts');
            }

            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                setShorts([{
                    id: 'no-results',
                    title: "No results found",
                    artist: "Try another search",
                    description: "No videos found for your search term.",
                    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    likes: 0,
                    comments: 0,
                    isPlaying: false,
                    videoId: null
                }]);
                setLoading(false);
                return;
            }

            // Get details for videos to get more information
            const videoIds = data.items.map(item => item.id.videoId).join(',');
            const videoDetailsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${apiKey}`
            );

            if (!videoDetailsResponse.ok) {
                throw new Error('Failed to fetch video details');
            }

            const videoDetails = await videoDetailsResponse.json();

            // Map YouTube data to our shorts format
            const formattedShorts = videoDetails.items.map(video => ({
                id: video.id,
                title: video.snippet.title,
                artist: video.snippet.channelTitle,
                description: video.snippet.description.substring(0, 100) + (video.snippet.description.length > 100 ? '...' : ''),
                image: video.snippet.thumbnails.high.url,
                likes: parseInt(video.statistics.likeCount) || 0,
                comments: parseInt(video.statistics.commentCount) || 0,
                isPlaying: false,
                videoId: video.id
            }));

            setShorts(formattedShorts);
            setCurrentIndex(0);
            if (containerRef.current) {
                containerRef.current.scrollTop = 0;
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching YouTube shorts:', error);
            setError('Failed to load shorts videos. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchYouTubeShorts(searchTerm);
    }, [searchTerm]);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setSearchTerm(inputValue.trim() + ' shorts');
        }
    };

    const handleTogglePlay = (index) => {
        setShorts(prevShorts =>
            prevShorts.map((short, i) => ({
                ...short,
                isPlaying: i === index ? !short.isPlaying : false
            }))
        );
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollTop = container.scrollTop;
            const itemHeight = container.clientHeight;
            const index = Math.round(scrollTop / itemHeight);
            setCurrentIndex(index);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    if (error) {
        return (
            <div className="shorts-container w-full h-full flex items-center justify-center">
                <div className="text-white text-center p-4">
                    <p className="text-xl mb-2">😢 {error}</p>
                    <button
                        className="px-4 py-2 bg-blue-600 rounded-lg mt-2 hover:bg-blue-700"
                        onClick={() => fetchYouTubeShorts(searchTerm)}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="shorts-container w-full h-full">
            <div className="absolute top-0 left-0 right-0 z-20 p-2 bg-gradient-to-b from-black to-transparent">
                <form onSubmit={handleSubmitSearch} className="flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search for shorts..."
                        className="w-full px-3 py-2 bg-gray-800 bg-opacity-80 text-white rounded-l-lg focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-3 py-2 rounded-r-lg"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            <div
                ref={containerRef}
                className="shorts-scroll-container w-full h-full overflow-y-scroll snap-y snap-mandatory pt-12"
            >
                {shorts.map((item, index) => (
                    <div key={item.id} className="h-full w-full snap-start">
                        <ShortsItem
                            item={item}
                            index={index}
                            isActive={currentIndex === index}
                            onTogglePlay={handleTogglePlay}
                        />
                    </div>
                ))}
            </div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="text-white text-center">
                        <div className="loading-spinner mb-4"></div>
                        <p>Loading YouTube Shorts...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shorts;
