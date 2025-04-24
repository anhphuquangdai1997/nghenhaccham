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
            <div className="storage-info p-3 border-t border-gray-300">
                <p className="text-gray-600 mb-1">Dung lượng lưu trữ:</p>
                <div className="storage-progress-bar bg-gray-200 rounded-full h-2.5 mb-1">
                    <div
                        className={`h-2.5 rounded-full ${isStorageNearlyFull ? 'bg-red-600' : 'bg-blue-600'}`}
                        style={{ width: `${storageUsage}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-500">
                    Đã sử dụng {storageUsage.toFixed(1)}% dung lượng
                    {isStorageNearlyFull && (
                        <span className="text-red-500 ml-1">
                            - Hãy xóa bớt bài hát để có thể tải thêm!
                        </span>
                    )}
                </p>
            </div>
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
