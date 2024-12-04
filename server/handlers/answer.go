package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"centaur/models"
	"centaur/services"
)

type AnswerHandler struct {
	answerService *services.AnswerService
}

func NewAnswerHandler(answerService *services.AnswerService) *AnswerHandler {
	return &AnswerHandler{
		answerService: answerService,
	}
}

func (h *AnswerHandler) SubmitAnswer(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request to submit answer")

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Log the raw request body
	body, _ := io.ReadAll(r.Body)
	r.Body = io.NopCloser(bytes.NewBuffer(body)) // Restore the body

	log.Printf("Raw request body: %s", string(body))

	var req models.SubmitAnswerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Error decoding request: %v", err)
		log.Printf("Request body: %s", string(body))
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Decoded request: %+v", req)

	response := h.answerService.ProcessAnswer(req)

	log.Printf("Response from answer service: %+v", response)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
