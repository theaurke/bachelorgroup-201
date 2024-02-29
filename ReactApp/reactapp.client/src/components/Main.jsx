import Information from './Information';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ResultPanel from './ResultPanel';
import AddedResourcesList from './AddedResourcesList';


export default function Main({ activeTab }) {
    console.log('Main active tab: ' + activeTab);

    const renderContent = () => {
        if (!activeTab) {
            return (
                <Information />
            );
        } else {
            return ( 
                <> 
                    <Col>
                        <ResultPanel activeTab={activeTab} />
                    </Col>
                    <Col>
                        <AddedResourcesList activeTab={activeTab} />
                    </Col>
                </>
            );
        }
    }

    return (
        <Container style={{ border: '4px solid #45654C', padding: '0em', display:'flex' }}>
            {renderContent()}
        </Container>
    );
    
}
