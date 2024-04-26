import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResourceList from '../ResourceList.jsx';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';

// Set up fetch mock before running tests
beforeEach(() => {
    fetchMock.enableMocks();
});

describe('ResourceList Component', () => {

    test('renders ResourceList component without crashing', () => {
        const addedResources = [];
        const setAddedResources = jest.fn();
        const setShowList = jest.fn();

        render(
            <ResourceList setAddedResources={setAddedResources} addedResources={addedResources} setShowList={setShowList} />
        );

    });

    test('renders list of resources', () => {
        const addedResources = [];
        const setAddedResources = jest.fn();
        const setShowList = jest.fn();

        const { getByTestId } = render(
            <ResourceList setAddedResources={setAddedResources} addedResources={addedResources} setShowList={setShowList} />
        );

        const listOfResources = getByTestId('resourceList');
        const resourceButton = getByTestId('resourceButton-0');

        expect(listOfResources).toBeInTheDocument();
        expect(listOfResources.children.length).toBeGreaterThan(0);
        expect(resourceButton).toHaveTextContent('Virtual Machine');

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
        act(() => {
            fireEvent.click(resourceButton);
        });

        waitFor(() => {
            const resourceTitle = getByTestId('inputTitle');
            expect(resourceTitle).toBeInTheDocument();
        });

    });
    
});
