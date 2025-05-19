# Massive Tanks: Armored Command

Massive Tanks is a strategic base-building and warfare game designed as a companion "meta-game" for World of Tanks players. It allows players to bring their owned World of Tanks vehicles into a new tactical environment where they build and defend their own military base, research technologies, produce war machines, and form powerful guilds to dominate the landscape.

## Prototype Overview

This repository contains a prototype implementation of the Massive Tanks concept. The prototype focuses on demonstrating the UI, base-building mechanics, and a simulation of the World of Tanks API integration. It's designed to showcase the core gameplay loop and visual design.

## Core Features

### WoT Garage Integration

The cornerstone feature. Connect your Wargaming account to import your owned World of Tanks vehicles. These aren't just cosmetic; they become the core units you deploy for defense, offense, and strategic missions within Massive Tanks.

### Base Building & Management

Establish your command center and strategically construct various buildings. Manage resources, research new technologies, and optimize your layout for both production and defense.

### Strategic Warfare

Deploy your imported tanks alongside base defenses in tactical engagements. These battles could be automated defense sequences, player-vs-environment (PvE) missions, or player-vs-player (PvP) attacks on other bases.

### Guild System

Form or join guilds to cooperate with other players. Share intelligence, provide mutual defense, participate in large-scale guild wars, and conquer territories on a world map.

## Project Structure

```
massive-tanks/
├── client/                  # Client-side code
│   ├── css/                 # Stylesheets
│   │   └── styles.css       # Main stylesheet
│   ├── js/                  # JavaScript files
│   │   ├── app.js           # Application entry point
│   │   ├── game.js          # Game logic
│   │   ├── ui.js            # UI handling
│   │   └── wot-api.js       # WoT API integration (simulated)
│   ├── index.html           # Main HTML file
│   └── how-to-run.html      # Instructions for running the prototype
├── docs/                    # Documentation
│   ├── wargaming-api-guide.md  # Guide for Wargaming API integration
│   └── twitch-integration-guide.md  # Guide for Twitch integration
└── README.md               # This README file
```

## Getting Started

### Running the Prototype

The prototype is a client-side web application. You can run it using any of the following methods:

#### Method 1: Using a local web server (Recommended)

1. **Using Node.js and http-server**:
   ```
   npm install -g http-server
   cd path/to/massive-tanks/client
   http-server
   ```
   Then open `http://localhost:8080` in your browser.

2. **Using Python's built-in HTTP server**:
   ```
   cd path/to/massive-tanks/client
   python -m http.server  # Python 3.x
   # or
   python -m SimpleHTTPServer  # Python 2.x
   ```
   Then open `http://localhost:8000` in your browser.

#### Method 2: Opening the HTML file directly

Simply open `massive-tanks/client/index.html` in your web browser. Note that some features might not work correctly due to browser security restrictions.

For more detailed instructions, see `client/how-to-run.html`.

### Using the Prototype

1. **Login**: Use any username to log in (no password required in the prototype).
2. **Link WoT Account**: Click "Link World of Tanks Account" to simulate connecting to the Wargaming API.
3. **Navigate**: Use the navigation bar to switch between views (Base, Garage, Missions, etc.).
4. **Build your base**: Select a building type and place it on the grid.
5. **Import tanks**: In the Garage view, click "Import Tanks" to get sample tanks.
6. **Create missions**: In the Missions view, click "New Mission" to create a strategic mission.

## Future Development

The full version of Massive Tanks will include:

- Real Wargaming API integration with actual player tanks
- More complex base building with upgrades and tech trees
- Advanced strategic missions with tactical gameplay
- PvP base attacks and defense mechanics
- Guild system with cooperative gameplay
- Twitch integration for streamers
- Mobile app version

## API Documentation

- [Wargaming API Guide](docs/wargaming-api-guide.md): Information about integrating with the Wargaming API.
- [Twitch Integration Guide](docs/twitch-integration-guide.md): Information about the Twitch integration features.

## Technical Details

### Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Local Storage for data persistence
- Font Awesome for icons
- Simulated API responses for demonstration

### Browser Compatibility

The prototype is optimized for modern browsers:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## License

This prototype is a concept demonstration and is not licensed for distribution or commercial use.

## Acknowledgements

- This project is not officially affiliated with Wargaming or World of Tanks.
- The concept is designed as a companion application that would enhance the World of Tanks experience.
