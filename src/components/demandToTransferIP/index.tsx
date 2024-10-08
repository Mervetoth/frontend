import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import IntellectualProperty from "../../types/intellectualProperties.types";
import { fetchIntellectualProperties } from "../../services/intellectualPropertyService";

import "./style.css";

// Real names for available users
const availableUsers = [
  { value: "Mervet Othman", label: "Mervet Othman" },
  { value: "Hamza Hajbelgacem", label: "Hamza Hajbelgacem" },
  { value: "Sofia Ben Ali", label: "Sofia Ben Ali" },
  { value: "Youssef Laabidi", label: "Youssef Laabidi" },
  { value: "Aisha Mansouri", label: "Aisha Mansouri" },
];

const DemandToTransferIP: React.FC = () => {
  const [intellectualProperties, setIntellectualProperties] = useState<
    IntellectualProperty[]
  >([]);
  const [selectedIP, setSelectedIP] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    loadIntellectualProperties();
  }, []);

  const loadIntellectualProperties = async () => {
    const data = await fetchIntellectualProperties();
    if (Array.isArray(data)) {
      setIntellectualProperties(data);
    } else {
      console.error("Fetched data is not in expected format", data);
    }
  };

  return (
    <div className="body-space">
      <div>
        <div className="space-between-container">
          <div className="title-div">
            <h3 className="title">Demand to Transfer IP Rights</h3>
            <h3 className="subtitle">Transfer IP Securely</h3>
          </div>
        </div>
        <hr />

        <div className="custom-div">
          {/* Dropdown for available IPs */}
          <TextField
            id="outlined-select-ip"
            select
            label="Select IP"
            value={selectedIP}
            onChange={(event) => setSelectedIP(event.target.value as string)}
            helperText="Please select an IP"
            fullWidth
            margin="normal"
          >
            {intellectualProperties.map((ip) => (
              <MenuItem key={ip._id} value={ip._id}>
                {ip.title}
              </MenuItem>
            ))}
          </TextField>
          {/* Dropdown for available users */}
          <TextField
            id="outlined-select-user"
            select
            label="Select Owner"
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value as string)}
            helperText="Please select a user"
            fullWidth
            margin="normal"
          >
            {availableUsers.map((user) => (
              <MenuItem key={user.value} value={user.value}>
                {user.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddRoundedIcon />}
            onClick={() => setOpenAddDialog(true)}
            style={{ marginTop: 20 }}
          >
            Request Transfer
          </Button>
          <div className="description">
            <Typography variant="body1">
              To request a transfer of intellectual property rights, please
              follow these steps:
            </Typography>
            <Typography variant="body1" paragraph>
              1. Select the intellectual property you wish to transfer from the
              "Select IP" dropdown menu.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Choose the owner from the "Select Owner" dropdown menu. This
              should be the person or entity you wish to transfer the IP rights
              to.
            </Typography>
            <Typography variant="body1" paragraph>
              3. Click on the "Request Transfer" button to submit your request.
              The request will be sent to the selected owner for approval.
            </Typography>
            <Typography variant="body1">
              Please ensure that you have all the necessary information and
              permissions before submitting your request.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandToTransferIP;
