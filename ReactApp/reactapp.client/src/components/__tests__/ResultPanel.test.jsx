import React from 'react';
import { render } from '@testing-library/react';
import ResultPanel from '../ResultPanel.jsx';
import '@testing-library/jest-dom';


describe('ResultPanel Component Test', () => {

    test('renders CalcText if layout is resource', () => {
        const layout = 'resource';


        const { getByText } = render(
            <ResultPanel layout={layout} />
        );

        const textElement = getByText(/Calculate the estimated/i);

        expect(textElement).toBeInTheDocument();
    });

    test('renders CalcResult if layout is result', () => {
        const layout = 'result';


        const { getByText } = render(
            <ResultPanel layout={layout} />
        );

        const textElement = getByText(/Convert to pdf/i);

        expect(textElement).toBeInTheDocument();
    });

});