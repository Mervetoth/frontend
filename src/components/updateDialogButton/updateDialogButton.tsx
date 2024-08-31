import * as React from "react";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/EditOutlined";

interface DialogButtonProps {
  onClick: () => void;
}

const DialogButton: React.FC<DialogButtonProps> = ({ onClick }) => {
  return (
    <DriveFileRenameOutlineRoundedIcon
      onClick={onClick}
      className="action-icons update"
    />
  );
};

export default DialogButton;
