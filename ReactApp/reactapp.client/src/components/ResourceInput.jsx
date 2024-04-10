import { Container, Form, Row, Col, InputGroup } from 'react-bootstrap';
import styles from '../styles/InputList.module.css'
import TextButton from './TextButton';
import { useState, useEffect } from 'react';
import Select from 'react-select'

export default function ResourceInput({ resourceText, resourceFormData, resourceID, handleSubmit, edit, setEdit }) {
    const buttonText = resourceFormData ? (edit ? ['Remove', 'Edit'] : ['Clear', 'Save']) : ['Clear', 'Add']; // Variable to set the right buttontext based on where the inputfield is and if it is editable or not.
    const [instance, setInstance] = useState('Choose instance'); // State to manage the chosen instance.
    const [region, setRegion] = useState('Choose region'); // State to manage the chosen region.
    const [time, setTime] = useState({ year: 0, month: 0, day: 0, hour: 0 }); // State to manage the chosen time.
    const [action, setAction] = useState('Add'); // State to manage which button is clicked.


    // Lists of instance and region options for the dropdown menu.
    const [instanceOptions, setInstanceOptions] = useState([]); // State to store VM instance options fetched from the server.
    const [regionOptions, setRegionOptions] = useState([]); // State to store region options fetched from the server.

    // Fetch VM instance options from the server
    useEffect(() => {
        fetch('/vm')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch VM sizes: ${response.statusText}`');
                }
                return response.json();
            })
            .then(data => {
                setInstanceOptions(data.map(size => ({ value: size, label: size })));
            })
            .catch(error => console.error('Error fetching VM sizes:', error));

        fetch('/region')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch regions: ${response.statusText}`');
                }
                return response.json();
            })
            .then(data => {
                setRegionOptions(data.map(region => ({ value: region, label: region })));
            })
            .catch(error => console.error('Error fetching regions:', error));
    }, []);


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
            time,
        };

        // Checking if it was the edit button that was clicked.
        if (action === 'Edit') {
            setEdit(!edit); // Enabling the forms input fields.
        } else {

            // Can't save or add if no valid data is chosen
            if (formData.instance !== 'Choose instance' && formData.region !== 'Choose region') {

                // Checking if the button clicked was save
                if (action === 'Save') {
                    setEdit(!edit); // Disabling the forms inputfields.
                    handleSubmit(action, resourceID, formData); // Updating the formData in the resourceList
                } else {
                    handleSubmit(formData); // Saving the formData in the resourceList
                }
            }
            else {
                console.error('Data for instance or region is not valid');
            }
        }
    };


    // Function to handle clicking one of the text buttons.
    const handleClick = (buttontext) => {

        // Checking if the button is Clear or Remove.
        if (buttontext === 'Clear') {  // Resetting the states to default values.
            setInstance('Choose instance');
            setRegion('Choose region');
            setTime(0);
        } 
        else {
            handleSubmit(buttontext, resourceID); // Function for handling removal of resource.
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
                        <Select
                            aria-labelledby='instance'
                            value={{ value: instance, label: instance }}
                            options={instanceOptions}
                            isDisabled={edit}
                            onChange={(e) => setInstance(e.value)}
                        />
                    </Form.Group>
                </Row>


                {/*Dropdown with searchfield for choosing region*/}
                <Row className={"mb-3"}>
                    <Form.Group as={Col} controlId="formRegion">
                        <Form.Label id='region'>Region</Form.Label>
                        <Select
                            aria-labelledby='region'
                            value={{ value: region, label: region }}
                            options={regionOptions}
                            isDisabled={edit}
                            onChange={(e) => setRegion(e.value)}
                        />
                    </Form.Group>
                </Row>


                {/* Input field for choosing time */}
                <Row className={"mb-3"}>
                    <Form.Group as={Row} controlId="formTimeInput">
                        <Form.Label id='time'> Running time </Form.Label>
                        <Row style={{ display: 'flex', justifyContent: 'center', margin: '0', padding: '0' }}>
                            <InputGroup style={{ width: '25%', textAlign: 'center' }}>
                                <Form.Control
                                    type="number"
                                    placeholder="Year"
                                    value={time.year}
                                    onChange={(e) => setTime({ ...time, year: e.target.value })}
                                    disabled={edit}
                                />
                                <InputGroup.Text>Years</InputGroup.Text>
                            </InputGroup>
                            <InputGroup style={{ width: '25%', textAlign: 'center' }}>
                                <Form.Control
                                    type="number"
                                    placeholder="Month"
                                    value={time.month}
                                    onChange={(e) => setTime({ ...time, month: e.target.value })}
                                    disabled={edit}
                                />
                                <InputGroup.Text>Months</InputGroup.Text>
                            </InputGroup>
                            <InputGroup style={{ width: '25%', textAlign: 'center' }}>
                                <Form.Control
                                    type="number"
                                    placeholder="Day"
                                    value={time.day}
                                    onChange={(e) => setTime({ ...time, day: e.target.value })}
                                    disabled={edit}
                                />
                                <InputGroup.Text>Days</InputGroup.Text>
                            </InputGroup>
                            <InputGroup style={{ width: '25%', textAlign: 'center' }}>
                                <Form.Control
                                    type="number"
                                    placeholder="Hour"
                                    value={time.hour}
                                    onChange={(e) => setTime({ ...time, hour: e.target.value })}
                                    disabled={edit}
                                />
                                <InputGroup.Text>Hours</InputGroup.Text>
                            </InputGroup>
                        </Row>
                    </Form.Group>
                </Row>


                {/* Buttons */}
                <Row className={"mt-5"}>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextButton text={buttonText[0]} type='button' onClick={() => handleClick(buttonText[0])} />
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextButton text={buttonText[1]} type='submit' onClick={() => setAction(buttonText[1])} />
                    </Col>
                   
                </Row>

            </Form>

        </Container>
    );
}