import React, { useEffect, useState } from 'react';
import musics from '../assets/data';
import '../assets/css/list.css';
import { timer } from '../utils/timer';
import { removeSong, isUserUploadedSong, getStorageUsagePercentage } from '../utils/songStorage';
import { FaTrash } from 'react-icons/fa';

const List = ({ props: { open, setOpen, musicNumber, setMusicNumber } }) => {
    const handleRemoveSong = (e, id) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan tỏa đến phần tử cha

        // Xác nhận trước khi xóa
        if (window.confirm('Bạn có chắc chắn muốn xóa bài hát này?')) {
            // Chỉ cho phép xóa bài hát do người dùng tải lên
            const success = removeSong(id);

            if (success) {
                alert('Đã xóa bài hát thành công!');
                // Làm mới trang để cập nhật danh sách
                window.location.reload();
            }
        }
    };

    const storageUsage = getStorageUsagePercentage();
    const isStorageNearlyFull = storageUsage >= 80;

    return (
        <div className={`list overflow-auto ${open ? 'show' : ''}`}>
            <div className="header">
                <div>
                    <i className="material-icons">queue_music</i>
                    <span>Danh sách nhạc</span>
                </div>
                <div>
                    <i className="material-icons" onClick={() => setOpen(false)}>close</i>
                </div>
            </div>
            <ul>
                {musics.map((item, index) => (
                    <li
                        key={index}
                        className={`${musicNumber === index ? 'playing' : ''}`}
                        onClick={() => { setMusicNumber(index); setOpen(false); }}
                    >
                        <div className="row">
                            <span>{item.title}</span>
                            <p>{item.artist}</p>
                        </div>
                        {isUserUploadedSong(item.id) && (
                            <button
                                className="delete-btn"
                                onClick={(e) => handleRemoveSong(e, item.id)}
                                title="Xóa bài hát"
                            >
                                <FaTrash className="text-red-500" />
                            </button>
                        )}
                        <span className={`${musicNumber === index ? 'playing' : ''}`} id='spanplaying'></span>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default List;

const Duration = ({ music }) => {
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        const audio = new Audio(music.src)
        audio.onloadedmetadata = function () {
            if (audio.readyState > 0) {
                setDuration(audio.duration)
            }
        }
    }, [music]);
    return (<span className='duration'>{timer(duration)}</span>)
}
