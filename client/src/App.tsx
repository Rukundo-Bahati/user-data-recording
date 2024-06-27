import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import FetchData from './components/fetchData';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/fetch-data" element={<FetchData />} />
      </Routes>
    </Router>
  );
};

export default App;
