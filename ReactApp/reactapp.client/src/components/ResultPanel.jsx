import React, { useState } from 'react';
import CalcText from './CalcText';
import CalcResult from './CalcResult';
import { Container } from 'react-bootstrap';
import styles from '../styles/Result.module.css';
import stylesResource from '../styles/Resource.module.css';
import NewWindow from 'react-new-window';

/**
 * ResultPanel component for rendering a panel to display calculation results.
 * @param {string} layout - The layout main should have.
 * @param {Object} calcData - Object containing the data needed to calculate the emission of a resource.
 * @param {string} tabname - The name of the tab.
 * @returns {JSX.Element} The JSX representation of the result panel.
 */
export default function ResultPanel({ layout, calcData, tabname }) {
    const [open, setOpen] = useState(false); // State to manage if the print window should open or not.
    
    // Returning either the calculation result or information text.
    return (
        <Container fluid className={styles.resultContainer} style={{ padding: '0' }}>

            {layout == 'result' ? ( //Rendering the calculation result if layout is set to result
                <>
                    <CalcResult calcData={calcData} tabname={tabname} scroll={'auto'} />

                    {/*Button for converting the calculation results to PDF*/}
                    <div data-testid='convertPDF' className={styles.buttonDiv}>
                        <button type='button' className={stylesResource.addResourceButton} onClick={() => setOpen(true)}>Convert to PDF</button>
                        {open && (
                            <NewWindow title={tabname} onOpen={(w) => setTimeout(() => {
                                w.print();
                                w.close();
                                setOpen(false);
                            }, 1000)}>
                                <CalcResult calcData={calcData} tabname={tabname} scroll={'visible'} />
                                <style>
                                    {styles.print}
                                </style>
                            </NewWindow>
                        )}
                    </div>
                </>
                
            ) : ( // Rendering information text
                <CalcText />
            )}
        </Container>
        
    );
}