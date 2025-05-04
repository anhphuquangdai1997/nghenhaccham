import React, { useState } from "react";
import "./TabBar.css";

const tabs = [
  { label: "Karaoke" },
  { label: "Lời bài hát" },
];

export default function TabBar({ setShowImage }) {
  const [active, setActive] = useState(0); // Tab "Karaoke" đang được chọn

  const handleTabClick = (idx) => {
    setActive(idx);
    // Hiển thị ảnh khi chọn tab Karaoke, ẩn ảnh khi chọn tab Lời bài hát
    setShowImage(idx === 0);
  };

  return (
    <div className="tab-bar">
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={`tab-btn${active === idx ? " active" : ""}`}
          onClick={() => handleTabClick(idx)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}