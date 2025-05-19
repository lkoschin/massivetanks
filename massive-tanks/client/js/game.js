/**
 * Massive Tanks: Armored Command
 * Game Logic Module
 * 
 * This module handles the core game logic, including resources, buildings, and missions.
 */

const Game = (function() {
    // Private variables
    let _isLoggedIn = false;
    let _playerName = '';
    let _playerData = null;
    let _resources = {
        steel: 100,
        wood: 100,
        electronics: 50,
        gasoline: 50,
        baseLevel: 1
    };
    let _baseGrid = [];
    let _gridSize = 10;
    let _missions = [];
    let _settings = {
        sound: true,
        music: true,
        notifications: true,
        twitchIntegration: false
    };
    
    // Resource generation rates per minute
    const _resourceRates = {
        steel: 2,
        wood: 2,
        electronics: 1,
        gasoline: 1
    };
    
    // Building costs
    const _buildingCosts = {
        'command-center': { steel: 100, wood: 100, electronics: 50 },
        'garage': { steel: 50, wood: 30, electronics: 20 },
        'factory': { steel: 80, wood: 40, electronics: 30 },
        'defense-tower': { steel: 60, wood: 40, electronics: 20 },
        'resource-extractor': { steel: 40, wood: 20, electronics: 10 }
    };
    
    // Mission targets
    const _missionTargets = {
        '1': { name: 'Enemy Base Alpha', difficulty: 'Easy' },
        '2': { name: 'Enemy Base Bravo', difficulty: 'Medium' },
        '3': { name: 'Enemy Base Charlie', difficulty: 'Hard' }
    };
    
    /**
     * Initializes the game
     */
    function init() {
        // Initialize base grid
        _initializeBaseGrid();
        
        // Load saved data if available
        _loadSavedData();
        
        // Start resource generation
        _startResourceGeneration();
        
        // Check for completed missions
        _checkMissions();
    }
    
    /**
     * Initializes the base grid
     */
    function _initializeBaseGrid() {
        _baseGrid = [];
        
        for (let row = 0; row < _gridSize; row++) {
            _baseGrid[row] = [];
            for (let col = 0; col < _gridSize; col++) {
                _baseGrid[row][col] = null;
            }
        }
    }
    
    /**
     * Loads saved data from localStorage
     */
    function _loadSavedData() {
        try {
            const savedData = localStorage.getItem('massiveTanksData');
            
            if (savedData) {
                const data = JSON.parse(savedData);
                
                if (data.isLoggedIn) {
                    _isLoggedIn = data.isLoggedIn;
                    _playerName = data.playerName;
                    _resources = data.resources;
                    _baseGrid = data.baseGrid;
                    _missions = data.missions;
                    _settings = data.settings;
                    
                    // Update UI
                    UI.updatePlayerName(_playerName);
                    UI.updateResources(_resources);
                    UI.updateBaseGrid(_baseGrid);
                    UI.renderMissions(_missions);
                    
                    // Show game screen
                    UI.showGameScreen();
                }
                
                if (data.playerData) {
                    _playerData = data.playerData;
                    UI.updateWotStatus(true);
                }
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
    
    /**
     * Saves data to localStorage
     */
    function _saveData() {
        try {
            const data = {
                isLoggedIn: _isLoggedIn,
                playerName: _playerName,
                playerData: _playerData,
                resources: _resources,
                baseGrid: _baseGrid,
                missions: _missions,
                settings: _settings
            };
            
            localStorage.setItem('massiveTanksData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
    
    /**
     * Starts resource generation
     */
    function _startResourceGeneration() {
        // Generate resources every minute
        setInterval(() => {
            // Count resource extractors
            let extractorCount = 0;
            
            for (let row = 0; row < _gridSize; row++) {
                for (let col = 0; col < _gridSize; col++) {
                    if (_baseGrid[row][col] && _baseGrid[row][col].type === 'resource-extractor') {
                        extractorCount++;
                    }
                }
            }
            
            // Calculate resource generation
            const multiplier = 1 + (extractorCount * 0.5);
            
            _resources.steel += Math.floor(_resourceRates.steel * multiplier);
            _resources.wood += Math.floor(_resourceRates.wood * multiplier);
            _resources.electronics += Math.floor(_resourceRates.electronics * multiplier);
            _resources.gasoline += Math.floor(_resourceRates.gasoline * multiplier);
            
            // Update UI
            UI.updateResources(_resources);
            
            // Save data
            _saveData();
        }, 60000); // 60 seconds
    }
    
    /**
     * Checks for completed missions
     */
    function _checkMissions() {
        // Check missions every minute
        setInterval(() => {
            let missionsUpdated = false;
            
            _missions.forEach(mission => {
                if (!mission.completed) {
                    // Calculate time remaining
                    const now = new Date().getTime();
                    const endTime = mission.startTime + (mission.duration * 60 * 60 * 1000);
                    
                    if (now >= endTime) {
                        // Mission completed
                        mission.completed = true;
                        mission.timeRemaining = 'Completed';
                        
                        // Add rewards
                        _resources.steel += mission.rewards.steel;
                        _resources.wood += mission.rewards.wood;
                        _resources.electronics += mission.rewards.electronics;
                        
                        // Update UI
                        UI.updateResources(_resources);
                        
                        missionsUpdated = true;
                    } else {
                        // Update time remaining
                        const timeRemaining = endTime - now;
                        const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
                        const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
                        
                        mission.timeRemaining = `${hours}h ${minutes}m`;
                        
                        missionsUpdated = true;
                    }
                }
            });
            
            if (missionsUpdated) {
                // Update UI
                UI.renderMissions(_missions);
                
                // Save data
                _saveData();
            }
        }, 60000); // 60 seconds
    }
    
    /**
     * Logs in the player
     * @param {string} username - The username
     * @param {string} password - The password (not used in prototype)
     */
    function login(username, password) {
        _isLoggedIn = true;
        _playerName = username;
        
        // Update UI
        UI.updatePlayerName(_playerName);
        UI.updateResources(_resources);
        UI.updateBaseGrid(_baseGrid);
        UI.renderMissions(_missions);
        
        // Show game screen
        UI.showGameScreen();
        
        // Save data
        _saveData();
    }
    
    /**
     * Logs out the player
     */
    function logout() {
        if (WotApi.isAuthenticated()) {
            UI.showLoading('Logging out...');
            
            WotApi.logout()
                .then(() => {
                    _isLoggedIn = false;
                    _playerName = '';
                    _playerData = null;
                    
                    // Show login screen
                    UI.showLoginScreen();
                    
                    // Update UI
                    UI.updateWotStatus(false);
                    
                    // Save data
                    _saveData();
                    
                    UI.hideLoading();
                })
                .catch(error => {
                    UI.hideLoading();
                    alert(`Error logging out: ${error.message}`);
                });
        } else {
            _isLoggedIn = false;
            _playerName = '';
            
            // Show login screen
            UI.showLoginScreen();
            
            // Save data
            _saveData();
        }
    }
    
    /**
     * Updates player data from Wargaming API
     * @param {Object} playerData - The player data
     */
    function updatePlayerData(playerData) {
        _playerData = playerData;
        
        // Save data
        _saveData();
    }
    
    /**
     * Updates player tanks from Wargaming API
     * @param {Array} tanks - The player tanks
     */
    function updatePlayerTanks(tanks) {
        // Save data
        _saveData();
    }
    
    /**
     * Places a building on the base grid
     * @param {string} buildingType - The building type
     * @param {number} row - The row
     * @param {number} col - The column
     */
    function placeBuilding(buildingType, row, col) {
        // Check if cell is empty
        if (_baseGrid[row][col] !== null) {
            alert('This cell is already occupied.');
            return;
        }
        
        // Check if player has enough resources
        const cost = _buildingCosts[buildingType];
        
        if (_resources.steel < cost.steel || _resources.wood < cost.wood || _resources.electronics < cost.electronics) {
            alert('Not enough resources to build this building.');
            return;
        }
        
        // Check if building is command center and if one already exists
        if (buildingType === 'command-center') {
            let commandCenterExists = false;
            
            for (let r = 0; r < _gridSize; r++) {
                for (let c = 0; c < _gridSize; c++) {
                    if (_baseGrid[r][c] && _baseGrid[r][c].type === 'command-center') {
                        commandCenterExists = true;
                        break;
                    }
                }
                
                if (commandCenterExists) {
                    break;
                }
            }
            
            if (commandCenterExists) {
                alert('You can only have one Command Center.');
                return;
            }
        }
        
        // Deduct resources
        _resources.steel -= cost.steel;
        _resources.wood -= cost.wood;
        _resources.electronics -= cost.electronics;
        
        // Place building
        _baseGrid[row][col] = {
            type: buildingType,
            level: 1,
            health: 100
        };
        
        // Update UI
        UI.updateResources(_resources);
        UI.updateBaseGrid(_baseGrid);
        
        // Save data
        _saveData();
    }
    
    /**
     * Starts a mission
     * @param {string} targetId - The target ID
     * @param {Array} tankIds - The tank IDs
     */
    function startMission(targetId, tankIds) {
        // Check if player has enough gasoline
        let requiredGasoline;
        
        switch (targetId) {
            case '1':
                requiredGasoline = 10;
                break;
            case '2':
                requiredGasoline = 20;
                break;
            case '3':
                requiredGasoline = 35;
                break;
            default:
                requiredGasoline = 0;
        }
        
        if (_resources.gasoline < requiredGasoline) {
            alert('Not enough gasoline to start this mission.');
            return;
        }
        
        // Deduct gasoline
        _resources.gasoline -= requiredGasoline;
        
        // Create mission
        const mission = {
            id: Date.now(),
            name: `Mission to ${ _missionTargets[targetId].name}`,
            target:  _missionTargets[targetId].name,
            difficulty:  _missionTargets[targetId].difficulty,
            tanks: tankIds,
            startTime: Date.now(),
            duration: targetId === '1' ? 2 : targetId === '2' ? 4 : 8, // Hours
            timeRemaining: targetId === '1' ? '2h 0m' : targetId === '2' ? '4h 0m' : '8h 0m',
            completed: false,
            rewards: {
                steel: targetId === '1' ? 50 : targetId === '2' ? 100 : 200,
                wood: targetId === '1' ? 30 : targetId === '2' ? 60 : 120,
                electronics: targetId === '1' ? 10 : targetId === '2' ? 25 : 50
            }
        };
        
        // Add mission
        _missions.push(mission);
        
        // Update UI
        UI.updateResources(_resources);
        UI.renderMissions(_missions);
        
        // Save data
        _saveData();
    }
    
    /**
     * Updates game settings
     * @param {Object} settings - The settings object
     */
    function updateSettings(settings) {
        _settings = { ..._settings, ...settings };
        
        // Save data
        _saveData();
    }
    
    /**
     * Resets all game data
     */
    function resetAllData() {
        if (confirm('Are you sure you want to reset all game data? This cannot be undone.')) {
            localStorage.removeItem('massiveTanksData');
            
            // Reload page
            window.location.reload();
        }
    }
    
    // Public API
    return {
        init,
        login,
        logout,
        updatePlayerData,
        updatePlayerTanks,
        placeBuilding,
        startMission,
        updateSettings,
        resetAllData
    };
})();