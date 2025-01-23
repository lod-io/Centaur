package main

import (
	"log"
	"net/http"
	"os"

	"centaur/handlers"
	"centaur/services"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
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
	modelsService := services.NewModelsService()
	// Initialize handlers
	answerHandler := handlers.NewAnswerHandler(answerService)
	wsHandler := handlers.NewWebSocketHandler()
	modelsHandler := handlers.NewModelsHandler(modelsService)
	// Setup router
	r := mux.NewRouter()
	r.Use(mux.CORSMethodMiddleware(r))
	r.Use(corsMiddleware)

	// Register routes
	r.HandleFunc("/api/submit-answer", answerHandler.SubmitAnswer).Methods("POST", "OPTIONS")
	r.HandleFunc("/ws", wsHandler.HandleWebSocket)
	r.HandleFunc("/api/models", modelsHandler.GetModels).Methods("GET", "OPTIONS")
	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, r))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
