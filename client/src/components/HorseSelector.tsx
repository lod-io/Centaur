import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Horse, MODEL_OPTIONS } from "../types";
import { useEffect } from "react";

interface HorseSelectorProps {
  horses: Horse[];
  isRaceStarted: boolean;
  onNameChange: (horseId: number, newValue: string) => void;
}

const HorseSelector: React.FC<HorseSelectorProps> = ({
  horses,
  isRaceStarted,
  onNameChange,
}) => {
  const isModelSelected = (modelValue: string) => {
    return horses.some((horse) => horse.modelValue === modelValue);
  };

  useEffect(() => {
    const hasNoModelsSelected = horses.every((horse) => !horse.modelValue);

    if (hasNoModelsSelected && !isRaceStarted) {
      const availableModels = [...MODEL_OPTIONS];

      horses.forEach((horse) => {
        const randomIndex = Math.floor(Math.random() * availableModels.length);
        const randomModel = availableModels[randomIndex];

        availableModels.splice(randomIndex, 1);

        onNameChange(horse.id, randomModel.value);
      });
    }
  }, []);

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      sx={{ width: "100%", gap: 3 }}
    >
      {horses.map((horse) => (
        <Stack key={horse.id} spacing={2} alignItems="center">
          <FormControl
            sx={{
              minWidth: 200,
              "& .MuiOutlinedInput-root": {
                borderColor: horse.color,
                "&:hover fieldset": {
                  borderColor: horse.color,
                },
                "&.Mui-focused fieldset": {
                  borderColor: horse.color,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: horse.color,
              },
            }}
          >
            <InputLabel
              id={`horse-${horse.id}-label`}
              sx={{
                color: horse.color,
              }}
            >
              Choose Jockey
            </InputLabel>
            <Select
              labelId={`horse-${horse.id}-label`}
              value={horse.modelValue}
              label={`Choose Jockey`}
              onChange={(e) => onNameChange(horse.id, e.target.value)}
              disabled={isRaceStarted}
              sx={{
                backgroundColor: `${horse.color}22`,
                "&:hover": {
                  backgroundColor: `${horse.color}33`,
                },
              }}
            >
              {MODEL_OPTIONS.map((model) => (
                <MenuItem
                  key={model.value}
                  value={model.value}
                  disabled={
                    isModelSelected(model.value) &&
                    model.value !== horse.modelValue
                  }
                >
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      ))}
    </Stack>
  );
};

export default HorseSelector;
