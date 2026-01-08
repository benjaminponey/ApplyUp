import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { ApplicationForm } from './components/ApplicationForm';
import { ApplicationsList } from './components/ApplicationsList';
import { ApplicationDetails } from './components/ApplicationDetails';
import { ApplicationsProvider } from './Contexts/ApplicationsContext';

function App() {
    return (
        <ApplicationsProvider>
            <Router>
                <div className="app-container">
                    <nav className="main-nav">
                        <div className="nav-logo">ApplyUp</div>
                        <div className="nav-links">
                            <Link to="/" className="nav-link">Candidater</Link>
                            <Link to="/list" className="nav-link">Candidatures</Link>
                        </div>
                    </nav>

                    <div className="page-content">
                        <Routes>
                            <Route path="/" element={
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h1 style={{ marginBottom: '2rem' }}>Rejoignez-nous</h1>
                                    <ApplicationForm />
                                </div>
                            } />
                            <Route path="/list" element={<ApplicationsList />} />
                            <Route path="/application/:id" element={<ApplicationDetails />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </ApplicationsProvider>
    );
}

export default App;
