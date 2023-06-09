import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import StaffDialogForm from "./StaffDialogForm";
import { AuthContext } from "../../AuthContext";

const StaffDetails = ({
  open,
  handleClose,
  staff,
  handleDelete,
  handleUpdateStaff,
  schools,
}) => {
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useContext(AuthContext);


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (data) => {
    handleUpdateStaff({ ...staff, ...data });
    handleClose();
  };

  const handleDeleteClick = () => {
    handleDelete(staff.id);
    handleClose();
  };

  return (
    <>
      {editMode ? (
        <StaffDialogForm
          open={open}
          handleClose={handleClose}
          onSubmit={handleFormSubmit}
          staff={staff}
          schools={schools}  
        />
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography variant="h5">{staff.name}</Typography>
            <Typography variant="subtitle1">{staff.address}</Typography>
            <Typography variant="subtitle1">{staff.phoneNumber}</Typography>
            <Typography variant="subtitle1">{staff.email}</Typography>
            <Typography variant="subtitle1">{staff.school}</Typography>
            <Typography variant="subtitle1">
              Contact: {staff.contactPerson}
            </Typography>
            <Typography variant="subtitle1">Notes: {staff.notes}</Typography>
          </DialogContent>
          <DialogActions>
          {currentUser.role !== "staff" && (
            <>
            <Button onClick={handleEditClick} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              startIcon={<DeleteOutlineIcon />}
            >
              Delete
            </Button>
            </>
          )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default StaffDetails;
