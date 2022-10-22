import {useEffect, useState} from 'react';
import {userStore} from '../../../stores';
import {tutorInternshipFetcher} from '../../../fetchers';
import {ColumnsType} from 'antd/es/table';
import {Table} from 'antd';
import {SecretaryTutor} from '../../../models/interfaces/secretary/SecretaryTutor';

const SecretaryHospitalsTable = () => {
    const [data, setData] = useState<SecretaryTutor[] | undefined>(undefined);
    const id: string = userStore.getId();

    const getStudentInternships = async () => {
        if (id === '') return;
        const internships = await tutorInternshipFetcher.getTutorInternship(id);
        setData(internships.data as unknown as SecretaryTutor[]);
    }

    useEffect(() => {
        getStudentInternships();
    }, []);

    const columns: ColumnsType<SecretaryTutor> = [{
        title: 'Internship Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: SecretaryTutor, b: SecretaryTutor) => a?.name.localeCompare(b?.name)
    }/*, {
        title: 'Student Name',
        dataIndex: 'studentName',
        key: 'studentName',
        sorter: (a: SecretaryTutor, b: SecretaryTutor) => a?.studentName.localeCompare(b?.studentName)
    }, {
        title: 'Hospital Name',
        dataIndex: 'hospitalName',
        key: 'hospitalName',
        sorter: (a: SecretaryTutor, b: SecretaryTutor) => a?.hospitalName.localeCompare(b?.hospitalName)
    }*/];

    return (
        <Table columns={columns} dataSource={data}/>
    );
}

export default SecretaryHospitalsTable;
