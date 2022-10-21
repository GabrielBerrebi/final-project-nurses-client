import {Navigate} from "react-router-dom";
import {userStore} from '../../stores';
import {Role} from '../../models/enums/Role';

const ProtectedRoute = (props: any) => {
    const isAuth: boolean = userStore.getIsAuthenticated();
    const role: Role = userStore.getRole();
    const requestRole: string = props.role;

    if (!isAuth) {
        return <Navigate to='/' replace/>;
    }

    if (role.toString() !== requestRole) {
        return <Navigate to='/' replace/>;
    }

    return props.children;
}

export default ProtectedRoute;
