import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

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

const ChangeStatusModal = ({taskId}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState();
  
  const handleChangeSubmit = async (e) => {
    e.preventDefault();
    if (!status) {
      toast("fill status field")
    }
    const user = JSON.parse(localStorage.getItem("todoUser"));
    
   
    try {
         const config = {
           headers: {
             "Content-type": "application/json",
             Authorization: `Bearer ${user.token}`,
           },
      };
       const { data } = await axios.put(
        ` http://localhost:5000/api/task/updateStatus/${taskId}`,
         {
           status,
         },
         config
       );
      if (data) {
        window.location.reload();
      }
    } catch (error) {
        toast(error.response.data.message);
    }
  }
  

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
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={"cancelled"}>cancelled</MenuItem>
              <MenuItem value={"completed"}>completed</MenuItem>
            </Select>
            <Button
              type="submit"
              onClick={handleChangeSubmit}
              sx={btn}
              variant="contained"
            >
              Submit
            </Button>
            <ToastContainer />
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default ChangeStatusModal
