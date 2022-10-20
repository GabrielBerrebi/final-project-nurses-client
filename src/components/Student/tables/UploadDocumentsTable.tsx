import Table, {ColumnsType} from 'antd/es/table';
import {StudentInternship} from '../../../models/interfaces/StudentInternship';
import {RequiredDocumentType} from '../../../models/enums/RequiredDocumentType';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import {Button, List, Upload, UploadFile, UploadProps} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

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

    const getFormattedTitle = (title: RequiredDocumentType) => {
        return title.split(' ')
            .map((part: string) => {
                const loweredString = part.toLocaleLowerCase();
                return loweredString.at(0)?.toLocaleUpperCase() + loweredString.slice(1);
            })
            .join(' ');
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
                        <strong>{getFormattedTitle(document.type)}</strong>
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
