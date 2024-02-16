import Col from 'react-bootstrap/Col';

export default function ToggleButton() {
    return (
        <Col style={{display: 'flex', justifyContent: 'center'} } >
            <button style={{border: 'none', background: 'none'} }>
                <img src='toggleWhite.png' alt='toggleSidebar' style={{width: '55px'} } />
            </button>
            <h5 style={{color: 'white', alignSelf: 'center'} }>Toggle Sidebar</h5>
        </Col>
    );
}