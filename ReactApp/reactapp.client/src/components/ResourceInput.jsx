import { Container, Form, Row, Col } from 'react-bootstrap';
import styles from '../styles/InputList.module.css'
import TextButton from './TextButton';
import { useState, useEffect } from 'react';
import Select from 'react-select'

export default function ResourceInput({ resourceText, resourceFormData, resourceID, handleSubmit, edit }) {
    const buttonText = resourceFormData ? (edit ? ['Remove', 'Edit'] : ['Clear', 'Save']) : ['Clear', 'Add']; // Variable to set the right buttontext based on where the inputfield is and if it is editable or not.
    const [instance, setInstance] = useState('B1ls'); // State to manage the chosen instance.
    const [region, setRegion] = useState('Norway West'); // State to manage the chosen region.
    const [time, setTime] = useState(0); // State to manage the chosen time.


    // Lists of instance and region options for the dropdown menu.
    const instanceOptions = [
        { value: 'B1ls', label: 'B1ls' },
        { value: 'B1ms', label: 'B1ms' }
    ]

    const regionOptions = [
        { value: 'Norway West', label: 'Norway West' },
        { value: 'Norway East', label: 'Norway East' }
    ]


    // If resourceInput component is called with formData the states are updated with the data from the form.
    useEffect(() => {
        if (resourceFormData && Object.keys(resourceFormData).length !== 0) {
            setInstance(resourceFormData.instance);
            setRegion(resourceFormData.region);
            setTime(resourceFormData.time);
        }
    }, [resourceFormData]);
    


    // Function to handle submission of the form.
    const submitForm = (event) => {
        event.preventDefault();
        const formData = {
            instance,
            region,
            time
        };

        const buttonText = event.target.textContent; // Getting the text of the button clicked.

        // Checking if the button is add, save or edit to use the right handleSubmit function.
        if (buttonText === 'Edit') {
            handleSubmit(buttonText, resourceID);
        } else {
            handleSubmit(formData);
        }
    };


    // Function to handle clicking one of the text buttons.
    const handleClick = (buttontext) => {

        // Checking if the button is Clear or Remove.
        if (buttontext === 'Clear') {  // Resetting the states to default values.
            setInstance('B1ls');
            setRegion('Norway West');
            setTime(0);
        } else {
            handleSubmit(buttontext, resourceID); //Function for handling removal of resource.
        }
        
    }


    

    return (
        <Container className={styles.containerStyle} style={{ borderLeft: resourceFormData ? 'none' : '4px solid #45654C', padding: '0em', backgroundColor: 'white' }}>

            {/* Banner with resourcename, only visible when adding a resource to the list */}
            <h4 data-testid='inputTitle' className={styles.resourceBanner} style={{ display: resourceFormData ? 'none' : 'flex' } }> {resourceText} </h4>


            <Form className={styles.formStyle} onSubmit={submitForm}>

                {/*Dropdown with searchfield for choosing instance*/}
                <Row className={"mt-5"}>
                    <Form.Group as={Col} controlId="formInstance">
                        <Form.Label id='instance'>Instance</Form.Label>
                        <Select aria-labelledby='instance' value={{ value: instance, label: instance }} options={instanceOptions} isDisabled={edit} onChange={(e) => setInstance(e.value)} />
                    </Form.Group>
                </Row>


                {/*Dropdown with searchfield for choosing region*/}
                <Row className={"mb-3"}>
                    <Form.Group as={Col} controlId="formRegion">
                        <Form.Label id='region'>Region</Form.Label>
                        <Select aria-labelledby='region' value={{ value: region, label: region }} options={regionOptions} isDisabled={edit} onChange={(e) => setRegion(e.value)} />
                    </Form.Group>
                </Row>


                {/* Input field for choosing time */}
                <Row className={"mb-0"}>
                    <Form.Group as={Row} controlId="formTimeInput">
                        <Form.Label column sm="2" > Time </Form.Label>
                        <Form.Control type="number" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '10%', textAlign: 'center' }} disabled={edit} />
                    </Form.Group>
                </Row>


                {/* Range for choosing time, connected with the time input field */}
                <Row className={"mt-0"}>
                    <Form.Group as={Col} controlId="formTimeRange">
                        <Form.Range value={time} onChange={(e) => setTime(e.target.value)} min={0} max={24} disabled={edit} />
                    </Form.Group>
                </Row>


                {/* Buttons */}
                <Row className={"mt-5"}>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextButton text={buttonText[0]} type='button' onClick={() => handleClick(buttonText[0])} />
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextButton text={buttonText[1]} type='submit'/>
                    </Col>
                   
                </Row>

            </Form>

        </Container>
    );
}