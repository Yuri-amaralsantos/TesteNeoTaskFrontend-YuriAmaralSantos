import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function MusicCard({
  musica,
  index,
  role,
  onEdit,
  onUpdateStatus,
  onDelete,
  formatarVisualizacoes,
  minor = false,
}) {
  return (
    <Card
      sx={{
        width: minor ? 700 : 1000,
        display: "flex",
        alignItems: "center",
        p: 2,
        opacity: minor ? 0.8 : 1,
        transform: minor ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.3s, opacity 0.3s",
      }}
    >
      <Typography variant={minor ? "body1" : "h6"} sx={{ mr: 2, minWidth: 30 }}>
        {index + 1}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant={minor ? "h6" : "h5"}>{musica.titulo}</Typography>
          <Typography variant="body2">
            Visualizações: {formatarVisualizacoes(musica.visualizacoes)}
          </Typography>
          <Typography variant="body2">Status: {musica.status}</Typography>
        </CardContent>
        {role === "admin" && (
          <Box sx={{ mt: 1 }}>
            <Button size="small" onClick={() => onEdit(musica)}>
              ✏️ Editar
            </Button>
            {musica.status === "pendente" && (
              <>
                <Button
                  size="small"
                  onClick={() => onUpdateStatus(musica.id, "aprovado")}
                >
                  ✅ Aprovar
                </Button>
                <Button
                  size="small"
                  onClick={() => onUpdateStatus(musica.id, "pendente")}
                >
                  ❌ Reprovar
                </Button>
              </>
            )}
            {musica.status === "aprovado" && (
              <Button size="small" onClick={() => onDelete(musica.id)}>
                🗑️ Deletar
              </Button>
            )}
          </Box>
        )}
      </Box>
      <CardMedia
        component="img"
        sx={{
          width: minor ? 70 : 100,
          height: minor ? 70 : 100,
          objectFit: "cover",
          ml: 2,
          flexShrink: 0,
        }}
        image={musica.thumb}
        alt={`Thumbnail ${musica.titulo}`}
      />
    </Card>
  );
}
