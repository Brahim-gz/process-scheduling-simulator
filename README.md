<a href="https://github.com/Brahim-gz/process-scheduling-simulator/blob/main/LICENSE">
  <img align=right src="https://img.shields.io/github/license/Brahim-gz/process-scheduling-simulator?style=flat" alt="License" />
</a>

<br/>
<br/>

# Process Scheduling Simulator

This repository contains a simulator aimed at optimizing process scheduling in a queue. It uses linear programming techniques to prioritize and organize tasks efficiently. The simulator is part of a project for the Operations Research (OR) module and addresses scheduling problems by prioritizing processes based on their priority, execution time, and arrival time. It leverages the Shortest Job Next (SJN) algorithm for modeling, which prioritizes processes with the shortest execution time to minimize overall waiting time. Additionally, the project includes dynamic visualizations for user interaction.

The project includes:

- A **Flask-based API** for backend processing.
- A **React and CSS-based frontend** for user interaction.
- Visual tools such as **ApexCharts** for displaying scheduling results and performance metrics.

## Features

🚀 **Interactive Input**: Users can input process details such as priority, arrival time, and execution time through an intuitive interface.

📊 **Linear Programming Optimization**: The backend employs linear programming to optimize the process queue and minimize metrics like average waiting time.

🎨 **Dynamic Visualizations**: Results are presented through interactive charts and animations, making the output easy to understand.

❗ **Error Handling**: Robust validation for managing invalid inputs and handling algorithmic issues gracefully.

♻ **Reset Functionality**: Allows users to clear the queue and restart simulations easily.

## Demo

![Demo GIF](https://github.com/Brahim-gz/process-scheduling-simulator/blob/main/assets/Demo.gif)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Python (>=3.8)](https://www.python.org/downloads/)
- [Node.js (>=14)](https://nodejs.org/)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Brahim-gz/process-scheduling-simulator.git
   cd process-scheduling-simulator
   ```
2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage

💡Start both the backend and frontend servers.

💡Access the simulator through the frontend interface in your web browser (default: `http://localhost:3000`).

💡Enter process details such as arrival time, priority, and execution time.

💡Submit the data to view an optimized schedule, dynamic animations, and performance metrics such as average waiting time.

💡Reset the queue as needed to start new simulations.

