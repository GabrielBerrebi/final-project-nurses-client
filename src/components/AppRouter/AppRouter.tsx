import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Student from '../Student/Student';

const AppRouter = () => {
    return <Router>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/student' element={<Student />} />
            <Route path='/*' element={<Home/>}/>
        </Routes>
    </Router>
}

export default AppRouter;
