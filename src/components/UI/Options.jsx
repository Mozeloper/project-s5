import * as React from 'react';
import TransitionsModal from '../ModalPopup/modalTransition' 

//second
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


//third
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { useModalToggle } from '../../context/ConfirmationModal.context';

export default function TableOptions({ optionsList, handleClick, displayModalUi, id, pageLink }) {
  const navigate = useNavigate();
  
  const [open, setOpen] = React.useState(true);

  const handleView = (event) => {
    // setOpen(prev => prev = true)
    const innerText = event.currentTarget.innerText
    const id = event.currentTarget.id
    if ( innerText.toLowerCase() === 'view') {
      navigate(`/${pageLink}/${id}`);
    } else {
      handleClick(event)
    }
  };

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
                <Tooltip title="Options settings">
                  <MoreVertIcon />
                </Tooltip>
            </IconButton>

            <Menu {...bindMenu(popupState)}>
            {
              optionsList?.map((option) =>
                <MenuItem key={option.name} id={id} onClick={handleView} value={option.name} className='flex justify-between text-slate-700'>
                    <TransitionsModal isModalOpen={open} name={option.name} icon={option.icon} heading={`${option.name} Screen`} width={'max-w-max w-[90%]'}>
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