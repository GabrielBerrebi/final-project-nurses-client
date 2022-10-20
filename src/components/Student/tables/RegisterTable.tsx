import Table, {ColumnsType} from 'antd/es/table';
import {StudentInternship} from '../../../models/interfaces/StudentInternship';
import {Status} from '../../../models/enums/Status';
import {Button, Divider, Space, Tag} from 'antd';
import {RequiredDocumentType} from '../../../models/enums/RequiredDocumentType';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';

const RegisterTable = () => {
    const onRegisterClick = () => {
    }

    const columns: ColumnsType<StudentInternship> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <strong>#{id}</strong>
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Tutor',
        dataIndex: 'tutorName',
        key: 'tutorName',
    }, {
        title: 'Hospital',
        dataIndex: 'hospitalName',
        key: 'hospitalName',
    }, {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: () => <Button onClick={onRegisterClick} type='primary'>Register</Button>
    },];

    const data: StudentInternship[] = [{
        id: '4',
        name: 'Coupe de sapin - en extérieur',
        tutorName: 'Gabriel',
        hospitalName: 'Paris - 16ème',
        status: Status.FREE,
        description: 'Chalom Rav Leohavé Toratéha Veyn Lamo Michol',
        documents: [{
            type: RequiredDocumentType.PASSPORT
        }, {
            type: RequiredDocumentType.GRADES_SHEET
        }]
    }];

    const getRenderedDocuments = (documents: RequiredDocument[]) => {
        return (
            <Space size='middle' direction='vertical'>
                <strong>Required Documents: </strong>
                <p>{documents.map((document: RequiredDocument, index: number) =>
                    <Tag key={index} color='blue'>{document.type}</Tag>)}
                </p>
            </Space>
        );
    }

    const getRenderedExpansion = (record: StudentInternship) => {
        return (
            <Space size='large'>
                <Space size='middle' direction='vertical'>
                    <strong>Description: </strong>
                    <span>{record.description}</span>
                </Space>
                <Divider type='vertical'/>
                {record.documents?.length && getRenderedDocuments(record.documents)}
            </Space>
        );
    }

    return (
        <Table columns={columns} dataSource={data} expandRowByClick={true}
               expandable={{
                   expandedRowRender: record => getRenderedExpansion(record),
                   rowExpandable: record => !!record.description?.length ||
                       !!record.documents?.length,
               }}
        />
    );
}

export default RegisterTable;
