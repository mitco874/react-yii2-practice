import { Box, Modal, Typography } from "@mui/material"
import { FC } from "react";
import { User } from "../interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedUser?: User|null,
}

export const ViewUserModal: FC<Props> = ({isOpen, onClose, selectedUser}) => {
  return (
    <Modal
    open={isOpen}
    onClose={onClose}
    sx={{display: 'flex', justifyContent: 'center'}}
  >
    <>
      {
        selectedUser && (
          <Box
            sx={{
              background: 'white',
              padding:'20px',
              width: '400px',
              height: '200px',
              borderRadius: '10px'}} 
            border ={selectedUser.gender === "Female"? '10px solid pink' : '10px solid blue'}
          >

          <Typography variant="h6" component="h2">
            {`Name :${selectedUser.first_name} ${selectedUser.last_name}(${selectedUser.username})`}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Email: {selectedUser.email}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Gender: {selectedUser.gender}
          </Typography>
        </Box>
        )
      }
    </>
  </Modal>
  )
}
