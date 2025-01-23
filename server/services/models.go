package services

import (
	"centaur/constants"
	"centaur/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type ModelsService struct{}

func NewModelsService() *ModelsService {
	return &ModelsService{}
}

func (s *ModelsService) GetAvailableModels() ([]string, error) {
	apiKey := os.Getenv("CLOD_API_KEY")
	url := constants.ModelsEndpoint

	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Printf("Error creating request: %v", err)
		return nil, err
	}

	req.Header.Add("Authorization", "Bearer "+apiKey)

	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error fetching models: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		err := fmt.Errorf("failed to fetch models: %d", resp.StatusCode)
		log.Printf("%v", err)
		return nil, err
	}

	var modelsResp []models.ClodModel
	if err := json.NewDecoder(resp.Body).Decode(&modelsResp); err != nil {
		log.Printf("Error decoding response: %v", err)
		return nil, err
	}

	models := make([]string, len(modelsResp))
	for i, model := range modelsResp {
		models[i] = model.SystemName
	}

	return models, nil
}
