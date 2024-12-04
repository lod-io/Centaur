package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"centaur/handlers"
	"centaur/services"

	"github.com/gorilla/mux"
)

func init() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found or error loading it: %v", err)
	}
}

func main() {
	// Initialize services
	answerService := services.NewAnswerService()

	// Initialize handlers
	answerHandler := handlers.NewAnswerHandler(answerService)
	wsHandler := handlers.NewWebSocketHandler()

	// Setup router
	r := mux.NewRouter()
	r.Use(mux.CORSMethodMiddleware(r))

	// Register routes
	r.HandleFunc("/api/submit-answer", answerHandler.SubmitAnswer).Methods("POST", "OPTIONS")
	r.HandleFunc("/ws", wsHandler.HandleWebSocket)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
