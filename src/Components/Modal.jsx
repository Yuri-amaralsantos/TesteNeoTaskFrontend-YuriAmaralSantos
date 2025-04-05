import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ isOpen, onClose, children }) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}
