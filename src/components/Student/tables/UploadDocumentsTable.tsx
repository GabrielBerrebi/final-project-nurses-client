import Table, {ColumnsType} from 'antd/es/table';
import {StudentInternship} from '../../../models/interfaces/StudentInternship';
import {RequiredDocumentType} from '../../../models/enums/RequiredDocumentType';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import {Button, List, Upload, UploadFile, UploadProps} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {formatToPascalCase} from '../../../core/helpers/format-to-pascal-case';
import URLConstants from '../../../fetchers/URLConstants';
import {UploadChangeParam} from 'antd/es/upload';
import {userStore} from '../../../stores';
import FormData from 'form-data';

const UploadDocumentsTable = () => {
    const columns: ColumnsType<Partial<StudentInternship>> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <strong>#{id}</strong>
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }];

    const data: Partial<StudentInternship>[] = [{
        id: '4',
        name: 'Coupe de sapin - en extérieur',
        documents: [{
            type: RequiredDocumentType.PASSPORT,
        }, {
            type: RequiredDocumentType.GRADES_SHEET,
            URL: 'jct.ac.il/grades-sheets',
        }]
    }];

    function getDefaultFileList(): UploadFile[] | undefined {
        return undefined;
    }

    const onUploadDocument = (info: UploadChangeParam<UploadFile>, type: RequiredDocumentType) => {
        const file: UploadFile = info.file;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', file.name);
        formData.append('idStudent', userStore.getId());
        formData.append('type', type);
        console.log(formData)
        URLConstants.axiosBase.post(URLConstants.uploadStudentDocument, formData);
    }

    const uploadProps: UploadProps = {
        showUploadList: {
            showDownloadIcon: true,
            downloadIcon: 'Download',
            showRemoveIcon: true
        },
        maxCount: 1,
        defaultFileList: getDefaultFileList(),
        beforeUpload: () => false,
    }

    const getRenderedExpansion = (record: Partial<StudentInternship>) => {
        return (
            <List>
                {record.documents?.map((document: RequiredDocument, index: number) =>
                    <List.Item key={index} actions={[
                        <Upload {...uploadProps} onChange={(file) =>
                            onUploadDocument(file, document.type)}>
                            <Button type='primary' icon={<UploadOutlined/>}>Upload</Button>
                        </Upload>
                    ]}>
                        <strong>{formatToPascalCase(document.type)}</strong>
                    </List.Item>)}
            </List>
        );
    }

    return (
        <Table columns={columns} dataSource={data} expandRowByClick={true}
               expandable={{
                   expandedRowRender: record => getRenderedExpansion(record),
                   rowExpandable: _ => true,
               }}
        />
    );
}

export default UploadDocumentsTable;
