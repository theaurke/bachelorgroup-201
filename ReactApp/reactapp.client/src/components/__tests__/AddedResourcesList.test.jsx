import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddedResourcesList from '../AddedResourcesList.jsx';
import '@testing-library/jest-dom';



describe('AddedResourcesList component', () => {

    test('renders list points for elemnt in the added resources list', () => {
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


    test('renders formData when clicking dropdown button', () => {
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {instance: 'B1ls', region:'Norway East', time:5} }];
        const setAddedResources = jest.fn();


        const { getByTestId, queryByText } = render(
            <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
        );

        const dropdownButton = getByTestId("dropdownButton");
        fireEvent.click(dropdownButton);

        setTimeout(() => {
            expect(queryByText("B1ls")).toBeInTheDocument();
            expect(queryByText("Norway East")).toBeInTheDocument();
            expect(queryByText("5")).toBeInTheDocument();
        }, 500);

    });

});