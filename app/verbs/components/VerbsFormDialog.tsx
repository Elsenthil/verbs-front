import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function VerbsFormDialog({ onSubmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"X-CSRF-Token": csrfToken,
      },
      body: data,
      credentials: "include",
    });
    return response.json();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    postData("http://localhost:8765/apis/addVerb", formData.entries()).then(
      (data) => {
        console.log(data);
        console.log(formData);
        console.log(formJson);
        onSubmit(formJson); // Appel du callback passé en prop avec les données du formulaire
      }
    );

    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Ajouter un verbe irrégulier
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Ajouter un verbe irrégulier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="translation"
            name="translation"
            label="Traduction"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="infinitive"
            name="infinitive"
            label="Infinitif"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="preterit"
            name="preterit"
            label="Prétérit"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="past_participle"
            name="past_participle"
            label="Participe passé"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
