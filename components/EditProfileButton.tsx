import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { FullUser } from "../util/commonTypes";
import axios, { AxiosResponse } from "axios";
import { UPDATE_USER_URL, UPLOAD_URL } from "../util/consts";
import ToastAlert from "./ToastAlert";
import { useCookies } from "react-cookie";

type EditProfileButtonProps = {
  user: FullUser;
};

type EditableUserData = {
  username: string;
};

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newUserData, setNewUserData] = useState<EditableUserData>({
    username: user.username,
  });
  const [displayPictureChanged, setDisplayPictureChanged] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [cookies] = useCookies(["userToken"]);

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
      const fileSizeInMB = event.target.files[0].size / 1024 / 1024;

      if (fileSizeInMB < 2) {
        setSelectedFile(event.target.files[0]);
        setDisplayPictureChanged(true);
      } else {
        setErrorMessage("Uploaded image must be less than 2 mb");
        setSelectedFile(null);
        setDisplayPictureChanged(false);
      }
    } else {
      setSelectedFile(null);
      setDisplayPictureChanged(false);
    }
  };

  const handleAddImageClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  const handleDisplayImageUpdate = (
    callback: (res: AxiosResponse<any>) => void
  ) => {
    if (selectedFile !== null) {
      setIsLoading(true);

      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);

      axios
        .post(UPLOAD_URL, fd, {
          headers: {
            Authorization: `Bearer ${cookies["userToken"]}`,
          },
        })
        .then(callback)
        .catch((err) => {
          setErrorMessage("Something went wrong uploading your picture");

          setIsLoading(false);
        });
    }
  };

  const handleUserDataUpdate = (
    callback: (res: AxiosResponse<any>) => void
  ) => {
    setIsLoading(true);

    axios
      .post(UPDATE_USER_URL, newUserData, {
        headers: {
          Authorization: `Bearer ${cookies["userToken"]}`,
        },
      })
      .then(callback)
      .catch((err) => {
        setErrorMessage("Username is already taken");

        setIsLoading(false);
      });
  };

  const handleApplyClick = () => {
    if (displayPictureChanged && userDataChanged) {
      handleDisplayImageUpdate(() => {
        handleUserDataUpdate(() => {
          if (typeof window !== "undefined") window.location.reload();
        });
      });
    } else if (userDataChanged) {
      handleUserDataUpdate(() => {
        if (typeof window !== "undefined") window.location.reload();
      });
    } else if (displayPictureChanged) {
      handleDisplayImageUpdate(() => {
        if (typeof window !== "undefined") window.location.reload();
      });
    }
  };

  const onUpdateUsernameField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewUserData({
      username: event.target.value,
    });

    setUserDataChanged(
      event.target.value !== user.username && event.target.value.length >= 3
    );
  };

  const handleClose = () => {
    setErrorMessage("");
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="Username"
              color="primary"
              value={newUserData.username}
              onChange={onUpdateUsernameField}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleApplyClick}
            disabled={isLoading || (!displayPictureChanged && !userDataChanged)}
          >
            Apply
          </Button>
        </DialogActions>
        <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default EditProfileButton;
