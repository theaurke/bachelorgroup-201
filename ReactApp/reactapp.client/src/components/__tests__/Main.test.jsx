import React from 'react';
import { render } from '@testing-library/react';
import Main from '../Main.jsx';
import '@testing-library/jest-dom';



describe('Main component', () => {

    test('renders information page when no active tabs', () => {
        const activeTab = '';

        const { getByText } = render(
            <Main activeTab={activeTab} />
        );

        const stepText = getByText("Fill in the data");

        expect(stepText).toBeInTheDocument();
    });


    test('renders resource panel when active tabs', () => {
        const activeTab = 1;

        const { getByTestId } = render(
            <Main activeTab={activeTab} />
        );

        const resourceContent = getByTestId("resourceContent");

        expect(resourceContent).toBeInTheDocument();
    });

});