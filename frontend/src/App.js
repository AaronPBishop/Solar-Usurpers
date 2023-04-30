import { Route, Routes } from 'react-router-dom';

import BaseContainer from './components/BaseContainer/BaseContainer';

import './styles.css';

const App = () => {
  return (
    <div style={{marginTop: '2vh'}}>
      <Routes>
        <Route exact path='/' element={<BaseContainer />} />
      </Routes>
    </div>
  );
}

export default App;