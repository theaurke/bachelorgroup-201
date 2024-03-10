import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextButton from '../TextButton.jsx';
import '@testing-library/jest-dom';


describe('TextButton Component Test', () => {
    test('renders button with provided text', () => {
        const buttonText = 'Button test';
        const { getByText } = render(<TextButton text={buttonText} />);
        expect(getByText(buttonText)).toBeInTheDocument();
    });

    test('calls onClick handler when button is clicked', () => {
        const buttonText = 'Button test';
        const onClickMock = jest.fn();
        const { getByText } = render(<TextButton text={buttonText} onClick={onClickMock} />);
        fireEvent.click(getByText(buttonText));
        expect(onClickMock).toHaveBeenCalled();
    });

    test('applies provided type to the button', () => {
        const buttonText = 'Button test';
        const { getByText } = render(<TextButton text={buttonText} type='submit' />);
        expect(getByText(buttonText)).toHaveAttribute('type', 'submit');
    });

});
