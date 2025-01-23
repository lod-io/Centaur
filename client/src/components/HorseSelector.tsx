import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Horse, ModelOption } from "../types";
import { useEffect, useState } from "react";

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
  const [models, setModels] = useState<ModelOption[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const apiUrl =
          process.env.REACT_APP_API_URL ||
          "https://centaur-server.onrender.com";
        const response = await fetch(`${apiUrl}/api/models`);
        const data: string[] = await response.json();

        // Remove duplicates and create model options
        const uniqueModels = Array.from(new Set(data));
        const modelOptions: ModelOption[] = uniqueModels.map(
          (modelName, index) => ({
            name: modelName,
            value: modelName,
            id: index,
          })
        );
        setModels(modelOptions);

        // Randomly assign models if none are selected
        const hasNoModelsSelected = horses.every((horse) => !horse.modelValue);
        if (hasNoModelsSelected && !isRaceStarted && modelOptions.length > 0) {
          const availableModels = [...modelOptions];
          horses.forEach((horse) => {
            if (availableModels.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * availableModels.length
              );
              const randomModel = availableModels[randomIndex];
              availableModels.splice(randomIndex, 1);
              onNameChange(horse.id, randomModel.value);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, [horses, isRaceStarted, onNameChange]);

  const isModelSelected = (modelValue: string) => {
    return horses.some((horse) => horse.modelValue === modelValue);
  };

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
              value={horse.modelValue || ""}
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
              {models.map((model) => (
                <MenuItem
                  key={`${model.value}-${model.id}`}
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
