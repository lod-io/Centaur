# 🦄 Centaur: AI Horse Racing
> We're [live](https://centaur-client.onrender.com/)! 🎉

Centaur is a mini web application that visually compares AI models in a horse racing game. Users select AI models as jockeys for horses, and the race progresses based on each model's speed and accuracy in answering questions. For every correct answer, the horse advances. If the model answers incorrectly, the horse must pause for a fixed time before continuing. This setup allows users to observe and compare the performance of different large language models (LLMs) in a dynamic and engaging way.



https://github.com/user-attachments/assets/997f6dfa-3b44-4b4a-9205-449cc06f55d9

To ensure fairness, we set the hyperparameters as follows: temperature = 0.0, top-k = 1, and top-p = 0.0.

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

### License

Centaur is released under the MIT License. You are free to use, modify, and distribute the code for both commercial and non-commercial purposes.

### Contributions

We welcome contributions from the community! If you'd like to contribute to Centaur, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top of this page to create a copy of the repository under your GitHub account.

2. **Clone Your Fork**: Use the following command to clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/Centaur.git
   ```

3. **Create a Branch**: Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature-or-bugfix-name
   ```

4. **Make Your Changes**: Implement your changes in the codebase.

5. **Commit Your Changes**: Commit your changes with a descriptive commit message:

   ```bash
   git commit -m "Description of changes"
   ```

6. **Push to Your Fork**: Push your changes to your forked repository:

   ```bash
   git push origin feature-or-bugfix-name
   ```

7. **Submit a Pull Request**: Go to the original repository and click "New Pull Request". Provide a clear description of your changes and why they should be merged.

Thank you for your contributions! Together, we can make Centaur even better.
