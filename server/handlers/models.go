package handlers

import (
	"centaur/services"
	"encoding/json"
	"net/http"
)

type ModelsHandler struct {
	modelsService *services.ModelsService
}

func NewModelsHandler(modelsService *services.ModelsService) *ModelsHandler {
	return &ModelsHandler{
		modelsService: modelsService,
	}
}

func (h *ModelsHandler) GetModels(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	modelsService := services.NewModelsService()
	models, err := modelsService.GetAvailableModels()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models)
}
