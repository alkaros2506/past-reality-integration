import React, { lazy } from "react";
import Questionnaire from "@/components/Questionnaire";
import { AppBar, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Grid container direction="row">
          <Grid item>
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              sx={{ paddingTop: "10px", paddingLeft: "20px" }}
            >
              PRI
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              align="left"
              gutterBottom
              sx={{ paddingTop: "15px", paddingLeft: "20px" }}
            >
              Past Reality Integration
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Questionnaire />
    </>
  );
}
