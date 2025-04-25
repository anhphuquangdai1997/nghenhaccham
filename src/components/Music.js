import React, { useState, useEffect } from 'react';
import { MdMusicNote, MdPlayArrow } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import './Music.css';

// Fallback data in case the API call fails due to CORS
const fallbackData = [
    {
        id: 'Z8IAI8BD',
        title: 'Cay',
        artist: 'Khắc Hưng, Jimmii Nguyễn',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/9/8/1/9/9819516e687d86eb056ec6499da76310.jpg',
        duration: 215,
        link: 'https://mp3.zing.vn/bai-hat/Cay-Khac-Hung-Jimmii-Nguyen/Z8IAI8BD.html',
        position: 1,
        status: 'up'
    },
    {
        id: 'Z8W76DBI',
        title: 'Bắc Bling (Bắc Ninh)',
        artist: 'Hòa Minzy, Xuân Hinh, Tuấn Cry, Masew',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/3/3/9/e3399633d5289da5cb7c4292a41f0f67.jpg',
        duration: 245,
        link: 'https://mp3.zing.vn/bai-hat/Bac-Bling-Bac-Ninh-Hoa-Minzy-Xuan-Hinh-Tuan-Cry-Masew/Z8W76DBI.html',
        position: 2,
        status: 'up'
    },
    {
        id: 'Z7DWU076',
        title: 'Nước Mắt Cá Sấu',
        artist: 'HIEUTHUHAI',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/0/8/9/a/089a2e63ec1d49c3f6be611f1aff1a89.jpg',
        duration: 206,
        link: 'https://mp3.zing.vn/bai-hat/Nuoc-Mat-Ca-Sau-HIEUTHUHAI/Z7DWU076.html',
        position: 3,
        status: 'up'
    },
    {
        id: 'Z7FCWBWZ',
        title: 'Anh Nhớ Ra',
        artist: 'Vũ',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/b/c/8/d/bc8d2e473548790b2aff6a1ad06dc26d.jpg',
        duration: 226,
        link: 'https://mp3.zing.vn/bai-hat/Anh-Nho-Ra-Vu/Z7FCWBWZ.html',
        position: 4,
        status: 'up'
    },
    {
        id: 'Z8UF6U9D',
        title: 'Tất Cả Là Tại Anh',
        artist: 'Đoàn Hiếu',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/c/9/3/9/c939c97c717e177c65527f6a3f04da99.jpg',
        duration: 251,
        link: 'https://mp3.zing.vn/bai-hat/Tat-Ca-La-Tai-Anh-Doan-Hieu/Z8UF6U9D.html',
        position: 5,
        status: 'up'
    },
    {
        id: 'Z8I9809Z',
        title: 'Yêu Em Kiểu Quê Mình',
        artist: 'Phát Hồ',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/9/6/f/3/96f3691c673ba85e43caeee7759e328d.jpg',
        duration: 208,
        link: 'https://mp3.zing.vn/bai-hat/Yeu-Em-Kieu-Que-Minh-Phat-Ho/Z8I9809Z.html',
        position: 6,
        status: 'down'
    },
    {
        id: 'Z8OIZOO8',
        title: 'Tình Đầu',
        artist: 'Tăng Duy Tân',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/9/e/6/a/9e6a46d909eda53a0844087309d55907.jpg',
        duration: 173,
        link: 'https://mp3.zing.vn/bai-hat/Tinh-Dau-Tang-Duy-Tan/Z8OIZOO8.html',
        position: 7,
        status: 'down'
    },
    {
        id: 'Z8IE9ZW8',
        title: 'Có Lẽ Anh Đã Sai',
        artist: 'Lương Bích Hữu',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/9/8/a/7/98a7f7886db2d2e0e68bb8a27f39a551.jpg',
        duration: 237,
        link: 'https://mp3.zing.vn/bai-hat/Co-Le-Anh-Da-Sai-Luong-Bich-Huu/Z8IE9ZW8.html',
        position: 8,
        status: 'up'
    },
    {
        id: 'Z8I7DF6D',
        title: 'Ghé Qua',
        artist: 'Dick, Tofu, PC',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/c/2/7/5/c2759aa4c11a208ea3c9be1c19d98b72.jpg',
        duration: 165,
        link: 'https://mp3.zing.vn/bai-hat/Ghe-Qua-Dick-Tofu-PC/Z8I7DF6D.html',
        position: 9,
        status: 'down'
    },
    {
        id: 'Z7O6IFO0',
        title: 'Vài Câu Nói Có Khiến Người Thay Đổi',
        artist: 'GREY D, tlinh',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/e/9/8/c/e98c3f4ac98776e56c324e3b9b60522b.jpg',
        duration: 234,
        link: 'https://mp3.zing.vn/bai-hat/Vai-Cau-Noi-Co-Khien-Nguoi-Thay-Doi-GREY-D-tlinh/Z7O6IFO0.html',
        position: 10,
        status: 'up'
    },
    {
        id: 'Z8D6Z77D',
        title: 'Đừng Lo Nhé! Có Anh Đây',
        artist: 'Thiên Tú',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/9/c/2/4/9c24af86883fa4d2769d62fab53c0fa8.jpg',
        duration: 285,
        link: 'https://mp3.zing.vn/bai-hat/Dung-Lo-Nhe-Co-Anh-Day-Thien-Tu/Z8D6Z77D.html',
        position: 11,
        status: 'up'
    },
    {
        id: 'Z8UUWCOU',
        title: 'Chưa Quên Người Yêu Cũ',
        artist: 'Hà Nhi',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/1/6/1/9/1619c224421c03c40bfa583bd4080c62.jpg',
        duration: 272,
        link: 'https://mp3.zing.vn/bai-hat/Chua-Quen-Nguoi-Yeu-Cu-Ha-Nhi/Z8UUWCOU.html',
        position: 12,
        status: 'down'
    },
    {
        id: 'Z7UI8ZZA',
        title: 'Waiting For You',
        artist: 'MONO',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/e/8/5/c/e85c524778e3cffe28f9c2e674715f49.jpg',
        duration: 266,
        link: 'https://mp3.zing.vn/bai-hat/Waiting-For-You-MONO/Z7UI8ZZA.html',
        position: 13,
        status: 'up'
    },
    {
        id: 'Z8DA6DZ0',
        title: 'Đáp Án Cuối Cùng',
        artist: 'Quân A.P',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/3/0/9/9/3099e7e646af3be64018bc1b9c4e82c1.jpg',
        duration: 301,
        link: 'https://mp3.zing.vn/bai-hat/Dap-An-Cuoi-Cung-Quan-A-P/Z8DA6DZ0.html',
        position: 14,
        status: 'new'
    },
    {
        id: 'Z8EUWDW9',
        title: 'Để Tôi Ôm Em Lần Nữa',
        artist: 'Kai Đinh',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/7/3/0/0/73007b59ce9e524848db727c9c9fc483.jpg',
        duration: 239,
        link: 'https://mp3.zing.vn/bai-hat/De-Toi-Om-Em-Lan-Nua-Kai-Dinh/Z8EUWDW9.html',
        position: 15,
        status: 'up'
    }
];

// Add more fallback data items to have a good collection even if API fails

const Music = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        const fetchZingChart = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch chart data');
                }

                const data = await response.json();

                if (data.err !== 0 || !data.data || !data.data.song) {
                    throw new Error('Invalid data format from API');
                }

                // Get top 20 songs
                const chartSongs = data.data.song.slice(0, 20).map(song => ({
                    id: song.id,
                    title: song.name,
                    artist: song.artists_names,
                    thumbnail: song.thumbnail,
                    duration: song.duration,
                    link: `https://mp3.zing.vn${song.link}`,
                    position: song.position,
                    status: song.rank_status
                }));

                setSongs(chartSongs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Zing chart:', error);

                // If there's a CORS error or any other error, use fallback data
                setUseFallback(true);
                setSongs(fallbackData);
                setLoading(false);
            }
        };

        fetchZingChart();
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(songId => songId !== id)
                : [...prev, id]
        );
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const getRankStatusIcon = (status) => {
        switch (status) {
            case 'up':
                return <span className="text-green-500 text-xs">▲</span>;
            case 'down':
                return <span className="text-red-500 text-xs">▼</span>;
            case 'new':
                return <span className="text-blue-500 text-xs font-bold">NEW</span>;
            default:
                return <span className="text-gray-500 text-xs">―</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-white text-center">
                    <div className="loading-spinner mb-4"></div>
                    <p>Đang tải danh sách bài hát...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="music-container bg-gray-900 h-full overflow-y-auto">
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">Bảng Xếp Hạng</h2>
                    <p className="text-gray-400">
                        {useFallback
                            ? 'Top bài hát thịnh hành (dữ liệu mẫu)'
                            : 'Top 20 bài hát thịnh hành từ Zing MP3'}
                    </p>
                </div>

                <div className="songs-list space-y-2">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="song-item flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                            onClick={() => window.open(song.link, '_blank')}
                        >
                            <div className="song-rank w-8 text-center mr-3">
                                <span className={`text-lg font-bold ${song.position <= 3
                                    ? 'text-blue-500'
                                    : 'text-gray-400'
                                    }`}>
                                    {song.position}
                                </span>
                                <div className="rank-status mt-1">
                                    {getRankStatusIcon(song.status)}
                                </div>
                            </div>

                            <div className="song-thumbnail relative mr-3 flex-shrink-0">
                                <img
                                    src={song.thumbnail}
                                    alt={song.title}
                                    className="w-12 h-12 rounded-md object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/94x94?text=Music';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                    <MdPlayArrow className="text-white text-3xl" />
                                </div>
                            </div>

                            <div className="song-info flex-grow mr-3 truncate">
                                <h3 className="text-white font-medium truncate">{song.title}</h3>
                                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                            </div>

                            <div className="song-duration text-gray-400 mr-3 hidden sm:block">
                                {formatDuration(song.duration)}
                            </div>

                            <div className="song-actions flex items-center space-x-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(song.id);
                                    }}
                                    className="text-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    {favorites.includes(song.id)
                                        ? <AiFillHeart className="text-red-500" />
                                        : <AiOutlineHeart />
                                    }
                                </button>
                                <button
                                    className="text-lg text-gray-400 hover:text-white transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Show more options - for future implementation
                                    }}
                                >
                                    <FiMoreHorizontal />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Music; 