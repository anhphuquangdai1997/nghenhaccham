import React from 'react';

const TraditionalFestivals = () => {
    const festivals = [
        {
            id: 1,
            name: 'Lễ Hội A',
            date: '15/01 - 20/01',
            location: 'Hà Nội',
            description: 'Lễ hội truyền thống với nhiều hoạt động âm nhạc dân gian đặc sắc.'
        },
        {
            id: 2,
            name: 'Lễ Hội B',
            date: '05/03 - 10/03',
            location: 'Huế',
            description: 'Tái hiện các nghi thức âm nhạc cung đình thời xưa.'
        },
        {
            id: 3,
            name: 'Lễ Hội C',
            date: '20/08 - 25/08',
            location: 'Hội An',
            description: 'Lễ hội đèn lồng kết hợp với biểu diễn nhạc truyền thống.'
        },
    ];

    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Lễ Hội Truyền Thống</h3>
            <div className="space-y-4">
                {festivals.map(festival => (
                    <div key={festival.id} className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{festival.name}</h4>
                            <span className="bg-purple-700 text-xs px-2 py-1 rounded">{festival.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300 mb-3">
                            <span className="mr-1">📍</span>
                            <span>{festival.location}</span>
                        </div>
                        <p className="text-sm text-gray-300">{festival.description}</p>
                        <button className="mt-3 text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300">
                            Xem chi tiết →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TraditionalFestivals; 