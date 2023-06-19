"use client"; // This is a client component 👈🏽

import TestForm from "@/components/TestForm";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom>
        Personal Defense Profile Test
      </Typography>
      <TestForm />
    </Container>
  );
}
