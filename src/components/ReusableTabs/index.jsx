import React, {useState} from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

const DashboardTabs = ({ children, tabLabels }) => {
  const [tabPanelValue, setTabPanelValue] = React.useState('1');

  const handleTabChange = (event, newValue) => {
    setTabPanelValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabPanelValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="">
            <Tab label={tabLabels[0]} value="1" />
            <Tab label={tabLabels[1]} value="2" />
            {/* {tabLabels.map((label, index) => (
              <Tab label={label} value={`${index}` + 1} />
            ))} */}
          </TabList>
        </Box>
        <TabPanel value="1" className="!px-2">
          {children[0]}
        </TabPanel>
        <TabPanel value="2" className="!px-2">
          {children[1]}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DashboardTabs

