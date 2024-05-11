import { Container, Form, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import styles from '../styles/Resource.module.css'
import TextButton from './TextButton';
import { useState, useEffect } from 'react';
import Select from 'react-select';


/**
 * ResourceInput component.
 * Renders a input form either editable or not for adding a resource to the calculation.
 * @param {string} resourceText - Name of the resource.
 * @param {Object} resourceFormData - Input info for the resource if the resource is already added to the calculation.
 * @param {number} resourceID - ID of the resource.
 * @param {Function} handleSubmit - Function handling submission of the form.
 * @param {boolean} edit - Indicates wether the inputfields should be disabled or not.
 * @param {Function} setEdit - Function to update the edit boolean.
 * @param {Function} setShowInput - Function to update whether the input form should render or not.
 * @param {Function} setShowList - Function to update whether the list of resources to choose from should be rednered or not.
 * @returns {JSX.Element} The JSX representation of input form.
 */
export default function ResourceInput({ resourceText, resourceFormData, resourceID, handleSubmit, edit, setEdit, setShowInput, setShowList }) {
    const buttonText = resourceFormData ? (edit ? ['Remove', 'Edit'] : ['Clear', 'Save']) : ['Clear', 'Add']; // Variable to set the right buttontext based on where the inputfield is and if it is editable or not.
    const [instance, setInstance] = useState('Choose instance'); // State to manage the chosen instance.
    const [region, setRegion] = useState('Choose region'); // State to manage the chosen region.
    const [time, setTime] = useState({ year: 0, month: 0, day: 0, hour: 1 }); // State to manage the chosen time.
    const [action, setAction] = useState('Add'); // State to manage which button is clicked.
    const [instanceError, setInstanceError] = useState(false); // State to manage error message visibility for Instance input field.
    const [regionError, setRegionError] = useState(false); // State to manage error message visibility for Region input field.


    // Lists of instance and region options for the dropdown menu.
    const [instanceOptions, setInstanceOptions] = useState([]); // State to store VM instance options fetched from the server.
    const [regionOptions, setRegionOptions] = useState([]); // State to store region options fetched from the server.
    const [loading, setLoading] = useState(true); // State to manage if the instance and region options have been loaded from the database.

    // Fetch VM options from the database
    useEffect(() => {

        // Fetching the VM instance options
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

        // Fetching the region options
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
    }, [resourceFormData]); // Only re-runs when resourceFormData changes


    // Handling loading of the instance and region options
    useEffect(() => {

        // If both instance options and region options are not empty
        if (instanceOptions.length !== 0 && regionOptions.length !== 0) {
            setLoading(false); //setting loading to false
        } else {
            setLoading(true); // setting loading to true when they are empty
        }

    }, [instanceOptions, regionOptions]); // Only re-running when instance and region options changes.


    // Setting error to false if a region or instance is chosen.
    useEffect(() => {
        if (instance !== 'Choose instance') {
            setInstanceError(false);
        } 

        if (region !== 'Choose region') {
            setRegionError(false);
        } 

    }, [instance, region]); // Only re-running when instance or region updates


    // Function to validate form
    const validateForm = () => {
        let isValid = true;

        // Checking if instance is chosen
        if (instance === 'Choose instance') {
            setInstanceError(true); // Setting the error to true if not chosen.
            isValid = false; // Form is not valid
        } else {
            setInstanceError(false);
        }

        // Checking if region is chosen
        if (region === 'Choose region') {
            setRegionError(true);
            isValid = false;
        } else {
            setRegionError(false);
        }

        return isValid; // Returning if the form is valid or not
    };
    

    // Function to handle submission of the form.
    const submitForm = (event) => {
        event.preventDefault();

        // Checking if form is valid
        if (!validateForm()) {
            return;
        }

        // Object holding the formdata
        const formData = {
            instance,
            region,
            time,
        };

        // Checking if it was the edit button that was clicked.
        if (action === 'Edit') {

            setEdit(!edit); // Enabling the forms input fields.

        } else {

            // Checking if the button clicked was save
            if (action === 'Save') {
                setEdit(!edit); // Disabling the forms inputfields.
                handleSubmit(action, resourceID, formData); // Updating the formData in the resourceList
            } else {
                handleSubmit(formData); // Saving the formData in the resourceList
            }
        }
    };


    // Function to handle clicking one of the text buttons.
    const handleClick = (buttontext) => {

        // Checking if the button is Clear or Remove.
        if (buttontext === 'Clear') {  // Resetting the states to default values.
            setInstance('Choose instance');
            setRegion('Choose region');
            setTime(1);
        } 
        else {
            handleSubmit(buttontext, resourceID); // Function for handling removal of resource.
        }
        
    }

    // Handles the click of back button based on layout
    const handleBack = () => {

        // Close input field and show resource list again
        setShowList(true);
        setShowInput(false);
    }


    // Styling for the time input field
    const timeInputStyle = {
        minWidth: '3em',
        maxWidth: '4em'
    };

    // Styling for the time input field label
    const timeLabelStyle = {
        margin: '0.4em 0',
        flex: 1,
        flexWrap: 'nowrap',
    };


    return (
        <Container data-testid='inputForm' className={styles.inputContainer} style={{ borderLeft: resourceFormData ? 'none' : '4px solid #45654C', padding: '0' }}>

            {/* Banner with resourcename and back button, only visible when adding a resource to the list */}
            {!resourceFormData && (
                <Row style={{ margin: '0' }} className={styles.resourceRow} >
                    <Col className={styles.banner} style={{ padding: '0' }} >

                        {/* Arrow back button */}
                        <button className={styles.backButton} onClick={handleBack}>
                            <img src='backArrow.png' alt='Back' />
                        </button>

                        {/* Added Resources heading */}
                        <h4 data-testid='inputTitle' className={styles.bannerText}> {resourceText} </h4>
                    </Col>
                </Row>
            )}
            
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
                            isLoading={loading}
                            loadingMessage={() => 'Loading instances...'}
                        />

                        {/*Error message if no instance is chosen*/}
                        {instanceError && (
                            <Alert variant="danger">Please choose an instance.</Alert>
                        )}
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
                            isLoading={loading}
                            loadingMessage={() => 'Loading regions...'}
                        />

                        {/*Error message if no region is chosen*/}
                        {regionError && (
                            <Alert variant="danger">Please choose a region.</Alert>
                        )}
                    </Form.Group>
                </Row>


                {/* Input field for choosing time */}
                <Row className={"mb-3"}>
                    <Form.Group as={Row} controlId="formTimeInput">
                        <Form.Label id='time' > Running time </Form.Label>
                        <Row style={{ margin: '0', padding: '0' }} >

                            {/* Input field for choosing number of years */}
                            <InputGroup style={timeLabelStyle}>
                                <Form.Control
                                    type="number"
                                    placeholder="Year"
                                    value={time.year}
                                    onChange={(e) => setTime({ ...time, year: e.target.value })}
                                    disabled={edit}
                                    style={timeInputStyle}
                                />
                                <InputGroup.Text>Years</InputGroup.Text>
                            </InputGroup>

                            {/* Input field for choosing number of months */}
                            <InputGroup style={timeLabelStyle} >
                                <Form.Control
                                    type="number"
                                    placeholder="Month"
                                    value={time.month}
                                    onChange={(e) => setTime({ ...time, month: e.target.value })}
                                    disabled={edit}
                                    style={timeInputStyle}
                                />
                                <InputGroup.Text>Months</InputGroup.Text>
                            </InputGroup>

                            {/* Input field for choosing number of days */}
                            <InputGroup style={timeLabelStyle} >
                                <Form.Control
                                    type="number"
                                    placeholder="Day"
                                    value={time.day}
                                    onChange={(e) => setTime({ ...time, day: e.target.value })}
                                    disabled={edit}
                                    style={timeInputStyle}
                                />
                                <InputGroup.Text>Days</InputGroup.Text>
                            </InputGroup>

                            {/* Input field for choosing number of hours */}
                            <InputGroup style={timeLabelStyle} >
                                <Form.Control
                                    type="number"
                                    placeholder="Hour"
                                    value={time.hour}
                                    onChange={(e) => setTime({ ...time, hour: e.target.value })}
                                    disabled={edit}
                                    style={timeInputStyle}
                                />
                                <InputGroup.Text>Hours</InputGroup.Text>
                            </InputGroup>
                        </Row>
                    </Form.Group>
                </Row>


                {/* Buttons for Adding, editing, saving, removing a resource or clearing the input fields*/}
                <Row className={"mt-5"}>
                    <Col className={styles.buttonCol}>
                        <TextButton text={buttonText[0]} type='button' onClick={() => handleClick(buttonText[0])} />
                    </Col>
                    <Col className={styles.buttonCol}>
                        <TextButton text={buttonText[1]} type='submit' onClick={() => setAction(buttonText[1])} />
                    </Col>
                   
                </Row>

            </Form>

        </Container>
    );
}