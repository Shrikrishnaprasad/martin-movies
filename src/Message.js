import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Context } from "./Provider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const { isAlert, setIsAlert, isRemove } = React.useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlert(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={isAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isRemove ? "info" : "success"}
          sx={{ width: "100%" }}
        >
          Your Movie is {isRemove ? "removed from" : "added to"} Watched List!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
