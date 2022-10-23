import Table, {ColumnsType} from 'antd/es/table';
import {StudentInternship} from '../../../models/interfaces/StudentInternship';
import {RequiredDocumentType} from '../../../models/enums/RequiredDocumentType';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import {Button, List, Upload, UploadFile, UploadProps} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {formatToPascalCase} from '../../../core/helpers/format-to-pascal-case';

const UploadDocumentsTable = () => {
    const columns: ColumnsType<Partial<StudentInternship>> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <strong>{id}</strong>
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

    const uploadProps: UploadProps = {
        action: 'link-to-server',
        showUploadList: {
            showDownloadIcon: true,
            downloadIcon: 'Download',
            showRemoveIcon: true
        },
        maxCount: 1,
        defaultFileList: getDefaultFileList()
    }

    const getRenderedExpansion = (record: Partial<StudentInternship>) => {
        return (
            <List>
                {record.documents?.map((document: RequiredDocument, index: number) =>
                    <List.Item key={index} actions={[
                        <Upload {...uploadProps}>
                            <Button type='primary' icon={<UploadOutlined/>}>Upload</Button>
                        </Upload>
                    ]}>
                        <strong>{formatToPascalCase(document.type)}</strong>
                    </List.Item>)}
            </List>
        );
    }

    const getRowKey = (_: any, index: any) => {
        return index;
    }

    return (
        <Table columns={columns} dataSource={data} expandRowByClick sticky rowKey={getRowKey}
               expandable={{
                   expandedRowRender: record => getRenderedExpansion(record),
                   rowExpandable: _ => true,
               }}
        />
    );
}

export default UploadDocumentsTable;
