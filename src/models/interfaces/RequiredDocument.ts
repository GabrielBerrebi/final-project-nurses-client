import {RequiredDocumentType} from '../enums/RequiredDocumentType';

export interface RequiredDocument {
    type: RequiredDocumentType;
    url?: string;
}
