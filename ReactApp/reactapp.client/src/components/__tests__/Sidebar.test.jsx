import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Sidebar from '../Sidebar.jsx';
import '@testing-library/jest-dom';


describe('Sidebar Component Test', () => {
    test('renders logo when sidebar is not collapsed', () => {
        const props = {
            toggleSidebar: jest.fn(),
            sidebarWidth: 3,
            activeTab: '',
            setActiveTab: jest.fn(),
            navbarHeight: '',
            windowWidth: 1200,
            minWindowWidth: 992,
            setNavbarHeight: jest.fn(),
        };

        const { getByAltText } = render(<Sidebar {...props} />);

        expect(getByAltText('logo')).toBeInTheDocument();

    });

    test('do not render logo when sidebar is collapsed', () => {
        const props = {
            toggleSidebar: jest.fn(),
            sidebarWidth: 1,
            activeTab: '',
            setActiveTab: jest.fn(),
            navbarHeight: '',
            windowWidth: 1200,
            minWindowWidth: 992,
            setNavbarHeight: jest.fn(),
        };

        const { queryByAltText } = render(<Sidebar {...props} />);

        expect(queryByAltText('logo')).not.toBeInTheDocument();

    });

});
