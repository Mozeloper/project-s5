import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { MdDeleteSweep } from 'react-icons/md'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { GrDocumentUpdate } from 'react-icons/gr'

export default function Options({children}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actions = [
      { icon: <HiMiniViewfinderCircle />, name: 'View' },
      { icon: <GrDocumentUpdate />, name: 'Update' },
      { icon: <IoRemoveCircleSharp />, name: 'Suspend' },
      { icon: <MdDeleteSweep />, name: 'Delete' },
    ];
    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }} className='bg-red-800 option-btn'>
            <SpeedDial
                ariaLabel="SpeedDial/Options controlled component"
                sx={{ position: 'absolute', bottom: -30, right: -10 }}
                icon={children}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                
                // className='bg-green-800'
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                        className='bg-yellow-800'
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}
