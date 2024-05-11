import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import ResourcePanel from '../ResourcePanel';
import Main from '../Main';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';


// Set up fetch mock before running tests
beforeEach(async () => {
    fetchMock.enableMocks();

    await fetchMock.mockResponseOnce(JSON.stringify(['B1ls', 'B2ms', 'B3ls']));
    await fetchMock.mockResponseOnce(JSON.stringify(['Norway East', 'Norway West']));
});

describe('Integration Tests for resource handling', () => {

    test('Chosen resource should be added to the calculation with the correct data', async() => {
        const props = {
            layout: 'resource',
            handleCalculate: jest.fn(),
            addedResources: [],
            setAddedResources: jest.fn(),
            calculated: false,
            setShowList: jest.fn(),
            setShowInput: jest.fn(),
        };

        const { getByTestId, getByText, getByLabelText, getByRole } = render(<ResourcePanel {...props} />);

        // Clicking the Add Resource button
        act(() => {
            fireEvent.click(getByTestId("addResourceButton"));
        });


        waitFor(async () => {

            // Checking that the list of resources is rendered
            const listElement = getByRole('list');
            expect(listElement).toBeInTheDocument();

            // Choosing a resource from the list
            fireEvent.click(getByText('Virtual Machine'));

            // Checking that the list is closed
            expect(props.setShowList).toHaveBeenCalledWith(false);

            // Checking if the input form is rendered
            expect(getByTestId("inputForm")).toBeInTheDocument();

            // Filling out the info
            await act(async () => {
                await waitFor(() => getByLabelText('Instance'));
                await waitFor(() => getByLabelText('Region'));

                const instanceInput = getByLabelText('Instance');
                const regionInput = getByLabelText('Region');

                fireEvent.change(instanceInput, { target: { value: 'B1ls', label: 'B1ls' } });
                fireEvent.change(regionInput, { target: { value: 'Norway West', label: 'Norway West' } });
            });


            // Checking that the correct data is rendered after filling out the input fields
            waitFor(() => {
                const instanceValue = getByText('B1ls');
                const regionValue = getByText('Norway West');

                expect(instanceValue).toBeInTheDocument();
                expect(regionValue).toBeInTheDocument();
            });

            // Click the Add button
            fireEvent.click(getByText("Add"));

            // Checking that the input form has closed
            expect(props.setShowInput).toHaveBeenCalledWith(false);

            // Checking that the function to add the resources has been called
            expect(props.setAddedResources).toHaveBeenCalledTimes(1);

            // Check that the resource is being added to the calculation
            props.addedResources.forEach(({ id }) => {
                expect(getByTestId(`resourcesListpoint-${id}`)).toBeInTheDocument();

                // Clicking the dropdown button
                fireEvent.click(getByTestId("dropdownButton"));

                // Checking if the data chosen is rendered
                const instanceValue = getByText('B1ls');
                const regionValue = getByText('Norway West');

                expect(instanceValue).toBeInTheDocument();
                expect(regionValue).toBeInTheDocument();
            });
        });
    });


    test('removing a resource when there are multiple resources before calculation', async () => {
        const props = {
            setLayout: jest.fn(),
            layout: 'resource',
            handleCalculate: jest.fn(),
            showInput: false,
            setShowInput: jest.fn(),
            showList: false,
            setShowList: jest.fn(),
            addedResources: [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
            { id: 2, resourceText: 'Dedicated Host', formdata: {} }],
            setAddedResources: jest.fn(),
            calculated: false,
        };

        const { getByTestId, getByText } = render(<ResourcePanel {...props} />);

        expect(getByText("Added Resources")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-2")).toBeInTheDocument();

        fireEvent.click(getByTestId("resourcesListpoint-1"));

        waitFor(() => {
            expect(getByText("Remove")).toBeInTheDocument();

            fireEvent.click(getByText("Remove"));

            expect(getByText(/Are you sure you want to remove this resource?/i)).toBeInTheDocument();

            fireEvent.click(getByText("Yes"));

            expect(props.setAddedResources).toHaveBeenCalledTimes(1);
            expect(props.setLayout).toHaveBeenCalledTimes(0);
            expect(props.handleCalculate).toHaveBeenCalledTimes(0);
            expect(getByTestId("resourcesListpoint-1")).not.toBeInTheDocument();
            expect(getByTestId("resourcesListpoint-2")).toBeInTheDocument();
        });
       
    });

    test('removing a resource when there is only one resource before calculation', async () => {
        const props = {
            setLayout: jest.fn(),
            layout: 'resource',
            handleCalculate: jest.fn(),
            showInput: false,
            setShowInput: jest.fn(),
            showList: false,
            setShowList: jest.fn(),
            addedResources: [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }],
            setAddedResources: jest.fn(),
            calculated: false,
        };

        const { getByTestId, getByText } = render(<ResourcePanel {...props} />);

        expect(getByText("Added Resources")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();

        fireEvent.click(getByTestId("resourcesListpoint-1"));

        waitFor(() => {
            expect(getByText("Remove")).toBeInTheDocument();

            fireEvent.click(getByText("Remove"));

            expect(getByText(/Are you sure you want to remove this resource?/i)).toBeInTheDocument();

            fireEvent.click(getByText("Yes"));

            expect(props.setAddedResources).toHaveBeenCalledTimes(1);
            expect(props.setLayout).toHaveBeenCalledTimes(1);
            expect(props.handleCalculate).toHaveBeenCalledTimes(0);
            expect(getByTestId("resourcesListpoint-1")).not.toBeInTheDocument();
            expect(getByTestId("addResourceButton")).toBeInTheDocument();
        });

    });

    test('allows cancelling removal of a resource', async () => {
        const props = {
            setLayout: jest.fn(),
            layout: 'resource',
            handleCalculate: jest.fn(),
            showInput: false,
            setShowInput: jest.fn(),
            showList: false,
            setShowList: jest.fn(),
            addedResources: [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }],
            setAddedResources: jest.fn(),
            calculated: false,
        };

        const { getByTestId, getByText } = render(<ResourcePanel {...props} />);

        expect(getByText("Added Resources")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();

        fireEvent.click(getByTestId("resourcesListpoint-1"));

        waitFor(() => {
            expect(getByText("Remove")).toBeInTheDocument();

            fireEvent.click(getByText("Remove"));

            expect(getByText(/Are you sure you want to remove this resource?/i)).toBeInTheDocument();

            fireEvent.click(getByText("Cancel"));

            expect(props.setAddedResources).toHaveBeenCalledTimes(0);
            expect(props.setLayout).toHaveBeenCalledTimes(0);
            expect(props.handleCalculate).toHaveBeenCalledTimes(0);
            expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();
        });

    });

    test('removing a resource when there are multiple resources after calculation', async () => {
        const props = {
            setLayout: jest.fn(),
            layout: 'result',
            handleCalculate: jest.fn(),
            showInput: false,
            setShowInput: jest.fn(),
            showList: false,
            setShowList: jest.fn(),
            addedResources: [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
            { id: 2, resourceText: 'Dedicated Host', formdata: {} }],
            setAddedResources: jest.fn(),
            calculated: true,
        };

        const { getByTestId, getByText } = render(<ResourcePanel {...props} />);

        expect(getByText("Added Resources")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-2")).toBeInTheDocument();

        fireEvent.click(getByTestId("resourcesListpoint-1"));

        waitFor(() => {
            expect(getByText("Remove")).toBeInTheDocument();

            fireEvent.click(getByText("Remove"));

            expect(getByText(/Are you sure you want to remove this resource?/i)).toBeInTheDocument();

            fireEvent.click(getByText("Yes"));

            expect(props.setAddedResources).toHaveBeenCalledTimes(1);
            expect(props.setLayout).toHaveBeenCalledTimes(0);
            expect(props.handleCalculate).toHaveBeenCalledTimes(1);
            expect(getByTestId("resourcesListpoint-1")).not.toBeInTheDocument();
            expect(getByTestId("resourcesListpoint-2")).toBeInTheDocument();
        });

    });

    test('removing a resource when there is only one resource after calculation', async () => {
        const props = {
            setLayout: jest.fn(),
            layout: 'result',
            handleCalculate: jest.fn(),
            showInput: false,
            setShowInput: jest.fn(),
            showList: false,
            setShowList: jest.fn(),
            addedResources: [{ id: 1, resourceText: 'Virtual Machine', formdata: {} }],
            setAddedResources: jest.fn(),
            calculated: true,
        };

        const { getByTestId, getByText } = render(<ResourcePanel {...props} />);

        expect(getByText("Added Resources")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();

        fireEvent.click(getByTestId("resourcesListpoint-1"));

        waitFor(() => {
            expect(getByText("Remove")).toBeInTheDocument();

            fireEvent.click(getByText("Remove"));

            expect(getByText(/Are you sure you want to remove this resource?/i)).toBeInTheDocument();

            fireEvent.click(getByText("Yes"));

            expect(props.setAddedResources).toHaveBeenCalledTimes(0);
            expect(props.setLayout).toHaveBeenCalledTimes(1);
            expect(props.handleCalculate).toHaveBeenCalledTimes(0);
            expect(getByTestId("resourcesListpoint-1")).not.toBeInTheDocument();
            expect(getByTestId("addResourceButton")).toBeInTheDocument();
        });

    });

    test('editing a resource after calculation', async () => {
        const props = {
            setLayout: jest.fn(),
            layout: 'result',
            handleCalculate: jest.fn(),
            showInput: false,
            setShowInput: jest.fn(),
            showList: false,
            setShowList: jest.fn(),
            addedResources: [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
            { id: 2, resourceText: 'Dedicated Host', formdata: {} }],
            setAddedResources: jest.fn(),
            calculated: true,
        };

        const { getByTestId, getByText } = render(<ResourcePanel {...props} />);

        expect(getByText("Added Resources")).toBeInTheDocument();
        expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();

        fireEvent.click(getByTestId("resourcesListpoint-1"));

        waitFor(() => {
            expect(getByText("Edit")).toBeInTheDocument();

            fireEvent.click(getByText("Edit"));

            expect(getByText("Save")).toBeInTheDocument();

            fireEvent.click(getByText("Save"));

            expect(props.setAddedResources).toHaveBeenCalledTimes(1);
            expect(props.setLayout).toHaveBeenCalledTimes(0);
            expect(props.handleCalculate).toHaveBeenCalledTimes(1);
            expect(getByTestId("resourcesListpoint-1")).toBeInTheDocument();
        });

    });

});