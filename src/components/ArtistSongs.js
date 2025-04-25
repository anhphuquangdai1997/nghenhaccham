import React from 'react';
import { GrPrevious } from "react-icons/gr";
import { BsPlayFill, BsThreeDotsVertical } from "react-icons/bs";

const songData = {
    'Chế Linh': [
        { id: 1, title: 'Chuyện Tình Người Đan Áo', duration: '4:30', image: 'https://i.ytimg.com/vi/0R8IbpKXavM/maxresdefault.jpg' },
        { id: 2, title: 'Tình Nghèo', duration: '5:15', image: 'https://i.ytimg.com/vi/0R8IbpKXavM/maxresdefault.jpg' },
        { id: 3, title: 'Phận Nghèo', duration: '4:45', image: 'https://i.ytimg.com/vi/0R8IbpKXavM/maxresdefault.jpg' }
    ],
    'Chế Kha': [
        { id: 1, title: 'Tình Yêu Trên Dòng Sông Quan Họ', duration: '5:00', image: 'https://i.ytimg.com/vi/aHOiq7s1Yjc/maxresdefault.jpg' },
        { id: 2, title: 'Về Đâu Mái Tóc Người Thương', duration: '4:30', image: 'https://i.ytimg.com/vi/aHOiq7s1Yjc/maxresdefault.jpg' }
    ],
    'Amư Nhân': [
        { id: 1, title: 'Tình Ca Tây Nguyên', duration: '4:15', image: 'https://nld.mediacdn.vn/291774122806476800/2021/5/8/5-amu-nhan-4-16204808658662080641579.jpg' },
        { id: 2, title: 'Đêm Buôn Mê', duration: '5:30', image: 'https://nld.mediacdn.vn/291774122806476800/2021/5/8/5-amu-nhan-4-16204808658662080641579.jpg' }
    ],
    'Chế Tuấn': [
        { id: 1, title: 'Tình Yêu Màu Nắng', duration: '4:00', image: 'https://yt3.googleusercontent.com/ytc/AIdro_lq_eXmJsLKq-CKigaKbEWA9phDn9aIxUDHVfNc7BriqhM=s160-c-k-c0x00ffffff-no-rj' },
        { id: 2, title: 'Chiều Hoàng Hôn', duration: '5:00', image: 'https://yt3.googleusercontent.com/ytc/AIdro_lq_eXmJsLKq-CKigaKbEWA9phDn9aIxUDHVfNc7BriqhM=s160-c-k-c0x00ffffff-no-rj' }
    ],
    'Vương Rock': [
        { id: 1, title: 'Rock Tây Nguyên', duration: '3:45', image: 'https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/471258908_1784564872301857_5122864804177209192_n.jpg' },
        { id: 2, title: 'Đêm Giao Thừa', duration: '4:20', image: 'https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/471258908_1784564872301857_5122864804177209192_n.jpg' }
    ],
    'Y Sa': [
        { id: 1, title: 'Tình Ca Tây Nguyên', duration: '5:15', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGwDUyPdN-s6tQ7srYdSDNEFBFpVqv3W50aHdVZn7gall4qAUCgKGcvEa-QXdoxutPUc&usqp=CAU' },
        { id: 2, title: 'Đêm Hội Trăng Rằm', duration: '4:50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGwDUyPdN-s6tQ7srYdSDNEFBFpVqv3W50aHdVZn7gall4qAUCgKGcvEa-QXdoxutPUc&usqp=CAU' }
    ]
};

export default function ArtistSongs({ artist, onBack }) {
    const songs = songData[artist] || [];

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

            <div className="container mx-auto px-4 py-6">
                <div className="space-y-4">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="relative w-16 h-16">
                                <img
                                    src={song.image}
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
                                <p className="text-gray-400 text-sm">{song.duration}</p>
                            </div>
                            <button className="text-gray-400 hover:text-white transition-colors p-2">
                                <BsThreeDotsVertical />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 