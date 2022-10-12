import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../common/Title";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

export default function LocationCount(data) {
  let today = new Date();

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 500,
        }}
      >
        <React.Fragment>
          <Title>Number Of Office's</Title>
          <Typography component="p" variant="h4">
            {data.data.length}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            as of {today.toLocaleDateString()}
          </Typography>
        </React.Fragment>
      </Paper>
    </Grid>
  );
}
