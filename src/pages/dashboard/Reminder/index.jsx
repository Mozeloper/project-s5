import DeactivatedNewConvertTable from '@/components/Table/ApprovalTable/deactivated.newConvert.table';
import DeactivatedWorkerTable from '@/components/Table/ApprovalTable/deactivated.worker.table';
import UnapprovedWorkerTable from '@/components/Table/ApprovalTable/unapproved.worker.table';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import PageTitle from '../../../components/PageTitle';

export default function Reminder() {
  const [value, setValue] = React.useState('1');

  const roles = JSON.parse(sessionStorage.getItem('role'));
  const isSuperAdmin = roles.includes('SuperAdmin');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <PageTitle tile="Worker Management" />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Unapproved Workers" value="1" />
              {isSuperAdmin && <Tab label="Suspended Workers" value="2" />}
              {isSuperAdmin && <Tab label="Deactivated Converts" value="3" />}
            </TabList>
          </Box>
          <TabPanel value="1" className="!px-2">
            <UnapprovedWorkerTable />
          </TabPanel>
          {isSuperAdmin && (
            <TabPanel value="2" className="!px-2">
              <DeactivatedWorkerTable />
            </TabPanel>
          )}
          {isSuperAdmin && (
            <TabPanel value="3" className="!px-2">
              <DeactivatedNewConvertTable />
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </>
  );
}
