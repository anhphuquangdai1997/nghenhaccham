import React, { useState, useEffect } from 'react';
import './Tabs.css';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [prevTab, setPrevTab] = useState(null);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (prevTab !== null) {
            setAnimating(true);
            const timer = setTimeout(() => {
                setAnimating(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [activeTab, prevTab]);

    const handleTabClick = (index) => {
        if (index !== activeTab) {
            setPrevTab(activeTab);
            setActiveTab(index);
        }
    };

    return (
        <div className="tabs-container">
            <div className="tabs-header flex bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-t-lg overflow-hidden">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-3 flex-1 font-medium transition-all duration-300 ${activeTab === index
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-gray-700'
                            }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg relative overflow-hidden">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-300 absolute top-0 left-0 w-full h-full ${activeTab === index
                            ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                            : prevTab === index && animating
                                ? 'opacity-0 -translate-x-10 z-0 pointer-events-none'
                                : 'opacity-0 translate-x-10 z-0 pointer-events-none'
                            }`}
                        style={{
                            transitionDelay: activeTab === index ? '150ms' : '0ms'
                        }}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs; 