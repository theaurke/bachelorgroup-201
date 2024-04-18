import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../../App';
import '@testing-library/jest-dom';

describe('NavButton Integration Test', () => {
    test('should add a new tab and set it as active when clicked', () => {

        // Render the App component
        const { getByTestId, getAllByTestId } = render(<App />);

        // Get the NavButton component
        const navButton = getByTestId('navBtn');

        // Get the initial number of tabs
        const initialTabs = getByTestId('navTabs').children.length;

        // Click the NavButton
        fireEvent.click(navButton);

        // Get the updated number of tabs to be rendered
        const updatedTabs = getByTestId('navTabs').children.length;

        // Assert that a new tab is added
        expect(updatedTabs).toBe(initialTabs + 1);

        const navLinks = getAllByTestId('navLink');

        // Get the last NavLink component
        const lastNavLink = navLinks[navLinks.length - 1];

        // Check if the last NavLink in the NavTab is active
        const isActive = lastNavLink.classList.contains('active');

        // Assert that the last tab is active
        expect(isActive).toBe(true);

    });
});