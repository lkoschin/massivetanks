# Wargaming API Integration Guide

This document provides an overview of how Massive Tanks: Armored Command integrates with the Wargaming API to import player data and tanks from World of Tanks.

## Overview

The Wargaming API allows developers to access player data, vehicle statistics, and other information from Wargaming games like World of Tanks. Massive Tanks uses this API to import players' owned tanks and their characteristics, creating a seamless connection between the two games.

## API Endpoints

The following Wargaming API endpoints are used in Massive Tanks:

### Authentication

```
https://api.worldoftanks.{region}/wot/auth/login/
```

This endpoint is used to authenticate players and obtain an access token.

### Player Information

```
https://api.worldoftanks.{region}/wot/account/info/
```

This endpoint retrieves basic player information, including account ID, nickname, and creation date.

### Player Vehicles

```
https://api.worldoftanks.{region}/wot/account/tanks/
```

This endpoint retrieves a list of vehicles owned by the player.

### Vehicle Information

```
https://api.worldoftanks.{region}/wot/encyclopedia/vehicles/
```

This endpoint retrieves detailed information about specific vehicles.

## Authentication Flow

1. Player clicks "Link World of Tanks Account" in Massive Tanks
2. Player is redirected to the Wargaming authentication page
3. Player enters their Wargaming credentials
4. Wargaming redirects back to Massive Tanks with an authentication code
5. Massive Tanks exchanges the code for an access token
6. The access token is stored securely for future API calls

## Data Mapping

### Tank Properties

World of Tanks vehicle properties are mapped to Massive Tanks properties as follows:

| WoT Property | Massive Tanks Property | Description |
|--------------|------------------------|-------------|
| tank_id | id | Unique identifier for the tank |
| name | name | Tank name |
| tier | tier | Tank tier (1-10) |
| type | type | Tank type (light, medium, heavy, etc.) |
| nation | nation | Tank nation |
| images.big_icon | image | Tank image URL |

### Tank Statistics

World of Tanks vehicle statistics are mapped to Massive Tanks statistics as follows:

| WoT Statistic | Massive Tanks Statistic | Description |
|---------------|-------------------------|-------------|
| max_health | health | Tank health points |
| firepower | damage | Tank damage capability |
| armor.hull.front | armor | Tank armor protection |
| mobility.speed_forward | speed | Tank maximum speed |

## Implementation Details

### API Client

The `wot-api.js` file contains the API client implementation. It handles:

- Authentication with the Wargaming API
- Fetching player data
- Fetching player's tanks
- Fetching tank details
- Error handling and retries

### Data Storage

Player data and tanks are stored in the browser's localStorage for persistence between sessions. The data structure is as follows:

```json
{
  "playerData": {
    "account_id": 12345678,
    "nickname": "TankCommander",
    "region": "eu",
    "created_at": "2015-05-15T12:00:00",
    "last_battle_time": "2023-04-01T18:30:00",
    "statistics": {
      "all": {
        "battles": 15420,
        "wins": 8481,
        "losses": 6939,
        "win_rate": 55.0,
        "avg_damage": 1250,
        "avg_xp": 650
      }
    }
  },
  "playerTanks": [
    {
      "id": 1,
      "name": "T-34",
      "tier": 5,
      "type": "medium",
      "nation": "ussr",
      "image": "img/tanks/t-34.png",
      "stats": {
        "health": 520,
        "damage": 85,
        "armor": 45,
        "speed": 56
      }
    },
    // More tanks...
  ]
}
```

## Rate Limiting

The Wargaming API has rate limits that must be respected:

- 10 requests per second
- 10,000 requests per day

Massive Tanks implements rate limiting by:

- Caching responses when possible
- Implementing exponential backoff for retries
- Batching requests when fetching multiple tanks

## Error Handling

The API client handles the following error scenarios:

- Network errors
- Authentication failures
- Rate limiting
- Invalid responses

Errors are logged to the console and displayed to the user when appropriate.

## Future Enhancements

Future versions of Massive Tanks will enhance the Wargaming API integration with:

- Real-time synchronization of newly acquired tanks
- Integration with player statistics for bonus effects
- Crew skills and equipment integration
- Premium account status benefits

## Testing

For the prototype version, the API integration is simulated with mock data. In the production version, the actual Wargaming API will be used.

## Resources

- [Wargaming Developer Portal](https://developers.wargaming.net/)
- [Wargaming API Documentation](https://developers.wargaming.net/reference/all/wot/account/list/)
- [Wargaming API Terms of Use](https://developers.wargaming.net/documentation/rules/agreement/)