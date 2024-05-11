import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';


describe('Navbar components integration test', () => {

    test('should toggle sidebar and change col size when clicked', () => {
        // Render the App component
        const { getByTestId } = render(<App />);

        // Get the ToggleButton component
        const toggleButton = getByTestId('toggleButton');

        // Get the initial sidebar width
        const initialSidebarWidth = getByTestId('sidebar_col').classList.contains('col-lg-3');

        // Assert that the col size is found
        expect(initialSidebarWidth).toBe(true);

        // Click the toggle button
        fireEvent.click(toggleButton);

        // Get the updated sidebar width
        const updatedSidebarWidth = getByTestId('sidebar_col').classList.contains('col-lg-1');

        // Assert that toggleSidebar function is called and the updated col size is found
        expect(updatedSidebarWidth).toBe(true);

    });

    test('should add a new tab and set it as active when clicked', () => {

        // Render the App component
        const { getByTestId, getAllByTestId } = render(<App />);

        // Get the NavButton component
        const navButton = getByTestId('navBtn');

        // Get the initial number of tabs
        const initialTabs = getByTestId('navTabs').children.length;

        // Click the NavButton
        fireEvent.click(navButton);

        // Get the updated number of tabs to be rendered
        const updatedTabs = getByTestId('navTabs').children.length;

        // Assert that a new tab is added
        expect(updatedTabs).toBe(initialTabs + 1);

        const navLinks = getAllByTestId('navLink');

        // Get the last NavLink component
        const lastNavLink = navLinks[navLinks.length - 1];

        // Check if the last NavLink in the NavTab is active
        const isActive = lastNavLink.classList.contains('active');

        // Assert that the last tab is active
        expect(isActive).toBe(true);

    });

    test('allows copying a tab that has not completed a calculation', () => {
        const props = {
            activeTab: {},
            setActiveTab: jest.fn(),
            tabList: [{ id: 1, title: "Calculation 1", list: [1,2,3], calcData: [], layout: 'resource' }],
            setTabList: jest.fn(),
            setShowInput: jest.fn(),
            setShowList: jest.fn(),
            setHome: jest.fn(),
        }

        
        const { getByTestId, getByAltText, getByText } = render(<Navbar {...props} />);

        // Adding a tab
        fireEvent.click(getByTestId('navBtn'));

        // Clicking Copy button
        waitFor(() => {
            expect(getByTestId("moreoptions")).toBeInTheDocument();

            fireEvent.click(getByAltText("More options"));

            fireEvent.click(getByText("Copy"));

            // Checking if the right functions are called, and the list is updated with the correct data
            expect(props.setTabList).toHaveBeenCalledTimes(1);
            expect(props.setActiveTab).toHaveBeenCalledTimes(1);
            expect(props.setActiveTab).toHaveBeenCalledWith(2);
            expect(props.tabList).toHaveLength(2);
            expect(getByText("Calculation 2")).toBeInTheDocument();
            expect(props.activeTab).toContain({ id: 2, title: "Calculation 2" });
            expect(props.tablist[1].layout).toBe("resource");
            expect(props.tablist[1].list).toBeEqual(props.tabList[0].list);

        });

    });

    test('allows copying a tab after completing a calculation', () => {
        const props = {
            activeTab: {},
            setActiveTab: jest.fn(),
            tabList: [{ id: 1, title: "Calculation 1", list: [], calcData: [], layout: 'result' }],
            setTabList: jest.fn(),
            setShowInput: jest.fn(),
            setShowList: jest.fn(),
            setHome: jest.fn(),
        }


        const { getByTestId, getByAltText, getByText } = render(<Navbar {...props} />);

        // Adding a tab
        fireEvent.click(getByTestId('navBtn'));

        // Clicking Copy button
        waitFor(() => {
            expect(getByAltText("More options")).toBeInTheDocument();

            fireEvent.click(getByAltText("More options"));

            fireEvent.click(getByText("Copy"));

            // Checking if the right functions are called, and the list is updated with the correct data
            expect(props.setTabList).toHaveBeenCalledTimes(1);
            expect(props.setActiveTab).toHaveBeenCalledTimes(1);
            expect(props.setActiveTab).toHaveBeenCalledWith(2);
            expect(props.tabList).toHaveLength(2);
            expect(getByText("Calculation 2")).toBeInTheDocument();
            expect(props.activeTab).toContain({ id: 2, title: "Calculation 2" });
            expect(props.tablist[1].layout).toBe("resource");
            expect(props.tablist[1].list).toBeEqual(props.tabList[0].list);

        });

    });

    test('allows editing name of a tab', () => {
        const props = {
            activeTab: {},
            setActiveTab: jest.fn(),
            tabList: [{ id: 1, title: "Calculation 1", list: [], calcData: [], layout: 'result' }],
            setTabList: jest.fn(),
            setShowInput: jest.fn(),
            setShowList: jest.fn(),
            setHome: jest.fn(),
        }


        const { getByTestId, getByAltText, getByText } = render(<Navbar {...props} />);

        // Adding a tab
        fireEvent.click(getByTestId('navBtn'));

        // Clicking Edit button
        waitFor(() => {
            expect(getByAltText("More options")).toBeInTheDocument();

            fireEvent.click(getByAltText("More options"));

            fireEvent.click(getByText("Edit"));

            // Chaning the title
            expect(getByTestId('inputField')).toBeInTheDocument();

            fireEvent.change(getByTestId('inputField'), { target: { value: 'Edited Tab Title' } });

            // Checking if the right functions are called, and the list is updated with the correct data
            expect(props.setTabList).toHaveBeenCalledTimes(1);
            expect(props.tablist[0].title).toBe("Edited Tab Title");
            expect(getByText("Edited Tab Title")).toBeInTheDocument();
            expect(props.setActiveTab).toHaveBeenCalledTimes(1);
            expect(props.setActiveTab).toHaveBeenCalledWith({id: 1, titile: "Edited Tab Title"});

        });

    });

    test('closes options menu on click outside', () => {


        const { getByTestId, getByAltText, getByText } = render(<App />);

        // Adding a tab
        fireEvent.click(getByTestId('navBtn'));

        waitFor(() => {
            // Checking that the dots button is in the document
            expect(getByAltText("More options")).toBeInTheDocument();

            // Opening the options menu
            fireEvent.click(getByAltText("More options"));

            // Checking that it is open
            expect(getByText("Copy")).toBeInTheDocument();

            // Clicking outside the menu
            fireEvent.click(getByAltText("calculating"));

            // Checking that the menu is closed
            expect(getByText("Copy")).not.toBeInTheDocument();

        });

    });

});