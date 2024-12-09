import {
  Box,
  Paper,
  Stack,
  styled,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Answer, Question, Horse } from "../types";
import { useEffect, useRef } from "react";

const QAContainerStyled = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  maxHeight: "80vh",
  display: "flex",
  flexDirection: "column",
}));

const QAHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: "bold",
  fontSize: "1.2rem",
  color: theme.palette.text.secondary,
}));

const ScrollContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: "auto",
  flex: 1,
}));

interface QAContainerProps {
  questions: Question[];
  answers: Answer[];
  horses: Horse[];
}

const QAContainer: React.FC<QAContainerProps> = ({
  questions,
  answers,
  horses,
}) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    if (scrollRef.current && answers.length > 0 && !isSmallScreen) {
      setTimeout(() => {
        const latestAnswer = answers.reduce((latest, current) => {
          const currentQuestionIndex = questions.findIndex(
            (q) => q.id === current.questionId
          );
          const latestQuestionIndex = questions.findIndex(
            (q) => q.id === latest.questionId
          );
          return currentQuestionIndex > latestQuestionIndex ? current : latest;
        }, answers[0]);

        const questionElement = scrollRef.current?.querySelector(
          `[data-question-id="${latestAnswer.questionId}"]`
        );

        if (questionElement) {
          questionElement.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 100);
    }
  }, [answers, questions]);

  return (
    <QAContainerStyled elevation={3}>
      <QAHeader>Score Sheet</QAHeader>
      <ScrollContent ref={scrollRef}>
        <Stack spacing={3} divider={<Divider flexItem />} sx={{ padding: 1 }}>
          {questions.map((question, index) => {
            const questionAnswers = answers.filter(
              (a) => a.questionId === question.id
            );
            return (
              <Box key={question.id} data-question-id={question.id}>
                <Box
                  sx={{
                    fontWeight: "semibold",
                    color: "text.secondary",
                    fontSize: "0.8rem",
                    mb: 1,
                  }}
                >
                  Q{index + 1}: {question.content}
                </Box>
                <Box
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    mb: 1,
                    fontSize: "0.8rem",
                  }}
                >
                  A{index + 1}: {question.answer}
                </Box>
                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{ pl: 2, fontSize: "0.8rem" }}
                >
                  {questionAnswers.length > 0 ? (
                    questionAnswers.map((answer) => (
                      <Box key={answer.id}>
                        {answer.status === "approved" ? "✅ " : "❌ "}
                        {horses.find((horse) => horse.id === answer.horseId)
                          ?.emoji || "Unknown Horse"}
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ color: "text.secondary" }}>No answers yet.</Box>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </ScrollContent>
    </QAContainerStyled>
  );
};

export default QAContainer;
