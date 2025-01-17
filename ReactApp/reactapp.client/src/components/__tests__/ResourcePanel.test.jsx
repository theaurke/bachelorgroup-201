import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResourcePanel from '../ResourcePanel.jsx';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

// Set up fetch mock before running tests
beforeEach(async () => {
    fetchMock.enableMocks();

    await fetchMock.mockResponseOnce(JSON.stringify(['B1ls', 'B2ms', 'B3ls']));
    await fetchMock.mockResponseOnce(JSON.stringify(['Norway East', 'Norway West']));
});


describe('ResourcePanel Component Test', () => {

    test('renders ResourcePanel component without crashing', () => {
        const layout = 'resource';
        const handleCalculate = jest.fn();
        const addedResources = [];
        const setAddedResources = jest.fn();
        const calculated = false;


        render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated} />
        );
    });

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
        const setShowList = jest.fn();


        const { getByTestId, getByRole } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated}
                setShowList={setShowList}
            />
        );

        const addResourceButton = getByTestId("addResourceButton");
        act(() => {
            fireEvent.click(addResourceButton);
        });


        waitFor(() => {
            const listElement = getByRole('list');
            expect(listElement).toBeInTheDocument();
        });
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

    test('renders list with resource to choose from when clicking Add resource, when there are already resources added to the calculation', () => {
        const layout = 'resource';
        const handleCalculate = jest.fn();
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }];
        const setAddedResources = jest.fn();
        const calculated = false;
        const setShowList = jest.fn();


        const { getByTestId, getByText } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated}
                setShowList={setShowList}
            />
        );

        const addedResourceList = getByTestId("addedResourceList");
        const addedResourcesButtons = getByTestId("addedResourcesButtons");

        expect(addedResourceList).toBeInTheDocument();
        expect(addedResourcesButtons).toBeInTheDocument();

        fireEvent.click(getByText("Add Resource"));

        waitFor(() => {
            expect(setShowList).toHaveBeenCalledWith(true);
        });
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
        act(() => {
            fireEvent.click(calculateButton);
        });


        expect(handleCalculate).toHaveBeenCalledTimes(1);
        expect(handleCalculate).toHaveBeenCalledWith("result");
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

    test('allows going back to after calculation to add more resources', () => {
        const layout = 'result';
        const handleCalculate = jest.fn();
        const addedResources = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }];
        const setAddedResources = jest.fn();
        const calculated = true;
        const showList = false;
        const showInput = false;
        const setLayout = jest.fn();


        const { getByTestId, queryByTestId } = render(
            <ResourcePanel
                layout={layout}
                handleCalculate={handleCalculate}
                addedResources={addedResources}
                setAddedResources={setAddedResources}
                calculated={calculated}
                showList={showList}
                showInput={showInput}
                setLayout={setLayout}
            />
        );

        expect(getByTestId("backCalculation")).toHaveStyle('visibility: visible;');
        expect(queryByTestId("Calculate")).not.toBeInTheDocument();

        fireEvent.click(getByTestId("backCalculation"));

        waitFor(() => {
            expect(setLayout).toHaveBeenCalledWith("resource");
            expect(getByTestId("backCalculation")).toHaveStyle('visibility: hidden;');
            expect(queryByTestId("Calculate")).toBeInTheDocument();
        });
        
    });
   
});