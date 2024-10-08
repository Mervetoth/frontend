import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
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
  keywords: string;
  classification: string;
  documentUrl?: string;
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  backgroundColor: "transparent", // This removes the background color
  boxShadow: "none", // This removes any shadow
}));

// Define the props interface for the ViewIntellectualProperties component
interface ViewIntellectualPropertiesProps {
  id: string;
  onClose: () => void; // Changed from onSuccess to onClose for closing the view
}

const ViewIntellectualProperties: React.FC<
  ViewIntellectualPropertiesProps
> = ({ id, onClose }) => {
  const [intellectualProperty, setIntellectualProperty] =
    useState<IntellectualProperty | null>(null);

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

  return (
    <div>
      {intellectualProperty ? (
        <form>
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
                  disabled
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
                  multiline
                  minRows={3}
                  maxRows={8}
                  disabled
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item className="item">Keywords</Item>
            </Grid>
            <Grid item xs={8}>
              <Item className="item">
                <TextField
                  className="textfield"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="keywords"
                  defaultValue={intellectualProperty.keywords}
                  disabled
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Item className="item">Classification</Item>
            </Grid>
            <Grid item xs={8}>
              <Item className="item">
                <TextField
                  className="textfield"
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  name="classification"
                  defaultValue={intellectualProperty.classification || ""}
                  disabled
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
                  disabled
                />
              </Item>
            </Grid>
          </Grid>
          <hr className="hr"></hr>
          <div className="button-div">
            <Button autoFocus onClick={onClose} className="button-close">
              Close
            </Button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewIntellectualProperties;
