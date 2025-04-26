import React from 'react';

const MusicalInstruments = () => {
    const instruments = [
        { id: 1, name: 'Đàn Tranh', type: 'Dây', origin: 'Việt Nam', image: '🎻' },
        { id: 2, name: 'Đàn Nguyệt', type: 'Dây', origin: 'Việt Nam', image: '🪕' },
        { id: 3, name: 'Sáo Trúc', type: 'Hơi', origin: 'Việt Nam', image: '🎺' },
        { id: 4, name: 'Trống Cơm', type: 'Gõ', origin: 'Việt Nam', image: '🥁' },
        { id: 5, name: 'Đàn Bầu', type: 'Dây', origin: 'Việt Nam', image: '🎸' },
        { id: 6, name: 'Đàn T\'rưng', type: 'Gõ', origin: 'Tây Nguyên', image: '🎹' },
    ];

    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Nhạc Cụ</h3>
            <div className="grid grid-cols-2 gap-4">
                {instruments.map(instrument => (
                    <div key={instrument.id} className="bg-white bg-opacity-5 p-3 rounded-lg hover:bg-opacity-10 transition-all duration-300">
                        <div className="flex">
                            <div className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center mr-3 text-2xl">
                                {instrument.image}
                            </div>
                            <div>
                                <h4 className="font-medium">{instrument.name}</h4>
                                <div className="flex space-x-2 text-xs mt-1">
                                    <span className="bg-purple-900 px-2 py-0.5 rounded">{instrument.type}</span>
                                    <span className="bg-indigo-900 px-2 py-0.5 rounded">{instrument.origin}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm">
                    Xem Thêm Nhạc Cụ
                </button>
            </div>
        </div>
    );
};

export default MusicalInstruments; 