import React from 'react';

const FavoriteMusic = () => {
  const favorites = [
    { id: 1, title: 'Bài hát yêu thích 1', artist: 'Ca sĩ A', plays: '1.2M' },
    { id: 2, title: 'Bài hát yêu thích 2', artist: 'Ca sĩ B', plays: '890K' },
    { id: 3, title: 'Bài hát yêu thích 3', artist: 'Ca sĩ C', plays: '1.5M' },
    { id: 4, title: 'Bài hát yêu thích 4', artist: 'Ca sĩ D', plays: '750K' },
    { id: 5, title: 'Bài hát yêu thích 5', artist: 'Ca sĩ E', plays: '2.1M' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Những Bài Hát Được Yêu Thích</h3>
      <div className="space-y-3">
        {favorites.map(song => (
          <div key={song.id} className="bg-white bg-opacity-5 p-3 rounded-lg hover:bg-opacity-10 transition-all duration-300 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-xs">♥</span>
              </div>
              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">{song.plays}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMusic; 