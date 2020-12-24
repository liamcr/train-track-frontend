import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { FullUser } from "../util/commonTypes";
import axios from "axios";
import { UPLOAD_URL } from "../consts";

type EditProfileButtonProps = {
  user: FullUser;
};

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleFileInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleAddImageClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  const handleApplyClick = () => {
    if (selectedFile === null) {
      setOpen(false);
    } else {
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);

      axios
        .post(UPLOAD_URL, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "train-track-access-token"
            )}`,
          },
        })
        .then(() => {
          console.log("success!");
        });
    }
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
            <input
              type="file"
              onChange={handleFileInputOnChange}
              style={{ display: "none" }}
              ref={inputRef}
              accept="image/png, image/jpeg"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography noWrap style={{ maxWidth: 64 }}>
                {selectedFile !== null ? selectedFile?.name : ""}
              </Typography>
              <IconButton onClick={handleAddImageClick}>
                <AddAPhotoIcon color="primary" />
              </IconButton>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleApplyClick}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfileButton;
