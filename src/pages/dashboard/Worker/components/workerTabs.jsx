import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UnapprovedWorkerTable from '../../../../components/Table/unapproved.worker.table';
import DeactivatedWorkerTable from '../../../../components/Table/deactivated.worker.table';

export default function WorkerTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Worker Details" value="1" />
            <Tab label="Permissions" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" className="!px-2">
          <UnapprovedWorkerTable />
        </TabPanel>
        <TabPanel value="2" className="!px-2">
          <DeactivatedWorkerTable />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
