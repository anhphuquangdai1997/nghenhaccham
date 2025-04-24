import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { addSong } from '../utils/songStorage';

const Upload = ({ props: { open, setOpen } }) => {
    const [songFile, setSongFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const handleSongChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'audio/mpeg') {
            setSongFile(file);
            // Lấy tên bài hát từ tên file nếu chưa nhập
            if (!title) {
                const fileName = file.name.replace('.mp3', '');
                setTitle(fileName);
            }
        } else {
            setMessage('Vui lòng chọn file MP3');
            setSongFile(null);
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnail(file);
            // Tạo URL xem trước cho hình ảnh
            const previewURL = URL.createObjectURL(file);
            setThumbnailPreview(previewURL);
        } else {
            setMessage('Vui lòng chọn file hình ảnh');
            setThumbnail(null);
            setThumbnailPreview('');
        }
    };

    // Hàm chuyển file sang base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!songFile || !title || !artist) {
            setMessage('Vui lòng điền đầy đủ thông tin bài hát');
            return;
        }

        setUploading(true);
        setMessage('Đang tải lên...');

        try {
            // Chuyển file nhạc sang base64
            const songBase64 = await fileToBase64(songFile);

            // Chuyển ảnh sang base64 nếu có
            let thumbnailBase64 = '';
            if (thumbnail) {
                thumbnailBase64 = await fileToBase64(thumbnail);
            }

            // Tạo một đối tượng bài hát mới
            const newSong = {
                id: Date.now(),
                title: title,
                artist: artist,
                thumbnail: thumbnailBase64 || 'https://via.placeholder.com/150',
                src: songBase64,
                timerer: [2],
                lyrics: 'Chưa có lời'
            };

            // Lưu bài hát vào localStorage
            const success = addSong(newSong);

            if (success) {
                setMessage('Tải lên thành công! Bài hát đã được thêm vào danh sách. Làm mới trang để xem.');

                // Đặt lại form
                setSongFile(null);
                setThumbnail(null);
                setTitle('');
                setArtist('');
                setThumbnailPreview('');

                // Đóng modal sau 2 giây
                setTimeout(() => {
                    setOpen(false);
                    // Làm mới trang để cập nhật danh sách bài hát
                    window.location.reload();
                }, 2000);
            } else {
                throw new Error('Không thể lưu bài hát');
            }

            setUploading(false);
        } catch (error) {
            console.error('Lỗi khi tải lên:', error);
            setMessage('Có lỗi xảy ra khi tải lên. Vui lòng thử lại!');
            setUploading(false);
        }
    };

    const handleClickSongUpload = () => {
        fileInputRef.current.click();
    };

    const handleClickThumbnailUpload = () => {
        imageInputRef.current.click();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Tải lên bài hát mới</h2>
                    <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <MdClose size={24} />
                    </button>
                </div>

                {message && (
                    <div className={`p-3 rounded mb-4 ${message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="song-title">
                            Tên bài hát
                        </label>
                        <input
                            type="text"
                            id="song-title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tên bài hát"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artist">
                            Ca sĩ/Nghệ sĩ
                        </label>
                        <input
                            type="text"
                            id="artist"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            placeholder="Nhập tên ca sĩ/nghệ sĩ"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            File nhạc (MP3)
                        </label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleSongChange}
                            accept="audio/mpeg"
                            className="hidden"
                        />
                        <div
                            onClick={handleClickSongUpload}
                            className="w-full h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                        >
                            <div className="text-center">
                                <FaCloudUploadAlt className="mx-auto text-gray-400 text-3xl" />
                                <p className="text-sm text-gray-500 mt-1">
                                    {songFile ? songFile.name : "Nhấp để chọn file MP3"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Ảnh bìa (tùy chọn)
                        </label>
                        <input
                            type="file"
                            ref={imageInputRef}
                            onChange={handleThumbnailChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div
                            onClick={handleClickThumbnailUpload}
                            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                        >
                            {thumbnailPreview ? (
                                <img src={thumbnailPreview} alt="Thumbnail preview" className="h-full object-contain" />
                            ) : (
                                <div className="text-center">
                                    <FaCloudUploadAlt className="mx-auto text-gray-400 text-3xl" />
                                    <p className="text-sm text-gray-500 mt-1">Nhấp để chọn ảnh bìa</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? 'Đang tải lên...' : 'Tải lên bài hát'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload; 