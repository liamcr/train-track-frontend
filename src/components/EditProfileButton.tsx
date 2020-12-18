import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { FullUser } from "../util/commonTypes";

type EditProfileButtonProps = {
  user: FullUser;
};

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClickClose} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Display Picture</Typography>
            <IconButton>
              <AddAPhotoIcon color="primary" />
            </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfileButton;
