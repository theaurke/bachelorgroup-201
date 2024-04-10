import React from 'react';
import CalcText from './CalcText';
import CalcResult from './CalcResult';
import Container from 'react-bootstrap/Container';
import { usePDF } from 'react-to-pdf';
import styles from '../styles/ResourceList.module.css'

/**
 * ResultPanel component for rendering a panel to display calculation results.
 * @returns {JSX.Element} The JSX representation of the result panel.
 */
export default function ResultPanel({ layout, calcData, tabname }) {
    const { toPDF, targetRef } = usePDF({ filename: `${tabname}.pdf` });
    

    return (
        <Container fluid ref={targetRef}  style={{ padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', margin: '0' }}>
            {layout == 'result' ? (
                <>
                    <CalcResult calcData={calcData} tabname={tabname} />
                    <div style={{ padding: '0.5em 0em', position: 'fixed', bottom: '2em' }}>
                        <button type='button' className={styles.addResourceButton} onClick={() => toPDF()}>Convert to pdf</button>
                    </div>
                </>
                
            ) : (
               <CalcText />
            )}
        </Container>
        
    );
}