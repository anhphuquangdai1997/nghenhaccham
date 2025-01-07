import React, { useEffect, useState } from 'react'
import '../assets/css/doc.css';
import { TiMicrophone } from "react-icons/ti";
import axios from 'axios';
import { GrPrevious } from "react-icons/gr";

const Doc = ({ props: { open1, setOpen1 } }) => {  
    const [searchTerm, setSearchTerm] = useState('');  
    const [searchResults, setSearchResults] = useState([]);  
    const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái tải  
    const [currentVideoId, setCurrentVideoId] = useState(null);

      

    const handleSearch = async () => {  
        setIsLoading(true); // Bắt đầu trạng thái tải  
        const apiKey = 'AIzaSyA8T3vCUFBbE3a4xuP_HbM_fkMpABSZUGE'; // Thay thế với khóa API của bạn  
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${apiKey}&type=video`;  

        try {  
            const response = await axios.get(url);  
            setSearchResults(response.data.items);
  
        } catch (error) {  
            console.error('Lỗi khi lấy dữ liệu từ API YouTube:', error);  
        } finally {  
            setIsLoading(false); // Kết thúc trạng thái tải  
        }  
    };
    useEffect(() => {  
        const timer = setTimeout(() => {  
            if (searchTerm.trim() === '') {  
                setSearchResults([]); // Nếu không có từ khoá, xóa kết quả
                return;  
            }  
            handleSearch();  
        }, 500); // Thay đổi delay theo ý muốn (500ms)  

        return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount  
    }, [searchTerm,]); // Chỉ thực hiện nếu searchTerm thay đổi

    const handleVideoClick = (videoId) => {  
       setCurrentVideoId(videoId);
    }; 
    
    const handleClose = () => {  
        setOpen1(false); // Đóng modal  
        setCurrentVideoId(null); // Đặt video hiện tại thành null  
        setSearchResults([]); // Đặt danh sách video thành rỗng  
        setSearchTerm(''); // Xóa ô tìm kiếm  
    };  

    return (

        <div className={`listt ${open1 ? 'show' : ''}`}>  
            <div className="header">  
                <span onClick={handleClose}><GrPrevious /></span>
                <div style={styles.searchContainer}>  
                    <input  
                        type="text"  
                        placeholder="Tìm kiếm"  
                        style={styles.searchInput}  
                        value={searchTerm}  
                        onChange={(e) => setSearchTerm(e.target.value)}  
                    />  
                </div>  
                <div style={styles.searchContainer}>  
                    <button style={styles.iconButton}>  
                        <TiMicrophone />  
                    </button>  
                </div>  
                
            </div>
            <div style={{ marginBottom: '20px' }}>  
                {currentVideoId && ( // Hiển thị iframe nếu có video đang phát  
                    <iframe  
                        width="100%"  
                        height="315"  
                        src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} // Nhúng video với chế độ tự động phát  
                        title="YouTube video player"  
                        frameBorder="0"  
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
                        allowFullScreen  
                    ></iframe>  
                )}  
            </div>    
            <div style={styles.searchResulttt}>  
                {isLoading ? ( // Hiển thị trạng thái tải  
                    <p>Đang tải...</p>  
                ) : (  
                    searchResults.map((video) => (  
                        <div onClick={() => handleVideoClick(video.id.videoId)} style={{ cursor: 'pointer',display:'flex',gap:'10px',padding:'10px' }} key={video.id.videoId} >  
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />  
                            <h3>{video.snippet.title}</h3>  
                        </div>  
                    ))  
                )}  
            </div>  
        </div>  

    );
};

const styles = {
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '3x',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '50px',
        backgroundColor: '#1e1e1e',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
    },
    searchInput: {
        flex: 1,
        padding: '10px',
        border: 'none',
        borderRadius: '50px 0 0 50px',
        backgroundColor: '#1e1e1e',
        color: '#e0e0e0',
        outline: 'none',
        fontSize: '16px',
    },
    iconButton: {
        color: 'white',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '50%',
        transition: 'background 0.3s ease',
    },
    searchResulttt:{
        padding:'10px',
        fontSize: '10px',
        
    }
};

export default Doc
