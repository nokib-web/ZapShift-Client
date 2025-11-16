import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo />
            <div className='flex items-center justify-center'>
                <div className='flex-1 p-8 '>
                    <Outlet />
                </div>
                <div className='flex-1 p-8'>
                    <img src={authImage} alt="Authentication" />
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;