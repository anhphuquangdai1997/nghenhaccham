import React from 'react';

const HotAlbums = () => {
    const albums = [
        { id: 1, title: 'Album Hot 1', artist: 'Ca sĩ A', tracks: 12 },
        { id: 2, title: 'Album Hot 2', artist: 'Ca sĩ B', tracks: 8 },
        { id: 3, title: 'Album Hot 3', artist: 'Ca sĩ C', tracks: 10 },
        { id: 4, title: 'Album Hot 4', artist: 'Ca sĩ D', tracks: 15 },
    ];

    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Album Hot</h3>
            <div className="grid grid-cols-2 gap-4">
                {albums.map(album => (
                    <div key={album.id} className="bg-gradient-to-br from-purple-900 to-indigo-900 p-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                        <div className="aspect-square bg-gray-800 rounded-md mb-3 flex items-center justify-center">
                            <span className="text-3xl">🎵</span>
                        </div>
                        <h4 className="font-bold">{album.title}</h4>
                        <p className="text-sm text-gray-300">{album.artist}</p>
                        <p className="text-xs text-gray-400 mt-1">{album.tracks} bài hát</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotAlbums; 