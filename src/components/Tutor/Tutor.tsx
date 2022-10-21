import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';
import styles from './Tutor.module.less';

const Tutor = observer(() => {
    return <Layout>
        <div className={styles.tutor}>
            <h1>Tutor</h1>
        </div>
    </Layout>
});

export default Tutor
