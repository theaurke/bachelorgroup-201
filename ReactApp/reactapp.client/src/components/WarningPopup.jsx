import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function WarningPopup(props) {
    const { warning } = props;
    const [show, setShow] = useState(true);
    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>Warning</Alert.Heading>
                <p>{warning}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Yes
                    </Button>
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Cancel
                    </Button>
                </div>
            </Alert>
            {!show && <button onClick={() => setShow(true)}>Delete</button>}
        </>
        
    );

}