import Table, {ColumnsType} from 'antd/es/table';
import {Button, Divider, Space, Tag} from 'antd';
import {RequiredDocumentType} from '../../../models/enums/RequiredDocumentType';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import {RegisterInternship} from '../../../models/interfaces/RegisterInternship';

const RegisterTable = () => {
    const onRegisterClick = () => {
    }

    const columns: ColumnsType<RegisterInternship> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <strong>#{id}</strong>
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Tutors',
        dataIndex: 'tutorsNames',
        key: 'tutorsNames',
        render: (tutorsNames) => tutorsNames.join(' · ')
    }, {
        title: 'Hospitals',
        dataIndex: 'hospitalsNames',
        key: 'hospitalsNames',
        render: (hospitalsNames) => hospitalsNames.join(' · ')
    }, {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: () => <Button onClick={onRegisterClick} type='primary'>Register</Button>
    },];

    const data: RegisterInternship[] = [{
        id: '4',
        name: 'Coupe de sapin - en extérieur',
        tutorsNames: ['Gabriel'],
        hospitalsNames: ['Paris - 16ème', 'Paris - 17ème'],
        documents: [{
            type: RequiredDocumentType.PASSPORT
        }, {
            type: RequiredDocumentType.GRADES_SHEET
        }],
        description: 'Chalom Rav'
    }];

    const getRenderedDescription = (description: string) => {
        return (
            <Space size='middle' direction='vertical'>
                <strong>Description: </strong>
                <span>{description}</span>
            </Space>
        );
    }

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

    const getRenderedExpansion = (record: RegisterInternship) => {
        return (
            <Space size='large'>
                {record.description && getRenderedDescription(record.description)}
                <Divider type='vertical'/>
                {record.documents?.length && getRenderedDocuments(record.documents)}
            </Space>
        );
    }

    const getRowKey = (_: any, index: any) => {
        return index;
    }

    return (
        <Table columns={columns} dataSource={data} expandRowByClick sticky rowKey={getRowKey}
               expandable={{
                   expandedRowRender: record => getRenderedExpansion(record),
                   rowExpandable: record => !!record.description?.length ||
                       !!record.documents?.length,
               }}
        />
    );
}

export default RegisterTable;
