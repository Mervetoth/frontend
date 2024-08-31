import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import UpdateIntellectualProperties from "../../services/UpdateIntellectualProperty";
import { styled } from "@mui/material/styles";
import "./style.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

interface UpdateDialogProps {
  id: string;
  onSuccess: () => void;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ id, onSuccess }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <DriveFileRenameOutlineRoundedIcon className="action-icons update" />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
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
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="dialog">
          <UpdateIntellectualProperties id={id} onSuccess={handleClose} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default UpdateDialog;
