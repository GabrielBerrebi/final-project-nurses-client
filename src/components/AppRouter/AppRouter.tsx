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
            <Route key='/login' path='/login' element={<Login/>}/>
            <Route key='/student' path='/student' element={
                <ProtectedRoute role={Role.STUDENT}>
                    <Student/>
                </ProtectedRoute>}/>
            <Route key='/' path='/' element={<Home/>}/>
            <Route key='*' path='*' element={<NotExistPage />} />
        </Routes>
    </Router>
}

export default AppRouter;
