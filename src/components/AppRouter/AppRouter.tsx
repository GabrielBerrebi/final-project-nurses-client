import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Student from '../Student/Student';
import ProtectedRoute from '../../wrappers/ProtectedRoute/ProtectedRoute';
import NotExistPage from '../NotExistPage/NotExistPage';
import {Role} from '../../models/enums/Role';

const AppRouter = () => {
    return <Router>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/student' element={
                <ProtectedRoute role={Role.STUDENT}>
                    <Student/>
                </ProtectedRoute>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NotExistPage />} />
        </Routes>
    </Router>
}

export default AppRouter;
