import React, { useState } from 'react';
import MusicOption from './MusicOption';
import TopMusic from './TopMusic';
import FavoriteMusic from './FavoriteMusic';
import HotAlbums from './HotAlbums';
import FamousArtists from './FamousArtists';
import UploadMusic from './UploadMusic';
import TraditionalFestivals from './TraditionalFestivals';
import MusicalInstruments from './MusicalInstruments';
import UserFeedback from './UserFeedback';

export default function Home({ props }) {
    const { open3, setOpen3, setCurrentPage } = props || {};
    const [selectedOption, setSelectedOption] = useState('');

    if (!open3) return null;

    const renderComponent = () => {
        switch (selectedOption) {
            case 'top50':
                return <TopMusic />;
            case 'favorites':
                return <FavoriteMusic />;
            case 'albums':
                return <HotAlbums />;
            case 'artists':
                return <FamousArtists />;
            case 'upload':
                return <UploadMusic />;
            case 'festivals':
                return <TraditionalFestivals />;
            case 'instruments':
                return <MusicalInstruments />;
            case 'feedback':
                return <UserFeedback />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold"></h2>
                    <button
                        onClick={() => {
                            setOpen3(false);
                            setCurrentPage('');
                            setSelectedOption('');
                        }}
                        className="text-white hover:text-red-500"
                    >
                        X
                    </button>
                </div>
                <div className="home-content">
                    {selectedOption ? (
                        <div>
                            <button
                                onClick={() => setSelectedOption('')}
                                className="flex items-center text-purple-300 hover:text-purple-200 mb-4"
                            >
                                <span className="mr-1">←</span> Quay lại
                            </button>
                            {renderComponent()}
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Chào Mừng Bạn Đến Với Âm nhạc</h3>
                                <p className="text-lg text-gray-300 italic relative inline-block">
                                    <span className="absolute -left-6 top-0 text-purple-400 text-xl">❝</span>
                                    Hãy Lựa Chọn Những Bài Hát Mà Bạn Thích
                                    <span className="absolute -right-6 bottom-0 text-purple-400 text-xl">❞</span>
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors duration-300">
                                    <h4 className="text-lg font-medium mb-3 text-center text-purple-300">Khám Phá Âm Nhạc</h4>
                                    <ul className="space-y-3">
                                        <MusicOption text="Top 50" onClick={() => setSelectedOption('top50')} />
                                        <MusicOption text="Những Bài Hát Được Yêu Thích" onClick={() => setSelectedOption('favorites')} />
                                        <MusicOption text="Album Hot" onClick={() => setSelectedOption('albums')} />
                                        <MusicOption text="Nghệ Sĩ Nổi Tiếng" onClick={() => setSelectedOption('artists')} />
                                    </ul>
                                </div>
                                <div className="p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors duration-300">
                                    <h4 className="text-lg font-medium mb-3 text-center text-purple-300">Tính Năng Khác</h4>
                                    <ul className="space-y-3">
                                        <MusicOption text="Tải Nhạc Lên" onClick={() => setSelectedOption('upload')} />
                                        <MusicOption text="Lễ Hội Truyền Thống" onClick={() => setSelectedOption('festivals')} />
                                        <MusicOption text="Nhạc Cụ" onClick={() => setSelectedOption('instruments')} />
                                        <MusicOption text="Đánh Giá Của Bạn" onClick={() => setSelectedOption('feedback')} />
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}