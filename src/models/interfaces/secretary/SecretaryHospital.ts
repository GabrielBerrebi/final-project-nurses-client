import {SecretaryInternship} from './SecretaryInternship';

export interface SecretaryHospital {
    id: string;
    name: string;
    location: string;
    internships: SecretaryInternship[];
}
