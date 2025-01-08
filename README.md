# Process Scheduling Simulator

## Overview

This repository contains a simulator designed to optimize the scheduling of processes in a queue using linear programming techniques. The simulator is part of a project for the Operations Research (OR) module and addresses scheduling problems by prioritizing processes based on their priority and execution time, using the Shortest Job Next (SJN) algorithm for modeling.

The project includes:

- A **Flask-based API** for backend processing.
- A **React and CSS-based frontend** for user interaction.

## Key Features

- Enables users to input process details such as priority and execution time.
- Utilizes a linear programming model to optimize the process queue.
- Outputs an optimized schedule with details like the average waiting time.
- Includes robust error handling to manage invalid inputs gracefully.

## Installation

### Prerequisites

Ensure you have the following installed:

- Python (>=3.8)
- Node.js (>=14)

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

## Usage Instructions

1. Start both the backend and frontend servers.
2. Access the simulator through the frontend interface in your web browser (default: `http://localhost:3000`).
3. Enter process details such as arrival time, priority, and execution time.
4. Submit the data to view an optimized schedule and related details.
