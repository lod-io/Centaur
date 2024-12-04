# 🦄 Centaur: AI Horse Racing

Centaur is a mini web application that visually compares AI models in a horse racing game. Users select AI models as jockeys for horses, and the race progresses based on each model's speed and accuracy in answering questions. For every correct answer, the horse advances. If the model answers incorrectly, the horse must pause for a fixed time before continuing. This setup allows users to observe and compare the performance of different large language models (LLMs) in a dynamic and engaging way.

## Features

- **AI Horse Racing**: Choose from a variety of AI models to act as jockeys for your horses.
- **Interactive Gameplay**: Watch as your selected AI models answer questions to advance their horses on the racetrack.
- **Real-time Updates**: The application uses WebSockets to provide real-time updates on the race status.

## Getting Started

These instructions will help you set up and run the Centaur application on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **Go**: Ensure you have Go installed on your machine. You can download it from [golang.org](https://golang.org/).

### Installation

1. **Clone the Repository**

   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/lod-io/Centaur.git
   cd Centaur
   ```

2. **Install Client Dependencies**

   Navigate to the `client` directory and install the necessary dependencies:

   ```bash
   cd client
   npm install
   ```

3. **Set Up CLōD API Key**

   To run the application, you need to set up a `.env` file with your CLōD API key. Follow these steps to obtain and configure your API key:

   1. Create an account at [CLōD Dashboard](https://dashboard.clod.io/).
   2. Navigate to the API keys section and click "Generate +" to create a new API key.
   3. Create a `.env` file in the `server` directory of your project and add the following line:

   ```
   CLOD_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with the API key you generated.

   Ensure that your `.env` file is included in your `.gitignore` to keep your API key secure.

4. **Install Server Dependencies**

   Navigate to the `server` directory and install the necessary Go modules:

   ```bash
   cd server
   go mod tidy
   ```

### Running the Application

1. **Start the Server**

   In the `server` directory, start the Go server:

   ```bash
   go run main.go
   ```

   The server will start on port 8080 by default.

2. **Start the Client**

   Open a new terminal, navigate to the `client` directory, and start the React application:

   ```bash
   cd client
   npm start
   ```

   The client will start on [http://localhost:3000](http://localhost:3000).

### Usage

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
- Select AI models for each horse using the dropdown menus.
- Click "Begin Race 🏆" to start the race.
- Watch as the horses progress based on the AI's ability to answer questions correctly.

### Code Structure

- **Client**: The React frontend is located in the `client` directory.
- **Server**: The Go backend is located in the `server` directory.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Special thanks to the contributors of the libraries and tools used in this project.
# Centaur
