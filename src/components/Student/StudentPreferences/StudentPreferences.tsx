import {Button, Card, Form, Select, Space, Switch} from 'antd';
import {formatToPascalCase} from '../../../core/helpers/format-to-pascal-case';
import {useEffect, useState} from 'react';
import {StudentPreferencesForm} from '../../../models/interfaces/StudentPreferences';
import {userStore} from '../../../stores';
import {studentInternshipFetcher} from '../../../fetchers';

const StudentPreferences = () => {
    const [form] = Form.useForm<StudentPreferencesForm>();
    const [formsDisabled, setFormsDisabled] = useState<boolean>(false);
    const [defaultPreferences, setDefaultPreferences] = useState<StudentPreferencesForm>();

    const cities: string[] = ['TEL AVIV', 'PETAH TIKVA', 'JERUSALEM', 'BEER SHEVA'];
    const childrenNumber: number[] = [0, 1, 2, 3, 4, 5];
    const days: string[] = ['DLV', 'MMJ'];
    const hours: string[] = ['9-12', '12-15', '15-18'];

    const getPreferences = async () => {
        const id: string = userStore.getId();
        if (id === '') return;
        const preferences = await studentInternshipFetcher.getStudentPreferences(id);
        setDefaultPreferences(preferences.data as unknown as StudentPreferencesForm);
        initForm();
    }

    useEffect(() => {
        getPreferences();
    }, [])

    const initForm = () => {
        defaultPreferences
            ? form.setFieldsValue({...defaultPreferences})
            : form.setFieldsValue({
                id_student: userStore.getId(),
                married: false,
                children: childrenNumber[0],
                car: false,
                work: false,
                disability: false,
                desiredCity: cities[0],
                desiredDays: days[0],
                desiredHours: hours[0]
            })
    }


    const onModifyPreferences = async () => {
        setFormsDisabled(!formsDisabled);

        if (formsDisabled)
            await studentInternshipFetcher.putStudentPreferences(form.getFieldsValue());
    }

    const FamilyCard = () => {
        const [showChildren, setShowChildren] = useState<boolean>(false);

        return (
            <Card title='Family' style={{flex: 1}}>
                <Form name='family' form={form} labelCol={{span: 12}} wrapperCol={{span: 12}} labelWrap
                      onFinish={(e) => console.log(e)} disabled={formsDisabled}>
                    <Form.Item label='Are you married?' name='married' valuePropName='checked' shouldUpdate
                               rules={[{required: true}]}>
                        <Switch defaultChecked={false} onChange={(value: boolean) => setShowChildren(!value)}/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='How many children have you?' name='children' hidden={!showChildren} shouldUpdate>
                        <Select>
                            {childrenNumber.map((numChild: number) =>
                                <Select.Option key={numChild} value={numChild}>{numChild}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

    const WorkCard = () => {
        return (
            <Card title='Work' style={{flex: 2}}>
                <Button onClick={() => console.log(form.getFieldsValue())}>GET</Button>
                <Form name='family' form={form} labelCol={{span: 15}} labelWrap
                      style={{display: 'flex', justifyContent: 'space-around'}}
                      onFinish={(e) => console.log(e)} disabled={formsDisabled}>
                    <div>
                        <Form.Item label='Which days would you like to work?' name='desiredDays' shouldUpdate>
                            <Select style={{width: 250}}>
                                <Select.Option key='DLV' value='DLV'>Sunday - Monday - Friday</Select.Option>
                                <Select.Option key='MMJ' value='MMJ'>Tuesday - Wednesday - Thursday</Select.Option>
                            </Select>
                        </Form.Item>
                        <Space/>
                        <Form.Item label='Which hours would you like to work?' name='desiredHours' shouldUpdate>
                            <Select style={{width: 250}}>
                                <Select.Option key='9-12' value='9-12'>09:00 - 12:00</Select.Option>
                                <Select.Option key='12-15' value='12-15'>12:00 - 15:00</Select.Option>
                                <Select.Option key='15-18' value='15-18'>15:00 - 18:00</Select.Option>
                            </Select>
                        </Form.Item>
                        <Space/>
                        <Form.Item label='In which city would you like to work?' name='desiredCity' shouldUpdate>
                            <Select style={{width: 250}}>
                                {cities.map((city: string) =>
                                    <Select.Option key={city} value={city}>{formatToPascalCase(city)}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label='Do you work?' name='work' valuePropName='checked' shouldUpdate>
                            <Switch/>
                        </Form.Item>
                        <Space/>
                        <Form.Item label='Do you have a car?' name='car' valuePropName='checked' shouldUpdate>
                            <Switch/>
                        </Form.Item>
                        <Space/>
                        <Form.Item label='Do you have any disability?' name='disability' valuePropName='checked'
                                   shouldUpdate>
                            <Switch/>
                        </Form.Item>
                        <Space/>
                    </div>
                </Form>
            </Card>
        );
    }

    return (
        <>
            <Button type='primary' style={{marginBottom: 10}} onClick={onModifyPreferences}>Modify
                Preferences</Button>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: 10}}>
                <FamilyCard/>
                <WorkCard/>
            </div>
        </>
    );
}

export default StudentPreferences;
