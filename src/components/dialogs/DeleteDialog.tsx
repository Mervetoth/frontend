import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DialogButton from "./DialogButton";
import { deleteIntellectualProperty } from "../../services/intellectualPropertyService";
import "./style.css";
import alerteIcon from "../../assets/images/icons/alerte.png";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

interface DeleteDialogProps {
  id: string;
  onSuccess: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ id, onSuccess }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (await deleteIntellectualProperty(id)) {
      onSuccess();
      handleClose();
    }
  };

  return (
    <>
      <DialogButton onClick={handleOpen} />
      <BootstrapDialog onClose={handleClose} open={open}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="dialog">
          <img src={alerteIcon} alt="Alert Icon" className="alerte-icon" />
          <Typography gutterBottom className="text-dialog">
            Are you sure you want to delete this IP? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions className="dialog">
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} className="delete-button">
              Delete
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default DeleteDialog;
