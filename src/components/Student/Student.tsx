import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';
import {Tabs} from 'antd';
import styles from './Student.module.less';
import MyInternshipsTable from './tables/MyInternshipsTable';
import RegisterTable from './tables/RegisterTable';
import UploadDocumentsTable from './tables/UploadDocumentsTable';
import StudentPreferences from './StudentPreferences/StudentPreferences';

const TableTabs = () => {
    return (
        <Tabs size='large' items={[
            {key: 'Internships', label: 'Internships', children: <InternshipTableTabs/>},
            {key: 'Documents', label: 'Documents', children: <UploadDocumentsTable/>},
            {key: 'Preferences', label: 'Preferences', children: <StudentPreferences/>},
            {key: 'Attendances', label: 'Attendances', children: '', disabled: true},
        ]}/>
    );
}

const InternshipTableTabs = () => {
    return (
        <Tabs tabPosition='left' size='small' items={[
            {key: 'My Stages', label: 'My Stages', children: <MyInternshipsTable/>},
            {key: 'Register', label: 'Register', children: <RegisterTable/>},
        ]}/>
    );
}

const Student = observer(() => {
    return (
        <Layout>
            <div className={styles.student}>
                <TableTabs/>
            </div>
        </Layout>
    );
});

export default Student;
