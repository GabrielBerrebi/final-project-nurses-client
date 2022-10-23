import {useEffect, useState} from 'react';
import {Button, Form, Input, List, Modal, Space, Table, Tag} from 'antd';
import {userStore} from '../../../stores';
import {secretaryFetcher} from '../../../fetchers';
import {ColumnsType} from 'antd/es/table';
import styles from './tables.module.less';
import {SecretaryStudent} from '../../../models/interfaces/secretary/SecretaryStudent';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import {SecretaryInternship} from '../../../models/interfaces/secretary/SecretaryInternship';

const SecretaryStudentsTable = () => {
    const [data, setData] = useState<SecretaryStudent[] | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const id: string = userStore.getId();

    const getAllStudents = async () => {
        if (id === '') return;
        const students = await secretaryFetcher.getAllStudents();
        setData(students.data as unknown as SecretaryStudent[]);
    }

    const onCreateStudent = async (newStudent: object) => {
        console.log(newStudent)
        await secretaryFetcher.createStudent(newStudent);
        hideModal();
        form.resetFields();
        getAllStudents();
    }

    useEffect(() => {
        getAllStudents();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const columns: ColumnsType<SecretaryStudent> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: SecretaryStudent, b: SecretaryStudent) => a?.name.localeCompare(b?.name)
    }, {
        title: 'Documents',
        dataIndex: '',
        key: 'documents',
        render: (student: SecretaryStudent) => student.documents?.map((rDocument: RequiredDocument) =>
            rDocument.URL
                ? <a href={rDocument.URL} target='_blank' rel="noreferrer">{rDocument.type}</a>
                : <Tag color='volcano'>{rDocument.type}</Tag>
        )
    }, {
        title: 'Internships',
        dataIndex: '',
        key: 'internship.name',
        render: (student: SecretaryStudent) => <List>
            {Array.isArray(student.internships)
                ? student?.internships.map((internship: SecretaryInternship) =>
                    <List.Item>{internship.name}</List.Item>)
                : <span>OK</span>
            }
        </List>
    }];

    return (
        <div className={styles.table}>
            <Button type='primary' className={styles.addButton} onClick={showModal}>Add</Button>
            <Modal title='Add a new student'
                   open={open} onCancel={hideModal}
                   onOk={form.submit} okText='Create'>
                <Form form={form} onFinish={onCreateStudent}
                      labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item label='Name' name='name'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Email' name='mail'
                               rules={[{required: true, type: 'email'}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Password' name='password'
                               rules={[{required: true}]}>
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
            <Table key='s-t-table' columns={columns} dataSource={data}/>
        </div>
    );
}

export default SecretaryStudentsTable;
