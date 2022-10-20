import URLConstants from './URLConstants';
import {StudentInternship} from '../models/interfaces/StudentInternship';

export class StudentInternshipFetcher {
    async getStudentInternship(studentId: string) {
        try {
            const response = await URLConstants.axiosBase.get(URLConstants.studentInternships + studentId);
            return {
                status: response.status,
                data: response?.data as StudentInternship[]
            }
        } catch (e) {
            throw e;
        }
    }
}
