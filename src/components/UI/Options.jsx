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

export default function TableOptions({
  optionsList,
  handleClick,
  displayModalUi,
  id,
  pageLink,
}) {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useModalToggle();
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleView = (event, option, popupState) => {
    // Close the popstate when an option is clicked
    popupState.close();
    setSelectedOption(option);
    const innerText = event.currentTarget.innerText;
    const itemId = event.currentTarget.id;
    if (innerText.toLowerCase() === 'view') {
      navigate(`/${pageLink}/${itemId}`);
    } else {
      setIsOpen(true);
      handleClick(event, option);
    }
  };

  const renderModalContent = () => {
    if (selectedOption) {
      return (
        <TransitionsModal
          isModalOpen={isOpen}
          name={selectedOption.name}
          icon={selectedOption.icon}
          heading={`${selectedOption.name} Screen`}
          width={'max-w-max w-[90%]'}
        >
          {/* {displayModalUi} */}
          {displayModalUi}
        </TransitionsModal>
      );
    }
    return null;
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
                  {option.name}
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
