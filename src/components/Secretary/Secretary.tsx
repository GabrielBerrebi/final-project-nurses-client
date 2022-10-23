import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';
import styles from './Secretary.module.less';
import {Space, Tabs} from 'antd';
import SecretaryTutorsTable from './tables/SecretaryTutorsTable';
import SecretaryStudentsTable from './tables/SecretaryStudentsTable';
import SecretaryHospitalsTable from './tables/SecretaryHospitalsTable';
import SecretaryInternshipsTable from './tables/SecretaryInternshipsTable';
import SecretaryRequests from './tables/SecretaryRequests';

const SecretaryTableTabs = () => {
    return (
        <Tabs items={[
            {key: 'Requests', label: 'Requests', children: <SecretaryRequests/>},
            {key: 'space', label: '', children: <Space direction='horizontal'/>},
            {key: 'Students', label: 'Students', children: <SecretaryStudentsTable/>},
            {key: 'Tutors', label: 'Tutors', children: <SecretaryTutorsTable/>},
            {key: 'Hospitals', label: 'Hospitals', children: <SecretaryHospitalsTable/>},
            {key: 'Internships', label: 'Internships', children: <SecretaryInternshipsTable/>},
        ]}/>
    );
}

const Secretary = observer(() => {
    return <Layout>
        <div className={styles.secretary}>
            <SecretaryTableTabs/>
        </div>
    </Layout>
});

export default Secretary
