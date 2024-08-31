import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CreateIntellectualPropertyForm from "../intellectualPropertiesComponents/createIntellectualProperty"; // Updated import
import "./style.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Prop to handle successful addition
}

const AddDialog: React.FC<AddDialogProps> = ({ open, onClose, onSuccess }) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open} // Control open/close from props
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className="dialog"
      >
        <h3 className="subtitle">Add Intellectual Property Details</h3>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        <CreateIntellectualPropertyForm
          onSuccess={() => {
            onSuccess();
          }}
          onClose={onClose}
        />
      </DialogContent>
    </BootstrapDialog>
  );
};

export default AddDialog;
