# RekasBot Interface Code Overview

This README provides an overview of the key components of the RekasBot interface code, which uses p5.js and ml5.js for interactive control through hand gestures.

## Key Components

### 1. `intro.js`

This file manages the introduction page of the interface. Key functions include:

- **`show()`**: Displays the introduction screen with background image and buttons. Handles the start and help buttons' display logic.
- **`playbox()`**: Renders the start button and handles click events to start the game.
- **`createhelp()`**: Creates a help button that opens a help page with instructions.
- **`helppage()`**: Shows the help page with instructions on controlling the bot and connecting to Arduino.

### 2. `dashboard.js`

The `dashboard.js` file is responsible for displaying the dashboard with gear and detection screen. Key functions include:

- **`showdash()`**: Draws the dashboard background and shape.
- **`showgear(gearY)`**: Displays the gear position based on hand gestures. It updates the gear's display to indicate Park (P), Drive (D), or Reverse (R) modes.
- **`showScreen(wallstop)`**: Shows obstacle detection status on the screen. Displays messages based on whether an object is detected ahead or behind.

### 3. `steeringWheel.js`

This file handles the steering wheel visualization and control. Key functions include:

- **`show(ctr)`**: Renders the steering wheel and updates its angle based on hand position.
- **`steerTurn(movementFB, wallstop)`**: Determines the bot's left/right movement based on the steering wheel's angle and current gear position.

### 4. `sketch.js`

The `sketch.js` file initializes the interface, handles video input, and manages user interactions. Key functions include:

- **`preload()`**: Loads images, sounds, and fonts before the sketch starts.
- **`setup()`**: Initializes the video capture, handpose detection, and creates instances of `ipage`, `Steer`, and `dash`.
- **`draw()`**: Main draw loop that updates the interface based on hand gestures, gear position, and obstacle detection.
- **`keyPressed()`**: Connects to Arduino when the space bar is pressed.
- **`readSerial(data)`**: Reads data from Arduino and sends control information to it.
- **`drawKeypoints()`**: Processes hand gesture data to update the steering wheel and gear positions.
- **`windowResized()`**: Adjusts canvas size when the window is resized.
- **`keyTyped()`**: Handles fullscreen toggle and returning to the intro page when specific keys are pressed.

## How It Works

1. **Initialization**:
   - Loads necessary assets and initializes the video and handpose detection.
   - Creates objects for the introduction page, steering wheel, and dashboard.

2. **Interaction**:
   - The introduction page allows the user to start the game or view instructions.
   - The dashboard displays gear position and obstacle detection status.
   - The steering wheel adjusts based on hand movements to control the bot’s direction.

3. **Communication**:
   - Hand gestures are used to control the gear and steering.
   - Data is sent to and received from Arduino to control the physical bot.

Feel free to explore the code to understand the interaction between different components and how hand gestures are used to control the RekasBot.

