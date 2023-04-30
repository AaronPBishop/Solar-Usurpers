import { Route, Routes } from 'react-router-dom';

import BaseContainer from './components/BaseContainer/BaseContainer';

import './styles.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<BaseContainer />} />
      </Routes>
    </div>
  );
}

export default App;