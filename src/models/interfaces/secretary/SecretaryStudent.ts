import {RequiredDocument} from '../RequiredDocument';
import {SecretaryInternship} from './SecretaryInternship';

export interface SecretaryStudent {
    id: string;
    name: string;
    documents: RequiredDocument[];
    internships: SecretaryInternship[];
}
