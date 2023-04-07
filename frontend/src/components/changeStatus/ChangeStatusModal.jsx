import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
    boxShadow: 24,
    margin: 5,
    p: 4,
 
};
const btn = {
    margin:5
}

const ChangeStatusModal = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Change Status</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Status to
          </Typography>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Pending</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Age"
              //   onChange={handleChange}
            >
              <MenuItem value={"cancel"}>cancel</MenuItem>
              <MenuItem value={"delete"}>delete</MenuItem>
            </Select>
            <Button sx={btn} variant="contained">
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default ChangeStatusModal
