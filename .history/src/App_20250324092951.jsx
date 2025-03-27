
import Principale from './pages/Principale.jsx';
import NavBar from './composants/NavBar.jsx';
import Connexion from './pages/Connexion.jsx';
import Inscription from './pages/Inscription.jsx';

function App() {

  return (
        <Route path="/Connexion" element={<Connexion />} />
      </Routes>
    </Router>

  );

}

export default App;
