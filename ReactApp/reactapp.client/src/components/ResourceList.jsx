import styles from '../styles/Resource.module.css'
import { useState, useEffect } from 'react';
import ResourceInput from './ResourceInput';


/**
 * ResourceList component.
 * Renders either a list of resources to choose from or an input field for the chosen resource.
 * @param {list} addedResources - List of resources already added to the calculation.
 * @param {Function} setAddedResources - Function to update the list of resources added to the calculation.
 * @param {Function} setShowList - Function to update the visibility of the list of resources to choose from.
 * @param {boolean} showInput - Boolean that indicates whether the input form should be visible or not.
 * @param {Function} setShowInput - Function to update the visibility of the input form.
 * @returns {JSX.Element} The JSX representation of the list.
 */
export default function ResourceList({ addedResources, setAddedResources, setShowList, showInput, setShowInput }) {
    const [resource, setResource] = useState({}); // State managing adding a resource.
    const [resourceID, setResourceID] = useState(0); // State managing the resource ID.
    const resources = [{ long: 'Virtual Machine', short: 'VM' }]; // List of resources to choose from.

    // Setting the resourceID based on the last ID in the addedResource list.
    useEffect(() => {
        if (addedResources.length !== 0) {
            setResourceID(addedResources[addedResources.length - 1].id + 1)
        }
    }, [addedResources]); // Only re-running when addedResources changes.


    // Function to handle submitting the form from the input field.
    const handleSubmit = (formData) => {
        const newResource = { ...resource, formData: formData }; //Adding the formData to the chosen resource.
        setAddedResources((prev) => [...prev, newResource]); // Updating the addedResource list with the new resource.
        setShowInput(false); //Closing the input field.
        setShowList(false); //Closing the resource list.
    }

    // Returning either the list of resources or input field.
    return (

        !showInput ? (

            <ul data-testid='resourceList' className={styles.resourceList}>

                {/*Going through the list of resources and making a point with button for each.*/}
                {resources.map((text, index) => (

                    <li key={index} className={styles.resourceLi}>
                        <button data-testid={`resourceButton-${index}`}  className={styles.resourceButton}
                            onClick={() => {
                                setShowInput(true);
                                setResource(prev => ({ ...prev, id: resourceID, resourceText: text.long, short: text.short }));
                            }}>
                            {text.long}
                        </button>
                    </li>

                ))}

            </ul>

        ) : (

            <ResourceInput
                resourceText={resource.resourceText}
                resourceFormData=''
                handleSubmit={handleSubmit}
                edit={false}
                resource={resource}
                setResource={setResource}
                setShowInput={setShowInput}
                setShowList={setShowList}
            />
        )
    );
}