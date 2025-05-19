/**
 * Massive Tanks: Armored Command
 * World of Tanks API Integration Module
 * 
 * This module handles all interactions with the Wargaming API.
 * For the prototype, all API calls are simulated.
 */

const WotApi = (function() {
    // Private variables
    let _isAuthenticated = false;
    let _playerData = null;
    let _playerTanks = [];
    
    // Sample tank data for simulation
    const _sampleTanks = [
        {
            id: 1,
            name: "T-34",
            tier: 5,
            type: "medium",
            nation: "ussr",
            image: "img/tanks/t-34.png",
            stats: {
                health: 520,
                damage: 85,
                armor: 45,
                speed: 56
            }
        },
        {
            id: 2,
            name: "Tiger I",
            tier: 7,
            type: "heavy",
            nation: "germany",
            image: "img/tanks/tiger.png",
            stats: {
                health: 950,
                damage: 175,
                armor: 100,
                speed: 40
            }
        },
        {
            id: 3,
            name: "M4 Sherman",
            tier: 5,
            type: "medium",
            nation: "usa",
            image: "img/tanks/sherman.png",
            stats: {
                health: 480,
                damage: 75,
                armor: 50,
                speed: 48
            }
        },
        {
            id: 4,
            name: "KV-2",
            tier: 6,
            type: "heavy",
            nation: "ussr",
            image: "img/tanks/kv-2.png",
            stats: {
                health: 860,
                damage: 300,
                armor: 75,
                speed: 26
            }
        },
        {
            id: 5,
            name: "Cromwell",
            tier: 6,
            type: "medium",
            nation: "uk",
            image: "img/tanks/cromwell.png",
            stats: {
                health: 580,
                damage: 75,
                armor: 40,
                speed: 64
            }
        },
        {
            id: 6,
            name: "AMX 13 75",
            tier: 7,
            type: "light",
            nation: "france",
            image: "img/tanks/amx.png",
            stats: {
                health: 420,
                damage: 135,
                armor: 30,
                speed: 61
            }
        },
        {
            id: 7,
            name: "Object 252U",
            tier: 8,
            type: "heavy",
            nation: "ussr",
            image: "img/tanks/obj252.png",
            stats: {
                health: 1500,
                damage: 390,
                armor: 175,
                speed: 35
            }
        },
        {
            id: 8,
            name: "Leopard 1",
            tier: 10,
            type: "medium",
            nation: "germany",
            image: "img/tanks/leopard.png",
            stats: {
                health: 1950,
                damage: 390,
                armor: 70,
                speed: 65
            }
        }
    ];
    
    /**
     * Simulates authentication with Wargaming API
     * @returns {Promise} Resolves with player data or rejects with error
     */
    function authenticate() {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // Simulate successful authentication
                _isAuthenticated = true;
                _playerData = {
                    account_id: 12345678,
                    nickname: "TankCommander",
                    region: "eu",
                    created_at: "2015-05-15T12:00:00",
                    last_battle_time: "2023-04-01T18:30:00",
                    statistics: {
                        all: {
                            battles: 15420,
                            wins: 8481,
                            losses: 6939,
                            win_rate: 55.0,
                            avg_damage: 1250,
                            avg_xp: 650
                        }
                    }
                };
                
                resolve(_playerData);
            }, 1500);
        });
    }
    
    /**
     * Simulates fetching player's tanks from Wargaming API
     * @returns {Promise} Resolves with player's tanks or rejects with error
     */
    function fetchPlayerTanks() {
        return new Promise((resolve, reject) => {
            if (!_isAuthenticated) {
                reject(new Error("Not authenticated. Please authenticate first."));
                return;
            }
            
            // Simulate API call delay
            setTimeout(() => {
                // Randomly select 3-6 tanks from sample data
                const numTanks = Math.floor(Math.random() * 4) + 3;
                const shuffled = [..._sampleTanks].sort(() => 0.5 - Math.random());
                _playerTanks = shuffled.slice(0, numTanks);
                
                resolve(_playerTanks);
            }, 2000);
        });
    }
    
    /**
     * Simulates fetching tank details from Wargaming API
     * @param {number} tankId - The tank ID
     * @returns {Promise} Resolves with tank details or rejects with error
     */
    function fetchTankDetails(tankId) {
        return new Promise((resolve, reject) => {
            if (!_isAuthenticated) {
                reject(new Error("Not authenticated. Please authenticate first."));
                return;
            }
            
            // Simulate API call delay
            setTimeout(() => {
                const tank = _sampleTanks.find(t => t.id === tankId);
                
                if (tank) {
                    resolve(tank);
                } else {
                    reject(new Error(`Tank with ID ${tankId} not found.`));
                }
            }, 1000);
        });
    }
    
    /**
     * Simulates fetching player statistics from Wargaming API
     * @returns {Promise} Resolves with player statistics or rejects with error
     */
    function fetchPlayerStats() {
        return new Promise((resolve, reject) => {
            if (!_isAuthenticated) {
                reject(new Error("Not authenticated. Please authenticate first."));
                return;
            }
            
            // Simulate API call delay
            setTimeout(() => {
                resolve(_playerData.statistics);
            }, 1000);
        });
    }
    
    /**
     * Checks if the user is authenticated with Wargaming API
     * @returns {boolean} True if authenticated, false otherwise
     */
    function isAuthenticated() {
        return _isAuthenticated;
    }
    
    /**
     * Gets the player data
     * @returns {Object|null} Player data or null if not authenticated
     */
    function getPlayerData() {
        return _playerData;
    }
    
    /**
     * Gets the player's tanks
     * @returns {Array} Array of player's tanks or empty array if not authenticated
     */
    function getPlayerTanks() {
        return _playerTanks;
    }
    
    /**
     * Simulates logging out from Wargaming API
     * @returns {Promise} Resolves when logout is complete
     */
    function logout() {
        return new Promise((resolve) => {
            // Simulate API call delay
            setTimeout(() => {
                _isAuthenticated = false;
                _playerData = null;
                _playerTanks = [];
                
                resolve();
            }, 500);
        });
    }
    
    // Public API
    return {
        authenticate,
        fetchPlayerTanks,
        fetchTankDetails,
        fetchPlayerStats,
        isAuthenticated,
        getPlayerData,
        getPlayerTanks,
        logout
    };
})();