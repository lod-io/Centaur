package services

import (
	"bytes"
	"centaur/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"
)

type AnswerService struct{}

func NewAnswerService() *AnswerService {
	return &AnswerService{}
}

func (s *AnswerService) ProcessAnswer(req models.SubmitAnswerRequest) models.SubmitAnswerResponse {

	answer := s.generateAnswer(req.ModelValue, req.Question)
	approved := s.evaluateAnswer(req.Question, answer)

	return models.SubmitAnswerResponse{
		Approved: approved,
		Answer:   answer,
	}
}

func (s *AnswerService) generateAnswer(model string, question models.Question) string {
	apiKey := os.Getenv("CLOD_API_KEY")
	if apiKey == "" {
		return question.Choices[rand.Intn(len(question.Choices))]
	}

	url := "https://api.clod.io/v1/chat/completions"

	systemPrompt := `You are a choice selector. Your ONLY job is to select ONE answer from the provided choices.
CRITICAL RULES:
1. You MUST select EXACTLY ONE of the provided choices
2. Your response must be the exact text of your chosen answer - nothing more
3. The selected choice MUST be an exact match to one of the provided choices
4. Do not explain your choice or add any other text
5. If unsure, make your best guess - you MUST choose one

Example input:
Question: What is the capital of France?
Choices: London, Paris, Berlin

Example response:
Paris

REMEMBER: Respond with exactly one of the provided choices - no explanation, just the choice.`

	// Prepare the request payload
	payload := map[string]interface{}{
		"model": model,
		"messages": []map[string]string{
			{"role": "system", "content": systemPrompt},
			{"role": "user", "content": fmt.Sprintf("Question: %s\nChoices: %s",
				question.Content,
				strings.Join(question.Choices, ", "))},
		},
		"max_tokens": 80,
	}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		log.Println("Error marshalling payload:", err)
		return "Error generating answer"
	}

	// Create a new HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes))
	if err != nil {
		log.Println("Error creating request:", err)
		return "Error generating answer"
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error making request to %s: %v\n", req.URL, err)
		return "Error generating answer"
	}
	defer resp.Body.Close()

	// Read the response
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading response:", err)
		return "Error generating answer"
	}

	// Parse the response
	var response map[string]interface{}
	if err := json.Unmarshal(body, &response); err != nil {
		log.Println("Error unmarshalling response:", err)
		return "Error generating answer"
	}

	log.Printf("\n\nResponse: %v", response)
	// Extract the answer from the response
	if choices, ok := response["choices"].([]interface{}); ok && len(choices) > 0 {
		if choice, ok := choices[0].(map[string]interface{}); ok {
			if message, ok := choice["message"].(map[string]interface{}); ok {
				if content, ok := message["content"].(string); ok {
					// Clean the content of any whitespace or special characters
					cleanContent := strings.Trim(content, "`\n\r\t ")

					// Try direct matching with the choices
					for _, c := range question.Choices {
						if strings.EqualFold(cleanContent, c) {
							return c
						}
					}
				}
			}
		}
	}

	// If we get here, something went wrong - return a random choice as fallback
	log.Printf("\n\n%s's response didn't match any choices, selecting random choice\n\n", model)
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return question.Choices[r.Intn(len(question.Choices))]
}

func (s *AnswerService) evaluateAnswer(question models.Question, answer string) bool {
	return answer == question.Answer
}

// Use these for testing
// func (s *AnswerService) generateAnswer(model string, question models.Question) string {
// 	time.Sleep(time.Duration(rand.Intn(3)+2) * time.Second)
// 	return fmt.Sprintf("Sample answer from model %s for question %s\n", model, question)
// }

// func (s *AnswerService) evaluateAnswer(question models.Question, answer string) bool {
// 	return rand.Intn(5) != 0
// }
