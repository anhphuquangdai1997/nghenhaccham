import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import List from './components/List';
import Doc from './components/Doc';
import Lyrics from './components/Lyrics';
import Home from './components/Home';
import Upload from './components/Upload';
import Background3D from './components/Background3D';
import TabDemo from './components/TabDemo';

function App() {
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [openTabs, setOpenTabs] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Dọn dẹp localStorage khi trang được tải
  useEffect(() => {
    try {
      // Xóa các blob URL không hợp lệ trong localStorage
      const cleanupLocalStorage = () => {
        // Lấy danh sách bài hát đã tải lên
        const uploadedSongs = JSON.parse(localStorage.getItem('uploadedSongs')) || [];

        // Lọc ra các bài hát có nguồn hợp lệ (không phải blob URL)
        const validSongs = uploadedSongs.filter(song => {
          if (!song || !song.src) return false;
          return typeof song.src === 'string' && !song.src.startsWith('blob:');
        });

        // Nếu có bài hát không hợp lệ, cập nhật lại localStorage
        if (validSongs.length !== uploadedSongs.length) {
          console.log(`Đã xóa ${uploadedSongs.length - validSongs.length} bài hát có URL không hợp lệ`);
          localStorage.setItem('uploadedSongs', JSON.stringify(validSongs));
        }
      };

      cleanupLocalStorage();
    } catch (error) {
      console.error('Lỗi khi dọn dẹp localStorage:', error);
    }
  }, []);

  return (
    <div>
      <Background3D />
      <main className='w-full border-blue-500 shadow-lg overflow-hidden relative backdrop-blur-sm mx-auto  sm:p-6' >
        <Card props={{ musicNumber, setMusicNumber, setOpen, setOpen1, setOpen2, setOpen3, setOpenUpload, setOpenTabs, setCurrentPage }} />
        <List props={{ open, setOpen, musicNumber, setMusicNumber }} />
        <Doc props={{ open1, setOpen1 }} />
        <Home props={{ open3, setOpen3, setCurrentPage }} />
        <Lyrics props={{ open2, setOpen2, musicNumber }} />
        <Upload props={{ open: openUpload, setOpen: setOpenUpload }} />
        <TabDemo props={{ open: openTabs, setOpen: setOpenTabs }} />
      </main>
    </div>
  );
}

export default App;