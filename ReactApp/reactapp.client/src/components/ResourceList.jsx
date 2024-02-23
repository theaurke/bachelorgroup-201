import styles from '../styles/ResourceList.module.css'

const resources = ['Virtual Machine', 'Azure VMware Solution', 'Dedicated Host', 'Virtual Desktop',
                               'VM Scale Sets', 'Azure Firewall', 'ExpressRoute', 'Load Balancer', 'Network Watcher', 
                               'Private Link']   
export default function ResourceList() {
    return (
        <ul className={styles.resourceList}>
            {resources.map((text, index) => (
                <li key={index} className={styles.resourceButton}>
                    <button className={styles.buttonText}> {text} </button>
                </li>
            ))}
        </ul>
    );
}