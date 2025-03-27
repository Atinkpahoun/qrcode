<<<<<<< HEAD
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
>>>>>>> 3a77a34341b5338e54a659e06d0e1d46191f984e

import Principale from './pages/Principale.jsx';
import NavBar from './composants/NavBar.jsx';
import Connexion from './pages/Connexion.jsx';
import Inscription from './pages/Inscription.jsx';
function App() {
<<<<<<< HEA

  return (
    <>
      <Email />
    </>
  )
=======
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Principale />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
      </Routes>
    </Router>
  );
>>>>>>> 3a77a34341b5338e54a659e06d0e1d46191f984e
}

export default App;
