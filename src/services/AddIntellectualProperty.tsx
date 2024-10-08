import React from "react";
import { Button, TextField, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./style.css";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  backgroundColor: "transparent",
  boxShadow: "none",
}));

interface CreateIntellectualPropertyFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const CreateIntellectualPropertyForm: React.FC<
  CreateIntellectualPropertyFormProps
> = ({ onSuccess, onClose }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;

    const documentUrl = (
      form.elements.namedItem("documentUrl") as HTMLInputElement
    ).value;
    const classification = (
      form.elements.namedItem("classification") as HTMLInputElement
    ).value;
    const keywords = (
      form.elements.namedItem("keywords") as HTMLInputElement
    ).value.split(",");

    const sendData = {
      title,
      description,
      documentUrl,
      classification,
      keywords,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/intellectualProperties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      if (data) {
        console.log("Saved Successfully");
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log("Error saving the intellectual property.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item className="item">Title</Item>
          </Grid>
          <Grid item xs={8}>
            <Item className="item">
              <TextField
                className="textfield"
                variant="outlined"
                type="text"
                name="title"
                required
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
                variant="outlined"
                type="text"
                name="description"
                required
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
                variant="outlined"
                type="url"
                name="documentUrl"
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
                variant="outlined"
                type="text"
                name="classification"
              />
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item className="item">Keywords (comma separated)</Item>
          </Grid>
          <Grid item xs={8}>
            <Item className="item">
              <TextField
                className="textfield"
                variant="outlined"
                type="text"
                name="keywords"
              />
            </Item>
          </Grid>
        </Grid>
        <hr className="hr" />
        <div className="button-div">
          <Button onClick={onClose} className="button-close">
            Close
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateIntellectualPropertyForm;
