import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { cloneDeep, orderBy, sortBy } from "lodash";
import React from "react";

export type QuestionnaireScoresProps = {
  scores: number[];
};

const defenseLabels = [
  "False Hope",
  "False Power",
  "Denial of Needs",
  "Primary Defense",
  "Fear",
];

export default function QuestionnaireScores(props: QuestionnaireScoresProps) {
  const scores = orderBy(
    props.scores.map((score, scoreIndex) => ({
      score,
      label: defenseLabels[scoreIndex],
    })),
    "score",
    "desc"
  );

  // Determine defense labels

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Defense</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map(({ score, label }, scoreIndex) => (
            <TableRow key={`defenense-score-${scoreIndex}`}>
              <TableCell>{label}</TableCell>
              <TableCell>{score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
