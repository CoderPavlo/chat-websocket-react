import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import Rooms from './components/Rooms/Rooms';
import Chat from './components/Chat/Chat';
import { useAppContext } from './context/AppContext';

function App() {
  const { page } = useAppContext();
  return (
    <div className="App">
      {page === 'settings' ?
        <Settings /> :
        <>
          <Header />
          {page === 'rooms' ?
            <Rooms /> :
            <Chat />
          }
        </>
      }
    </div>
  );
}

export default App;
