import {useEffect, useState} from 'react';
import {userStore} from '../../../stores';
import {secretaryFetcher} from '../../../fetchers';
import {ColumnsType} from 'antd/es/table';
import {Button, Form, Input, List, Modal, Popconfirm, Select, Space, Table} from 'antd';
import {SecretaryInternship} from '../../../models/interfaces/secretary/SecretaryInternship';
import styles from './tables.module.less';
import {SecretaryHospital} from '../../../models/interfaces/secretary/SecretaryHospital';
import {SecretaryFullInternship} from '../../../models/interfaces/secretary/SecretaryFullInternship';

const SecretaryHospitalsTable = () => {
    const [data, setData] = useState<SecretaryHospital[] | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [openHospital, setOpenHospital] = useState(false);
    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    const id: string = userStore.getId();

    const [internships, setInternships] = useState<SecretaryFullInternship[] | undefined>(undefined);

    const getAllInternships = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllInternships();
        setInternships(internships.data as unknown as SecretaryFullInternship[]);
    }

    const getAllHospitals = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllHospitals();
        setData(internships.data as unknown as SecretaryHospital[]);
    }

    const onDeleteHospital = async (record: SecretaryHospital) => {
        await secretaryFetcher.deleteHospital(record.id);
        getAllHospitals();
    }

    const onCreateHospital = async (newHospital: object) => {
        await secretaryFetcher.createHospital(newHospital);
        hideModal();
        form.resetFields();
        getAllHospitals();
    }

    useEffect(() => {
        getAllHospitals();
        getAllInternships();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const showHospitalModal = () => {
        setOpenHospital(true);
    };

    const hideHospitalModal = () => {
        setOpenHospital(false);
    };

    const columns: ColumnsType<SecretaryHospital> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <strong>{id}</strong>
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: SecretaryHospital, b: SecretaryHospital) => a?.name.localeCompare(b?.name)
    }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        sorter: (a: SecretaryHospital, b: SecretaryHospital) => a?.location.localeCompare(b?.location)
    }, {
        title: 'Internships',
        dataIndex: '',
        key: 'internship.name',
        render: (hospital: SecretaryHospital) => <List>
            {hospital.internships?.map((internship: SecretaryInternship) =>
                <List.Item>{internship.name}</List.Item>
            )}
        </List>
    }, {
        title: 'Action',
        dataIndex: '',
        key: 'delete',
        render: (_, record: SecretaryHospital) =>
            <Popconfirm
                title="Are you sure to delete this hospital?"
                onConfirm={() => onDeleteHospital(record)}
                okText="Yes"
            > <Button type='default' danger>Delete</Button>
            </Popconfirm>
    }];

    const getRowKey = (_: any, index: any) => {
        return index;
    }

    const onUpdateManageHospital = async () => {
        const manage = form1.getFieldsValue();
        await secretaryFetcher.postManageHospital(manage);
        hideHospitalModal();
        form1.resetFields();
    }

    return (
        <div className={styles.table}>
            <div className={styles.buttons}>
                <Button type='default'  onClick={showHospitalModal}>Manage Hospital</Button>
                <Button type='primary' className={styles.addButton} onClick={showModal}>Add</Button>
            </div>
            <Modal title='Add a new hospital' open={open} onCancel={hideModal}
                   onOk={form.submit} okText='Create'>
                <Form form={form} onFinish={onCreateHospital}
                      labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item label='Name' name='name'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Location' name='location'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title='Manage internship in hospital' open={openHospital} onCancel={hideHospitalModal}
                   onOk={form1.submit} okText='Create'>
                <Form form={form1} onFinish={onUpdateManageHospital}
                      labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item label='Internship' name='id_internship' rules={[{required: true}]}>
                        <Select
                            placeholder="Internship"
                            optionLabelProp="label"
                        > {internships?.map((internship: SecretaryFullInternship) =>
                            <Select.Option key={internship.id} value={internship.id}
                                           label={internship.name}>{internship.name}</Select.Option>
                        )}
                        </Select>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Hospital' name='id_hospital' rules={[{required: true}]}>
                        <Select
                            placeholder="Hospital"
                            optionLabelProp="label"
                        > {data?.map((hospital: SecretaryHospital) =>
                            <Select.Option key={hospital.id} value={hospital.id}
                                           label={hospital.name}>{hospital.name}</Select.Option>
                        )}
                        </Select>
                    </Form.Item>
                    <Space/>
                    <h3>Number of seats</h3>
                    <Space/>

                    <Form.Item label='09:00 - 12:00' name='numPlace9_12'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='12:00 - 15:00' name='numPlace12_15'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='15:00 - 18:00' name='numPlace15_18'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Space/>
                    <Form.Item label='Days?' name='days' shouldUpdate>
                        <Select style={{width: 250}}>
                            <Select.Option key='DLV' value='DLV'>Sunday - Monday - Friday</Select.Option>
                            <Select.Option key='MMJ' value='MMJ'>Tuesday - Wednesday - Thursday</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Table key='s-h-table' columns={columns} dataSource={data} rowKey={getRowKey} sticky/>
        </div>
    );
}

export default SecretaryHospitalsTable;
