import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { MdDeleteSweep } from 'react-icons/md'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { GrDocumentUpdate } from 'react-icons/gr'
import TransitionsModal from '../ModalPopup/modalTransition' 

//second
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


//third
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ConfirmDeactivate from './confirmation screen';
import Tooltip from '@mui/material/Tooltip';


export default function TableOptions({ optionsList, handleClick, displayModalUi, id }) {

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                {...bindTrigger(popupState)}
            >
                <Tooltip title="Account settings">

                <MoreVertIcon />
                </Tooltip>
            </IconButton>

            <Menu {...bindMenu(popupState)}>
            {
                optionsList?.map((option) =>
                    <MenuItem key={option.name} id={id} onClick={handleClick} value={option.name} className='flex justify-between text-slate-700'>
                        <TransitionsModal isOpen={true} name={option.name} icon={option.icon} heading={`${option.name} Screen`} width={'max-w-max w-[90%]'}>
                                {displayModalUi}
                        </TransitionsModal>
                    </MenuItem>

                )
            }
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}