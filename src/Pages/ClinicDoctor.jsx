import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import Doctors from "./Doctors";
import Clinics from "./Clinics";

const ClinicDoctor = () => {
  // State to track active tab index
  const [tabIndex, setTabIndex] = React.useState(0);

  // Handler to update tab index and trigger scroll check
  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box
      as="section"
      className="clinic-doctor"
      maxW="1400px"
      mx="auto"
      py={{ base: 0, md: 4 }}
      px={{ base: 0, md: 0 }}
    >
      <h2
        style={{
          color: "var(--color-heading)",
          fontWeight: 600,
          fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
          marginBottom: "45px",
          letterSpacing: "0.01em",
          textAlign: "center",
          fontFamily: "var(--font-primary)",
        }}
      >
        Top Clinics & Doctors in Datia .
      </h2>
      <Tabs
        isFitted
        variant="enclosed"
        colorScheme="blue"
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList mb="1em" style={{ maxWidth: "300px", marginLeft: "15px" }}>
          <Tab>Doctors</Tab>
          <Tab>Clinics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}> {/* Remove default padding to avoid interference */}
            <Doctors />
          </TabPanel>
          <TabPanel p={0}> {/* Remove default padding to avoid interference */}
            <Clinics onTabMount={tabIndex} /> {/* Pass tab index as a trigger */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ClinicDoctor;