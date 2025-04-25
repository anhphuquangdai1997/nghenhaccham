import React from 'react';
import Tabs from './Tabs';
import { AiOutlineHome, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { GrPrevious } from 'react-icons/gr';
import { MdMusicNote, MdOndemandVideo } from 'react-icons/md';
import Shorts from './Shorts';
import Music from './Music';

const TabDemo = ({ props: { open, setOpen } }) => {
    // Define tab content
    const tabs = [
        {
            label: (
                <div className="flex items-center gap-2">
                    <MdMusicNote className="text-xl" />
                    <span>Music</span>
                </div>
            ),
            content: (
                <div className="h-full flex flex-col">
                    
                    <div className="flex-grow rounded-xl overflow-hidden border border-gray-700">
                        <Music />
                    </div>
                </div>
            )
        },
        {
            label: (
                <div className="flex items-center gap-2">
                    <MdOndemandVideo className="text-xl" />
                    <span>Shorts</span>
                </div>
            ),
            content: (
                <div className="h-full flex flex-col">
                    
                    <div className="flex-grow rounded-xl overflow-hidden border border-gray-700">
                        <Shorts />
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className={`listt ${open ? 'show' : ''}`}>
            <div className="header bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 p-4 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
                <div className="flex justify-between">
                    <span onClick={() => setOpen(false)} className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-2">
                        <GrPrevious className="text-white text-2xl" />
                    </span>
                    <h1 className="text-xl font-bold text-white">Music & Shorts</h1>
                    
                </div>
            </div>
            <div className="noidung bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen p-4 flex flex-col">
                <div className="flex-grow h-[600px]">
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </div>
    );
};

export default TabDemo; 