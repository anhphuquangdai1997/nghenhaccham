import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import List from './components/List';
import Doc from './components/Doc';

function App() {
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  return (
    <div className="container">
      <div className='shape shape-1'></div>
      <div className='shape shape-2'></div>
      <div className='shape shape-3'></div>
      <main>
        <Card props={{ musicNumber, setMusicNumber, setOpen,setOpen1 }} />
        <List props={{ open, setOpen, musicNumber, setMusicNumber }} />
        <Doc props={{ open1, setOpen1 }} />
      </main>
    </div>
  );
}

export default App;