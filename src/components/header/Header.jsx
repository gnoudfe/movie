import React, { useEffect, useRef } from 'react';
import './header.scss';
import logo from '../../assets/Logonetflix.png';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex((e) => e.path === pathname);
    const headerNavRef = useRef(null);
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', shrinkHeader);

        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                <div className="menu-icon">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => {
                            headerNavRef.current.classList.add('open');
                        }}
                    />
                </div>

                <ul className="header__nav" ref={headerNavRef}>
                    <div className="x-icon">
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                                headerNavRef.current.classList.remove('open');
                            }}
                        />
                    </div>
                    {headerNav.map((nav, index) => (
                        <li key={index} className={`${index === active ? 'active' : ''}`}>
                            <a href={nav.path}>{nav.display}</a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <div className="header__wrap__mobile">
                <ul className="header__nav__mobile">
                    {headerNav.map((nav, index) => (
                        <li key={index} className={`${index === active ? 'active' : ''}`}>
                            <a href={nav.path}>{nav.display}</a>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default Header;
