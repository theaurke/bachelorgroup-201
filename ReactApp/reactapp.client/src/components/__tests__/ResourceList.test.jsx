import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResourceList from '../ResourceList.jsx';
import '@testing-library/jest-dom';



describe('ResourceList Component', () => {

    test('renders list of resources', () => {
        const addedResources = [];
        const setAddedResources = jest.fn();
        const setShowList = jest.fn();

        const { getByTestId } = render(
            <ResourceList setAddedResources={setAddedResources} addedResources={addedResources} setShowList={setShowList} />
        );

        const listOfResources = getByTestId('resourceList');

        expect(listOfResources).toBeInTheDocument();
        expect(listOfResources.children.length).toBeGreaterThan(1);

    });


    test('renders input form when clicking resource button', () => {
        const addedResources = [];
        const setAddedResources = jest.fn();
        const setShowList = jest.fn();

        const { getByTestId } = render(
            <ResourceList setAddedResources={setAddedResources} addedResources={addedResources} setShowList={setShowList} />
        );

        const resourceButton = getByTestId('resourceButton-0');

        expect(resourceButton).toBeInTheDocument();
        fireEvent.click(resourceButton);

        const resourceTitle = getByTestId('inputTitle');
        expect(resourceTitle).toBeInTheDocument();

    });
    
});