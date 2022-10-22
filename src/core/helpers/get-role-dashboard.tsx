import {Role} from '../../models/enums/Role';
import {UrlClientConstants as urls} from '../../fetchers/urls/UrlClientConstants';

export const getRoleDashboard = (role: Role) => {
    let roleDashboard: string = urls.home;

    (role === Role.STUDENT) && (roleDashboard = urls.student);
    (role === Role.TUTOR) && (roleDashboard = urls.tutor);
    (role === Role.SECRETARY) && (roleDashboard = urls.secretary);

    return roleDashboard;
}
