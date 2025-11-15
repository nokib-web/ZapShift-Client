import React from 'react';
import logo from '../../assets/logo.png';

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <h3 className='text-3xl font-bold -ms-5 '>ZapShift</h3>
        </div>
    );
};

export default Logo;