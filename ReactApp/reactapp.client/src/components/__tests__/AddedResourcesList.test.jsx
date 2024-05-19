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

    test('renders component without crashing', () => {
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
        { id: 2, resourceText: 'Dedicated Host', formdata: {} }];
        const setAddedResources = jest.fn();


        render(
            <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
        );

    });


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

    test('renders list points with correct resource name and button img', () => {
        const addedResources = [{ id: 0, resourceText: 'Virtual Machine', formdata: {} }];
        const setAddedResources = jest.fn();


        const { getByTestId } = render(
            <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
        );

        const listPoint1 = getByTestId("resourcesListpoint-0");
        expect(listPoint1).toBeInTheDocument();

        const resourceName = listPoint1.querySelector('h6');
        const buttonImage = listPoint1.querySelector('img');

        expect(resourceName).toHaveTextContent('Virtual Machine');
        expect(buttonImage).toHaveAttribute('src', 'downarrow.png');

    });

    
    test('renders formData when clicking dropdown button', async () => {
        const addedResources = [{
            id: 1,
            resourceText: 'Virtual Machine',
            formdata: { instance: 'B1ls', region: 'Norway', time: { year: 0, month: 0, day: 0, hour: 5 } }
        }];
        const setAddedResources = jest.fn();


        const { getByTestId, queryByText } = render(
            <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
        );

        const dropdownButton = getByTestId("dropdownButton");
        await act(async () => {
            fireEvent.click(dropdownButton);
        

        setTimeout(() => {
            expect(queryByText("B1ls")).toBeInTheDocument();
            expect(queryByText("Norway")).toBeInTheDocument();
            expect(queryByText("5")).toBeInTheDocument();
        }, 500);
        });

    });

    test('updates dropdown button img when clicking dropdown button', async () => {
        const addedResources = [{
            id: 1,
            resourceText: 'Virtual Machine',
            formdata: { instance: 'B1ls', region: 'Norway', time: { year: 0, month: 0, day: 0, hour: 5 } }
        }];
        const setAddedResources = jest.fn();


        const { getByTestId } = render(
            <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
        );

        
        const dropdownButton = getByTestId("dropdownButton");
        const buttonImage = dropdownButton.querySelector('img');
        await act(async () => {
            fireEvent.click(dropdownButton);

            setTimeout(() => {
                expect(buttonImage).toHaveAttribute('src', 'uparrow.png');
            }, 500);
        });

    });
    

});