import * as React from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
interface DialogButtonProps {
  onClick: () => void;
}

const DialogButton: React.FC<DialogButtonProps> = ({ onClick }) => {
  return (
    <DeleteOutlineRoundedIcon
      onClick={onClick}
      className="action-icons delete"
    />
  );
};

export default DialogButton;
