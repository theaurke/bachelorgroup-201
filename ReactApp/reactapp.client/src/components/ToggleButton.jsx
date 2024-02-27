import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function ToggleButton({toggleSidebar}) {

    const renderTooltip = (props) => (
        <Tooltip id='toggle-tooltip' {...props}>
            Toggle Sidebar
        </Tooltip>
    )

    return (
        <Col>

            <OverlayTrigger
                placement='right'
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip}
                
            >
                <button style={{ border: 'none', background: 'none' }} onClick={toggleSidebar}>
                    <img src='toggleWhite.png' alt='toggleSidebar' style={{width: '55px'} } />
                </button>
            </OverlayTrigger>

        </Col>
    );
}