import React from 'react';

const TopMusic = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Top 50 Bài Hát</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Placeholder for top music items */}
        {Array(6).fill().map((_, index) => (
          <div key={index} className="bg-white bg-opacity-5 p-3 rounded-lg hover:bg-opacity-10 transition-all duration-300">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-700 rounded-md flex items-center justify-center mr-3">
                <span className="text-white">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium">Bài hát #{index + 1}</p>
                <p className="text-sm text-gray-400">Ca sĩ #{index + 1}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMusic; 