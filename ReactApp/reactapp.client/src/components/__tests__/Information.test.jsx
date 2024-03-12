import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Information from '../Information.jsx';
import '@testing-library/jest-dom';


describe('Information Component Test', () => {
    test('renders main title and paragraph', () => {
        const { getByText } = render(<Information />);

        // /.../i -> searches for element whose text content matches, ignoring case
        const mainTitle = getByText(/Calculate the estimated emissions on your Azure IaaS resources/i);
        expect(mainTitle).toBeInTheDocument();

        const paragraph = getByText(/Are you seeking a deeper understanding of the emissions generated by your Azure IaaS resources?/i);
        expect(paragraph).toBeInTheDocument();
        
    });

    test('renders all step titles', () => {
        const { getByText } = render(<Information />);

        expect(getByText('Choose resources')).toBeInTheDocument();
        expect(getByText('Fill in the data')).toBeInTheDocument();
        expect(getByText('Present the results')).toBeInTheDocument();
    });

});