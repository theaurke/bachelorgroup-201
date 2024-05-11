import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../../App';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';
import Main from '../Main';
import fetchMock from 'jest-fetch-mock';

// Mocking the NewWindow component to avoid opening a real window
jest.mock('react-new-window', () => ({ children }) => <div data-testid="NewWindowMock">{children}</div>);

// Set up fetch mock before running tests
beforeEach(() => {

    fetchMock.enableMocks();
});

describe('Converting results to PDF Integration test', () => {

    test('Nothing happens when clicking Convert to All Tabs to PDF when all tabs are in resource layout', () => {
        const { getByText, queryByTestId } = render(<App />);

        // Clicking the Convert all tabs to PDF button
        fireEvent.click(getByText('Convert All Tabs to PDF'));

        // Checking that the PDF window did not open
        expect(queryByTestId("NewWindowMock")).not.toBeInTheDocument();

    });

    test('only tabs that have completed the calculation is converted to PDF when clicking Convert All Tabs to PDF button', async() => {
        const props = {
            toggleSidebar: jest.fn(),
            isSidebarCollapsed: false,
            activeTab: 1,
            setActiveTab: jest.fn(),
            isWindowSmall: false,
            tabList: [
                { id: 0, title: "Calculation 1", list: [], calcData: [], layout: 'resource' },
                { id: 1, title: "Calculation 2", list: [], calcData: [], layout: 'result' },
                { id: 2, title: "Calculation 3", list: [], calcData: [], layout: 'resource' },
                { id: 3, title: "Calculation 4", list: [], calcData: [], layout: 'result' },
            ],
            setTabList: jest.fn(),
            setHome: jest.fn(),
            setShowInput: jest.fn(),
            setShowList: jest.fn(),
        };

        const { getByText, queryByTestId } = render(<Navbar {...props} />);

        // Clicking the Convert all tabs to PDF button
        fireEvent.click(getByText('Convert All Tabs to PDF'));

        // Checking that the window opened hand contain only the tabs that have completed the calculation
        await waitFor(() => {
            const newWindowMock = queryByTestId('NewWindowMock');
            expect(newWindowMock).toBeInTheDocument();

            expect(newWindowMock).toHaveTextContent('Calculation 2');
            expect(newWindowMock).toHaveTextContent('Calculation 4');
            expect(newWindowMock).not.toHaveTextContent('Calculation 1');
            expect(newWindowMock).not.toHaveTextContent('Calculation 3');
        });

    });

    test('new window open with correct title when clicking Convert to PDF button', async () => {
        const props = {
            activeTab: {id:1, title: "Test Calculation"},
            tabList: [{
                calcData: [{
                    resource: "Virtual Machine 1",
                    resourceShort: "VM",
                    region: "USA",
                    instance: "B1ls",
                    vmData: {
                        pkWh: 100,
                        embodied_Emissions: 50,
                    },
                    pue: 1.2,
                    carbonIntensity: 27,
                    time: {
                        year: 1,
                        month: 2,
                        day: 3,
                        hour: 4
                    }
                }]
            }],
            layout: 'result',
            activeList: [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
            { id: 2, resourceText: 'Dedicated Host', formdata: {} }],
        };

        const { queryByTestId, getByTestId, getByText} = render(<Main {...props} />);


        // Check that the button Div is in rendered
        expect(getByTestId('convertPDF')).toBeInTheDocument();


        // Clicking the Convert to PDF button
        act(() => {
            fireEvent.click(getByText('Convert to PDF'));
        }); 
        

        await waitFor(() => {
  
            // Assert that the NewWindowMock is rendered
            expect(queryByTestId('NewWindowMock')).toBeInTheDocument();

            // Assert that the NewWindowMock contains the correct title
            expect(queryByTestId('NewWindowMock')).toHaveTextContent("Test Calculation");
        });

    });
});