import {RequiredDocumentType} from '../enums/RequiredDocumentType';

export interface RequiredDocument {
    type: RequiredDocumentType;
    URL?: string;
}
