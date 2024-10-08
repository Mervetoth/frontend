import React, { useState } from "react";
import "./style.css";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function ApproveTransferIP() {
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  // Example user data
  const user = {
    firstName: "Mervet",
    lastName: "Othman",
    email: "Mervet@gmail.com",
    phoneNumber: "1234507890",
    address: "123 Main St",
    designation: "Inventor",
  };

  // Example IP data
  const ip = {
    title: "Echoes of Time",
    description:
      "A collection of poems reflecting the passage of time and history.",
    classification: "literature",
    blockchainHash: "0x456abc789def123",
  };

  const handleApprove = () => {
    setOpenApproveDialog(true);
  };

  const handleReject = () => {
    setOpenRejectDialog(true);
  };

  const handleCloseApproveDialog = () => {
    setOpenApproveDialog(false);
    // Handle approval logic (e.g., send notification, update state)
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    // Handle rejection logic (e.g., send notification, update state)
  };

  return (
    <div className="body-space">
      <div>
        <div className="space-between-container">
          <div className="title-div">
            <h3 className="title">IP Transfer Request</h3>
            <h3 className="subtitle">
              Review the Intellectual Property transfer request and take action
              below.
            </h3>
          </div>
          <div>
            {/* Approve Transfer Button */}
            <Button
              variant="contained"
              className="success"
              onClick={handleApprove}
              style={{ marginLeft: "10px" }}
            >
              Approve Transfer
            </Button>

            {/* Reject Transfer Button */}
            <Button
              variant="contained"
              className="error"
              style={{ marginLeft: "10px" }}
              onClick={handleReject}
            >
              Reject Transfer
            </Button>
          </div>
        </div>
        <hr></hr>
        {/* IP Details Card */}
        <div className="custom-div">
          <CardContent>
            <Typography variant="h6">IP Information</Typography>
            <Typography>
              <strong>Title:</strong> {ip.title}
            </Typography>
            <Typography>
              <strong>Description:</strong> {ip.description}
            </Typography>
            <Typography>
              <strong>Classification:</strong> {ip.classification}
            </Typography>
          </CardContent>
        </div>

        {/* User Information Card */}
        <div className="custom-div">
          <CardContent>
            <Typography variant="h6">Requesting User Information</Typography>
            <Typography>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {user.phoneNumber}
            </Typography>
            <Typography>
              <strong>Address:</strong> {user.address}
            </Typography>
            <Typography>
              <strong>Designation:</strong> {user.designation}
            </Typography>
          </CardContent>
        </div>

        <Dialog
          open={openApproveDialog}
          onClose={() => setOpenApproveDialog(false)}
        >
          <DialogTitle>Confirm Approval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to approve the transfer of the IP "
              {ip.title}"?
              <br />
              <br />
              <strong>Smart Contract Interaction:</strong>
              <p>
                To complete the transfer, you need to interact with the
                blockchain. Please ensure that you are connected to your
                blockchain wallet. If you are not connected, follow these steps:
              </p>
              <ul>
                <li>
                  Open your blockchain wallet application (e.g., MetaMask).
                </li>
                <li>
                  Connect your wallet to this application if it's not already
                  connected.
                </li>
                <li>Confirm the transaction to approve the transfer.</li>
              </ul>
              <p>
                Once you have connected your wallet and are ready to proceed,
                click "Approve" to initiate the transaction. The transfer will
                be securely recorded on the blockchain.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenApproveDialog(false);
              }}
              color="primary"
            >
              Approve
            </Button>
            <Button
              onClick={() => setOpenApproveDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog
          open={openRejectDialog}
          onClose={() => setOpenRejectDialog(false)}
        >
          <DialogTitle>Confirm Rejection</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to reject the transfer of the IP "{ip.title}
              "?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRejectDialog} color="primary">
              Reject
            </Button>
            <Button
              onClick={() => setOpenRejectDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ApproveTransferIP;
