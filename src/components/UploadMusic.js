import React from 'react';

const UploadMusic = () => {
    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Tải Nhạc Lên</h3>
            <div className="bg-white bg-opacity-5 p-6 rounded-lg border border-dashed border-purple-500">
                <div className="text-center">
                    <span className="text-4xl block mb-3">📤</span>
                    <h4 className="font-medium mb-2">Kéo và thả file nhạc vào đây</h4>
                    <p className="text-sm text-gray-400 mb-4">Hoặc nhấn nút dưới đây để chọn file từ thiết bị</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        Chọn File Nhạc
                    </button>
                    <p className="mt-4 text-xs text-gray-400">Hỗ trợ các định dạng: MP3, WAV, FLAC (tối đa 20MB)</p>
                </div>
                <div className="mt-6">
                    <div className="text-sm font-medium mb-2">Nhạc đã tải lên gần đây:</div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-black bg-opacity-30 p-2 rounded">
                            <div className="flex items-center">
                                <span className="text-purple-400 mr-2">♪</span>
                                <span>File_nhac_1.mp3</span>
                            </div>
                            <span className="text-xs text-gray-400">3:45</span>
                        </div>
                        <div className="flex justify-between items-center bg-black bg-opacity-30 p-2 rounded">
                            <div className="flex items-center">
                                <span className="text-purple-400 mr-2">♪</span>
                                <span>File_nhac_2.mp3</span>
                            </div>
                            <span className="text-xs text-gray-400">4:12</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadMusic; 