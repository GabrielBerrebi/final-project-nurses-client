import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';

const AppRouter = () => {
    return <Router>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    </Router>
}

export default AppRouter;
