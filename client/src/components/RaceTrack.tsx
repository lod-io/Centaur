import { Box, Paper, styled } from "@mui/material";
import { Horse } from "../types";
import { useMediaQuery, useTheme } from "@mui/material";

const RaceTrackContainer = styled(Paper)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(11, minmax(0, 1fr))",
  gridTemplateRows: "repeat(4, 1fr)",
  gap: 4,
  backgroundColor: "rgba(54, 94, 50, 0.3)",
  marginBottom: theme.spacing(3),
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  position: "relative",
  "& > *": {
    aspectRatio: "1 / 1",
  },
  backgroundImage: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 25%,
    rgba(255, 255, 255, 0.2) 25%,
    rgba(255, 255, 255, 0.2) calc(25% + 1px)
  )`,
  backgroundSize: "100% 100%",
}));

const HorseCell = styled(Box)<{ $selected?: boolean }>(({ theme }) => ({
  width: "70%",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  position: "relative",
  margin: "10px",
}));

const HorseContent = styled(Box)({
  width: "80%",
  height: "80%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SleepOverlay = styled(Box)({
  position: "absolute",
  top: "-12%",
  right: "-15%",
  width: "50%",
  height: "50%",
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #e0e0e0",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontSize: "1.3em",
});

// const HorseName = styled(Box)({
//   fontSize: "0.6em",
//   maxWidth: 60,
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   whiteSpace: "nowrap",
// });

const StartLine = styled(Box)({
  position: "absolute",
  left: "9%",
  top: 0,
  bottom: 0,
  width: "4px",
  background:
    "repeating-linear-gradient(0deg, #000, #000 10px, #fff 10px, #fff 20px)",
});

const FinishLine = styled(Box)({
  position: "absolute",
  right: "9%",
  top: 0,
  bottom: 0,
  width: "4px",
  background:
    "repeating-linear-gradient(0deg, #000, #000 10px, #fff 10px, #fff 20px)",
});

interface RaceTrackProps {
  horses: Horse[];
}

const RaceTrack: React.FC<RaceTrackProps> = ({ horses }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // lg is typically 1200px

  // Create a list of horses that have finished, sorted by finishTime
  const finishedHorses = horses
    .filter((horse) => horse.finishTime !== undefined)
    .sort((a, b) => (a.finishTime || 0) - (b.finishTime || 0));

  return (
    <RaceTrackContainer elevation={3}>
      <StartLine />
      <FinishLine />
      {horses.map((horse) => {
        let overlayIcon = null;

        // Assign medals to the top three finishers
        if (horse.position >= 10) {
          const finishIndex = finishedHorses.findIndex(
            (h) => h.id === horse.id
          );
          if (finishIndex === 0) overlayIcon = "🥇";
          else if (finishIndex === 1) overlayIcon = "🥈";
          else if (finishIndex === 2) overlayIcon = "🥉";
        }

        return (
          <HorseCell
            key={horse.id}
            sx={{
              gridRow: horse.id,
              gridColumn: horse.position + 1,
              opacity: horse.isProcessing ? 0.5 : 1,
              backgroundColor: `${horse.color}50`,
              border: `2px solid ${horse.color}`,
            }}
          >
            <HorseContent>
              {isSmallScreen ? (
                // Show only status or medal icon on small screens
                <Box sx={{ fontSize: "1em" }}>
                  {horse.isWaiting ? "💤" : null}
                  {overlayIcon ? overlayIcon : null}
                </Box>
              ) : (
                // Show horse emoji and overlay icons on larger screens
                <>
                  <Box sx={{ fontSize: "2em" }}>{horse.emoji}</Box>
                  {horse.isWaiting && <SleepOverlay>💤</SleepOverlay>}
                  {overlayIcon && <SleepOverlay>{overlayIcon}</SleepOverlay>}
                </>
              )}
            </HorseContent>
          </HorseCell>
        );
      })}
    </RaceTrackContainer>
  );
};

export default RaceTrack;
