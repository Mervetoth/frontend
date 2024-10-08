import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./style.css";

// Example data with avatars
const notifications = [
  {
    id: 1,
    message:
      "Ms Foulen requests to transfer IP rights.Please review the details and take appropriate action.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    message:
      "Your request for access to the patented work 'Starry Night' has been approved. Please check your account for further details and sign the legal agreement.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 3,
    message:
      "Your request for access to the patented work 'Starry Night' has been rejected. Please contact support if you have any questions or need further assistance.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

function NotificationDropDownMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openApproveDialog, setOpenApproveDialog] = React.useState(false);
  const [selectedNotification, setSelectedNotification] =
    React.useState<any>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setOpenApproveDialog(true);
    handleClose();
  };

  const handleApprove = () => {
    // Implement your approval logic here
    alert("IP Transfer Approved!");
    setOpenApproveDialog(false);
  };

  const handleCancel = () => {
    setOpenApproveDialog(false);
  };

  return (
    <div>
      <IconButton
        aria-label="notifications"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge color="secondary" badgeContent={notifications.length} showZero>
          <NotificationsRoundedIcon className="link notification-icon" />
        </Badge>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "calc(100vh - 64px)",
            width: "360px",
            right: "auto",
            marginRight: "160px",
            overflow: "auto",
            overflowX: "hidden",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <h3 className="notification-title">Notifications</h3>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <MenuItem
              onClick={() => handleNotificationClick(notification)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                textAlign: "left",
                borderRadius: "8px",
                marginBottom: "8px",
                backgroundColor: "#f5f5f5",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0e0e0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
            >
              <Avatar
                src={notification.avatar}
                style={{ marginRight: "12px" }}
              />
              <span>{notification.message}</span>
            </MenuItem>
            {index < notifications.length - 1 && (
              <hr className="notification-divider" />
            )}
          </React.Fragment>
        ))}
      </Menu>

      {/* Approval Dialog */}
      <Dialog open={openApproveDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve the IP transfer?
            <br />
            <br />
            <strong>Notification Details:</strong>
            <p>{selectedNotification?.message}</p>
            <p>
              This action will trigger a smart contract on the blockchain to
              securely record the transfer of IP ownership. You will need to
              sign the transaction to confirm the transfer. Ensure you are
              connected to your blockchain wallet.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApprove} color="primary">
            Approve
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NotificationDropDownMenu;
