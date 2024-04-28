import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResourceInput from '../ResourceInput.jsx';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';


// Set up fetch mock before running tests
beforeEach(async () => {
    fetchMock.enableMocks();

    await fetchMock.mockResponseOnce(JSON.stringify(['B1ls', 'B2ms', 'B3ls']));
    await fetchMock.mockResponseOnce(JSON.stringify(['Norway East', 'Norway West']));
});


describe('ResourceInput Component', () => {


    test('renders the form with default data', () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = '';
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;

        const { getByText, getByAltText, getByLabelText, getByTestId, getByPlaceholderText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );


        const instanceInput = getByLabelText('Instance');
        const regionInput = getByLabelText('Region');
        const timeInputs = [
            getByPlaceholderText('Year'),
            getByPlaceholderText('Month'),
            getByPlaceholderText('Day'),
            getByPlaceholderText('Hour'),
        ];


        expect(instanceInput).not.toBeDisabled();
        expect(regionInput).not.toBeDisabled();
        timeInputs.forEach(input => {
            expect(input).not.toBeDisabled();
        });


        const instanceValue = getByText('Choose instance');
        const regionValue = getByText('Choose region');
        const inputTitle = getByTestId('inputTitle');
        const backButton = getByAltText('Back');

        expect(inputTitle).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        timeInputs.forEach((input, index) => {
            if (index === timeInputs.length - 1) {
                expect(input).toHaveValue(1);
            } else {
                expect(input).toHaveValue(0);
            }
        });


        const clearButton = getByText('Clear');
        const addButton = getByText('Add');

        expect(clearButton).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();


    });

  

    test('renders the form with chosen data and the "Remove" and "Edit" buttons', () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = {
            instance: 'B1ms', region: 'Norway East', time: { year: 0, month: 0, day: 0, hour: 5 } };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = true;

        const { getByText, queryByTestId, queryByAltText, getByLabelText, getByPlaceholderText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const instanceInput = getByLabelText('Instance');
        const regionInput = getByLabelText('Region');
        const timeInputs = [
            getByPlaceholderText('Year'),
            getByPlaceholderText('Month'),
            getByPlaceholderText('Day'),
            getByPlaceholderText('Hour'),
        ];

        expect(instanceInput).toBeDisabled();
        expect(regionInput).toBeDisabled();
        timeInputs.forEach(input => {
            expect(input).toBeDisabled();
        });

        const instanceValue = getByText('B1ms');
        const regionValue = getByText('Norway East');
        const inputTitle = queryByTestId('inputTitle');
        const backButton = queryByAltText('Back');

        expect(inputTitle).not.toBeInTheDocument();
        expect(backButton).not.toBeInTheDocument();
        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        timeInputs.forEach((input, index) => {
            if (index === timeInputs.length - 1) {
                expect(input).toHaveValue(5);
            } else {
                expect(input).toHaveValue(0);
            }
        });


        const removeButton = getByText('Remove');
        const editButton = getByText('Edit');

        expect(removeButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();


    });


    test('renders the form with chosen data and the "Clear" and "Save" buttons', () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = { instance: 'B1ms', region: 'Norway East', time: { year: 0, month: 0, day: 0, hour: 5 } };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;

        const { getByText, queryByAltText, getByLabelText, queryByTestId, getByPlaceholderText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const instanceInput = getByLabelText('Instance');
        const regionInput = getByLabelText('Region');
        const timeInputs = [
            getByPlaceholderText('Year'),
            getByPlaceholderText('Month'),
            getByPlaceholderText('Day'),
            getByPlaceholderText('Hour'),
        ];

        expect(instanceInput).not.toBeDisabled();
        expect(regionInput).not.toBeDisabled();
        timeInputs.forEach(input => {
            expect(input).not.toBeDisabled();
        });

        const instanceValue = getByText('B1ms');
        const regionValue = getByText('Norway East');
        const inputTitle = queryByTestId('inputTitle');
        const backButton = queryByAltText('Back');

        expect(inputTitle).not.toBeInTheDocument();
        expect(backButton).not.toBeInTheDocument();
        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        timeInputs.forEach((input, index) => {
            if (index === timeInputs.length - 1) {
                expect(input).toHaveValue(5);
            } else {
                expect(input).toHaveValue(0);
            }
        });


        const clearButton = getByText('Clear');
        const saveButton = getByText('Save');

        expect(clearButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();


    });


    test('renders changes in the form', async () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = { instance: 'B1ms', region: 'Norway East', time: { year: 0, month: 0, day: 0, hour: 5 } };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;

        const { getByText, getByLabelText, getByPlaceholderText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        await act(async () => {
            await waitFor(() => getByLabelText('Instance'));
            await waitFor(() => getByLabelText('Region'));

            const instanceInput = getByLabelText('Instance');
            const regionInput = getByLabelText('Region');
            const timeInputs = [
                getByPlaceholderText('Year'),
                getByPlaceholderText('Month'),
                getByPlaceholderText('Day'),
                getByPlaceholderText('Hour'),
            ];

            fireEvent.change(instanceInput, { target: { value: 'B1ls', label: 'B1ls' } });
            fireEvent.change(regionInput, { target: { value: 'Norway West', label: 'Norway West' } });
            fireEvent.change(timeInputs[1], { target: { value: 7 } });
        });

        waitFor(() => {
            const instanceValue = getByText('B1ls');
            const regionValue = getByText('Norway West');
            const timeValues = [
                getByPlaceholderText('Year'),
                getByPlaceholderText('Month'),
                getByPlaceholderText('Day'),
                getByPlaceholderText('Hour'),
            ];


            expect(instanceValue).toBeInTheDocument();
            expect(regionValue).toBeInTheDocument();
            timeValues.forEach((value, index) => {

                if (index === timeValues.length - 1) {
                    expect(value).toHaveValue(5);
                } else if (index === 1) {
                    expect(value).toHaveValue(7);
                } else { 
                    expect(value).toHaveValue(0);
                }
            });
        });
       
    });


    test('calls handleSubmit when clicking "Add" button with chosen values', async () => {

        fetchMock.mockResponseOnce(JSON.stringify(['B1ls', 'B2ms', 'B3ls']));
        fetchMock.mockResponseOnce(JSON.stringify(['Norway East', 'Norway West']));

        const resourceText = 'Virtual Machine';
        const resourceFormData = '';
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;


        const { getByText, getByLabelText, getByPlaceholderText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        await waitFor(() => getByLabelText('Instance'));
        await waitFor(() => getByLabelText('Region'));

        const instanceInput = getByLabelText('Instance');
        const regionInput = getByLabelText('Region');
        const timeInputs = [
            getByPlaceholderText('Year'),
            getByPlaceholderText('Month'),
            getByPlaceholderText('Day'),
            getByPlaceholderText('Hour'),
        ];

        act(() => {
            fireEvent.change(instanceInput, { target: { value: 'B1ls', label: 'B1ls' } });
            fireEvent.change(regionInput, { target: { value: 'Norway West', label: 'Norway West' } });
            fireEvent.change(timeInputs[1], { target: { value: 7 } });
       
            const addButton = getByText('Add');
            fireEvent.submit(addButton);
        });

        waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith({
                instance: 'B1ls',
                region: 'Norway West',
                time: {year: 0, month: 7, day: 0, hour: 5}
            });
        });
    });


    test('do not call handleSubmit when clicking "Add" button with default values', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = '';
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;


        const { getByText, getByPlaceholderText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const instanceValue = getByText('Choose instance');
        const regionValue = getByText('Choose region');
        const timeInputs = [
            getByPlaceholderText('Year'),
            getByPlaceholderText('Month'),
            getByPlaceholderText('Day'),
            getByPlaceholderText('Hour'),
        ];

        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        timeInputs.forEach((input, index) => {
            if (index === timeInputs.length - 1) {
                expect(input).toHaveValue(1);
            } else {
                expect(input).toHaveValue(0);
            }
        });

        const addButton = getByText('Add');

        act(() => {
            fireEvent.submit(addButton);
        });

        waitFor(() => expect(handleSubmit).not.toHaveBeenCalledTimes(1));

    });


    


    test('calls handleSubmit when clicking "Save" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ls', region: 'Norway East', time: { year: 0, month: 7, day: 0, hour: 5 } };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;
        const setEdit = jest.fn();


        const { getByText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit}
                setEdit={setEdit}/>
        );

        const saveButton = getByText('Save');
        act(() => {
            fireEvent.click(saveButton);
        });

        waitFor(() => {
            expect(setEdit).toHaveBeenCalledTimes(1);
            expect(setEdit).toHaveBeenCalledWith(true);

            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith('Save', 1, {
                instance: 'B1ls',
                region: 'Norway East',
                time: { year: 0, month: 7, day: 0, hour: 5 }
            });
        });

    });


    test('calls setEdit when clicking "Edit" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ls', region: 'Norway East', time: { year: 0, month: 7, day: 0, hour: 5 } };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = true;
        const setEdit = jest.fn();


        const { getByText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit}
                setEdit={setEdit} />
        );

        const editButton = getByText('Edit');
        act(() => {
            fireEvent.submit(editButton);
        });

        waitFor(() => expect(setEdit).toHaveBeenCalledTimes(1));

    });


    test('calls handleSubmit when clicking "Remove" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ls', region: 'Norway East', time: { year: 0, month: 7, day: 0, hour: 5 } };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = true;


        const { getByText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const removeButton = getByText('Remove');
        act(() => {
            fireEvent.click(removeButton);
        });


        waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith('Remove', resourceID);
        });
    });


    test('resets form to default when clicking "Clear" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ms', region: 'Norway East', time: { year: 0, month: 7, day: 0, hour: 5 } };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;


        const { getByText, getByRole } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const clearButton = getByText('Clear');
        act(() => {
            fireEvent.click(clearButton);
        });

        waitFor(() => {
            const instanceValue = getByText('Choose instance');
            const regionValue = getByText('Choose region');
            const timeInputs = [
                getByPlaceholderText('Year'),
                getByPlaceholderText('Month'),
                getByPlaceholderText('Day'),
                getByPlaceholderText('Hour'),
            ];


            expect(instanceValue).toBeInTheDocument();
            expect(regionValue).toBeInTheDocument();
            timeInputs.forEach(input => {
                expect(input).toHaveValue(0);
            });
        });
    });


});


