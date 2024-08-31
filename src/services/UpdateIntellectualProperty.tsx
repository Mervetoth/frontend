// UpdateIntellectualProperties.tsx
import { Button } from "@mui/material";
import React, { useEffect, useState, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./style.css";

// Define the interface for the IntellectualProperty
interface IntellectualProperty {
  _id: string;
  title: string;
  description: string;
  status: string;
  documentUrl?: string;
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  backgroundColor: "transparent", // This removes the background color
  boxShadow: "none", // This removes any shadow
}));

// Define the props interface for the UpdateIntellectualProperties component
interface UpdateIntellectualPropertiesProps {
  id: string;
  onSuccess: () => void; // New prop to handle successful update
}

const UpdateIntellectualProperties: React.FC<
  UpdateIntellectualPropertiesProps
> = ({ id, onSuccess }) => {
  const [intellectualProperty, setIntellectualProperty] =
    useState<IntellectualProperty | null>(null);
  const [open, setOpen] = useState(false); // State variable for managing the dialog open state

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/intellectualProperties/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setIntellectualProperty(data);
      } catch (err) {
        console.error("Failed to fetch intellectual property", err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!intellectualProperty || !id) return;

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const status = (form.elements.namedItem("status") as HTMLInputElement)
      .value;
    const documentUrl = (
      form.elements.namedItem("documentUrl") as HTMLInputElement
    ).value;

    try {
      const response = await fetch(
        `http://localhost:8080/api/intellectualProperties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, status, documentUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update intellectual property");
      }

      const result = await response.json();
      console.log("Update Successful");
      setIntellectualProperty(result);
      onSuccess(); // Call the onSuccess callback to close the dialog and trigger refresh
    } catch (err) {
      console.error("Failed to update intellectual property", err);
    }
  };

  return (
    <div>
      {intellectualProperty ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item className="item">Title</Item>
            </Grid>
            <Grid item xs={8}>
              <Item className="item">
                <TextField
                  className="textfield"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="title"
                  defaultValue={intellectualProperty.title}
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item className="item">Description</Item>
            </Grid>
            <Grid item xs={8}>
              <Item className="item">
                <TextField
                  className="textfield"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="description"
                  defaultValue={intellectualProperty.description}
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item className="item">Status</Item>
            </Grid>
            <Grid item xs={8}>
              <Item className="item">
                <TextField
                  className="textfield"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="status"
                  defaultValue={intellectualProperty.status}
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item className="item">Document URL</Item>
            </Grid>
            <Grid item xs={8}>
              <Item className="item">
                <TextField
                  className="textfield"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="documentUrl"
                  defaultValue={intellectualProperty.documentUrl || ""}
                />
              </Item>
            </Grid>
          </Grid>{" "}
          <hr className="hr"></hr>
          <div className="button-div">
            {" "}
            <Button autoFocus onClick={handleClose} className="button-close">
              Close
            </Button>
            <Button type="submit" value="Update" variant="contained">
              Update
            </Button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateIntellectualProperties;
