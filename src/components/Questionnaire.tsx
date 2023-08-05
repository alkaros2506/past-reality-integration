"use client";

import React from "react";
import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import TestForm from "@/components/TestForm";
import QuestionnaireScores from "./QuestionnaireScores";

export default function Questionnaire() {
  const [scores, setScores] = React.useState<number[]>([0, 0, 0, 0, 0]);

  const handleScoresChange = (newScores: number[]) => {
    setScores(newScores);
  };

  return (
    <Container maxWidth="lg">
      <Grid container gap={0}>
        <Grid item xs={3} position="fixed" sx={{ml: 0, mt: 2}}>
          <QuestionnaireScores scores={scores} />
        </Grid>
        <Grid item xs={9} sx={{ml: 'calc(25%)'}}>
          <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
            <Grid container gap={3} sx={{ justifyContent: "center" }}>
              <Grid item xs={12}>
                <Typography variant="h5">Description</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  The following test helps to determine what your preferred
                  defense mechanism is. Everyone of us engages in all five
                  defenses, but there is a difference in the frequency with
                  which we tend to employ either one or the other defense
                  mechanism. The following test can help you take a closer look
                  at your defenses so you can learn what your specific defense
                  profile is.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  On a scale of 1 to 10, rate the degree to which you think each
                  statement describes you. 1 indicates not at all, 10 indicates
                  completely (if you want you can write down the numbers that
                  apply to you in the boxes). You can also take the test on the
                  PRI website (www.pastrealiyintegration.com).
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Some statements are made up of two parts. In that case be sure
                  to rate the degree to which the entire statement applies to
                  you. If one part does apply while the other doesn’t, then the
                  entire statement doesn’t really apply. In your own interests,
                  be as honest as you can. Remember you don’t have to talk to
                  anyone else about your answers; you don’t even have to tell
                  anyone about it. It is difficult to be honest about defenses
                  because they are not our most flattering side.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  So search deep inside yourself for the true answer, even when
                  you would rather not admit it, even to yourself. Remember you
                  are now taking important steps for your own good. If you
                  nevertheless find that you have an irresistible urge to make
                  your score look (just a little bit) better than is justified,
                  remember that this signifies a defense at work
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Stack sx={{ mt: 2 }}>
            <TestForm onFormChange={handleScoresChange} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
