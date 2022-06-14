import './App.css';
import Board from './components/boards';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import ShowList from './components/showLists';
import { Modal } from 'antd';

function App() {

  return (
    <div className="App">
      <NavBar/>
      <div >
        <Routes>
          <Route path='/' element={<Board />} />
          <Route path='/board' element={<ShowList/>}/>
          <Route path='/card' element={<Modal visible={true} />}/>

        </Routes>
      </div>
    </div>
  );
}

export default App;
