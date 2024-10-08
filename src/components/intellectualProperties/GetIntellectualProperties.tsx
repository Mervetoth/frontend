import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IntellectualProperty from "../../types/intellectualProperties.types";
import { fetchIntellectualProperties } from "../../services/intellectualPropertyService";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import UpdateDialog from "../dialogs/UpdateDialog";
import DeleteDialog from "../dialogs/DeleteDialog";
import AddDialog from "../dialogs/AddDialog";
import ViewDialog from "../dialogs/viewDialog";
import "./style.css";

const GetIntellectualProperties: React.FC = () => {
  const [intellectualProperties, setIntellectualProperties] = useState<
    IntellectualProperty[]
  >([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<IntellectualProperty | null>(null);

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

  const handleUpdateSuccess = () => loadIntellectualProperties();
  const handleCreateSuccess = () => {
    setOpenAddDialog(false);
    loadIntellectualProperties();
  };
  const handleDeleteSuccess = () => loadIntellectualProperties();

  const handleRowClick = (params: any) => {
    setSelectedProperty(params.row);
    setOpenViewDialog(true);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1.5 },
    { field: "description", headerName: "Description", flex: 4 },
    { field: "classification", headerName: "Classification", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "",
      flex: 2,
      align: "right",
      renderCell: (params: GridRenderCellParams) => (
        <div className="action-icons-container">
          <UpdateDialog id={params.row.id} onSuccess={handleUpdateSuccess} />
          <DeleteDialog
            id={params.row.id}
            title={params.row.title}
            onSuccess={handleDeleteSuccess}
          />
        </div>
      ),
    },
  ];

  const rows = intellectualProperties
    .map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      status: item.status,
      keywords: item.keywords,
      classification: item.classification,
      createdAt: item.createdAt,
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

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
          onClick={() => setOpenAddDialog(true)}
        >
          Register IP
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
          onRowClick={handleRowClick} // Handle row clicks
        />
      </div>
      <AddDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSuccess={handleCreateSuccess}
      />
      <ViewDialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        intellectualProperty={selectedProperty}
      />
    </div>
  );
};

export default GetIntellectualProperties;
