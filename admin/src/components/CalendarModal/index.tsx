import React from "react";
import { Box, Modal } from "@mui/material";
import MyCalendar from "./MyCalendar";

const CalendarModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSelect: (start: Date, end: Date) => void;
}> = ({ open, onClose, onSelect }) => {
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    onSelect(start, end);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          my: 10,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "80vh",
          overflowY: "auto",
          margin: "auto",
          outline: "none",
          borderRadius: "8px",
        }}
      >
        <MyCalendar onSelectSlot={handleSelectSlot} />
      </Box>
    </Modal>
  );
};

export default CalendarModal;
