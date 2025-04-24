import React from 'react';
import { GrPrevious } from "react-icons/gr";
import { BsPlayFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";
import '../assets/css/home.css';
const musicData = [
    { id: 1, title: 'Nhạc Chill Tâm Trạng Buồn', image: 'https://file1.dangcongsan.vn/DATA/0/2017/08/2_b_thoi_trang_dan_toc_cham-15_13_54_418.jpg' },
    { id: 2, title: 'Nhạc Chậm', image: 'https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2024/10/2/base64-1727839596197865020165.jpeg' },
    { id: 3, title: 'Top 100 Nhạc chăm Hay Nhất', image: 'https://image.vovworld.vn/w500/Uploaded/vovworld/ovunhuo/2013_09_24/ao-dai-cham-2013-01-23-09-19.jpg' },
    { id: 4, title: 'Top 100  Hay Nhất', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFUrvVk8PGp7zETWqn80KnzRyZ9vMdQl76g&s' },
    { id: 5, title: 'Nhạc buồn Tháng 1/2025', image: 'https://media.dantocmiennui.vn/images/5c0c54f95c9777a45a8f5910a7a986a56447f501eaac0597f6769a75d9b7f591940e71c7e062b793528c6587ca669d1001598cd844e66b0c4167c817b899fdb4ac8c7aea77e38e60ec50df17988cfd9d69e3cd7a20de8ea1a67d12ae6cdf2fc514494e6d67572d65224b5710b2189ece5ab85343a9cf51227a234e634237601a0c71c636677a1daa5293a3711a95285a/nguoi-cham-chinh-trang-y-phuc-truoc-khi-to-chuc-cung-tao-mo-anh-nguyen-thanh-1986.jpg' },
    { id: 6, title: 'Nhạc Yêu Cầu, Vol. 7', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ6i_4bDZo8_HwEW_JlBklcfLee13VFN3L1qX4hpT_zTwhmL8X2WX77Ncm8AHNOIGGDf8&usqp=CAU' },
    { id: 7, title: 'Đỉnh Cao EDM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO14BwLK81ooG08Nvup94iWoVwNXcP_BJrGcVIifbfwkhlXx3f3uGOQtNTchDFCsXDnaE&usqp=CAU' },
];
const nghesi = [
    {
        name: 'Chế Linh',
        img: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453717930700_600.jpg'
    },
    {
        name: 'Chế Kha',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRTSo8dVj0jPjzMwrrM4LlZQ5CsBkiTP_rLtoPpkxFILxI7a-RXiPJc1JDEZOYVIEdXPrtM-ERqQd6uQCOTasAOhQ'
    },
    {
        name: 'Amư Nhân',
        img: 'https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2021/5/8/5-amu-nhan-4-16204808658662080641579.jpg'
    },
    {
        name: 'Chế Tuấn',
        img: 'https://yt3.googleusercontent.com/ytc/AIdro_lq_eXmJsLKq-CKigaKbEWA9phDn9aIxUDHVfNc7BriqhM=s160-c-k-c0x00ffffff-no-rj'
    },
    {
        name: 'Vương Rock',
        img: 'https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/471258908_1784564872301857_5122864804177209192_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFR0HUpt9_KCIMWhqGG_y-fntsddo0MLFue2x12jQwsW83fDjIafWWLRkL1bZR6S01QHJw3JCL6jzldd2T4h17k&_nc_ohc=b_JIfcaQHRAQ7kNvgGvdK4v&_nc_zt=23&_nc_ht=scontent.fsgn16-1.fna&_nc_gid=AT-fNiKh9Bn5ef5CAfAJQFw&oh=00_AYCRcu_7gz-KIfLxtVJauEQARY_4_njcKUdJdpPm2xl65A&oe=6783E246'
    },
    {
        name: 'Y Sa',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGwDUyPdN-s6tQ7srYdSDNEFBFpVqv3W50aHdVZn7gall4qAUCgKGcvEa-QXdoxutPUc&usqp=CAU'
    }
]
const recommendations = [
    {
        title: 'Những bài hát yêu thích',
        artist: 'chế linh ...',
        imageUrl: 'https://bqn.1cdn.vn/2022/11/06/images.baoquangnam.vn-storage-newsportal-2022-11-1-134192-_tnb-54780-03.jpg', // Thay thế bằng link hình thực tế  
    },
    {
        title: 'Top 100 bài hát yêu thích',
        artist: 'các nghệ sĩ được yêu thích',
        imageUrl: 'https://i.ytimg.com/vi/aHOiq7s1Yjc/maxresdefault.jpg', // Thay thế bằng link hình thực tế  
    },
    {
        title: 'Top 100 bài hát yêu thích',
        artist: 'các nghệ sĩ được yêu thích',
        imageUrl: 'https://i.ytimg.com/vi/aHOiq7s1Yjc/maxresdefault.jpg', // Thay thế bằng link hình thực tế  
    },
]

export default function Home({ props: { open3, setOpen3 } }) {
    const handleClose = () => {
        setOpen3(false);
    }

    return (
        <div className={`listt ${open3 ? 'show' : ''}`}>
            <div className='header bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 p-4 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90'>
                <div className="flex items-center justify-between">
                    <span onClick={handleClose} className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-2">
                        <GrPrevious className="text-white text-2xl" />
                        <span className="text-white text-lg font-medium">Trang chủ</span>
                    </span>
                </div>
            </div>
            <div className='noidung bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen'>
                <div className='container mx-auto px-4 py-6'>
                    {/* Featured Section */}
                    <div className="mb-12">
                        <h2 className='text-3xl font-bold text-white mb-6 flex items-center gap-2'>
                            <FaHeadphones className="text-blue-400" />
                            Thịnh hành
                        </h2>
                        <div className="music-gallery grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {musicData.map((track) => (
                                <div
                                    className="music-card group relative transform hover:scale-105 transition-all duration-300 bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20"
                                    key={track.id}
                                >
                                    <div className="relative pb-[100%]">
                                        <img
                                            src={track.image}
                                            alt={track.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                <BsPlayFill className="text-2xl" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="music-title text-white font-medium group-hover:text-blue-400 transition-colors truncate flex-1">
                                                {track.title}
                                            </div>
                                            <button className="text-gray-400 hover:text-white transition-colors">
                                                <BsThreeDotsVertical />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations Section */}
                    <div className="recommendation-container mb-12">
                        <h2 className='text-3xl font-bold text-white mb-6 border-b border-gray-700/50 pb-2'>
                            Gợi Ý Cho Bạn
                        </h2>
                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600">
                            <div className="flex gap-4 w-max py-2">
                                {recommendations.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center p-4 rounded-lg gap-4 w-[330px] bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-500/10 group cursor-pointer"
                                    >
                                        <div className="relative">
                                            <img
                                                className='rounded-xl w-24 h-24 object-cover shadow-md transition-transform duration-300 group-hover:scale-105'
                                                src={item.imageUrl}
                                                alt={item.title}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                                    <BsPlayFill className="text-xl" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="recommendation-info flex-1">
                                            <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                            <p className="text-gray-400 text-sm">{item.artist}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Artists Section */}
                        <h2 className='text-3xl font-bold text-white my-8 border-b border-gray-700/50 pb-2'>Nghệ Sĩ Nổi Bật</h2>
                        <div className="music-gallery grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
                            {nghesi.map((artist, index) => (
                                <div
                                    className="music-border group relative cursor-pointer"
                                    key={index}
                                >
                                    <div className="aspect-square rounded-full overflow-hidden shadow-xl relative">
                                        <img
                                            src={artist.img}
                                            alt={artist.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <p className="text-center text-white mt-3 font-medium group-hover:text-blue-400 transition-colors">{artist.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Categories Section */}
                        <h2 className='text-3xl font-bold text-white mb-6 border-b border-gray-700/50 pb-2'>Chủ đề & Thể Loại</h2>
                        <div className='overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600 py-4'>
                            <div className='flex w-max gap-4'>
                                <div className='w-[200px] h-[130px] bg-gradient-to-br from-red-600 to-pink-500 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/20 cursor-pointer group'>
                                    <h2 className='text-2xl font-bold text-white group-hover:scale-110 transition-transform'>Top 100</h2>
                                </div>
                                <div className='w-[200px] h-[130px] bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer group'>
                                    <h2 className='text-2xl font-bold text-white group-hover:scale-110 transition-transform'>Top 50</h2>
                                </div>
                                <div className='w-[200px] h-[130px] bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 cursor-pointer group'>
                                    <h2 className='text-2xl font-bold text-white group-hover:scale-110 transition-transform'>Top 20</h2>
                                </div>
                                <div className='w-[200px] h-[130px] bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 cursor-pointer group'>
                                    <h2 className='text-2xl font-bold text-white group-hover:scale-110 transition-transform'>Top 10</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}