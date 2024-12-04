package services

import (
	"centaur/models"
	"testing"

	"github.com/joho/godotenv"
)

func init() {
	// Load the .env file
	if err := godotenv.Load("../.env"); err != nil {
		panic("Error loading .env file")
	}
}

func TestGenerateAnswer(t *testing.T) {
	service := NewAnswerService()

	modelsToTest := []string{
		"gemini-1.5-flash",
		"gpt-4-turbo",
		"claude-3-5-sonnet-latest",
	}

	testCases := []struct {
		name           string
		question       models.Question
		expectedChoice string
	}{
		{
			name: "Simple Math",
			question: models.Question{
				Content: "What is 2+2? Please select the mathematically correct answer.",
				Choices: []string{"4", "5", "10", "15"},
			},
			expectedChoice: "4",
		},
		{
			name: "Scientific Fact",
			question: models.Question{
				Content: "What is the closest planet to the Sun?",
				Choices: []string{"Venus", "Earth", "Mercury", "Mars"},
			},
			expectedChoice: "Mercury",
		},
		{
			name: "Basic Grammar",
			question: models.Question{
				Content: "Which is the correct spelling?",
				Choices: []string{"recieve", "receive", "receeve", "receve"},
			},
			expectedChoice: "receive",
		},
	}

	for _, model := range modelsToTest {
		for _, tc := range testCases {
			t.Run(tc.name+"_"+model, func(t *testing.T) {
				result := service.generateAnswer(model, tc.question)

				// Verify result is one of the choices
				isValidChoice := false
				for _, choice := range tc.question.Choices {
					if result == choice {
						isValidChoice = true
						break
					}
				}

				if !isValidChoice {
					t.Errorf("Generated answer '%s' is not one of the provided choices: %v",
						result, tc.question.Choices)
				}

				// Verify the expected answer
				if result != tc.expectedChoice {
					t.Errorf("Expected '%s', got '%s'", tc.expectedChoice, result)
				}
			})
		}
	}
}
