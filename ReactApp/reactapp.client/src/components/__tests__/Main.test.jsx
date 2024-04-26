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

    test('renders main component without crashing', () => {
        const activeTab = {};
        const tabList = [];

        render(
            <Main activeTab={activeTab} tabList={tabList} />
        ); 
    });


    test('renders information page when no active tabs and home is false', () => {
        const activeTab = {};
        const tabList = [];
        const home = false;

        const { getByText } = render(
            <Main activeTab={activeTab} tabList={tabList} home={home} />
        );

        const stepText = getByText("Fill in the data");

        expect(stepText).toBeInTheDocument();
    });

    test('renders information page when active tabs and home is true', () => {
        const activeTab = { id: 1, title: 'Calculation 1' };
        const tabList = [1, 2];
        const home = true;

        const { getByText } = render(
            <Main activeTab={activeTab} tabList={tabList} home={home} />
        );

        const stepText = getByText("Fill in the data");

        expect(stepText).toBeInTheDocument();
    });


    test('renders resource panel when active tabs and home is false', () => {
        const activeTab = { id: 1, title: 'Calculation 1' };
        const tabList = [1, 2];
        const setLayout = jest.fn();
        const layout = 'resource';
        const setActiveList = jest.fn();
        const home = false;
        const activeList = [{ id: 1, resourceText: 'Virtual Machine', formdata: {} },
        { id: 2, resourceText: 'Dedicated Host', formdata: {} }];

        const { getByTestId } = render(
            <Main activeTab={activeTab}
                tabList={tabList}
                setLayout={setLayout}
                layout={layout}
                setActiveList={setActiveList}
                activeList={activeList}
                home={home} />
        );

        const resourceContent = getByTestId("resourceContent");

        expect(resourceContent).toBeInTheDocument();
    });

});