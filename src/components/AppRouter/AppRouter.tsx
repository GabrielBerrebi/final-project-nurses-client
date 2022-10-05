import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';

const AppRouter = () => {
    return <Router>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </Router>
}

export default AppRouter;
