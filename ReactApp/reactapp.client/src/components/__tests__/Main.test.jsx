import React from 'react';
import { render } from '@testing-library/react';
import Main from '../Main.jsx';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Set up fetch mock before running tests
beforeEach(() => {
    fetchMock.enableMocks();
});


describe('Main component', () => {

    test('renders information page when no active tabs', () => {
        const activeTab = {};
        const tabList = [];

        const { getByText } = render(
            <Main activeTab={activeTab} tabList={tabList} />
        );

        const stepText = getByText("Fill in the data");

        expect(stepText).toBeInTheDocument();
    });


    test('renders resource panel when active tabs', () => {
        const activeTab = { id: 1, title: 'Calculation 1' };
        const tabList = [1, 2];
        const setLayout = jest.fn();
        const layout = 'resource';
        const setActiveList = jest.fn();
        const activeList = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
        { id: 2, resourceText: 'Dedicated Host', formdata: {} }];

        const { getByTestId } = render(
            <Main activeTab={activeTab}
                tabList={tabList}
                setLayout={setLayout}
                layout={layout}
                setActiveList={setActiveList}
                activeList={activeList} />
        );

        const resourceContent = getByTestId("resourceContent");

        expect(resourceContent).toBeInTheDocument();
    });

});