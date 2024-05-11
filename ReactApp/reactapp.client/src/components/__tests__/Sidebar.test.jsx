import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar.jsx';
import '@testing-library/jest-dom';


describe('Sidebar Component Test', () => {

    test('renders Sidebar component without crashing', () => {
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

        render(<Sidebar {...props} />);

    });

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

        expect(getByAltText('logo')).toHaveAttribute("src", "logo.png");

    });

    test('render small logo when sidebar is collapsed', () => {
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

        const { getByAltText } = render(<Sidebar {...props} />);

        expect(getByAltText('logo')).toHaveAttribute("src", "logoSmall.png");

    });

    test('renders navbar', () => {
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

        const { queryByText } = render(<Sidebar {...props} />);

        expect(queryByText('Start New Calculation')).toBeInTheDocument();

    });

    test('renders Information page when clicking logo', () => {
        const props = {
            toggleSidebar: jest.fn(),
            sidebarWidth: 3,
            activeTab: '',
            setActiveTab: jest.fn(),
            navbarHeight: '',
            windowWidth: 1200,
            minWindowWidth: 992,
            setNavbarHeight: jest.fn(),
            setHome: jest.fn(),
        };

        const { getByAltText } = render(<Sidebar {...props} />);

        const logo = getByAltText('logo');

        expect(logo).toBeInTheDocument();

        fireEvent.click(logo);

        expect(props.setHome).toHaveBeenCalledTimes(1);
        expect(props.setHome).toHaveBeenCalledWith(true);
    });

});
