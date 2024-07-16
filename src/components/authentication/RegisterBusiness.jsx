import React, {useState} from 'react';
import {Button, Form, Input, Select} from "antd";
import {useGetTypesQuery, useRegisterBusinessMutation} from "../../redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../util/customSpinner/GetLoader";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/slicers/authSlicer";
import RegistrationSuccessModal from "./RegistrationSuccessModal";

export default function () {
    const [form] = Form.useForm();
    const {data: businessTypes, isLoading} = useGetTypesQuery();
    const [registerBusiness, {isLoading: isRegisteringBusiness}] = useRegisterBusinessMutation();
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);

    if (isLoading) {
        return <GetLoader
            display={DISPLAY.AREA}
            spinner={SPINNERS.SKELETON}
        />
    }

    const rules = [{
        required: true,
        message: 'The field is required.'
    }]

    function onFinish() {
        const fullLocation = `${form.getFieldValue('street')}, ${form.getFieldValue('city')}, ${form.getFieldValue('province')}`;
        registerBusiness({
            location: fullLocation,
            currency: '$',
            ...form.getFieldsValue()
        }).then(({data, error}) => {
            if (data) {
                setIsRegistrationModalVisible(true)
            }
        })
    }

    return <>
        <Form
            form={form}
            layout={"vertical"}
            onFinish={onFinish}
        >
            <p style={{
                color: '#ece7e2',
                fontSize: 'x-large',
            }}>Tell us more about the business...</p>
            <Form.Item
                name={'name'}
                rules={rules}
                validateTrigger="onBlur"
            >
                <div className={'hover-input'}>
                    <Input rootClassName={"authentication"} placeholder={'Business Name'}/>
                </div>
            </Form.Item>
            <Form.Item
                name={'businessType'}
                rules={rules}
                validateTrigger="onBlur"
            >
                <div className={'hover-input'} style={{border: '1px solid #f2f2f2', color: '#ece7e2'}}>
                    <Select
                        rootClassName={"authentication-select"}
                        options={businessTypes}
                        onChange={(value) => form.setFieldValue('businessType', value)}
                        placeholder={'Business Type'}
                        style={registerBusinessStyles.input}
                    />
                </div>
            </Form.Item>
            <Form.Item
                name={'street'}
                rules={rules}
                validateTrigger="onBlur"
            >
                <div className={'hover-input'}>
                    <Input rootClassName={"authentication"} placeholder={'Street Address'}/>
                </div>
            </Form.Item>
            <Form.Item
                name={'city'}
                rules={rules}
                validateTrigger="onBlur"
            >
                <div className={'hover-input'}>
                    <Input rootClassName={"authentication"} placeholder={'City'}/>
                </div>
            </Form.Item>
            <Form.Item
                name={'province'}
                rules={rules}
                validateTrigger="onBlur"
            >
                <div className={'hover-input'}>
                    <Input rootClassName={"authentication"} placeholder={'State/Province'}/>
                </div>
            </Form.Item>
            <p
                style={{
                    color: '#ece7e2',
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => setIsRegistrationModalVisible(true)}
            >
                Skip for now and register business later
            </p>
            <Form.Item>
                <Button
                    style={{
                        ...registerBusinessStyles.buttons,
                        color: '#ece7e2',
                        textShadow: '0 1px 3px'
                    }}
                    loading={isRegisteringBusiness}
                    htmlType={'submit'}
                >
                    Register
                </Button>
            </Form.Item>

        </Form>
        {isRegistrationModalVisible ? <RegistrationSuccessModal isVisible={isRegistrationModalVisible}/> : null}
    </>

}

const registerBusinessStyles = {
    input: {
        height: '58px',
        color: '#ece7e2',
        maxWidth: '450px',
        fontWeight: 500,
        fontSize: '16px',
        background: 'none',
        border: 'none',

    },
    buttons: {
        width: '240px',
        height: '50px',
        borderRadius: '10px',
        fontWeight: 'bolder',
        fontSize: '25px',
        background: 'none',
        border: 'none',
        boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)'

    }
}
