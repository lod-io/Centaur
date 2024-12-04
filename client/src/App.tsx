import { useState, useEffect } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Answer, GameState, Horse, MODEL_OPTIONS, Question } from "./types";
import RaceTrack from "./components/RaceTrack";
import HorseSelector from "./components/HorseSelector";
import QAContainer from "./components/QAContainer";
import { questionBank } from "./data/questionBank";

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#22577A",
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

  useEffect(() => {
    if (!isRaceStarted) return;

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsHost =
      process.env.NODE_ENV === "development"
        ? "localhost:8080"
        : window.location.host;
    const ws = new WebSocket(`${wsProtocol}//${wsHost}/ws`);

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
      console.log("Sending payload:", payload);

      const response = await fetch("/api/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          horseId: horseId,
          question: {
            id: question.id,
            content: question.content,
            answer: question.answer,
            choices: question.choices,
          },
          modelValue: horse.modelValue,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit answer");

      const result = await response.json();

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
              }, 6000);
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack spacing={3} alignItems="center">
          <h1
            style={{
              color: darkTheme.palette.text.primary,
              margin: 0,
              marginBottom: "1rem",
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Centaur: AI Horse Racing
          </h1>
          <HorseSelector
            horses={gameState.horses}
            isRaceStarted={isRaceStarted}
            onNameChange={handleNameChange}
          />
          <RaceTrack horses={gameState.horses} />
          {!isRaceStarted && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setIsRaceStarted(true)}
              disabled={!canStartRace()}
              sx={{ mt: 2, textTransform: "none" }}
            >
              Begin Race 🏆
            </Button>
          )}
          {isRaceStarted && (
            <QAContainer
              questions={gameState.questions}
              answers={gameState.answers}
              horses={gameState.horses}
            />
          )}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
