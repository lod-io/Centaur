import { useState } from 'react';

export const usePopovers = () => {
  const [clodAnchorEl, setClodAnchorEl] = useState<null | HTMLElement>(null);
  const [instructionsAnchorEl, setInstructionsAnchorEl] = useState<null | HTMLElement>(null);
  const [tuneAnchorEl, setTuneAnchorEl] = useState<null | HTMLElement>(null);
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);

  const handleClodPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setClodAnchorEl(event.currentTarget);
  };

  const handleClodPopoverClose = () => {
    setClodAnchorEl(null);
  };

  const handleInstructionsPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setInstructionsAnchorEl(event.currentTarget);
  };

  const handleInstructionsPopoverClose = () => {
    setInstructionsAnchorEl(null);
  };

  const handleTunePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setTuneAnchorEl(event.currentTarget);
  };

  const handleTunePopoverClose = () => {
    setTuneAnchorEl(null);
  };

  const handleSharePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleSharePopoverClose = () => {
    setShareAnchorEl(null);
  };

  const isShareOpen = Boolean(shareAnchorEl);

  return {
    clodAnchorEl,
    instructionsAnchorEl,
    handleClodPopoverOpen,
    handleClodPopoverClose,
    handleInstructionsPopoverOpen,
    handleInstructionsPopoverClose,
    isClodOpen: Boolean(clodAnchorEl),
    isInstructionsOpen: Boolean(instructionsAnchorEl),
    tuneAnchorEl,
    handleTunePopoverOpen,
    handleTunePopoverClose,
    isTuneOpen: Boolean(tuneAnchorEl),
    shareAnchorEl,
    handleSharePopoverOpen,
    handleSharePopoverClose,
    isShareOpen,
  };
}; 