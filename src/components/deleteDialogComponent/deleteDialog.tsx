import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogButton from "./deleteDialogButton";
import alerte from "../../assets/images/icons/alerte.png";
import { deleteIntellectualProperty } from "../intellectualPropertiesComponents/deleteIntellectualPropertyComponent";
import "./style.css";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DeleteDialogProps {
  id: string;
  onSuccess: () => void; // New prop to handle successful deletion
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ id, onSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const success = await deleteIntellectualProperty(id);
      if (success) {
        onSuccess(); // Notify parent component of successful deletion
        handleClose(); // Close the dialog
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <DialogButton onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
        <DialogContent dividers className="dialog">
          <img src={alerte} alt="Alerte Icon" className="icon" />
          <Typography gutterBottom className="text-dialog">
            Are you sure you want to delete this IP?<br></br>
            This action cannot be undone
          </Typography>
        </DialogContent>
        <DialogActions className="dialog">
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className=" delete-button">
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
