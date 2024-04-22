import React, { useState } from 'react';
import CalcText from './CalcText';
import CalcResult from './CalcResult';
import { Container } from 'react-bootstrap';
import styles from '../styles/Result.module.css';
import stylesResource from '../styles/Resource.module.css';
import NewWindow from 'react-new-window';

/**
 * ResultPanel component for rendering a panel to display calculation results.
 * @returns {JSX.Element} The JSX representation of the result panel.
 */
export default function ResultPanel({ layout, calcData, tabname }) {
    const [isOpen, setIsOpen] = useState(false);
    
    

    return (
        <Container fluid className={styles.resultContainer} style={{ padding: '0' }}>
            {layout == 'result' ? (
                <>
                    
                    <CalcResult calcData={calcData} tabname={tabname} scroll={'auto'} />
                    <div className={styles.buttonDiv}>
                        <button type='button' className={stylesResource.addResourceButton} onClick={() => setIsOpen(true)}>Convert to pdf</button>
                        {isOpen && (
                            <NewWindow title={tabname} onOpen={(w) => setTimeout(() => {
                                w.print();
                                w.close();
                                setIsOpen(false);
                            }, 1000) }>
                                <CalcResult calcData={calcData} tabname={tabname} scroll={'visible'} />
                                <style>
                                    {styles.print}
                                </style>
                            </NewWindow>
                        )}
                    </div>
                    
                </>
                
            ) : (
                <CalcText />
            )}
        </Container>
        
    );
}