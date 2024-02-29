import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function WarningPopup({ warning, onConfirm, onCancel }) {

    return (
        <>
            <Alert variant="success" dismissible>
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