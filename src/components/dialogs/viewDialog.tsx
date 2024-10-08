import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IntellectualProperty from "../../types/intellectualProperties.types"; // Adjust the path as needed
import "./style.css"; // Import the CSS file

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  backgroundColor: "transparent",
  boxShadow: "none",
}));

interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  intellectualProperty: IntellectualProperty | null;
}

const ViewDialog: React.FC<ViewDialogProps> = ({
  open,
  onClose,
  intellectualProperty,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Intellectual Property Details</DialogTitle>
      <DialogContent>
        {intellectualProperty ? (
          <form>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item>Title</Item>
              </Grid>
              <Grid item xs={9}>
                <Item>
                  <TextField
                    className="text-field" // Apply CSS class
                    variant="outlined"
                    value={intellectualProperty.title}
                    fullWidth
                    disabled
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item>Description</Item>
              </Grid>
              <Grid item xs={9}>
                <Item>
                  <TextField
                    className="text-field" // Apply CSS class
                    variant="outlined"
                    value={intellectualProperty.description}
                    fullWidth
                    multiline
                    rows={3}
                    disabled
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item>Keywords</Item>
              </Grid>
              <Grid item xs={9}>
                <Item>
                  <TextField
                    className="text-field" // Apply CSS class
                    variant="outlined"
                    value={intellectualProperty.keywords}
                    fullWidth
                    disabled
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item>Classification</Item>
              </Grid>
              <Grid item xs={9}>
                <Item>
                  <TextField
                    className="text-field" // Apply CSS class
                    variant="outlined"
                    value={intellectualProperty.classification}
                    fullWidth
                    disabled
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item>Document URL</Item>
              </Grid>
              <Grid item xs={9}>
                <Item>
                  <TextField
                    className="text-field" // Apply CSS class
                    variant="outlined"
                    value={intellectualProperty.documentUrl || ""}
                    fullWidth
                    disabled
                  />
                </Item>
              </Grid>
            </Grid>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDialog;
