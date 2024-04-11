import styles from '../styles/AddedResourceList.module.css';
import ResourceInput from './ResourceInput';
import { useState, useEffect } from 'react';

export default function AddedResourcesList({ addedResources, setAddedResources }) {
    const [openDropdown, setOpenDropdown] = useState({}); // State to manage opening the dropdown clicked on.
    const [edit, setEdit] = useState(true); // State to manage whether the inout field is editable or not.



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
        } else {

            // Updating the formdata at the given index.
            setAddedResources(prev => {
                const index = prev.findIndex(resource => resource.id === id); // Finding the resource index.
                if (index !== -1) {
                    const updatedResources = [...prev];
                    updatedResources[index] = { ...updatedResources[index], formData: formData }; // Updating the formdata.
                    return updatedResources;
                } 
            });
        }
        
    }



    // Returning a list where each point is a dropdown button for a resource, and the dropdown contains the input field either editable or not.
    return (
        <ul className={styles.ul} style={{ padding:'0' }}>

            {/* Going through the list and making a list point for each resource */}
            {addedResources.map(({ resourceText, id, formData }) => (

                <li data-testid={`resourcesListpoint-${id}`} key={id} className={styles.li} style={{
                    height: openDropdown[id] ? '100%' : '10vh'
                }}>

                    {/* Dropdown button*/}
                    <button data-testid='dropdownButton' className={styles.dropdownBtn} onClick={() => handleClick(id)}>
                        <h6>{resourceText}</h6>
                        <p>{ openDropdown[id]? '\u2BC5' : '\u2BC6'}</p>
                    </button>

                    {/* Dropdown content*/}
                    <div style={{
                        display: openDropdown[id] ? 'grid' : 'none',
                        zIndex: openDropdown[id] ? '1000' : '-1',
                        flex: '7.5',
                        padding: '0em'
                    }}>
                        <ResourceInput resourceText={resourceText} resourceFormData={formData} resourceID={id} edit={edit} handleSubmit={handleSubmit} setEdit={setEdit} />
                    </div>

                </li>

            ))}

        </ul>
    );
}