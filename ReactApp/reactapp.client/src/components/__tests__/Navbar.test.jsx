import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar.jsx';
import '@testing-library/jest-dom';


describe('Navbar Component Test', () => {
    test('allows adding new tabs', () => {
        const props = {
            toggleSidebar: jest.fn(),
            isSidebarCollapsed: false,
            activeTab: '',
            setActiveTab: jest.fn(),
            isNavbarCollapsed: false,
            setNavbarHeight: jest.fn(),
            isWindowSmall: false
        };

        const { getByText, queryByText } = render(<Navbar {...props} />);
        fireEvent.click(getByText('Start new calculation'));

        expect(queryByText('Calculation 1')).toBeInTheDocument();
    });

    test('allows deleting tab', () => {
        const props = {
            toggleSidebar: jest.fn(),
            isSidebarCollapsed: false,
            activeTab: '1',
            setActiveTab: jest.fn(),
            isNavbarCollapsed: false,
            setNavbarHeight: jest.fn(),
            isWindowSmall: false
        };

        const { getByText, queryByText, getByAltText } = render(<Navbar {...props} />);

        fireEvent.click(getByText('Start new calculation'));
        expect(queryByText('Calculation 1')).toBeInTheDocument();

        fireEvent.click(getByAltText('Delete'));

        fireEvent.click(getByText('Yes'));

        expect(queryByText('Calculation 1')).not.toBeInTheDocument();

    });

});