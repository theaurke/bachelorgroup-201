import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResourceInput from '../ResourceInput.jsx';
import '@testing-library/jest-dom';



describe('ResourceInput Component', () => {


    test('renders the form with default data', () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = '';
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;

        const { getByRole, getByText, getByLabelText, getByTestId } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );


        const instanceInput = getByLabelText('Instance');
        const regionInput = getByLabelText('Region');
        const timeInput = getByRole('spinbutton');
        const timeRangeInput = getByRole('slider');


        expect(instanceInput).not.toBeDisabled();
        expect(regionInput).not.toBeDisabled();
        expect(timeInput).not.toBeDisabled();
        expect(timeRangeInput).not.toBeDisabled();


        const instanceValue = getByText('B1ls');
        const regionValue = getByText('Norway West');
        const inputTitle = getByTestId('inputTitle');

        expect(getComputedStyle(inputTitle).display).toBe('flex');
        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        expect(timeInput).toHaveValue(0);
        expect(timeRangeInput).toHaveValue('0');


        const clearButton = getByText('Clear');
        const addButton = getByText('Add');

        expect(clearButton).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();


    });

  

    test('renders the form with chosen data and the "Remove" and "Edit" buttons', () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = { instance: 'B1ms', region: 'Norway East', time: 5 };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = true;

        const { getByRole, getByText, getByLabelText, getByTestId } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const instanceInput = getByLabelText('Instance');
        const regionInput = getByLabelText('Region');
        const timeInput = getByRole('spinbutton');
        const timeRangeInput = getByRole('slider');

        expect(instanceInput).toBeDisabled();
        expect(regionInput).toBeDisabled();
        expect(timeInput).toBeDisabled();
        expect(timeRangeInput).toBeDisabled();

        const instanceValue = getByText('B1ms');
        const regionValue = getByText('Norway East');
        const inputTitle = getByTestId('inputTitle');

        expect(getComputedStyle(inputTitle).display).toBe('none');
        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        expect(timeInput).toHaveValue(5);
        expect(timeRangeInput).toHaveValue('5');


        const removeButton = getByText('Remove');
        const editButton = getByText('Edit');

        expect(removeButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();


    });


    test('renders the form with chosen data and the "Clear" and "Save" buttons', () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = { instance: 'B1ms', region: 'Norway East', time: 5 };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;

        const { getByRole, getByText, getByLabelText, getByTestId } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const instanceInput = getByLabelText('Instance');
        const regionInput = getByLabelText('Region');
        const timeInput = getByRole('spinbutton');
        const timeRangeInput = getByRole('slider');

        expect(instanceInput).not.toBeDisabled();
        expect(regionInput).not.toBeDisabled();
        expect(timeInput).not.toBeDisabled();
        expect(timeRangeInput).not.toBeDisabled();

        const instanceValue = getByText('B1ms');
        const regionValue = getByText('Norway East');
        const inputTitle = getByTestId('inputTitle');

        expect(getComputedStyle(inputTitle).display).toBe('none');
        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        expect(timeInput).toHaveValue(5);
        expect(timeRangeInput).toHaveValue('5');


        const clearButton = getByText('Clear');
        const saveButton = getByText('Save');

        expect(clearButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();


    });


    test('renders changes in the form', () => {
        const resourceText = 'Virtual Machine'
        const resourceFormData = { instance: 'B1ms', region: 'Norway East', time: 5 };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;

        const { getByRole, getByText, getByLabelText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const instanceInput = getByLabelText('Instance');
        const regionInput= getByLabelText('Region');
        const timeInput = getByRole('spinbutton');
        const timeRangeInput = getByRole('slider');

        fireEvent.change(instanceInput, { target: { value: 'B1ls', label: 'B1ls' } });
        fireEvent.change(regionInput, { target: { value: 'Norway West', label: 'Norway West' } });
        fireEvent.change(timeInput, { target: { value: 7} });
        fireEvent.change(timeRangeInput, { target: { value: '7' } });

        const instanceValue = getByText('B1ls');
        const regionValue = getByText('Norway West');


        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        expect(timeInput.getAttribute('value')).toBe('7');
        expect(timeRangeInput.getAttribute('value')).toBe('7');

    });


    test('calls handleSubmit when clicking "Add" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = '';
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;


        const { getByText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const addButton = getByText('Add');
        fireEvent.submit(addButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith({
            instance: 'B1ls',
            region: 'Norway West',
            time: 0
        });

    });


    test('calls handleSubmit when clicking "Save" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ls', region: 'Norway East', time: 5 };
        const resourceID = 1;
        const handleSubmit = jest.fn();
        const edit = false;


        const { getByText } = render(
            <ResourceInput
                resourceText={resourceText}
                resourceFormData={resourceFormData}
                resourceID={resourceID}
                edit={edit}
                handleSubmit={handleSubmit} />
        );

        const saveButton = getByText('Save');
        fireEvent.submit(saveButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith({
            instance: 'B1ls',
            region: 'Norway East',
            time: 5
        });

    });


    test('calls handleSubmit when clicking "Edit" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ls', region: 'Norway East', time: 5 };
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

        const editButton = getByText('Edit');
        fireEvent.submit(editButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith('Edit', resourceID);

    });


    test('calls handleSubmit when clicking "Remove" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ls', region: 'Norway East', time: 5 };
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
        fireEvent.click(removeButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith('Remove', resourceID);

    });


    test('resets form to deafult when clicking "Clear" button', () => {
        const resourceText = 'Virtual Machine';
        const resourceFormData = { instance: 'B1ms', region: 'Norway East', time: 5 };
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
        fireEvent.click(clearButton);

        const instanceValue = getByText('B1ls');
        const regionValue = getByText('Norway West');
        const timeInput = getByRole('spinbutton');
        const timeRangeInput = getByRole('slider');


        expect(instanceValue).toBeInTheDocument();
        expect(regionValue).toBeInTheDocument();
        expect(timeInput.getAttribute('value')).toBe('0');
        expect(timeRangeInput.getAttribute('value')).toBe('0');

    });


});


