import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App.jsx';
import '@testing-library/jest-dom';


describe('App Component Test', () => {

    test('renders without crashing', () => {
        render(<App />);
    });

    test('initial sidebar width is 3', () => {
        const { container } = render(<App />);
        const col = container.querySelector('.col-lg-3');
        expect(col).toBeInTheDocument();
    });

    test('sidebar width adjusts correctly on window resize', () => {
        const originalWidth = window.innerWidth;
        window.innerWidth = 800;

        const { getByTestId } = render(<App />);
        const sidebarCol = getByTestId('sidebar_col');

        
        expect(sidebarCol).toBeInTheDocument();
        expect(sidebarCol).toHaveClass('col-1');
        window.innerWidth = originalWidth;
    });

    test('does not render the invisible div initially', () => {
        const { queryByTestId } = render(<App />);
        const invisibleDiv = queryByTestId('invisibleDiv');

        expect(invisibleDiv).not.toBeInTheDocument();
    });

});
