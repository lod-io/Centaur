import { Box, Paper, Stack, styled, Divider } from "@mui/material";
import { Answer, Question, Horse } from "../types";

const QAContainerStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  maxHeight: "calc(100vh - (2 * 30px))",
  overflowY: "auto",
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
    "&:hover": {
      background: "#555",
    },
  },
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
}) => (
  <QAContainerStyled elevation={3}>
    <Stack spacing={3} divider={<Divider flexItem />} sx={{ padding: 1 }}>
      {questions.map((question, index) => {
        const questionAnswers = answers.filter(
          (a) => a.questionId === question.id
        );
        return (
          <Box key={question.id}>
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
            <Stack direction={"row"} spacing={2}>
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
  </QAContainerStyled>
);

export default QAContainer;
