import {RequiredDocument} from '../RequiredDocument';
import {SecretaryInternship} from './SecretaryInternship';

export interface SecretaryRequest {
    student: {
        id: string;
        name: string;
    }
    documents: RequiredDocument[];
    internship: SecretaryInternship;
}
