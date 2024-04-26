import React from 'react';
import { render } from '@testing-library/react';
import CalcText from '../CalcText';
import '@testing-library/jest-dom';

describe('CalcText Component', () => {

    test('renders without crashing', () => {
        render(<CalcText />);
    });


    test('renders correctly', () => {
        const { getByAltText, getByText } = render(<CalcText />);

        const calculatingImage = getByAltText('calculating');
        const arrowImage = getByAltText('arrow');
        expect(calculatingImage).toBeInTheDocument();
        expect(arrowImage).toBeInTheDocument();

        const textElement = getByText(/Calculate the estimated/i);
        expect(textElement).toBeInTheDocument();
    });
});