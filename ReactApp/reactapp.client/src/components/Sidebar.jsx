import React from 'react';
import Navbar from './Navbar';

export default function Sidebar() {
    return (
        <aside style={{ border: '2px solid black' } }>
            <img alt='logo' />
            <Navbar />
        </aside>
    );
}