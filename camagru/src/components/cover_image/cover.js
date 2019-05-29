import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const CoverImage = ({ classes }) => {
  return <div minHeightsb="100%" minWidth="100%" className={classes.coverImage} />;
};

CoverImage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoverImage);