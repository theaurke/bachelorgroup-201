import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddedResourcesList from '../AddedResourcesList.jsx';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

// Set up fetch mock before running tests
beforeEach(() => {
    fetchMock.enableMocks();
});


describe('AddedResourcesList component', () => {

    test('renders list points for element in the added resources list', () => {
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
                                { id: 2, resourceText: 'Dedicated Host', formdata: {} }];
        const setAddedResources = jest.fn();


        const { getByTestId } = render(
            <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
        );

        const listPoint1 = getByTestId("resourcesListpoint-1");
        const listPoint2 = getByTestId("resourcesListpoint-2");

        expect(listPoint1).toBeInTheDocument();
        expect(listPoint2).toBeInTheDocument();

    });

    
    test('renders formData when clicking dropdown button', async () => {
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {instance: 'B1ls', region:'Norway East', time:5} }];
        const setAddedResources = jest.fn();


        const { getByTestId, queryByText } = render(
            <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
        );

        const dropdownButton = getByTestId("dropdownButton");
        await act(async () => {
            fireEvent.click(dropdownButton);
        

        setTimeout(() => {
            expect(queryByText("B1ls")).toBeInTheDocument();
            expect(queryByText("Norway East")).toBeInTheDocument();
            expect(queryByText("5")).toBeInTheDocument();
        }, 500);
        });

    });
    

});