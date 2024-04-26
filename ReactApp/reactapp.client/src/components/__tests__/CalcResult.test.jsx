import React from 'react';
import { render } from '@testing-library/react';
import CalcResult from '../CalcResult';
import '@testing-library/jest-dom';

describe('CalcResult Component', () => {

    test('renders without crashing', () => {
        const tabname = "Calculation 1";
        const calcData = [{
            resource: "Virtual Machine 1",
            resourceShort: "VM 1",
            region: "USA",
            instance: "B1ls",
            vmData: {
                cpu_num: 1,
                gpu_num: 0,
                embodied_emissions: 0.0018,
                cpu_tdp: 165,
                gpu_tdp: 0,
                pkWh: 0.17,
            },
            carbonIntensity: 150,
            pue: 1.2,
            time: {year: 0, month: 0, day: 0, hour: 1},
        }];

        render(<CalcResult calcData={calcData} tabname={tabname} />);
    });


    test('renders all diagrams', () => {
        const tabname = "Calculation 1";
        const calcData = [{
            resource: "Virtual Machine 1",
            resourceShort: "VM 1",
            region: "USA",
            instance: "B1ls",
            vmData: {
                cpu_num: 1,
                gpu_num: 0,
                embodied_emissions: 0.0018,
                cpu_tdp: 165,
                gpu_tdp: 0,
                pkWh: 0.17,
            },
            carbonIntensity: 150,
            pue: 1.2,
            time: { year: 0, month: 0, day: 0, hour: 1 }
        }];

        const { getByTestId } = render(<CalcResult calcData={calcData} tabname={tabname} />);

        expect(getByTestId("labels")).toBeInTheDocument();
        expect(getByTestId("doughnutDiagram")).toBeInTheDocument();
        expect(getByTestId("barDiagramEnergy")).toBeInTheDocument();
        expect(getByTestId("barDiagramRegion")).toBeInTheDocument();
        expect(getByTestId("barDiagramEmbodied")).toBeInTheDocument();
        expect(getByTestId("loadDiagram")).toBeInTheDocument();
        
    });

    test('renders the rigth title', () => {
        const tabname = "Calculation 1";
        const calcData = [{
            resource: "Virtual Machine 1",
            resourceShort: "VM 1",
            region: "USA",
            instance: "B1ls",
            vmData: {
                cpu_num: 1,
                gpu_num: 0,
                embodied_emissions: 0.0018,
                cpu_tdp: 165,
                gpu_tdp: 0,
                pkWh: 0.17,
            },
            carbonIntensity: 150,
            pue: 1.2,
            time: { year: 0, month: 0, day: 0, hour: 1 }
        }];

        const { queryByText } = render(<CalcResult calcData={calcData} tabname={tabname} />);

        expect(queryByText("Calculation 1")).toBeInTheDocument();

    });

});