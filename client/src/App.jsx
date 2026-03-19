import AppRoutes from './routes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <AppRoutes />
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
