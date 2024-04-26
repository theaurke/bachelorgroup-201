import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WarningPopup from '../WarningPopup.jsx';
import '@testing-library/jest-dom';


describe('WarningPopup Component Test', () => {

    test('renders warning message correctly', () => {
        const warningMessage = 'Test warning';
        const { getByText } = render(<WarningPopup warning={warningMessage} />);
        expect(getByText(warningMessage)).toBeInTheDocument();
    });

    test('calls onConfirm handler when "Yes" button is clicked', () => {
        const onConfirmMock = jest.fn();
        const { getByText } = render(<WarningPopup warning='Test warning' onConfirm={onConfirmMock} onCancel={() => { }} />);
        fireEvent.click(getByText('Yes'));
        expect(onConfirmMock).toHaveBeenCalled();
    });

    test('calls onCancel handler when "Cancel" button is clicked', () => {
        const onCancelMock = jest.fn();
        const { getByText } = render(<WarningPopup warning='Test warning' onConfirm={() => { }} onCancel={onCancelMock} />);
        fireEvent.click(getByText('Cancel'));
        expect(onCancelMock).toHaveBeenCalled();
    });

});
