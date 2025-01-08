import React, { useState } from 'react';
import '../assets/css/doc.css';
import { TiMicrophone } from "react-icons/ti";
import axios from 'axios';
import { GrPrevious } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";

const Doc = ({ props: { open1, setOpen1 } }) => {  
    const [searchTerm, setSearchTerm] = useState('');  
    const [searchResults, setSearchResults] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [isListening, setIsListening] = useState(false); // Trạng thái nghe mic

    let recognition;

    // Kiểm tra nếu trình duyệt hỗ trợ Web Speech API
    if ('webkitSpeechRecognition' in window) {
        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'vi-VN'; // Ngôn ngữ tiếng Việt
    } else {
        console.error('Trình duyệt không hỗ trợ Web Speech API.');
    }

    const handleSearch = async () => {  
        if (searchTerm.trim() === '') return;
        setIsLoading(true);
        const apiKey = 'AIzaSyA8T3vCUFBbE3a4xuP_HbM_fkMpABSZUGE'; 
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${apiKey}&type=video`;  

        try {  
            const response = await axios.get(url);  
            setSearchResults(response.data.items);
        } catch (error) {  
            console.error('Lỗi khi lấy dữ liệu từ API YouTube:', error);  
        } finally {  
            setIsLoading(false);
        }  
    };

    const handleStartListening = () => {
        if (!recognition) return;

        recognition.start();
        setIsListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchTerm(transcript);
            handleSearch(); // Thực hiện tìm kiếm ngay sau khi có kết quả
        };

        recognition.onend = () => {
            setIsListening(false); // Dừng trạng thái nghe khi hoàn tất
        };

        recognition.onerror = (event) => {
            console.error('Lỗi khi sử dụng Microphone:', event.error);
            setIsListening(false);
        };
    };

    const handleVideoClick = (videoId) => {  
        setCurrentVideoId(videoId);
    }; 
    
    const handleClose = () => {  
        setOpen1(false);
        setCurrentVideoId(null);  
        setSearchResults([]);
        setSearchTerm(''); 
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
                    <button onClick={handleSearch} style={styles.iconButton}>  
                        <IoSearch />
                    </button>  
                </div>  
                <div style={styles.searchContainer}>  
                    <button 
                        style={{ 
                            ...styles.iconButton, 
                            backgroundColor: isListening ? '#ffcccc' : 'transparent' 
                        }} 
                        onClick={handleStartListening}
                    >  
                        <TiMicrophone />  
                    </button>  
                </div>  
            </div>
            <div style={{ marginBottom: '20px' }}>  
                {currentVideoId && (
                    <iframe  
                        width="100%"  
                        height="315"  
                        src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}  
                        title="YouTube video player"  
                        frameBorder="0"  
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
                        allowFullScreen  
                    ></iframe>  
                )}  
            </div>    
            <div style={styles.searchResulttt}>  
                {isLoading ? (
                    <p>Đang tải...</p>  
                ) : (
                    searchResults.map((video) => (
                        <div 
                            onClick={() => handleVideoClick(video.id.videoId)} 
                            style={{ cursor: 'pointer', display: 'flex', gap: '10px', padding: '10px' }} 
                            key={video.id.videoId}
                        >  
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
    searchResulttt: {
        padding: '10px',
        fontSize: '10px',
        maxHeight: '600px',
        overflowY: 'scroll',
    },
};

export default Doc;
