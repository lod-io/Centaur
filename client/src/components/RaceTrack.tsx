import { Box, Paper, styled } from "@mui/material";
import { Horse } from "../types";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";

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
  minHeight: "300px",
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
  width: "clamp(30px, 5vw, 60px)",
  height: "clamp(30px, 5vw, 60px)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.5s ease-in-out",
  position: "absolute",
  margin: "clamp(5px, 1vw, 10px)",
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
  fontSize: "clamp(0.8em, 1.2vw, 1.3em)",
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
  height: "100%",
  zIndex: 1,
  background: `repeating-linear-gradient(
    to bottom,
    #000 0,
    #000 10px,
    #fff 10px,
    #fff 20px
  )`,
});

const FinishLine = styled(Box)({
  position: "absolute",
  right: "9%",
  top: 0,
  bottom: 0,
  width: "4px",
  height: "100%",
  zIndex: 1,
  background: `repeating-linear-gradient(
    to bottom,
    #000 0,
    #000 10px,
    #fff 10px,
    #fff 20px
  )`,
});

const CenterText = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2em",
  fontWeight: "bold",
});

interface RaceTrackProps {
  horses: Horse[];
}

const RaceTrack: React.FC<RaceTrackProps> = ({ horses }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const trackRef = React.useRef<HTMLDivElement>(null);

  // Create a list of horses that have finished, sorted by finishTime
  const finishedHorses = horses
    .filter((horse) => horse.finishTime !== undefined)
    .sort((a, b) => (a.finishTime || 0) - (b.finishTime || 0));

  return (
    <RaceTrackContainer ref={trackRef} elevation={3}>
      <StartLine />
      <FinishLine />
      {horses.map((horse) => (
        <CenterText
          key={`hello-${horse.id}`}
          sx={{
            gridRow: horse.id,
            gridColumn: 6,
            whiteSpace: "nowrap",
            color: theme.palette.text.primary,
            fontWeight: "semibold",
            fontSize: isSmallScreen ? "0.8em" : "1.5em",
          }}
        >
          {horse.name}
        </CenterText>
      ))}
      {horses.map((horse) => {
        let overlayIcon = null;

        if (horse.position >= 10) {
          const finishIndex = finishedHorses.findIndex(
            (h) => h.id === horse.id
          );
          if (finishIndex === 0) overlayIcon = "🥇";
          else if (finishIndex === 1) overlayIcon = "🥈";
          else if (finishIndex === 2) overlayIcon = "🥉";
        }

        // Calculate position as percentage of track width
        // Map position 0-10 to exactly 9%-91% of track width
        const trackStart = 0;
        const trackEnd = 91;
        const trackWidth = trackEnd - trackStart;
        const leftPosition = `${
          trackStart + (horse.position / 10) * trackWidth + 1
        }%`;
        // Adjust vertical position and add some padding
        const topPosition = `calc(${(horse.id - 1) * 25}% + 15px)`;

        return (
          <HorseCell
            key={horse.id}
            sx={{
              left: leftPosition,
              top: topPosition,
              opacity: horse.isProcessing ? 0.5 : 1,
              backgroundColor: `${horse.color}50`,
              border: `2px solid ${horse.color}`,
            }}
          >
            <HorseContent>
              {isSmallScreen ? (
                <Box sx={{ fontSize: "1em" }}>
                  {horse.isWaiting ? "💤" : null}
                  {overlayIcon ? overlayIcon : null}
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      fontSize: "clamp(1em, 1.8vw, 2em)",
                      transform: "scaleX(-1)",
                    }}
                  >
                    {horse.emoji}
                  </Box>
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
