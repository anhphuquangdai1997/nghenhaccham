import React, { useState, useEffect } from 'react';

const FavoriteMusic = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageToken, setPageToken] = useState('');
  const [prevPageToken, setPrevPageToken] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async (token = '') => {
    try {
      setLoading(true);
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=nh%E1%BA%A1c+ch%C4%83m&key=AIzaSyA8T3vCUFBbE3a4xuP_HbM_fkMpABSZUGE&type=video&maxResults=5${token ? `&pageToken=${token}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      setVideos(data.items);
      setPageToken(data.nextPageToken || '');
      setPrevPageToken(data.prevPageToken || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleNextPage = () => {
    if (pageToken) {
      fetchVideos(pageToken);
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPageToken) {
      fetchVideos(prevPageToken);
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-purple-300">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Những Bài Hát Được Yêu Thích</h3>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative w-full max-w-4xl mx-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
                title={selectedVideo.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{selectedVideo.snippet.title}</h3>
              <p className="text-gray-600">{selectedVideo.snippet.channelTitle}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {videos.map((video, index) => (
          <div
            key={video.id.videoId}
            className="bg-white bg-opacity-5 p-3 rounded-lg hover:bg-opacity-10 transition-all duration-300 flex justify-between items-center cursor-pointer"
            onClick={() => handlePlayVideo(video)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-xs">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium">{video.snippet.title}</p>
                <p className="text-sm text-gray-400">{video.snippet.channelTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-400">
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  className="w-12 h-12 rounded"
                />
              </div>
              <button
                className="p-2 rounded-full bg-gray-700 text-gray-400 hover:bg-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayVideo(video);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={!prevPageToken}
          className={`px-4 py-2 rounded-lg ${prevPageToken
            ? 'bg-pink-600 text-white hover:bg-pink-700'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
        >
          Trang trước
        </button>
        <span className="text-purple-300">Trang {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={!pageToken}
          className={`px-4 py-2 rounded-lg ${pageToken
            ? 'bg-pink-600 text-white hover:bg-pink-700'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default FavoriteMusic;