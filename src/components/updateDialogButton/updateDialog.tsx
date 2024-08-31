// UpdateDialog.tsx
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import UpdateIntellectualProperties from "../intellectualPropertiesComponents/updateIntellectualPropertyComponent";
import "./style.css";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface UpdateDialogProps {
  id: string;
  onSuccess: () => void; // New prop to handle successful update
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ id, onSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <DriveFileRenameOutlineRoundedIcon className="action-icons update" />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="dialog"
        >
          <h3 className="subtitle">Update Intellectual Property Details</h3>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="dialog">
          <UpdateIntellectualProperties
            id={id}
            onSuccess={() => {
              handleClose();
              onSuccess(); // Call the onSuccess prop to refresh the list
            }}
          />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default UpdateDialog;
