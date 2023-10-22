import * as React from 'react';
import TransitionsModal from '../ModalPopup/modalTransition';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import { useModalToggle } from '../../context/ConfirmationModal.context';
import AddAdminFormControl from './Forms/addAdmin.form';

export default function TableOptions({
  optionsList,
  handleClick,
  displayModalUi,
  id,
  pageLink,
  selectedUserData = {},
}) {
  const navigate = useNavigate();
  const { isOpen, modalType, openModal, closeModal } = useModalToggle();
  const [selectedOption, setSelectedOption] = React.useState(null);
  const handleView = (event, option, popupState) => {
    // Close the popstate when an option is clicked
    if (selectedUserData) {
      event.selectedUserData = selectedUserData;
    }
    popupState.close();
    setSelectedOption(option);
    const innerText = event.currentTarget.innerText;
    const itemId = event.currentTarget.id;
    if (innerText.toLowerCase() === 'view') {
      navigate(`/${pageLink}/${itemId}`);
    } else {
      openModal(innerText);
      handleClick(event, option);
    }
  };

  const renderModalContent = () => {
    if (selectedOption) {
      return (
        <TransitionsModal
          //isModalOpen={isOpen}
          name={selectedOption.name}
          icon={selectedOption.icon}
          heading={`${selectedOption.name} Screen`}
          width={'max-w-max w-[90%]'}
        >
          {/* {displayModalUi} */}
          {displayModalUi}
        </TransitionsModal>
      );
    } else if (modalType === 'AddAdmin') {
      return (
        <TransitionsModal
          name={'+ Add Admin'}
          heading={'Add a new admin'}
          width={'max-w-2xl w-[90%]'}
        >
          {/* {displayModalUi} */}
          <AddAdminFormControl />
        </TransitionsModal>
      );
    }
    return null;
  };

  function getButtonText(option, selectedUserData) {
    if (
      option.name.toLowerCase() === 'assign' &&
      selectedUserData.isAssigned === true
    ) {
      return 'Reassign';
    }
    return option.name;
  }

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
            {optionsList?.map((option) => (
              <MenuItem
                key={option.name}
                id={id}
                onClick={(event) => handleView(event, option, popupState)}
                value={option.name}
                className="flex justify-between text-slate-700"
              >
                <span className="flex gap-5">
                  {option.icon}
                  {/* {option.name} */}
                  {getButtonText(option, selectedUserData)}
                </span>
              </MenuItem>
            ))}
          </Menu>
          <div className="hidden">{renderModalContent()}</div>
        </React.Fragment>
      )}
    </PopupState>
  );
}
