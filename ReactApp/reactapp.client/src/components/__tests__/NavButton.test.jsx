import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavButton from '../NavButton.jsx';
import '@testing-library/jest-dom';


describe('NavButton Component Test', () => {
    test('renders Start Calculation button with text and img when sidebar is expanded', () => {
        const props = {
            text: 'Test Button',
            src: 'plusWhite.png',
            alt: 'Test Image Alt Text',
            isSidebarCollapsed: false,
            onClick: jest.fn(),
        };

        const { getByText, getByTestId } = render(<NavButton {...props} />);

        expect(getByText(props.text)).toBeInTheDocument();
        expect(getByTestId('navBtnImg')).toBeInTheDocument();
        expect(getByTestId('navBtnImg')).toHaveAttribute('src', props.src);
    });

    test('renders Start Calculation button with only img when sidebar is collapsed', () => {
        const props = {
            text: 'Test Button',
            src: 'plusWhite.png',
            alt: 'Test Image Alt Text',
            isSidebarCollapsed: true,
            onClick: jest.fn(),
        };

        const { queryByText, getByTestId } = render(<NavButton {...props} />);

        expect(queryByText(props.text)).not.toBeInTheDocument();
        expect(getByTestId('navBtnImg')).toBeInTheDocument();
        expect(getByTestId('navBtnImg')).toHaveAttribute('src', props.src);
    });

    test('calls onClick handler when button is clicked', () => {
        const props = {
            text: 'Test Button',
            src: 'plusWhite.png',
            alt: 'Test Image Alt Text',
            isSidebarCollapsed: false,
            onClick: jest.fn(),
        };

        const { getByText } = render(<NavButton {...props} />);
        fireEvent.click(getByText(props.text));

        expect(props.onClick).toHaveBeenCalledTimes(1);
    });

});
