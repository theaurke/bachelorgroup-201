import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResourcePanel from '../ResourcePanel.jsx';
import '@testing-library/jest-dom';




describe('ResourcePanel Component Test', () => {

    test('renders Add Resource button when no resources added', () => {
        const layout = 'resource';
        const handleCalculate = jest.fn();
        const addedResources = [];
        const setAddedResources = jest.fn();
        const calculated = false;


        const { getByTestId } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated} />
        );

        const addResourceButton = getByTestId("addResourceButton");

        expect(addResourceButton).toBeInTheDocument();
    });


    test('renders list of resources when clicking add resource button', () => {
        const layout = 'resource';
        const handleCalculate = jest.fn();
        const addedResources = [];
        const setAddedResources = jest.fn();
        const calculated = false;


        const { getByTestId, getByRole } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated} />
        );

        const addResourceButton = getByTestId("addResourceButton");
        fireEvent.click(addResourceButton);


        const listElement = getByRole('list');
        expect(listElement).toBeInTheDocument();
    });



    test('renders list with added resources with buttons, if list is not empty', () => {
        const layout = 'resource';
        const handleCalculate = jest.fn();
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }];
        const setAddedResources = jest.fn();
        const calculated = false;


        const { getByTestId } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated} />
        );

        const addedResourceList = getByTestId("addedResourceList");
        const addedResourcesButtons = getByTestId("addedResourcesButtons");

        expect(addedResourceList).toBeInTheDocument();
        expect(addedResourcesButtons).toBeInTheDocument();
    });


    test('Calls handlecalculate when clicking calculate button', () => {
        const layout = 'resource';
        const handleCalculate = jest.fn();
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }];
        const setAddedResources = jest.fn();
        const calculated = false;


        const { getByText } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated} />
        );

        const calculateButton = getByText("Calculate");
        fireEvent.click(calculateButton);


        expect(handleCalculate).toHaveBeenCalledTimes(1);
    });


    test('renders list with added resources without buttons, if list is not empty and calculated is true', () => {
        const layout = 'resource';
        const handleCalculate = jest.fn();
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }];
        const setAddedResources = jest.fn();
        const calculated = true;


        const { getByTestId, queryByTestId } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated} />
        );

        const addedResourceList = getByTestId("addedResourceList");
        const addedResourcesButtons = queryByTestId("Calculate");

        expect(addedResourceList).toBeInTheDocument();
        expect(addedResourcesButtons).not.toBeInTheDocument();
    });
   



});