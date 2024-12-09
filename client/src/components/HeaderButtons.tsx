import {
  Button,
  Link,
  Popover,
  Stack,
  Typography,
  Paper,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { GitHub, Cloud, Notes, Tune, Close } from "@mui/icons-material";
import { usePopovers } from "../hooks/usePopovers";
import { useState } from "react";
import { Question } from "../types";

interface HeaderButtonsProps {
  textColor: string;
  onCustomQuestionsSubmit?: (questions: Question[]) => void;
}

export const HeaderButtons = ({
  textColor,
  onCustomQuestionsSubmit,
}: HeaderButtonsProps) => {
  const {
    clodAnchorEl,
    instructionsAnchorEl,
    tuneAnchorEl,
    handleClodPopoverOpen,
    handleClodPopoverClose,
    handleInstructionsPopoverOpen,
    handleInstructionsPopoverClose,
    isClodOpen,
    isInstructionsOpen,
    handleTunePopoverOpen,
    handleTunePopoverClose,
    isTuneOpen,
  } = usePopovers();

  const [customQuestions, setCustomQuestions] = useState(
    Array(10).fill({
      question: "",
      correctAnswer: "",
      decoy1: "",
      decoy2: "",
      decoy3: "",
    })
  );

  const updateQuestion = (index: number, field: string, value: string) => {
    const newQuestions = [...customQuestions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setCustomQuestions(newQuestions);
  };

  const handleSubmitQuestions = () => {
    const isValid = customQuestions.every(
      (q) => q.question && q.correctAnswer && q.decoy1 && q.decoy2 && q.decoy3
    );

    if (!isValid) {
      alert("Please fill in all fields for all 10 questions");
      return;
    }

    const formattedQuestions: Question[] = customQuestions.map((q, index) => ({
      id: `custom-${index + 1}`,
      content: q.question,
      answer: q.correctAnswer,
      choices: shuffleArray([q.correctAnswer, q.decoy1, q.decoy2, q.decoy3]),
      column: index,
    }));

    onCustomQuestionsSubmit?.(formattedQuestions);
    handleTunePopoverClose();
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        startIcon={<Notes />}
        onClick={handleInstructionsPopoverOpen}
        sx={{
          textTransform: "none",
          color: textColor,
        }}
      >
        Instructions
      </Button>
      <Popover
        open={isInstructionsOpen}
        anchorEl={instructionsAnchorEl}
        onClose={handleInstructionsPopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ maxWidth: "1300px" }}
      >
        <Typography sx={{ p: 2 }}>
          Welcome to Centaur - The AI Horse Racing Game.
          <ol>
            <li>
              Select different AI models for each horse using the dropdown menus
            </li>
            <li>Click "Begin Race 🏆" to start</li>
            <li>Watch as each AI horse races by answering questions</li>
          </ol>
          Horses advance when they answer correctly, but if they make a mistake,
          they'll take a quick nap (💤) for a few seconds. The first three
          horses to cross the finish line win medals!
        </Typography>
      </Popover>
      <Button
        startIcon={<GitHub />}
        href="https://github.com/lod-io/centaur"
        target="_blank"
        sx={{
          textTransform: "none",
          color: textColor,
        }}
      >
        GitHub
      </Button>
      <Button
        startIcon={<Cloud />}
        onClick={handleClodPopoverOpen}
        sx={{
          textTransform: "none",
          color: textColor,
        }}
      >
        CLōD
      </Button>
      <Popover
        open={isClodOpen}
        anchorEl={clodAnchorEl}
        onClose={handleClodPopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ maxWidth: "1300px" }}
      >
        <Typography sx={{ p: 2 }}>
          CLōD is the primary technology that powers Centaur. It provides a
          unified LLM API that enables each horse to leverage different AI
          models for racing, ensuring a dynamic and competitive experience.
          <br />
          <br />
          Learn more at{" "}
          <Link
            href="https://clod.io"
            target="_blank"
            rel="noopener"
            color={textColor}
          >
            clod.io
          </Link>
          .
        </Typography>
      </Popover>
      <Button
        startIcon={<Tune />}
        onClick={handleTunePopoverOpen}
        sx={{
          textTransform: "none",
          color: textColor,
        }}
      >
        Customize
      </Button>
      <Popover
        open={isTuneOpen}
        anchorEl={tuneAnchorEl}
        onClose={handleTunePopoverClose}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{
          maxWidth: "1300px",
        }}
      >
        <Paper
          sx={{
            p: 3,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleTunePopoverClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Custom Questions 🎨
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add 10 custom questions! Each question needs one correct answer and
            three decoy answers.
          </Typography>

          {customQuestions.map((q, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`Question ${index + 1}`}
                    value={q.question}
                    onChange={(e) =>
                      updateQuestion(index, "question", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Correct Answer"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(index, "correctAnswer", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Decoy Answer 1"
                    value={q.decoy1}
                    onChange={(e) =>
                      updateQuestion(index, "decoy1", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Decoy Answer 2"
                    value={q.decoy2}
                    onChange={(e) =>
                      updateQuestion(index, "decoy2", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Decoy Answer 3"
                    value={q.decoy3}
                    onChange={(e) =>
                      updateQuestion(index, "decoy3", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmitQuestions}
            sx={{ mt: 1, textTransform: "none", maxWidth: "200px" }}
            disabled={customQuestions.some(
              (q) =>
                !q.question ||
                !q.correctAnswer ||
                !q.decoy1 ||
                !q.decoy2 ||
                !q.decoy3
            )}
          >
            Use These Questions
          </Button>
        </Paper>
      </Popover>
    </Stack>
  );
};
