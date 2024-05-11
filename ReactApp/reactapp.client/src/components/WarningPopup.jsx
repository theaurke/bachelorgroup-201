import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 * WarningPopup component for displaying warning messages with confirmation options.
 * Renders an alert with a warning message and two buttons for confirmation or cancellation.
 * @param {Object} props - Props passed to the WarningPopup component.
 * @param {string} props.warning - Warning message to be displayed.
 * @param {Function} props.onConfirm - Function to be called when the user confirms the warning.
 * @param {Function} props.onCancel - Function to be called when the user cancels the warning.
 * @returns {JSX.Element} The JSX representation of the warning popup.
 */
export default function WarningPopup({ warning, onConfirm, onCancel }) {

    return (
        <>
            <Alert style={{ position: 'absolute', left: '40vw', top: '40vh', zIndex: 2000 }} variant="success">
                <Alert.Heading>Warning</Alert.Heading>
                <p>{warning}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={onConfirm} variant="outline-danger">Yes</Button>
                    <Button onClick={onCancel} variant="outline-secondary">Cancel</Button>
                </div>
            </Alert>
        </>
        
    );

}