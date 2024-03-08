import React from 'react';
import { render } from '@testing-library/react';
import ResourcePanel from '../ResourcePanel.jsx';
import '@testing-library/jest-dom';





test('renders Add Resource button when no resources added', () => {
    const layout = 'resource';
    const handleCalculate = jest.fn();
    const addedResources = [];
    const setAddedResources = jest.fn();
    const calculated = false;


    const { getByText } = render(
        <ResourcePanel
        layout={layout}
        handleCalculate={handleCalculate}
        addedResources={addedResources}
        setAddedResources={setAddedResources}
            calculated={calculated} />
    );

    const addResourceButton = getByText("Add Resource");

    expect(addResourceButton).toBeInTheDocument();
});