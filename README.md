# Memory Matching Game

## Project Description
This project is a memory matching game built using JavaScript and the DOM. The game involves finding matching pairs of cards on a dynamically generated board. It includes various features such as a leaderboard, game settings, and a responsive design.

## Features
1. **User Input:**
   - Username input with validation (max 12 characters, trimmed, no spaces).
   - Settings for the number of rows (2-5) and columns (2-5).
   - Settings for the display time of card pairs (0.5-2.0 seconds).

2. **Game Setup:**
   - Ensures an even number of cards (no 3x3, 5x5, 3x5 boards).
   - Random selection of 10 images for the cards.
   - Randomized card placement using the Fisher-Yates shuffle algorithm.

3. **Gameplay:**
   - Matching pairs of cards within the specified display time.
   - Cancel button to stop the game and return to the start screen.
   - Score calculation based on the number of cards and the number of moves.

4. **End of Game:**
   - Displays the user's score and position on the leaderboard.
   - Shows the top 3 scores since the page load.
   - Informative message if the user does not make it to the leaderboard.

5. **Leaderboard:**
   - Modal dialog to display the leaderboard from the start screen.

6. **Responsive Design:**
   - Uses Bootstrap for a responsive layout.
   - HTML page is designed to work well on various screen sizes.

7. **Security:**
   - Prevents cheating by hiding the game state from the DOM inspector.

## Installation
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/Memory-Matching-Game-JS.git
   cd Memory-Matching-Game-JS
   ```

2. **Open in Browser:**
   Open `index.html` in your preferred web browser.

## Usage
1. **Start Screen:**
   - Enter your username.
   - Adjust the game settings if needed.
   - Click "Start Game" to begin.

2. **Gameplay:**
   - Click on cards to reveal them.
   - Match pairs within the allotted time.
   - Use the cancel button to return to the start screen.

3. **End of Game:**
   - View your score and leaderboard position.
   - Restart the game if desired.

