import React from 'react';
import { render } from '@testing-library/react';
import Labels from '../Labels';
import '@testing-library/jest-dom';

describe('Labels Component', () => {
    const backgroundColor = [
        '#FF1493',
        '#87CEEB',
        '#FF8C00',
        '#40E0D0',
        '#9370DB',
        '#008000',
        '#FFD700',
        '#EE82EE',
        '#FF0000',
        '#4682B4',
        '#A0522D',
        '#808080',
        '#00FF00',
        '#F0E68C',
        '#008B8B',
    ];

    test('renders without crashing', () => {
        const emissions = [{
            resource: "Virtual Machine",
            resourceShort: "VM",
            regionName: "USA",
            instance: "B1ls",
            carbonIntensity: 150,
            energy: 0.14,
            embodied: 1.77,
            emission: 21.06,
            emissionTime: 21.06,
        }];

        render(<Labels emissions={emissions} backgroundColor={backgroundColor} />);
    });


    test('renders the labels with correct color and name', () => {
        const emissions = [{
            resource: "Virtual Machine",
            resourceShort: "VM",
            regionName: "USA",
            instance: "B1ls",
            carbonIntensity: 150,
            energy: 0.14,
            embodied: 1.77,
            emission: 21.06,
            emissionTime: 21.06,
        }];

        const { getByTestId } = render(<Labels emissions={emissions} backgroundColor={backgroundColor} />);

        expect(getByTestId("labelName")).toHaveTextContent("Virtual Machine");
        expect(getByTestId("labelColor")).toHaveStyle(`background-color: ${backgroundColor[0]}`);
    });

});