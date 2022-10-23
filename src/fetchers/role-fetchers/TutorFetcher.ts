import UrlServerConstants from '../urls/UrlServerConstants';
import {TutorInternship} from '../../models/interfaces/TutorInternship';

export class TutorFetcher {
    async getTutorInternship(tutorId: string) {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.tutorInternships + tutorId);
            return {
                status: response.status,
                data: response?.data as TutorInternship[]
            }
        } catch (e) {
            throw e;
        }
    }
}
