"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { IoCartOutline } from "react-icons/io5";

import { Nunito } from 'next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '600']
})


const Nav = () => {
    const [mobileMenu, setMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenu(!mobileMenu);
    };

    return (
        <nav className="bg-gray-100 py-4 px-6 flex justify-between items-center w-full z-10">
            <div className="text-orange-500 font-bold text-2xl flex-1">
                <Link href="/" className={nunito.className}>Sound<span className='text-black'>WRLD</span> </Link>
            </div>
            <div className="hidden md:flex space-x-6 flex-2">
                <Link href="/admin" className="nav-menus">
                    Dashboard
                </Link>
                <Link href="/admin/item" className="nav-menus">
                    Items
                </Link>
                <Link href="/admin/sales" className="nav-menus">
                    Sales
                </Link>
                <Link href="/login" className="nav-menus">
                    Login
                </Link>

            </div>
            <div className='hidden md:flex flex-1 justify-end'>
                <Link href="/cart" className="text-gray-900 hover:text-orange-500 font-medium hover:font-semibold p-2 flex items-center justify-end">
                    <IoCartOutline className="mr-2" />
                    Cart
                </Link>
            </div>
            <div className="md:hidden">
                
                <button onClick={toggleMobileMenu} className="text-gray-900 focus:outline-none">
                    {mobileMenu ? <FaTimes /> : <FaBars />}
                </button>
                
            </div>
            {mobileMenu && (
                <div className="md:hidden absolute top-14 left-0 bg-gray-100 w-full p-4 space-y-4">
                    <Link href="/admin" className="block nav-menus" onClick={toggleMobileMenu}>
                    Dashboard
                    </Link>
                    <Link href="/admin/item" className="block nav-menus" onClick={toggleMobileMenu}>
                        Items
                    </Link>
                    <Link href="/admin/sales" className="block nav-menus" onClick={toggleMobileMenu}>
                        Sales
                    </Link>
                    <Link href="/login" className="block nav-menus" onClick={toggleMobileMenu}>
                        Login
                    </Link>
                    <Link href="/cart" className=" nav-menus flex items-center p-2 hover:bg-slate-300" onClick={toggleMobileMenu}>
                        <IoCartOutline className="mr-1" />
                        Cart
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Nav;