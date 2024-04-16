import styles from '../styles/Resource.module.css'
import { useState, useEffect } from 'react';
import ResourceInput from './ResourceInput';


// List of resources to choose from.
const resources = [{ long: 'Virtual Machine', short: 'VM' }];

export default function ResourceList({ addedResources, setAddedResources, setShowList }) {
    const [showInput, setShowInput] = useState(false); // State to manage the visibility of the input field.
    const [resource, setResource] = useState({}); // State mamanging adding a resource.
    const [resourceID, setResourceID] = useState(0); // State managing the resource ID.


    // Setting the resourceID based on the last ID in the addedesource list.
    useEffect(() => {
        if (addedResources.length !== 0) {
            setResourceID(addedResources[addedResources.length - 1].id + 1)
        }
    }, [addedResources]);


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

            <ul data-testid={'resourceList'}  className={styles.resourceList}>

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

            <ResourceInput resourceText={resource.resourceText} resourceFormData='' handleSubmit={handleSubmit} edit={false} />
        )
    );
}