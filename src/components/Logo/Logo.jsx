import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img src={logo} alt="Logo" className="w-12 h-12" />
                <h3 className='text-3xl font-bold -ms-5 '>ZapShift</h3>
            </div>
        </Link>
    );
};

export default Logo;