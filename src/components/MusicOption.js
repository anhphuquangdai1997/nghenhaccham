import React from 'react';

const MusicOption = ({ text, onClick }) => {
    return (
        <li
            className="flex items-center px-3 py-2 rounded-md hover:bg-purple-600 hover:bg-opacity-20 transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <span className="mr-2 text-purple-400">♪</span>
            <span>{text}</span>
        </li>
    );
};

export default MusicOption; 