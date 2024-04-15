import styles from '../styles/AddedResourceList.module.css';
import ResourceInput from './ResourceInput';
import { useState, useEffect } from 'react';

export default function AddedResourcesList({ addedResources, setAddedResources, handleCalculate, setLayout }) {
    const [openDropdown, setOpenDropdown] = useState({}); // State to manage opening the dropdown clicked on.
    const [edit, setEdit] = useState(true); // State to manage whether the inout field is editable or not.
    const [saved, setSaved] = useState(false); // State to manage if resource is edited or not.



    // Initializing the openDropdown with the added resources, and setting them all to closed.
    useEffect(() => {
        const openDropdowns = [];
        addedResources.forEach(({ id }) => {
            openDropdowns[id] = false;
            setOpenDropdown(openDropdowns);
        });
    }, [addedResources]);


    // Function to update the dropdown to open or closed based on is current state.
    const handleClick = (id) => {

        setOpenDropdown(prev => {
            const updatedDropdowns = [...prev];
            updatedDropdowns[id] = !updatedDropdowns[id];
            return updatedDropdowns;
        });
    };

    // Function that handles removal of resource from list, and saving new formdata to exsisting resource.
    const handleSubmit = (buttontext, id, formData) => {

        // Checking if button is remove
        if (buttontext === 'Remove') {

            setAddedResources(prev => prev.filter(resource => resource.id !== id)); // Making a new list with all resources expect the one matching the id.

            if (addedResources.length === 1) {
                setLayout('resource');
            }
               

        } else {

            // Updating the formdata at the given index.
            setAddedResources(prev => {
                const index = prev.findIndex(resource => resource.id === id); // Finding the resource index.
                if (index !== -1) {
                    const updatedResources = [...prev];
                    updatedResources[index] = { ...updatedResources[index], formData: formData }; // Updating the formdata.
                    setSaved(true); // Set saved to true
                    return updatedResources;
                } else {
                    return prev; // Return prev if index is -1
                }
            });

        }
        
    }

    // Call handleCalculate whenever addedResources changes and saved is true
    useEffect(() => {

        if (saved) {
            setSaved(false);
            handleCalculate('result');
        }
        
    }, [addedResources]);



    // Returning a list where each point is a dropdown button for a resource, and the dropdown contains the input field either editable or not.
    return (
        <ul className={styles.ul} style={{ padding: '0' }}>

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