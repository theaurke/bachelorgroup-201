import React from 'react';
import { render } from '@testing-library/react';
import ResultPanel from '../ResultPanel.jsx';
import '@testing-library/jest-dom';


describe('ResultPanel Component Test', () => {

    test('renders CalcText if calculated is false', () => {
        const calculated = false;


        const { getByText } = render(
            <ResultPanel calculated={calculated} />
        );

        const textElement = getByText(/Calculate the estimated/i);

        expect(textElement).toBeInTheDocument();
    });

    test('renders CalcResult if calculated is true', () => {
        const calculated = true;


        const { getByText } = render(
            <ResultPanel calculated={calculated} />
        );

        const textElement = getByText(/Total Emissions/i);

        expect(textElement).toBeInTheDocument();
    });

});