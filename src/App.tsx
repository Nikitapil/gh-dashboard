import { Routes, Route } from 'react-router-dom';
import { AppHeader } from './Components/AppHeader';
import { MainPage } from './pages/MainPage';
import { SingleRepoPage } from './pages/SingleRepoPage';
import './styles/App.scss'

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className='container'>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/repos/:owner/:repo' element={<SingleRepoPage/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
