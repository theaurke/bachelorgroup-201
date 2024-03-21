import React, { useRef } from 'react';
import CalcText from './CalcText';
import CalcResult from './CalcResult';
import Container from 'react-bootstrap/Container';
import { usePDF } from 'react-to-pdf';

/**
 * ResultPanel component for rendering a panel to display calculation results.
 * @returns {JSX.Element} The JSX representation of the result panel.
 */
export default function ResultPanel() {
    const { toPDF, targetRef } = usePDF({ filename: 'tabname.pdf' }); //bytt ut med tabname her

    return (
        <Container fluid ref={targetRef} style={{ padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin: '0' }}> 
            <CalcText />
            <button type='button' onClick={() => toPDF()}>Convert to pdf</button> 
        </Container>
        
    );
}