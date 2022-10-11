import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';

const Student = observer(() => {
    return (
        <Layout>
            <h1>Student - Very secret page</h1>
        </Layout>
    );
});

export default Student;
