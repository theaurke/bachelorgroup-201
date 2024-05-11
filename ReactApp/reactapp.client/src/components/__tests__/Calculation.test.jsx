import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Main from '../Main';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';


// Set up fetch mock before running tests
beforeEach(() => {
    fetchMock.enableMocks();
});

describe('Calculation Integration test', () => {

    test('displays the correct results when clicking calculate', async () => {
        const props = {
            activeTab: { id: 1, title: "Test Calculation" },
            tabList: [{ id: 1,
                calcData: [{
                    resource: "Virtual Machine 2",
                    resourceShort: "VM",
                    region: "USA",
                    instance: "B1ls",
                    vmData: {
                        pkWh: 10,
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
                }],
                formData: {
                    instance: "B1ls",
                    region: "USA",
                    time: {
                        year: 1,
                        month: 2,
                        day: 3,
                        hour: 4
                    }
                },
            }],
            layout: 'resource',
            activeList: [{
                id: 1,
                resourceText: 'Virtual Machine',
                formdata:{
                    instance: "B1ls",
                    region: "USA",
                    time: {
                        year: 1,
                        month: 2,
                        day: 3,
                        hour: 4
                    } }
            }],
            home: false,
        };

        const { getByTestId, getByText } = render(<Main {...props} />);

        // Checking that the resource is added to the calculation with the correct data
        expect(getByText("Added Resources")).toBeInTheDocument();

        // Clicking the dropdown button
        fireEvent.click(getByTestId("dropdownButton"));

        waitFor(() => {
            // Checking if the data chosen is rendered
            expect(getByText('Virtual Machine 2')).toBeInTheDocument();
            expect(getByText('B1ls')).toBeInTheDocument();
            expect(getByText('USA')).toBeInTheDocument();
            expect(getByText('1')).toBeInTheDocument();
            expect(getByText('2')).toBeInTheDocument();
            expect(getByText('3')).toBeInTheDocument();
            expect(getByText('4')).toBeInTheDocument();

            // Clicking the calculate button
            fireEvent.click(getByText("Calculate"));

            // Check that the results are rendered with the correct results
            waitFor(() => {
                expect(getByText("Test Calculation")).toBeInTheDocument();
                expect(getByText("Virtual Machine 2")).toBeInTheDocument();
                expect(getByText("374")).toBeInTheDocument();
            });

        });
        
    });
});