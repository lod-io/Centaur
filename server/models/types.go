package models

type SubmitAnswerRequest struct {
	HorseID    int      `json:"horseId"`
	Question   Question `json:"question"`
	ModelValue string   `json:"modelValue"`
}

type SubmitAnswerResponse struct {
	Approved bool   `json:"approved"`
	Answer   string `json:"answer"`
}

type Question struct {
	ID      string   `json:"id"`
	Content string   `json:"content"`
	Answer  string   `json:"answer"`
	Choices []string `json:"choices"`
}
