import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddProductForm from "./AddProductForm";

export default function ResponsiveDialog({ category, addCategory }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //The Pop up is open when the setOpen is true else it is close
  const handleClickOpen = () => setOpen(true);
  //The Pop up is close when the setOpen is false else it is open
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* The add Product to Product category  button*/}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddShoppingCartIcon /> {!addCategory ? "Add Products" : "Add Category"}
      </Button>
      {/* The Pop up that enclose the Add Product to category form*/}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Adding Products to Store"}
        </DialogTitle>
        <DialogContent>
          {/* if add category is passed as props to this component only add category else render add product */}
          {addCategory ? (
            <AddProductForm category={category} addCategory />
          ) : (
            <AddProductForm category={category} />
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button> */}
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
