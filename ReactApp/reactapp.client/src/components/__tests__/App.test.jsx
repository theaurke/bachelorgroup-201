import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App.jsx';
import '@testing-library/jest-dom';


describe('App Component Test', () => {
    test('initial sidebar width is 3', () => {
        const { container } = render(<App />);
        const col = container.querySelector('.col-lg-3');
        expect(col).toBeInTheDocument();
    });
});
