import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIntellectualProperties from "../../services/AddIntellectualProperty";
import { styled } from "@mui/material/styles";
import "./style.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDialog: React.FC<AddDialogProps> = ({ open, onClose, onSuccess }) => {
  return (
    <BootstrapDialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className="dialog"
      >
        <h3 className="subtitle">Register new Intellectual Property</h3>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="dialog">
        {/* Pass the onClose prop to AddIntellectualProperties */}
        <AddIntellectualProperties onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </BootstrapDialog>
  );
};

export default AddDialog;
