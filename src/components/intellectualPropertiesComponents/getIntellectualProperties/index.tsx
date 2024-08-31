import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IntellectualProperty from "../../../types/intellectualProperties.types";
import { deleteIntellectualProperty } from "../deleteIntellectualPropertyComponent";
import "./style.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import UpdateDialog from "../../updateDialogButton/updateDialog";
import DeleteDialog from "../../deleteDialogComponent/deleteDialog";
import AddDialog from "../../addDialogComponent/addDialog"; // Import AddDialog

const GetIntellectualProperties: React.FC = () => {
  const [intellectualProperties, setIntellectualProperties] = useState<
    IntellectualProperty[]
  >([]);
  const [openAddDialog, setOpenAddDialog] = useState(false); // State to manage AddDialog

  // Fetch intellectual properties from the server
  const fetchIntellectualProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/intellectualProperties"
      );
      const data = await response.json();
      console.log("Fetched data:", data); // Inspect the response
      if (Array.isArray(data)) {
        setIntellectualProperties(data);
      } else {
        console.error("Data is not an array:", data);
        setIntellectualProperties([]); // Set to empty array to avoid further issues
      }
    } catch (err) {
      console.error("Failed to fetch intellectual properties", err);
      setIntellectualProperties([]); // Set to empty array on error
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchIntellectualProperties();
  }, []);

  // Refresh the list after update
  const handleUpdateSuccess = () => {
    fetchIntellectualProperties();
  };

  // Refresh the list after creation and close the dialog
  const handleCreateSuccess = () => {
    setOpenAddDialog(false);
    fetchIntellectualProperties();
  };

  // Handle deletion and refresh the list
  const handleDeleteSuccess = () => {
    fetchIntellectualProperties();
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "documentUrl", headerName: "Document URL", flex: 2 },

    {
      field: "actions",
      headerName: " ",
      flex: 2,
      align: "right",
      renderCell: (params: GridRenderCellParams) => (
        <div className="action-icons-container">
          <UpdateDialog id={params.row.id} onSuccess={handleUpdateSuccess} />
          <DeleteDialog id={params.row.id} onSuccess={handleDeleteSuccess} />
        </div>
      ),
    },
  ];

  // Prepare rows for DataGrid with sorting by date
  const rows = intellectualProperties
    .map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      status: item.status,
      documentUrl: item.documentUrl,
      createdAt: item.createdAt, // Ensure this matches your API response
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // Sort by date descending

  return (
    <div className="body-space">
      <div className="space-between-container">
        <div className="title-div">
          <h3 className="title">Intellectual Property List</h3>
          <h3 className="subtitle">
            Manage your intellectual property assets here
          </h3>
        </div>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setOpenAddDialog(true)} // Open the AddDialog on button click
        >
          Add new IP
        </Button>
      </div>
      <hr className="hr" />
      <div className="table">
        <DataGrid
          className="data-grid"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
        />
      </div>
      <AddDialog
        open={openAddDialog} // Pass the open state
        onClose={() => setOpenAddDialog(false)} // Handle close action
        onSuccess={handleCreateSuccess} // Refresh the list and close the dialog on success
      />
    </div>
  );
};

export default GetIntellectualProperties;
