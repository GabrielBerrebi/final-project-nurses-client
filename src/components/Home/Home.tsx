import GeneralLayout from '../../layouts/GeneralLayout/GeneralLayout';
import {Carousel} from 'antd';
import {ReactComponent as PatientNurseDoctorIcon} from '../../assets/characters/patient-nurse-doctor.svg';
import {ReactComponent as PatientInBedIcon} from '../../assets/characters/patient-in-its-bed.svg';
import {ReactComponent as NurseDoctorMedicinesIcon} from '../../assets/characters/nurse-doctor-medicines.svg';
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
                <h1>Welcome to Hospital Internship App</h1>
                <h3>You will find a lot of tools to manage your intern students</h3>
            </div>
            <PatientInBedIcon className={styles.illustrationIcon}/>
        </div>
    );
}
const ThirdIllustration = () => {
    return (
        <div className={styles.illustration}>
            <div>
                <h1>Welcome to Hospital Internship App</h1>
                <h3>You will find a lot of tools to manage your intern students</h3>
            </div>
            <NurseDoctorMedicinesIcon className={styles.illustrationIcon}/>
        </div>
    );
}

const Home = () => {
    return (
        <GeneralLayout>
            <Carousel autoplay>
                <FirstIllustration/>
                <SecondIllustration/>
                <ThirdIllustration/>
            </Carousel>
        </GeneralLayout>
    );
}

export default Home;
