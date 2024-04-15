import { React, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { createRoot } from 'react-dom/client';
import ResultPanel from './components/ResultPanel';
import styles from './styles/App.module.css';


/**
 * Function defining the App component, the main components of the application.
 * Renders a container with a sidebar and a main content area.
 * Manages state for the sidebar width and active calculation tab.
 * Handles toggling of the sidebar width.
 * @returns {JSX.Element} The JSX representation of App component.
 */
export default function App() {

    const minWindowWidth = 992; // Large breakpoint in Bootstrap Grid
    const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth < minWindowWidth ? true : false); // Using useState hook to manage state for if window is small or not, and layout of Main is different
    const [sidebarWidth, setSidebarWidth] = useState(isWindowSmall ? 1 : 3); // useState hook to manage state for sidebar width
    const [activeTab, setActiveTab] = useState({}); // useState to manage state for active calculation tab at the "top"(App),
                                                    // so it can be passed to Main after change from Sidebar

    // Handling window resizing based on sidebarWidth
    useEffect(() => {
        // Function to handle resizing of the window
        const handleResize = () => {
            // Get the new current width of window
            const newWindowWidth = window.innerWidth;

            // Update sidebarWidth and navbarHeight based on windowWidth
            if (newWindowWidth < minWindowWidth) {
                // If the window width is smaller than the minimum breakpoint
                setIsWindowSmall(true);
                setSidebarWidth(1);
            } else {
                // If the window width is greater than or equal to the minimum breakpoint
                if (sidebarWidth === 3 || sidebarWidth === 1) setSidebarWidth(sidebarWidth);
                else setSidebarWidth(3);
                setIsWindowSmall(false);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sidebarWidth]); //Only re-run when sidebarWidth changes


    // Function to toggle sidebar width or navbar height on toggle button click from Navbar
    const toggleSidebar = () => {
        if (isWindowSmall) {
            // If window is small and sidebarWidth is 1, set it to 6, else set it to 1
            setSidebarWidth(sidebarWidth === 1 ? 6 : 1);
        } else {
            // If sidebarWidth is 3, set it to 1, else set it to 3
            setSidebarWidth(sidebarWidth === 3 ? 1 : 3);
        }

    };


    const [layout, setLayout] = useState('resource'); // State to manage the layout of the page.   
    const [activeList, setActiveList] = useState([]); // State to manage the resources added to the list to be calculated.
    const [tabList, setTabList] = useState([]); // State to manage the tabs with their content
    const [calcData, setCalcData] = useState([]); // State to hold the fetched calculation data


    // Updating the layout and activeList when activeTab changes
    useEffect(() => {
        if (activeTab.id) {

            // Finding the index of the activeTab
            const tabIndex = tabList.findIndex(tab => tab.id === activeTab.id);

            // Checking if the index of the activeTab exists
            if (tabIndex === -1) {
                setTabList((prev) => [...prev, { id: activeTab.id, title: activeTab.title, list: [], calcData: [], layout: 'resource' }]); // Add a new object to the tabList containing an id, empty list and the default layout 
            }

            // Set activeList and layout to the list and layout associated with the active tab
            setActiveList(tabList[tabIndex]?.list || []);
            setLayout(tabList[tabIndex]?.layout || 'resource');
            setCalcData(tabList[tabIndex]?.calcData || []);
            
        }
    }, [activeTab]); // Only re-run when activeTab changes



    // Update the tabList when activeList changes
    useEffect(() => {

        // Finding the index of the activeTab
        const tabIndex = tabList.findIndex(tab => tab.id === activeTab.id);

        if (tabIndex !== -1 && tabList[tabIndex]?.list !== activeList) {
            const updatedList = [...tabList];
            updatedList[tabIndex] = { ...updatedList[tabIndex], list: activeList }; //updating the list at the activeTab index
            setTabList(updatedList);
        }

    }, [activeList]); // Only re-run when activeList changes



    // Update the tabList when layout changes
    useEffect(() => {

        // Finding the index of the activeTab
        const tabIndex = tabList.findIndex(tab => tab.id === activeTab.id);

        if (tabIndex !== -1 && tabList[tabIndex]?.layout !== layout) {
            const updatedList = [...tabList];
            updatedList[tabIndex] = { ...updatedList[tabIndex], layout: layout }; //updating the layout at the activeTab index
            setTabList(updatedList);
        }

    }, [layout]); // Only re-run when layout changes


    // Update the tabList when calcData changes
    useEffect(() => {

        // Finding the index of the activeTab
        const tabIndex = tabList.findIndex(tab => tab.id === activeTab.id);

        if (tabIndex !== -1 && tabList[tabIndex]?.calcData !== calcData) {
            const updatedList = [...tabList];
            updatedList[tabIndex] = { ...updatedList[tabIndex], calcData: calcData }; //updating the calcData at the activeTab index
            setTabList(updatedList);
        }

    }, [calcData]); // Only re-run when calcData changes


    // Function to handle calculation submit
    const handleCalculate = async (l) => {
        setLayout(l);   // Set new layout


        // Array to store promises for each fetch request, avoid potential timing issues
        const fetchPromises = activeList.map(async resource => {
            // Fetch VM data based on form data submitted on calculate
            const vmResponse = await fetch('/vm/' + resource.formData.instance);
            if (!vmResponse.ok) {
                throw new Error('Failed to fetch VM data');
            }
            const vmData = await vmResponse.json();


            // Fetch region data based on form data
            const carbonIntensityResponse = await fetch('/region/carbonIntensity/' + resource.formData.region);
            if (!carbonIntensityResponse.ok) {
                throw new Error('Failed to fetch carbon intensity');
            }
            const carbonIntensityData = await carbonIntensityResponse.json();

            const pueResponse = await fetch('/region/pue/' + resource.formData.region);
            if (!pueResponse.ok) {
                throw new Error('Failed to fetch PUE');
            }
            const pueData = await pueResponse.json();

            return {
                resource: resource.resourceText + " " + (resource.id + 1),
                region: resource.formData.region,
                instance: resource.formData.instance,
                vmData: vmData,
                carbonIntensity: carbonIntensityData,
                pue: pueData,
                time: resource.formData.time
            };
        });

        // Wait for all fetch requests to complete
        try {
            const responseData = await Promise.all(fetchPromises);

            // Update calcData state with all fetched data
            setCalcData(responseData);
        } catch (error) {
            console.error('Error fetching VM data:', error);
        }

    };


    // Converting multiple tabs to PDF
    const handleConvertToPDF = () => {

        if (tabList.length !== 0) {
            const newWindow = window.open('', '_blank'); // Open a new window

            const renderTabToWindow = (tabIndex) => {
                const container = newWindow.document.createElement('div');
                newWindow.document.body.appendChild(container);

                // Render the ResultPanel component into the container
                createRoot(container).render(<ResultPanel layout={tabList[tabIndex].layout} calcData={tabList[tabIndex].calcData} tabname={tabList[tabIndex].title} />);
            };

            // Loop through each tab and render its content in the new window
            for (let i = 0; i < tabList.length; i++) {
                renderTabToWindow(i);
            }

            setTimeout(() => {
                // Print the window
                newWindow.print();
            }, 1000);
        }
    };


    // Returns layout and content of App, using Container, Row and Col.
    // The Container is fluid, meaning it's width is 100% across all viewport.
    // Sidebar Col has lg breakpoint that is set to span 'sidebarWidth' columns,
    // while Main Col span the rest of the space.
    return (
        <Container className={styles.container} style={{ minWidth: isWindowSmall ? '768px' : 'auto' }} fluid>
            <Row className={styles.row}>
                <Col 
                    className={styles.sidebarCol}
                    data-testid='sidebar_col'
                    {...(isWindowSmall ? { xs: sidebarWidth } : { lg: sidebarWidth })}
                >
                    <Sidebar
                        // Passing toggleSidebar, sidebarWidth, activeTab, 
                        // and setActiveTab as props.
                        toggleSidebar={toggleSidebar}
                        sidebarWidth={sidebarWidth}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        isWindowSmall={isWindowSmall}
                        handleConvertToPDF={handleConvertToPDF}
                        tabList={tabList}
                        setTabList={setTabList}
                    />
                </Col>
                <Col 
                    className={styles.mainCol}
                    style={{
                        // Move Main so that Sidebar Col has overlay effect
                        marginLeft: isWindowSmall && sidebarWidth === 6 ? '-41.67%' : 0
                    }}
                >
                    <Main
                        activeTab={activeTab}
                        tabList={tabList}
                        layout={layout}
                        setLayout={setLayout}
                        setActiveList={setActiveList}
                        activeList={activeList}
                        handleCalculate={handleCalculate} />
                </Col>
            </Row >
        </Container>
    );
}