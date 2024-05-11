import styles from '../styles/AddedResourceList.module.css';
import ResourceInput from './ResourceInput';
import { useState, useEffect } from 'react';
import WarningPopup from './WarningPopup';


/**
 * Renders a list of all resources added to the calculation.
 * @param {list} addedResources - List of resources added to the calculation.
 * @param {Function} setAddedResources - Function to update the list of added resources.
 * @param {Function} handleCalculate - Function to handle the calculation of the added resources.
 * @param {Function} setLayout - Function to updating the layout of the main content.
 * @param {boolean} calculated - Indicates whether the calculation has happend or not.
 * @returns {JSX.Element} The JSX representation of the list.
 */
export default function AddedResourcesList({ addedResources, setAddedResources, handleCalculate, setLayout, calculated }) {
    const [openDropdown, setOpenDropdown] = useState({}); // State to manage opening the dropdown clicked on.
    const [edit, setEdit] = useState(true); // State to manage whether the input field is editable or not.
    const [recalculate, setRecalculate] = useState(false); // State to manage when a re-calculation should happen.
    const [showWarning, setShowWarning] = useState(false); // State to manage if the warning should show or not.
    const [removeId, setRemoveId] = useState(null); // State to manage which resource to remove.


    // Initializing the openDropdown with the added resources, and setting them all to closed.
    useEffect(() => {
        const openDropdowns = [];
        addedResources.forEach(({ id }) => {
            openDropdowns[id] = false;
            setOpenDropdown(openDropdowns);
        });
    }, [addedResources]); // Only re-run when addedResources changes


    // Function to update the dropdown to open or closed based on is current state.
    const handleClick = (id) => {
        setOpenDropdown(prev => {
            const updatedDropdowns = [...prev];
            updatedDropdowns[id] = !updatedDropdowns[id];
            return updatedDropdowns;
        });
    };


    // Function to handle removal of a resource
    const handleResourceRemoval = () => {

        // Making a new list with all resources expect the one matching the id.
        setAddedResources(prev => prev.filter(resource => resource.id !== removeId));
        setRecalculate(true); // Set recalculate to true to trigger re-calculation.
        setShowWarning(false); // Set warning to not show.

        // If removing all resources change layout from result to resource.
        if (addedResources.length === 1) {
            setLayout('resource');
        }
    };

    // Function that handles removal of resource from list, and saving new formdata to exsisting resource.
    const handleSubmit = (buttontext, id, formData) => {

        // Checking if button is remove
        if (buttontext === 'Remove') {

            // Showing the warning and setting the id of the resource that should be removed.
            setShowWarning(true);
            setRemoveId(id);
               
        } else { // Button is save

            // Updating the formdata at the given index.
            setAddedResources(prev => {
                const index = prev.findIndex(resource => resource.id === id); // Finding the resource index.

                // Checking that the index exists
                if (index !== -1) {
                    const updatedResources = [...prev];
                    updatedResources[index] = { ...updatedResources[index], formData: formData }; // Updating the formdata.
                    setRecalculate(true); // Set recalculate to true to trigger re-calculation
                    return updatedResources;
                } else {
                    return prev; // Return prev if index is -1
                }
            });

        }
        
    }

    // Call handleCalculate whenever addedResources changes and recalculate is true
    useEffect(() => {

        // Checking if recalculate is true
        if (recalculate && calculated) {
            setRecalculate(false);
            handleCalculate('result'); // Re-calculating
        }
        
    }, [addedResources]); // Only re-run when addedResources changes.



    // Returning a list where each point is a dropdown button for a resource, and the dropdown contains the input field either editable or not.
    return (
        <ul className={styles.ul} style={{ padding: '0' }}>

            {/* Display warning popup if showWarning is true */}
            {showWarning && (
                <WarningPopup
                    warning="Are you sure you want to remove this resource?"
                    onConfirm={handleResourceRemoval}
                    onCancel={() => setShowWarning(false)}
                />
            )}

            {/* Going through the list and making a list point for each resource */}
            {addedResources.map(({ resourceText, id, formData }) => (

                <li data-testid={`resourcesListpoint-${id}`} key={id} className={styles.li} style={{
                    height: openDropdown[id] ? '100%' : '10vh'
                }}>

                    {/* Dropdown button*/}
                    <button data-testid='dropdownButton' className={styles.dropdownBtn} onClick={() => handleClick(id)}>
                        <h6>{resourceText + " " + (id + 1)}</h6>
                        <img src={openDropdown[id] ? 'uparrow.png' : 'downarrow.png'} alt={openDropdown[id] ? 'uparrow' : 'downarrow'}></img>
                    </button>

                    {/* Dropdown content*/}
                    <div style={{
                        display: openDropdown[id] ? 'grid' : 'none',
                        zIndex: openDropdown[id] ? '1000' : '-1',
                        flex: '7.5',
                        padding: '0em'
                    }}>
                        <ResourceInput resourceText={resourceText} resourceFormData={formData} resourceID={id} edit={edit} handleSubmit={handleSubmit} setEdit={setEdit}/>
                    </div>

                </li>

            ))}

        </ul>
    );
}