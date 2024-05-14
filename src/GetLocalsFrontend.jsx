import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import {BrowserRouter, Navigate, Route, Router, Routes} from 'react-router-dom';
import CustomSpinner from './components/util/customSpinner/CustomSpinner';
import RequireAuth from "./components/authentication/RequireAuth";
import "./index.css"
import RequireUnAuth from "./components/authentication/RequireUnAuth";
import GetLayout from "./components/layout/GetLayout";
import {ConfigProvider} from "antd";
import {ActiveNavigationMenuProvider} from "./context/ActiveNavigationProvider";

const RegistrationScreen = lazy(async () => import('./screens/RegistrationScreen'));
const LoginScreen = lazy(async () => import('./screens/LoginScreen'));
const HomeScreen = lazy(async () => import('./screens/HomeScreen'));
const MenuScreen = lazy(async () => import('./screens/MenuScreen'));
const ReviewScreen = lazy(async () => import('./screens/ReviewScreen'));
const ContactRequestScreen = lazy(async () => import('./screens/ContactRequestScreen'));

const GetLocalsRoutes = () => {
    return (
        <Suspense fallback={<CustomSpinner />}>
            <Provider store={store}>
                <Routes>
                    <Route path={"*"} element={<Navigate to={"/authenticate"}/>} />
                    <Route element={<RequireUnAuth />}>
                        <Route path={'/authenticate'} element={<LoginScreen />} />
                        <Route path={'/authenticate/registration'} element={<RegistrationScreen />} />
                    </Route>
                    <Route element={<RequireAuth />}>
                        <Route element={<GetLayout />}>
                            <Route path={"/business-admin/"}>
                                <Route path="home/" element={<HomeScreen />} />
                                <Route path="menu-items/" element={<MenuScreen />} />
                                <Route path="reviews/" element={<ReviewScreen />} />
                                <Route path={"contact-request/"} element={<ContactRequestScreen />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/" element={<Navigate to="/business-admin/home/" replace />} />
                </Routes>
            </Provider>
        </Suspense>
    );
};

const RenderedApp = () => {
    return (
        <BrowserRouter>
            <ActiveNavigationMenuProvider>
                <ConfigProvider theme={{token: {fontFamily: 'Montserrat'}}}>
                    <GetLocalsRoutes />
                </ConfigProvider>
            </ActiveNavigationMenuProvider>
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(
    <RenderedApp />
);
