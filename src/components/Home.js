import React from 'react';
import { GrPrevious } from "react-icons/gr";
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
]

export default function Home({ props: { open3, setOpen3 } }) {

    const handleClose = () => {
        setOpen3(false);
    }

    return (
        <div className={`listt ${open3 ? 'show' : ''}`}>
            <div className='header' >
                <span onClick={handleClose}><GrPrevious /></span>
            </div >
            <div className='container home-page-content'>
                <div className="music-gallery">
                    {musicData.map((track) => (
                        <div className="music-card" key={track.id}>
                            <img src={track.image} alt={track.title} className="music-image" />
                            <div className="music-title">{track.title}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="recommendation-container">
                <h2 className='h2'>Gợi Ý Cho Bạn</h2>
                <div className="recommendation-list">
                    {recommendations.map((item, index) => (
                        <div key={index} className="recommendation-item">
                            <img src={item.imageUrl} alt={item.title} />
                            <div className="recommendation-info">
                                <h3>{item.title}</h3>
                                <p>{item.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="music-gallery">
                    {nghesi.map((track) => (
                        <div className="music-border" key={track.id}>
                            <img src={track.img} alt={track.name} className="music-image" />
                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}