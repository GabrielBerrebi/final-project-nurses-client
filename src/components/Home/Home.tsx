import Layout from '../../wrappers/Layout/Layout';
import {Carousel} from 'antd';
import {ReactComponent as PatientNurseDoctorIcon} from '../../assets/characters/patient-nurse-doctor.svg';
import {ReactComponent as NurseDoctorMedicinesIcon} from '../../assets/characters/nurse-doctor-medicines.svg';
import {ReactComponent as NurseComputer} from '../../assets/characters/nurse-computer.svg';
import styles from './Home.module.less'

const FirstIllustration = () => {
    return (
        <div className={styles.illustration}>
            <PatientNurseDoctorIcon className={styles.illustrationIcon}/>
            <div>
                <h1>Welcome to Hospital Internship App</h1>
                <h3>You will find a lot of tools to manage your intern students</h3>
            </div>
        </div>
    );
}

const SecondIllustration = () => {
    return (
        <div className={styles.illustration}>
            <div>
                <h1>All your Hospital Managing Tools is present here</h1>
                <h3>A lot of great features, gathered in one single app</h3>
            </div>
            <NurseDoctorMedicinesIcon className={styles.illustrationIcon}/>
        </div>
    );
}

const ThirdIllustration = () => {
    return (
        <div className={styles.illustration}>
            <NurseComputer className={styles.illustrationIcon}/>
            <div>
                <h1>Manage your app with the Secretary Role</h1>
                <h3>She manages your Students and Tutors to improve your efficiency</h3>
            </div>
        </div>
    );
}

const Home = () => {
    return (
        <Layout>
            <Carousel autoplay infinite dots fade className={styles.carousel}>
                <FirstIllustration/>
                <SecondIllustration/>
                <ThirdIllustration />
            </Carousel>
        </Layout>
    );
}

export default Home;
