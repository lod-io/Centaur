import {
  Button,
  Link,
  Popover,
  Stack,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GitHub, Cloud, Notes, Tune, Share } from "@mui/icons-material";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  XIcon,
  LinkedinIcon,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";
import { usePopovers } from "../hooks/usePopovers";
import { CustomizePopover } from "./CustomizePopover";
import { Question } from "../types";

interface HeaderButtonsProps {
  textColor: string;
  onCustomQuestionsSubmit?: (questions: Question[]) => void;
  onPenaltyTimeChange?: (seconds: number) => void;
}

export const HeaderButtons = ({
  textColor,
  onCustomQuestionsSubmit,
  onPenaltyTimeChange,
}: HeaderButtonsProps) => {
  const {
    clodAnchorEl,
    instructionsAnchorEl,
    tuneAnchorEl,
    shareAnchorEl,
    handleClodPopoverOpen,
    handleClodPopoverClose,
    handleInstructionsPopoverOpen,
    handleInstructionsPopoverClose,
    isClodOpen,
    isInstructionsOpen,
    handleTunePopoverOpen,
    handleTunePopoverClose,
    isTuneOpen,
    handleSharePopoverOpen,
    handleSharePopoverClose,
    isShareOpen,
  } = usePopovers();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const shareUrl = window.location.href;
  const shareTitle = "Check out Centaur - The AI Horse Racing Game 🦄";
  const shareDescription =
    "Race different AI models against each other and watch as AI horses compete by answering questions in real-time.";

  // Add this before the return statement
  const iconSize = 32;
  const iconBorderRadius = 8;

  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"}
      spacing={1}
      alignItems={isSmallScreen ? "stretch" : "center"}
      sx={{ width: isSmallScreen ? "100%" : "auto" }}
    >
      <Button
        fullWidth={isSmallScreen}
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
        fullWidth={isSmallScreen}
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
        fullWidth={isSmallScreen}
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
        fullWidth={isSmallScreen}
        startIcon={<Tune />}
        onClick={handleTunePopoverOpen}
        sx={{
          textTransform: "none",
          color: textColor,
        }}
      >
        Customize
      </Button>
      <CustomizePopover
        open={isTuneOpen}
        anchorEl={tuneAnchorEl}
        onClose={handleTunePopoverClose}
        onCustomQuestionsSubmit={onCustomQuestionsSubmit}
        onPenaltyTimeChange={onPenaltyTimeChange}
      />
      <Button
        fullWidth={isSmallScreen}
        startIcon={<Share />}
        onClick={handleSharePopoverOpen}
        sx={{
          textTransform: "none",
          color: textColor,
        }}
      >
        Share
      </Button>
      <Popover
        open={isShareOpen}
        anchorEl={shareAnchorEl}
        onClose={handleSharePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ p: 2 }}>
          <TwitterShareButton
            url={shareUrl}
            title={shareTitle + "\n\n" + shareDescription}
          >
            <XIcon
              size={iconSize}
              round={true}
              borderRadius={iconBorderRadius}
            />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon
              size={iconSize}
              round={true}
              borderRadius={iconBorderRadius}
            />
          </LinkedinShareButton>
          <FacebookShareButton url={shareUrl} hashtag="#CentaurAI #HorseRacing">
            <FacebookIcon
              size={iconSize}
              round={true}
              borderRadius={iconBorderRadius}
            />
          </FacebookShareButton>
        </Stack>
      </Popover>
    </Stack>
  );
};
