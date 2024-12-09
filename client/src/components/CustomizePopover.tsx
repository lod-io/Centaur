import {
  Popover,
  Typography,
  Paper,
  TextField,
  Grid,
  IconButton,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Slider,
} from "@mui/material";
import { Close, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { Question } from "../types";

interface CustomizePopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onCustomQuestionsSubmit?: (questions: Question[]) => void;
  onPenaltyTimeChange?: (seconds: number) => void;
}

export const CustomizePopover = ({
  open,
  anchorEl,
  onClose,
  onCustomQuestionsSubmit,
  onPenaltyTimeChange,
}: CustomizePopoverProps) => {
  const theme = useTheme();

  const [customQuestions, setCustomQuestions] = useState(
    Array(10).fill({
      question: "",
      correctAnswer: "",
      decoy1: "",
      decoy2: "",
      decoy3: "",
    })
  );

  const [penaltyTime, setPenaltyTime] = useState(3);

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
    onClose();
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handlePenaltyTimeChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    const value = newValue as number;
    setPenaltyTime(value);
    onPenaltyTimeChange?.(value);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: window.innerWidth / 2 }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        "& .MuiPopover-paper": {
          minWidth: "500px",
        },
      }}
    >
      <Paper
        sx={{
          p: 3,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          position: "relative",
          width: "100%",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Customize Game Settings ⚙️
        </Typography>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="custom-questions-content"
            id="custom-questions-header"
          >
            <Typography variant="subtitle1">Questions 📝</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add 10 custom questions! Each question needs one correct answer
              and three decoy answers.
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
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="penalty-time-content"
            id="penalty-time-header"
          >
            <Typography variant="subtitle1">Penalty Time ⏰</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Set how long horses must wait after an incorrect answer (in
              seconds)
            </Typography>
            <Slider
              value={penaltyTime}
              onChange={handlePenaltyTimeChange}
              aria-labelledby="penalty-time-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              sx={{ maxWidth: "300px" }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Current penalty: {penaltyTime} seconds
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* You can add more Accordion sections here for other customization options */}
      </Paper>
    </Popover>
  );
};
