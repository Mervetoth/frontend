import React from "react";
import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import "./style.css";

interface WhiteButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({
  title,
  onClick,
  disabled,
}) => {
  return (
    <Button
      className="white-button"
      onClick={onClick}
      disabled={disabled}
      startIcon={<ArrowForward />}
    >
      {title}
    </Button>
  );
};

export default WhiteButton;
