import styles from '../styles/ResourceList.module.css'
import Container from 'react-bootstrap/Container';

export default function AddedResourcesList(){
    return (
        <Container className="vh-100" style={{border:'4px solid #45654C',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div className={styles.addResourceButton}>
                <button className={styles.buttonText}> Add Resource </button>
            </div>
        </Container>
    );
}