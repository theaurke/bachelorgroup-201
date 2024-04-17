import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../../App';
import '@testing-library/jest-dom';

describe('ToggleButton Integration Test', () => {
    test('should toggle sidebar and change col size when clicked', () => {
        // Render the App component
        const { getByTestId } = render(<App />);

        // Get the ToggleButton component
        const toggleButton = getByTestId('toggleButton');

        // Get the initial sidebar width
        const initialSidebarWidth = getByTestId('sidebar_col').classList.contains('col-lg-3');

        // Assert that the col size is found
        expect(initialSidebarWidth).toBe(true);

        // Click the toggle button
        fireEvent.click(toggleButton);

        // Get the updated sidebar width
        const updatedSidebarWidth = getByTestId('sidebar_col').classList.contains('col-lg-1');

        // Assert that toggleSidebar function is called and the updated col size is found
        expect(updatedSidebarWidth).toBe(true);

    });
});