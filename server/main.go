package main

import (
	"log"
	"net/http"
	"os"

	"centaur/handlers"
	"centaur/services"

	"github.com/gorilla/mux"
	// "github.com/joho/godotenv"
)

func init() {
	// Load .env file
	// if err := godotenv.Load(); err != nil {
	// 	log.Printf("Warning: .env file not found or error loading it: %v", err)
	// }
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
	r.Use(corsMiddleware)

	// Register routes
	r.HandleFunc("/api/submit-answer", answerHandler.SubmitAnswer).Methods("POST", "OPTIONS")
	r.HandleFunc("/ws", wsHandler.HandleWebSocket)

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
		origin := r.Header.Get("Origin")
		if origin == "http://localhost:3000" || origin == "https://centaur-client.onrender.com" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
