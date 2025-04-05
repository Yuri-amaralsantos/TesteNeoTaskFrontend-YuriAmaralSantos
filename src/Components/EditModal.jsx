import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

export default function EditModal({ editingMusica, newUrl, setNewUrl, onSave, onCancel }) {
    return (
        <Dialog open={Boolean(editingMusica)} onClose={onCancel}>
            <DialogTitle>Editar Música</DialogTitle>
            <form onSubmit={onSave}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nova URL do YouTube"
                        type="url"
                        fullWidth
                        variant="outlined"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary">💾 Salvar</Button>
                    <Button onClick={onCancel} color="secondary">❌ Cancelar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
