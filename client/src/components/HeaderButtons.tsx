import { Button, Link, Popover, Stack, Typography } from "@mui/material";
import { GitHub, Cloud, Notes } from "@mui/icons-material";
import { usePopovers } from "../hooks/usePopovers";

interface HeaderButtonsProps {
  textColor: string;
}

export const HeaderButtons = ({ textColor }: HeaderButtonsProps) => {
  const {
    clodAnchorEl,
    instructionsAnchorEl,
    handleClodPopoverOpen,
    handleClodPopoverClose,
    handleInstructionsPopoverOpen,
    handleInstructionsPopoverClose,
    isClodOpen,
    isInstructionsOpen,
  } = usePopovers();

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
    </Stack>
  );
};
