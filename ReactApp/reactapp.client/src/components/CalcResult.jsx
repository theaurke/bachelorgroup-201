import Diagram from './Diagram';

export default function CalcResult() {
    return (
        <>
            <h2>Total Emissions</h2>
            <Diagram />
            <Diagram />
            <button>Convert to PDF</button>
        </>
    );
}