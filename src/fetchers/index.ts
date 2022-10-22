import {LoginFetcher} from './role-fetchers/LoginFetcher';
import {StudentFetcher} from './role-fetchers/StudentFetcher';
import {TutorFetcher} from './role-fetchers/TutorFetcher';
import {SecretaryFetcher} from './role-fetchers/SecreataryFetcher';

export const loginFetcher = new LoginFetcher();
export const studentInternshipFetcher = new StudentFetcher();
export const tutorInternshipFetcher = new TutorFetcher();
export const secretaryFetcher = new SecretaryFetcher();
