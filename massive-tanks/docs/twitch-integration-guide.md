# Twitch Integration Guide

This document provides an overview of how Massive Tanks: Armored Command integrates with Twitch to enhance the streaming experience for content creators and viewers.

## Overview

Massive Tanks offers Twitch integration to allow streamers to interact with their viewers in unique ways. Through this integration, viewers can participate in the streamer's base-building and strategic decisions, creating an engaging and interactive streaming experience.

## Features

### Chat Commands

Viewers can use the following chat commands to interact with the streamer's base:

| Command | Description | Example |
|---------|-------------|--------|
| !base | Shows the current state of the streamer's base | !base |
| !resources | Shows the streamer's current resources | !resources |
| !tanks | Shows the streamer's available tanks | !tanks |
| !missions | Shows the streamer's active missions | !missions |
| !suggest | Suggests a building placement or mission | !suggest factory 5,7 |

### Channel Point Redemptions

Streamers can set up the following channel point redemptions:

| Redemption | Description | Suggested Cost |
|------------|-------------|----------------|
| Boost Resources | Add resources to the streamer's base | 1,000 points |
| Sabotage | Damage a building in the streamer's base | 5,000 points |
| Deploy Tank | Deploy one of the streamer's tanks on a mission | 2,500 points |
| Name Building | Name a building in the streamer's base | 1,500 points |
| Special Mission | Create a special high-risk, high-reward mission | 10,000 points |

### Polls and Predictions

Streamers can create polls for their viewers to vote on strategic decisions, such as:

- Which building to construct next
- Which enemy base to attack
- Which tanks to deploy on a mission
- Which technology to research next

Predictions can be created for mission outcomes, allowing viewers to bet their channel points on the success or failure of missions.

## Setup

### Streamer Setup

1. In Massive Tanks, go to Settings and enable Twitch Integration
2. Click "Connect Twitch Account" and authorize the application
3. Configure which Twitch integration features you want to enable:
   - Chat Commands
   - Channel Point Redemptions
   - Polls/Predictions
4. Click "Save Settings"

### Viewer Setup

No setup is required for viewers. They can start interacting with the streamer's base immediately using chat commands or channel point redemptions.

## Technical Implementation

### Authentication

Massive Tanks uses the OAuth 2.0 protocol to authenticate with Twitch. The authentication flow is as follows:

1. User clicks "Connect Twitch Account" in the settings
2. User is redirected to Twitch's authorization page
3. User authorizes the application
4. Twitch redirects back to Massive Tanks with an authorization code
5. Massive Tanks exchanges the code for an access token
6. The access token is used for all future API calls

### Webhooks

Massive Tanks uses Twitch's webhook API to receive real-time notifications of events such as:

- Channel point redemptions
- Poll results
- Prediction outcomes

### Chat Bot

A lightweight chat bot is implemented to respond to chat commands. The bot connects to the Twitch IRC server and monitors the chat for commands prefixed with "!".

## Integration with Game Mechanics

### Resource Boosts

When a viewer redeems the "Boost Resources" reward, the following happens:

1. The streamer receives a notification
2. A random resource (steel, wood, electronics, or gasoline) is boosted by a predetermined amount
3. A visual effect appears on screen to acknowledge the boost

### Sabotage

When a viewer redeems the "Sabotage" reward, the following happens:

1. The streamer receives a notification
2. A random building in the base takes damage
3. A visual effect appears on screen to show the damage
4. The streamer must repair the building or suffer reduced efficiency

### Special Missions

When a viewer redeems the "Special Mission" reward, the following happens:

1. The streamer receives a notification with mission details
2. A special high-risk, high-reward mission is created
3. The streamer can choose to accept or decline the mission
4. If accepted, the mission appears in the mission list with the viewer's name

## Privacy and Moderation

### Privacy Settings

Streamers can control what information is shared with viewers through the Twitch integration. The following privacy settings are available:

- Show/hide resource amounts
- Show/hide tank details
- Show/hide mission details
- Show/hide base layout

### Moderation

Streamers can moderate viewer interactions by:

- Setting cooldowns on channel point redemptions
- Disabling specific chat commands
- Limiting the number of suggestions per viewer
- Banning specific viewers from interactions

## Future Enhancements

Future versions of Massive Tanks will enhance the Twitch integration with:

- Viewer-created missions
- Viewer bases that can be attacked or allied with
- Tournaments where viewers can compete against each other
- Interactive overlays for streams
- Extensions for more direct viewer interaction

## Troubleshooting

### Common Issues

- **Authentication Failures**: Ensure you're logged into the correct Twitch account and have allowed all requested permissions.
- **Chat Commands Not Working**: Verify that the bot is connected to the chat and commands are enabled in the settings.
- **Channel Point Redemptions Not Appearing**: Make sure you've created the redemptions in your Twitch dashboard and they're properly linked in Massive Tanks.

### Support

For help with Twitch integration issues, please contact support at support@massivetanks.com or join our Discord server for community assistance.

## Resources

- [Twitch Developer Documentation](https://dev.twitch.tv/docs/)
- [Twitch API Reference](https://dev.twitch.tv/docs/api/reference/)
- [Twitch Authentication Guide](https://dev.twitch.tv/docs/authentication/)
- [Channel Points API Documentation](https://dev.twitch.tv/docs/api/reference/#get-custom-reward)