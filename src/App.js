import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import List from './components/List';
import Doc from './components/Doc';
import Lyrics from './components/Lyrics';
import Home from './components/Home';


function App() {
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  return (
    <div>
      <main className='w-full border-blue-500 shadow-lg overflow-hidden relative backdrop-blur-sm mx-auto p-4 sm:p-6' >
        <Card props={{ musicNumber, setMusicNumber, setOpen, setOpen1, setOpen2, setOpen3 }} />
        <List props={{ open, setOpen, musicNumber, setMusicNumber }} />
        <Doc props={{ open1, setOpen1 }} />
        <Home props={{ open3, setOpen3 }} />
        <Lyrics props={{ open2, setOpen2, musicNumber }} />
      </main>
    </div>
  );
}

export default App;