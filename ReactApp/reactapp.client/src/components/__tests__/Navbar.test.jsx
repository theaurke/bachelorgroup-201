import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar.jsx';
import '@testing-library/jest-dom';


describe('Navbar Component Test', () => {

    test('renders Navbar component without crashing', () => {
        const props = {
            toggleSidebar: jest.fn(),
            isSidebarCollapsed: false,
            activeTab: '',
            setActiveTab: jest.fn(),
            isNavbarCollapsed: false,
            setNavbarHeight: jest.fn(),
            isWindowSmall: false,
            setHome: jest.fn()
        };

        render(<Navbar {...props} />);
    });


    test('allows adding new tabs', () => {
        const props = {
            toggleSidebar: jest.fn(),
            isSidebarCollapsed: false,
            activeTab: '',
            setActiveTab: jest.fn(),
            isNavbarCollapsed: false,
            setNavbarHeight: jest.fn(),
            isWindowSmall: false,
            setHome: jest.fn()
        };

        const { getByText, queryByText } = render(<Navbar {...props} />);
        fireEvent.click(getByText('Start New Calculation'));

        expect(queryByText('Calculation 1')).toBeInTheDocument();
    });

    test('allows deleting tab', () => {
        const props = {
            toggleSidebar: jest.fn(),
            isSidebarCollapsed: false,
            activeTab: {id: '1', title:'Calculation 1'},
            setActiveTab: jest.fn(),
            isNavbarCollapsed: false,
            setNavbarHeight: jest.fn(),
            isWindowSmall: false,
            tabList: [{ id: '1', title: 'Calculation 1', list: [], layout: 'resource' }],
            setTabList: jest.fn(),
            setHome: jest.fn(),
            setShowInput: jest.fn(),
            setShowList: jest.fn(),
        };

        const { getByText, queryByText, getByAltText } = render(<Navbar {...props} />);

        fireEvent.click(getByText('Start New Calculation'));
        expect(queryByText('Calculation 1')).toBeInTheDocument();

        fireEvent.click(getByAltText('More options'));

        fireEvent.click(getByText('Delete'));

        fireEvent.click(getByText('Yes'));

        expect(queryByText('Calculation 1')).not.toBeInTheDocument();

    });

    test('allows cancelling deleting a tab', () => {
        const props = {
            toggleSidebar: jest.fn(),
            isSidebarCollapsed: false,
            activeTab: { id: '1', title: 'Calculation 1' },
            setActiveTab: jest.fn(),
            isNavbarCollapsed: false,
            setNavbarHeight: jest.fn(),
            isWindowSmall: false,
            tabList: [{ id: '1', title: 'Calculation 1', list: [], layout: 'resource' }],
            setTabList: jest.fn(),
            setHome: jest.fn(),
            setShowInput: jest.fn(),
            setShowList: jest.fn(),
        };

        const { getByText, queryByText, getByAltText } = render(<Navbar {...props} />);

        fireEvent.click(getByText('Start New Calculation'));
        expect(queryByText('Calculation 1')).toBeInTheDocument();

        fireEvent.click(getByAltText('More options'));

        fireEvent.click(getByText('Delete'));

        fireEvent.click(getByText('Cancel'));

        expect(queryByText('Calculation 1')).toBeInTheDocument();

    });

});
