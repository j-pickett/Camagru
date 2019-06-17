import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    maxWidth: 200
  }
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Input></Input>
      </Paper>
    </div>
  );
}
