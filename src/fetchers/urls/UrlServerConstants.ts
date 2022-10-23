import axios from 'axios';

class UrlServerConstants {
    private static readonly _baseURL: string = 'https://backend-app-nurse.herokuapp.com/api/';

    static readonly loginURL: string = 'auth/login/';
    static readonly logoutURL: string = 'auth/logout/';
    static readonly studentInternships = 'student/internships/';
    static readonly preferences = 'preference/';

    static readonly tutorInternships = 'tutor/internships/';

    static readonly secretaryStudents = 'student/';
    static readonly secretaryTutors = 'secretary/tutors/';
    static readonly secretaryHospitals = 'hospitals/';
    static readonly secretaryInternships = 'secretary/internships/';
    static readonly secretaryRequests = 'secretary/requests/';

    static axiosBase = axios.create({
        baseURL: this._baseURL,
    })
}

export default UrlServerConstants;
