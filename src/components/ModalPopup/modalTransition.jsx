import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { ListItemIcon } from '@mui/material';
import { useModalToggle } from '../../context/ConfirmationModal.context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //   width: 400,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  backGroundColor: 'red',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  name,
  heading,
  width,
  children,
  icon,
  isModalOpen,
}) {
  
  const { isOpen, openModal, closeModal } = useModalToggle();
  const handleOpen = () => {
    openModal(isModalOpen);
  };

  return (
    <div>
      <div
        className="z-20 flex !justify-center items-center py-1"
        onClick={handleOpen}
      >
        <ListItemIcon className="w-max min-w-max">{icon}</ListItemIcon>
        {name}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        // className="bg-[rgba(0,_0,_0,_0.7)]"
      >
        <Fade in={isOpen}>
          <Box sx={style} className={`${width}`}>
            <Typography id="transition-modal-title">{heading}</Typography>
            <Typography
              id="transition-modal-description"
              component={'div'}
              sx={{ mt: 2 }}
            >
              {children}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
