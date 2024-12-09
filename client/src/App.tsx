import { useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Answer,
  GameState,
  Horse,
  MODEL_OPTIONS,
  Question,
  AttemptedQuestion,
} from "./types";
import RaceTrack from "./components/RaceTrack";
import HorseSelector from "./components/HorseSelector";
import QAContainer from "./components/QAContainer";
import { questionBank } from "./data/questionBank";
import { HeaderButtons } from "./components/HeaderButtons";

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3A4D39",
    },
    background: {
      default: "#1a1a1a",
      paper: "#101010",
    },
    text: {
      primary: "#e2e2e2",
    },
  },
});

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const selectedQuestions = shuffleArray(questionBank)
      .slice(0, 10)
      .map((q, index) => ({
        ...q,
        column: index,
      }));

    return {
      questions: selectedQuestions,
      answers: [] as Answer[],
      horses: [
        {
          id: 1,
          emoji: "🦄",
          color: "#DDA0DD",
          position: 0,
          name: "",
          modelValue: "",
        },
        {
          id: 2,
          emoji: "🐎",
          color: "#98FB98",
          position: 0,
          name: "",
          modelValue: "",
        },
        {
          id: 3,
          emoji: "🎠",
          color: "#87CEEB",
          position: 0,
          name: "",
          modelValue: "",
        },
        {
          id: 4,
          emoji: "🐴",
          color: "#EF9C66",
          position: 0,
          name: "",
          modelValue: "",
        },
      ] as Horse[],
      currentColumn: 0,
    };
  });

  const [isRaceStarted, setIsRaceStarted] = useState(false);

  const [attemptedQuestions, setAttemptedQuestions] = useState<
    AttemptedQuestion[]
  >([]);

  useEffect(() => {
    if (!isRaceStarted) return;

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsHost = process.env.REACT_APP_WS_HOST;
    const ws = new WebSocket(`${wsProtocol}//${wsHost || "localhost:8080"}/ws`);

    ws.onopen = () => console.log("WebSocket connected");
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [isRaceStarted]);

  useEffect(() => {
    const processHorses = async () => {
      if (!isRaceStarted) return;

      const promises = gameState.horses.map(async (horse) => {
        if (!horse.isProcessing && !horse.isWaiting && horse.position <= 9) {
          const currentQuestion = gameState.questions.find(
            (q) => q.column === horse.position
          );
          if (currentQuestion) {
            await submitAnswer(horse.id, currentQuestion);
          }
        }
      });

      await Promise.all(promises);
    };

    processHorses();
  }, [isRaceStarted, gameState.horses]);

  const submitAnswer = async (horseId: number, question: Question) => {
    // Check if this horse has already attempted this question
    const hasAttempted = attemptedQuestions.some(
      (attempt) =>
        attempt.horseId === horseId && attempt.questionId === question.id
    );

    if (hasAttempted) {
      // console.log(
      //   `Horse ${horseId} has already attempted question ${question.id}`
      // );
      return;
    }

    const horse = gameState.horses.find((h) => h.id === horseId);

    if (
      !horse?.modelValue ||
      horse.isProcessing ||
      horse.isWaiting ||
      horse.position >= 10
    ) {
      console.log("Submission blocked:", {
        noModelValue: !horse?.modelValue,
        isProcessing: horse?.isProcessing ?? false,
        isWaiting: horse?.isWaiting ?? false,
        alreadyFinished: horse?.position !== undefined && horse.position >= 10,
      });
      return;
    }

    try {
      // Mark this question as attempted before making the API call
      setAttemptedQuestions((prev) => [
        ...prev,
        { horseId, questionId: question.id },
      ]);

      setGameState((prev) => ({
        ...prev,
        horses: prev.horses.map((h) =>
          h.id === horseId ? { ...h, isProcessing: true } : h
        ),
      }));

      const payload = {
        horseId: horseId,
        question: {
          id: question.id,
          content: question.content,
          answer: question.answer,
          choices: question.choices,
        },
        modelValue: horse.modelValue,
      };

      const apiUrl =
        process.env.REACT_APP_API_URL || "https://centaur-server.onrender.com";
      const response = await fetch(`${apiUrl}/api/submit-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!responseText) {
        console.error("Empty response body");
        return; // Stop the program if the body is empty
      }

      const result = JSON.parse(responseText);

      setGameState((prev) => {
        const newHorses = prev.horses.map((h): Horse => {
          if (h.id === horseId) {
            const currentHorse = prev.horses.find((ph) => ph.id === horseId)!;
            if (currentHorse.position >= 10) {
              return currentHorse;
            }

            if (result.approved) {
              const newPosition = Math.min(h.position + 1, 10);
              return {
                ...h,
                position: newPosition,
                isProcessing: false,
                isWaiting: false,
                finishTime: newPosition === 10 ? Date.now() : h.finishTime,
              };
            } else {
              const currentPosition = h.position;
              setTimeout(() => {
                setGameState((prevState) => ({
                  ...prevState,
                  horses: prevState.horses.map((horse) => {
                    if (horse.id === horseId) {
                      if (horse.position >= 10) {
                        return horse;
                      }
                      return {
                        ...horse,
                        position: Math.min(currentPosition + 1, 10),
                        isProcessing: false,
                        isWaiting: false,
                        finishTime:
                          currentPosition + 1 === 10
                            ? Date.now()
                            : horse.finishTime,
                      };
                    }
                    return horse;
                  }),
                }));
              }, 3000);
              return { ...h, isProcessing: false, isWaiting: true };
            }
          }
          return h;
        });

        const newAnswer: Answer = {
          id: `${question.id}-${horseId}-${Date.now()}`,
          questionId: question.id,
          horseId,
          content: result.answer,
          status: result.approved ? "approved" : "rejected",
          timestamp: new Date().toISOString(),
        };

        return {
          ...prev,
          horses: newHorses,
          answers: [...prev.answers, newAnswer],
        };
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
      setGameState((prev) => ({
        ...prev,
        horses: prev.horses.map((h) =>
          h.id === horseId ? { ...h, isProcessing: false } : h
        ),
      }));
    }
  };

  const handleNameChange = async (horseId: number, newValue: string) => {
    const selectedModel = MODEL_OPTIONS.find(
      (model) => model.value === newValue
    );

    if (selectedModel) {
      setGameState((prev) => ({
        ...prev,
        horses: prev.horses.map((h) =>
          h.id === horseId
            ? {
                ...h,
                name: selectedModel.name,
                modelValue: selectedModel.value,
              }
            : h
        ),
      }));
    }
  };

  const canStartRace = () => {
    return gameState.horses.every((horse) => horse.modelValue);
  };

  const isSmallScreen = useMediaQuery(darkTheme.breakpoints.down("md")); // lg is typically 1200px

  const handleRestart = () => {
    // Reset game state
    setGameState(() => {
      const selectedQuestions = shuffleArray(questionBank)
        .slice(0, 10)
        .map((q, index) => ({
          ...q,
          column: index,
        }));

      return {
        questions: selectedQuestions,
        answers: [],
        horses: gameState.horses.map((horse) => ({
          ...horse,
          position: 0,
          isProcessing: false,
          isWaiting: false,
          finishTime: undefined,
        })),
        currentColumn: 0,
      };
    });

    // Reset attempted questions
    setAttemptedQuestions([]);

    // Reset race state
    setIsRaceStarted(false);
  };

  const handleCustomQuestionsSubmit = (customQuestions: Question[]) => {
    if (!isRaceStarted) {
      setGameState((prev) => ({
        ...prev,
        questions: customQuestions,
      }));
    } else {
      alert(
        "Please wait for the current race to finish before changing questions"
      );
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          padding: isSmallScreen ? "10px" : "25px",
          minHeight: "100vh",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          spacing={3}
          sx={{
            "& > :first-of-type": { flex: 3.5 }, // Game controls take 1 part
            "& > :last-child": { flex: 1 }, // QAContainer takes 3 parts
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Stack direction="column" spacing={0} alignItems="center">
              <Typography
                variant={isSmallScreen ? "h4" : "h3"}
                sx={{
                  color: darkTheme.palette.text.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Centaur: AI Horse Racing
              </Typography>
              <HeaderButtons
                textColor={darkTheme.palette.text.primary}
                onCustomQuestionsSubmit={handleCustomQuestionsSubmit}
              />
            </Stack>
            <HorseSelector
              horses={gameState.horses}
              isRaceStarted={isRaceStarted}
              onNameChange={handleNameChange}
            />
            <RaceTrack horses={gameState.horses} />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={
                isRaceStarted ? handleRestart : () => setIsRaceStarted(true)
              }
              disabled={!isRaceStarted && !canStartRace()}
              sx={{ mt: 2, textTransform: "none" }}
            >
              {isRaceStarted ? "Restart 🔄" : "Begin Race 🏆"}
            </Button>
          </Stack>
          <QAContainer
            questions={gameState.questions}
            answers={gameState.answers}
            horses={gameState.horses}
          />
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default App;
