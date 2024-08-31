import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "./style.css";

interface DialogButtonProps {
  onClick: () => void;
}

const DialogButton: React.FC<DialogButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <DeleteRoundedIcon className="action-icons delete" />
    </IconButton>
  );
};

export default DialogButton;
