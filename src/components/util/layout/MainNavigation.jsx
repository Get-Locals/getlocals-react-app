import React, {useState} from "react";
import {Image, Menu} from "antd";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBookOpen, faHouseUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut} from "../../../redux/slicers/authSlicer";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";


export default function () {
    const [current, setCurrent] = useState('mail');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = [
        {
            label: (<Link to={"/"}>Home</Link>),
            key: 'home',
            icon: <FontAwesomeIcon icon={faHouseUser} />,
        },
        {
            label: (<Link to={'/menu-items'}>Menu</Link>),
            key: 'menu',
            icon: <FontAwesomeIcon icon={faBookOpen} />,
        },
        {
            label: (
                <Link to={'/authenticate'}
                      onClick={() => {
                          dispatch(logOut())
                          navigate('/authenticate')
                      }}
                >Logout</Link>
            ),
            key: 'logout',
            icon: <FontAwesomeIcon icon={faRightFromBracket} />
        },
    ];

    return (
        <div style={mainNavigation.container}>
            <Image
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flex:1,
                    maxHeight: 70,
                    width: 'auto',
                    padding: 10,
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
                preview={false}
                src={require('../../../assets/img/GetLocals-logos/GetLocals-logos_transparent.png')}/>
            <Menu
                theme={'light'}
                style={{
                    flex:1,
                    background: 'var(--primary-color)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '30%'
                }}
                mode={'horizontal'}
                items={items}
                overflowedIndicator={(<FontAwesomeIcon icon={faBars} />)}
                overflowed={1}
            />
        </div>
    );
}

const mainNavigation = {
    container: {
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        background: 'var(--primary-color)',
        height: 70,
        paddingLeft: 20,
        paddingRight: 20
    }
}
