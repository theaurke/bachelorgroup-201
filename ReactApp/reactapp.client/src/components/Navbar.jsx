import React from 'react';
import NavButton from './NavButton';
import ToggleButton from './ToggleButton';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <NavButton />
            </ul>
            <ToggleButton />
        </nav>
    );
}