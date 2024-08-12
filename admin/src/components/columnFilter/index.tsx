import React, { useState } from "react";
import { IconButton, InputBase, Paper, Popover, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface ColumnFilterProps {
  columnKey: string;
  onFilterChange: (key: string, value: string) => void;
  onResetFilter: (key: string) => void; // Add this prop
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({
  columnKey,
  onFilterChange,
  onResetFilter,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleApplyFilter = () => {
    onFilterChange(columnKey, filterValue);
    setAnchorEl(null); // Close the dropdown after applying the filter
  };

  const handleResetFilter = () => {
    setFilterValue("");
    onResetFilter(columnKey); // Notify parent to remove the filter
    setAnchorEl(null); // Close the dropdown after resetting
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <InputBase
            placeholder={`Filter ${columnKey}`}
            value={filterValue}
            onChange={handleInputChange}
            sx={{ mb: 1 }}
          />
          <Button variant="contained" color="success" onClick={handleApplyFilter}>
            Apply filter
          </Button>
          <Button variant="outlined" onClick={handleResetFilter} sx={{ mt: 1 }}>
            Reset
          </Button>
        </Paper>
      </Popover>
    </div>
  );
};

export default ColumnFilter;
