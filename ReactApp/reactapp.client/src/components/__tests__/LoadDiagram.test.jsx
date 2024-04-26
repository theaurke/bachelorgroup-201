import React from 'react';
import { render } from '@testing-library/react';
import LoadDiagram from '../LoadDiagram';
import '@testing-library/jest-dom';

describe('LoadDiagram Component', () => {

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

        render(<LoadDiagram emissions={emissions} />);
    });


    test('renders the table', () => {
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

        const { getByTestId } = render(<LoadDiagram emissions={emissions} />);
        expect(getByTestId("loadDiagram")).toBeInTheDocument();
        
    });


    test('renders the table title and headers', () => {
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

        const { getByText } = render(<LoadDiagram emissions={emissions} />);
        expect(getByText("Hourly Emissions Based on Load")).toBeInTheDocument();
        expect(getByText("Load")).toBeInTheDocument();
        expect(getByText("Resource")).toBeInTheDocument();
        expect(getByText("10%")).toBeInTheDocument();
        expect(getByText("25%")).toBeInTheDocument();
        expect(getByText("50%")).toBeInTheDocument();
        expect(getByText("80%")).toBeInTheDocument();
        expect(getByText("100%")).toBeInTheDocument();

    });

    test('renders the table data correctly', () => {
        const emissions = [{
            resource: "Virtual Machine 1",
            resourceShort: "VM",
            regionName: "USA",
            instance: "B1ls",
            carbonIntensity: 150,
            energy: 0.14,
            embodied: 1.77,
            emission: 21.06,
            emissionTime: 21.06,
        }];

        const { getByText } = render(<LoadDiagram emissions={emissions} />);
        expect(getByText("Virtual Machine 1")).toBeInTheDocument();
        expect(getByText("2.1 gCO2eq")).toBeInTheDocument(); 
        expect(getByText("5.3 gCO2eq")).toBeInTheDocument(); 
        expect(getByText("10.5 gCO2eq")).toBeInTheDocument(); 
        expect(getByText("16.8 gCO2eq")).toBeInTheDocument(); 
        expect(getByText("21.1 gCO2eq")).toBeInTheDocument();

    });

});