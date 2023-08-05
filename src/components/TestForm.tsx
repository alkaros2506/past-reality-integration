"use client";

import { useEffect, useState } from "react";
import { cloneDeep, sortedUniq } from "lodash";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
} from "@mui/material";
import React from "react";

const scoresFromParams = (params: URLSearchParams | undefined) => {
  if (!params) {
    return new Array(50).fill(0);
  }

  const encryptedScores = params.get("scx");
  if (!encryptedScores) {
    return new Array(50).fill(0);
  }
  return Buffer.from(encryptedScores).toString("utf-8").split(",");
};

const scoresToParams = (scores: string[]) => {
  const encryptedScores = Buffer.from(scores.join(","), "utf-8").toString();
  // Add them to the URL
  if (typeof window !== "undefined") {
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?scx=${encryptedScores}`
    );
  }

  return new URLSearchParams({ scx: encryptedScores });
};

const getQueryParams = () => {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
};

const statements = [
  "I often find myself trying to accomplish things that somehow don’t seem to succeed.",
  "My friends describe me as a nervous type of person, afraid of making friends.",
  "In the beginning stage of the projects I think up, I usually get a lot of energy. It can feel as if my life has a purpose again.",
  "I feel a strong need for closeness in my relationships.",
  "I need a lot of attention from my partner in regard to my emotional life.",
  "My colleagues know they can always count on me. If they need help with anything at all, I’ll be there to do it for them unless I am out of my depth.",
  "I get really tense about being able to perform well enough.",
  "No matter how often I fail, I don’t give up easily. I usually feel it’s worth it to give something another try.",
  "I usually feel I can still do better. I consider myself to be a perfectionist.",
  "It isn’t very difficult for me to admit to and feel emotional pain.",
  "A lot of people cannot be trusted.",
  "My friends tell me I impress them, sometimes even intimidates them.",
  "I usually feel I’m controlling the situation.",
  "Sometimes it can give me a good feeling to tell people ‘the truth’, even in an angry way.",
  "If my partner doesn’t live up to our agreements, I will certainly confront him/her.",
  "I take on a lot of responsibility, but I really dislike it when others don’t take theirs. I resent having to help them out because they screwed up.",
  "I generally feel quite a bit more competent than others.",
  "I get irritated easily when people screw up.",
  "People tell me that I can give them the feeling of being treated like a child.",
  "I don’t feel many unpleasant emotions. Just anger and irritation on a regular basis.",
  "Even though I haven’t accomplished much, I do feel successful in life.",
  "Everybody likes me, but I also hear quite often that they have a feeling that they don’t really know me.",
  "My life is usually fine. Not great, but OK.",
  "I prefer spending time by myself.",
  "I don’t seem to have much need for intense emotional stuff; I would rather be doing things.",
  "I help others out when they ask me; I don’t feel taken advantage of easily.",
  "I don’t get upset easily. I’m usually even-tempered.",
  "I don’t need much.",
  "I don’t have (m)any close friends.",
  "It is hard for me to get in touch with my feelings. I usually feel just OK.",
  "I usually feel inferior.",
  "Deep down I have this feeling that I’m just a bad person.",
  "No matter how successful I am, I still basically feel worthless.",
  "I often feel weighed down by the sense that I am carrying too much responsibility.",
  "To be honest, I always feel that when people get to know me, they won’t like me. I’m always surprised to find out that they do like me.",
  "Somehow I don’t feel (worthy to be) loved, not really.",
  "I have a lot of anxiety and fear inside me.",
  "I’m afraid that if I go into therapy, the therapist will find out that I’m basically no good as a person and let me know.",
  "I often feel that when things go wrong, it is my fault.",
  "No matter how hard I try, it will just never be good enough.",
  "I am afraid of speaking in front of a group.",
  "I am hesitant to travel by myself.",
  "Sometimes I have sudden heart palpitations.",
  "I often experience cold sweats.",
  "I quite easily back off when confronted with loud and assertive people. They intimidate me.",
  "I have a phobia.",
  "I sometimes suffer from panic attacks.",
  "I quite often experience trembling sensations.",
  "My breathing easily gets out of control.",
  "I often experience diarrhea.",
];

export type TestFormProps = {
  onFormChange?: (scores: number[]) => void;
};

const TestForm = (props: TestFormProps) => {
  const { onFormChange } = props;
  const [searchParams, setSearchParams] = useState<
    URLSearchParams | undefined
  >();
  const [scores, setScores] = useState<string[]>(new Array(50).fill("0"));

  useEffect(() => {
    setSearchParams(getQueryParams());
  }, []);

  useEffect(() => {
    const newScores = scoresFromParams(searchParams);
    setScores(newScores);
    const defenseScores = calculateDefenseScores();
    onFormChange && onFormChange(defenseScores);
  }, [searchParams, onFormChange]);

  const calculateDefenseScores = () => {
    // Calculate defense profile based on scores
    const scoreRanges = [
      scores.slice(0, 10),
      scores.slice(10, 20),
      scores.slice(20, 30),
      scores.slice(30, 40),
      scores.slice(40, 50),
    ];

    return scoreRanges.map(
      (range) => range.reduce((sum, score) => sum + parseInt(score), 0) / 10
    );
  };

  const handleScoreChange = (index: number, value: string) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
    setSearchParams(scoresToParams(newScores));

    const defenseScores = calculateDefenseScores();
    onFormChange && onFormChange(defenseScores);
  };

  const renderStatement = (statement: string, index: number) => (
    <div key={`list-item-${index}`}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Typography variant="h4" gutterBottom>
            {scores[index]}
          </Typography>
        </ListItemAvatar>
        <ListItemText
          primary={statement}
          sx={{ width: "100%", breakAfter: "always" }}
          secondary={
            <React.Fragment>
              <Slider
                value={parseInt(scores[index] || "0")}
                onChange={(_e, value) =>
                  handleScoreChange(index, value.toString())
                }
                min={1}
                max={10}
                size="small"
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List>{statements.map(renderStatement)}</List>
      </Grid>
    </Grid>
  );
};

export default TestForm;
