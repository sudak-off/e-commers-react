import React from 'react';
import {Link} from "react-router-dom";

const Header = ({onClickCart}) => {
    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to='/'>
                <div className='d-flex align-center'>
                    <img width={40} height={40} src='/img/Logo.png' alt='logo'/>
                    <div>
                        <h3 className='text-uppercase'>Магазин обуви</h3>
                        <p className='opacity-5'>Магазин лучшей обуви</p>
                    </div>
                </div>
            </Link>

            <ul className='d-flex'>
                <li onClick={onClickCart} className='mr-30 cu-p'>
                    <img width={18} height={18} src='/img/card.svg' alt='card'/>
                    <span>1203 грн.</span>
                </li>
                <li className='mr-20 cu-p'>
                    <Link to='/favorites'>
                        <img width={20} height={20} src='/img/heart.svg' alt='favorite'/>
                    </Link>
                </li>
                <li>
                    <img width={20} height={20} src='/img/user.svg' alt='user'/>
                </li>
            </ul>
        </header>
    );
};

export default Header;