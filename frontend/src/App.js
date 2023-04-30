import { Route, Routes } from 'react-router-dom';

import BoardContainer from './components/BoardContainer/BoardContainer';

import './styles.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<BoardContainer />} />
      </Routes>
    </div>
  );
}

export default App;