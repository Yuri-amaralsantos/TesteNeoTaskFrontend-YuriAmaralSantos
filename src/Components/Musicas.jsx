import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  Grid,
  Paper,
} from "@mui/material";
import {
  getMusicas,
  addMusica,
  deleteMusica,
  updateMusicaStatus,
  updateMusica,
} from "../api";
import MusicCard from "./MusicCard";
import EditModal from "./EditModal";

export default function Musicas() {
  const [message, setMessage] = useState(null);
  const [musicas, setMusicas] = useState([]);
  const [url, setUrl] = useState("");
  const [editingMusica, setEditingMusica] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    getMusicas()
      .then((musicasData) => {
        if (role !== "admin") {
          musicasData = musicasData.filter(
            (musica) => musica.status === "aprovado"
          );
        }
        setMusicas(musicasData);
      })
      .catch((err) => console.error("Erro ao carregar músicas:", err));
  }, [role]);

  const handleAddMusic = async (event) => {
    event.preventDefault();
    if (!url.trim()) {
      setMessage({ text: "Insira um link do YouTube válido.", type: "error" });
      return;
    }

    try {
      await addMusica(url);
      setMessage({ text: "Música adicionada com sucesso!", type: "success" });
      window.location.reload();
    } catch (error) {
      setMessage({ text: "Erro ao adicionar música.", type: "error" });
    }
  };

  const handleDeleteMusic = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta música?")) return;

    try {
      await deleteMusica(id);
      setMusicas((prev) => prev.filter((musica) => musica.id !== id));
      setMessage({ text: "Música removida com sucesso!", type: "success" });
    } catch (error) {
      setMessage({ text: "Erro ao remover música.", type: "error" });
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateMusicaStatus(id, status);
      window.location.reload();
    } catch (error) {
      setMessage({ text: "Erro ao atualizar status.", type: "error" });
    }
  };

  const handleEditClick = (musica) => {
    setEditingMusica(musica);
    setNewUrl(musica.url);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    try {
      const updatedMusica = await updateMusica(editingMusica.id, newUrl);
      setMessage({ text: "Música atualizada com sucesso!", type: "success" });

      setMusicas((prev) =>
        prev.map((musica) =>
          musica.id === editingMusica.id ? updatedMusica.musica : musica
        )
      );

      setEditingMusica(null);
    } catch (error) {
      setMessage({ text: "Erro ao atualizar música.", type: "error" });
    }
  };

  function formatarVisualizacoes(visualizacoes) {
    if (typeof visualizacoes !== "number") return "0";
    if (visualizacoes >= 1_000_000)
      return `${(visualizacoes / 1_000_000).toFixed(1)}M`;
    if (visualizacoes >= 1_000) return `${(visualizacoes / 1_000).toFixed(1)}K`;
    return visualizacoes.toLocaleString("pt-BR");
  }

  const top5 = musicas.slice(0, 5);
  const others = musicas.slice(5);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Submit Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Sugerir Nova Música
        </Typography>
        <Box
          component="form"
          onSubmit={handleAddMusic}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <TextField
            type="url"
            placeholder="Cole o link do YouTube"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
          <Button variant="contained" type="submit">
            Adicionar
          </Button>
        </Box>
        {message && (
          <Alert severity={message.type} sx={{ mt: 2 }}>
            {message.text}
          </Alert>
        )}
      </Paper>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Ranking Atual
      </Typography>

      {musicas.length === 0 ? (
        <Box sx={{ textAlign: "center", p: 4, border: "1px dashed grey" }}>
          <Typography variant="h3">🎵</Typography>
          <Typography variant="h6">Nenhuma música cadastrada ainda</Typography>
          <Typography variant="body2">
            Seja o primeiro a sugerir uma música usando o formulário acima!
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Top 5
          </Typography>
          <Grid container spacing={2}>
            {top5.map((item, index) => (
              <Grid item xs={12} key={item.id}>
                <Box display="flex" justifyContent="center">
                  <MusicCard
                    musica={item}
                    index={index}
                    role={role}
                    onEdit={handleEditClick}
                    onUpdateStatus={handleUpdateStatus}
                    onDelete={handleDeleteMusic}
                    formatarVisualizacoes={formatarVisualizacoes}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Outras Músicas
          </Typography>

          {others.map((item, index) => (
            <Grid item xs={12} key={item.id}>
              <Box display="flex" justifyContent="center">
                <MusicCard
                  musica={item}
                  index={index + 5}
                  role={role}
                  onEdit={handleEditClick}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeleteMusic}
                  formatarVisualizacoes={formatarVisualizacoes}
                  minor={true}
                />
              </Box>
            </Grid>
          ))}
        </>
      )}

      {/* Edit Modal */}
      {editingMusica && (
        <EditModal
          editingMusica={editingMusica}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
          onSave={handleSaveEdit}
          onCancel={() => setEditingMusica(null)}
        />
      )}
    </Container>
  );
}
