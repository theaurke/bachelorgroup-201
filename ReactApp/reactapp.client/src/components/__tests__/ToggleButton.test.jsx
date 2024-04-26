import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ToggleButton from '../ToggleButton.jsx';
import '@testing-library/jest-dom';


describe('ToggleButton Component Test', () => {

    test('renders button with tooltip', async () => {
        const toggleSidebar = jest.fn();

        const { getByAltText, getByText } = render(<ToggleButton toggleSidebar={toggleSidebar} isWindowSmall={false} />);

        const button = getByAltText('toggleSidebar');
        expect(button).toBeInTheDocument();


        fireEvent.mouseEnter(button);
        await waitFor(() => {
            expect(getByText('Toggle Sidebar')).toBeInTheDocument();
        });
        
        fireEvent.click(button);
        expect(toggleSidebar).toHaveBeenCalled();
    });
    
});
