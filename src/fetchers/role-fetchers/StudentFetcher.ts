import UrlServerConstants from '../urls/UrlServerConstants';
import {StudentInternship} from '../../models/interfaces/StudentInternship';

export class StudentFetcher {
    async getStudentInternship(studentId: string) {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.studentInternships + studentId);
            return {
                status: response.status,
                data: response?.data as StudentInternship[]
            }
        } catch (e) {
            throw e;
        }
    }
}
