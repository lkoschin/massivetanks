/**
 * Massive Tanks: Armored Command
 * UI Module
 * 
 * This module handles all user interface interactions and rendering.
 */

const UI = (function() {
    // DOM Elements - Screens
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    
    // DOM Elements - Login
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const linkWotBtn = document.getElementById('link-wot-btn');
    
    // DOM Elements - Game Header
    const playerNameEl = document.getElementById('player-name');
    const wotStatusEl = document.getElementById('wot-status');
    const syncWotBtn = document.getElementById('sync-wot-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    // DOM Elements - Resources
    const steelEl = document.getElementById('steel');
    const woodEl = document.getElementById('wood');
    const electronicsEl = document.getElementById('electronics');
    const gasolineEl = document.getElementById('gasoline');
    const baseLevelEl = document.getElementById('base-level');
    
    // DOM Elements - Navigation
    const navItems = document.querySelectorAll('.nav-item');
    
    // DOM Elements - Views
    const views = document.querySelectorAll('.view');
    const baseView = document.getElementById('base-view');
    const garageView = document.getElementById('garage-view');
    const missionsView = document.getElementById('missions-view');
    const guildView = document.getElementById('guild-view');
    const mapView = document.getElementById('map-view');
    
    // DOM Elements - Base View
    const buildingItems = document.querySelectorAll('.building-item');
    const baseGrid = document.querySelector('.base-grid');
    
    // DOM Elements - Garage View
    const importTanksBtn = document.getElementById('import-tanks-btn');
    const tankList = document.querySelector('.tank-list');
    
    // DOM Elements - Missions View
    const newMissionBtn = document.getElementById('new-mission-btn');
    const missionList = document.querySelector('.mission-list');
    
    // DOM Elements - Modals
    const modals = document.querySelectorAll('.modal');
    const wotLinkModal = document.getElementById('wot-link-modal');
    const newMissionModal = document.getElementById('new-mission-modal');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // DOM Elements - WoT Link Modal
    const wotAuthBtn = document.getElementById('wot-auth-btn');
    
    // DOM Elements - New Mission Modal
    const targetItems = document.querySelectorAll('.target-item');
    const missionDistance = document.getElementById('mission-distance');
    const missionDuration = document.getElementById('mission-duration');
    const requiredGasoline = document.getElementById('required-gasoline');
    const tankSelectionList = document.querySelector('.tank-selection-list');
    const startMissionBtn = document.getElementById('start-mission-btn');
    
    // DOM Elements - Settings Modal
    const soundEnabled = document.getElementById('sound-enabled');
    const musicEnabled = document.getElementById('music-enabled');
    const notificationsEnabled = document.getElementById('notifications-enabled');
    const twitchIntegration = document.getElementById('twitch-integration');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    
    // DOM Elements - Loading Overlay
    const loadingOverlay = document.querySelector('.loading-overlay');
    const loadingMessage = document.querySelector('.loading-message');
    
    // Private variables
    let _selectedBuilding = null;
    let _selectedTarget = null;
    let _selectedTanks = [];
    let _gridSize = 10;
    
    /**
     * Initializes the UI
     */
    function init() {
        // Create base grid
        _createBaseGrid();
        
        // Attach event listeners
        _attachEventListeners();
    }
    
    /**
     * Creates the base grid
     */
    function _createBaseGrid() {
        baseGrid.innerHTML = '';
        
        for (let row = 0; row < _gridSize; row++) {
            for (let col = 0; col < _gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                baseGrid.appendChild(cell);
            }
        }
    }
    
    /**
     * Attaches event listeners to UI elements
     */
    function _attachEventListeners() {
        // Login Screen
        loginBtn.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (username) {
                // Call the login function from the Game module
                Game.login(username, password);
            }
        });
        
        registerBtn.addEventListener('click', () => {
            alert('Registration functionality will be available in the full version.');
        });
        
        linkWotBtn.addEventListener('click', () => {
            showModal(wotLinkModal);
        });
        
        // Game Header
        syncWotBtn.addEventListener('click', () => {
            if (WotApi.isAuthenticated()) {
                showLoading('Syncing with World of Tanks...');
                
                WotApi.fetchPlayerTanks()
                    .then(tanks => {
                        Game.updatePlayerTanks(tanks);
                        hideLoading();
                        alert('Tanks synced successfully!');
                    })
                    .catch(error => {
                        hideLoading();
                        alert(`Error syncing tanks: ${error.message}`);
                    });
            } else {
                showModal(wotLinkModal);
            }
        });
        
        settingsBtn.addEventListener('click', () => {
            showModal(settingsModal);
        });
        
        logoutBtn.addEventListener('click', () => {
            Game.logout();
        });
        
        // Navigation
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const viewName = item.dataset.view;
                
                // Remove active class from all nav items and views
                navItems.forEach(navItem => navItem.classList.remove('active'));
                views.forEach(view => view.classList.remove('active'));
                
                // Add active class to clicked nav item and corresponding view
                item.classList.add('active');
                document.getElementById(viewName.replace('View', '-view')).classList.add('active');
            });
        });
        
        // Base View
        buildingItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove selected class from all building items
                buildingItems.forEach(buildingItem => buildingItem.classList.remove('selected'));
                
                // Add selected class to clicked building item
                item.classList.add('selected');
                
                // Set selected building
                _selectedBuilding = item.dataset.building;
            });
        });
        
        // Add event delegation for grid cells
        baseGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('grid-cell') && !e.target.classList.contains('occupied') && _selectedBuilding) {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                
                // Call the placeBuilding function from the Game module
                Game.placeBuilding(_selectedBuilding, row, col);
            }
        });
        
        // Garage View
        importTanksBtn.addEventListener('click', () => {
            if (WotApi.isAuthenticated()) {
                showLoading('Importing tanks from World of Tanks...');
                
                WotApi.fetchPlayerTanks()
                    .then(tanks => {
                        Game.updatePlayerTanks(tanks);
                        renderTanks();
                        hideLoading();
                    })
                    .catch(error => {
                        hideLoading();
                        alert(`Error importing tanks: ${error.message}`);
                    });
            } else {
                showModal(wotLinkModal);
            }
        });
        
        // Missions View
        newMissionBtn.addEventListener('click', () => {
            // Reset mission modal
            _selectedTarget = null;
            targetItems.forEach(item => item.classList.remove('selected'));
            missionDistance.textContent = '-- km';
            missionDuration.textContent = '-- hours';
            requiredGasoline.textContent = '--';
            
            // Render tank selection
            _renderTankSelection();
            
            showModal(newMissionModal);
        });
        
        // WoT Link Modal
        wotAuthBtn.addEventListener('click', () => {
            showLoading('Authenticating with Wargaming...');
            
            WotApi.authenticate()
                .then(playerData => {
                    Game.updatePlayerData(playerData);
                    hideLoading();
                    hideModal(wotLinkModal);
                    updateWotStatus(true);
                })
                .catch(error => {
                    hideLoading();
                    alert(`Authentication error: ${error.message}`);
                });
        });
        
        // New Mission Modal
        targetItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove selected class from all target items
                targetItems.forEach(targetItem => targetItem.classList.remove('selected'));
                
                // Add selected class to clicked target item
                item.classList.add('selected');
                
                // Set selected target
                _selectedTarget = item.dataset.target;
                
                // Update mission details
                _updateMissionDetails(_selectedTarget);
            });
        });
        
        startMissionBtn.addEventListener('click', () => {
            if (!_selectedTarget) {
                alert('Please select a target.');
                return;
            }
            
            if (_selectedTanks.length === 0) {
                alert('Please select at least one tank.');
                return;
            }
            
            // Call the startMission function from the Game module
            Game.startMission(_selectedTarget, _selectedTanks);
            
            // Hide modal
            hideModal(newMissionModal);
        });
        
        // Settings Modal
        saveSettingsBtn.addEventListener('click', () => {
            // Save settings
            Game.updateSettings({
                sound: soundEnabled.checked,
                music: musicEnabled.checked,
                notifications: notificationsEnabled.checked,
                twitchIntegration: twitchIntegration.checked
            });
            
            hideModal(settingsModal);
        });
        
        // Close Modal Buttons
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                hideModal(modal);
            });
        });
        
        // Close modals when clicking outside
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal(modal);
                }
            });
        });
    }
    
    /**
     * Updates mission details based on selected target
     * @param {string} targetId - The target ID
     */
    function _updateMissionDetails(targetId) {
        let distance, duration, gas, rewards;
        
        switch (targetId) {
            case '1':
                distance = '15';
                duration = '2';
                gas = '10';
                rewards = { steel: 50, wood: 30, electronics: 10 };
                break;
            case '2':
                distance = '35';
                duration = '4';
                gas = '20';
                rewards = { steel: 100, wood: 60, electronics: 25 };
                break;
            case '3':
                distance = '60';
                duration = '8';
                gas = '35';
                rewards = { steel: 200, wood: 120, electronics: 50 };
                break;
            default:
                distance = '--';
                duration = '--';
                gas = '--';
                rewards = { steel: '--', wood: '--', electronics: '--' };
        }
        
        missionDistance.textContent = `${distance} km`;
        missionDuration.textContent = `${duration} hours`;
        requiredGasoline.textContent = gas;
        
        // Update rewards
        const rewardItems = document.querySelectorAll('.reward-item span');
        rewardItems[0].textContent = rewards.steel;
        rewardItems[1].textContent = rewards.wood;
        rewardItems[2].textContent = rewards.electronics;
    }
    
    /**
     * Renders tank selection in the mission modal
     */
    function _renderTankSelection() {
        const tanks = WotApi.getPlayerTanks();
        _selectedTanks = [];
        
        if (tanks.length === 0) {
            tankSelectionList.innerHTML = '<div class="empty-message">No tanks available. Import tanks from World of Tanks.</div>';
            return;
        }
        
        tankSelectionList.innerHTML = '';
        
        tanks.forEach(tank => {
            const tankItem = document.createElement('div');
            tankItem.className = 'tank-selection-item';
            tankItem.dataset.tankId = tank.id;
            
            tankItem.innerHTML = `
                <input type="checkbox" id="tank-${tank.id}" class="tank-checkbox">
                <img src="${tank.image}" alt="${tank.name}">
                <div class="tank-info">
                    <h4>${tank.name}</h4>
                    <div class="tank-details">
                        <span class="tank-tier">Tier ${tank.tier}</span>
                        <span class="tank-type">${tank.type}</span>
                        <span class="tank-nation">${tank.nation}</span>
                    </div>
                </div>
            `;
            
            tankSelectionList.appendChild(tankItem);
            
            // Add event listener to checkbox
            const checkbox = tankItem.querySelector('.tank-checkbox');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    _selectedTanks.push(tank.id);
                    tankItem.classList.add('selected');
                } else {
                    _selectedTanks = _selectedTanks.filter(id => id !== tank.id);
                    tankItem.classList.remove('selected');
                }
            });
        });
    }
    
    /**
     * Shows the login screen
     */
    function showLoginScreen() {
        loginScreen.classList.add('active');
        gameScreen.classList.remove('active');
    }
    
    /**
     * Shows the game screen
     */
    function showGameScreen() {
        loginScreen.classList.remove('active');
        gameScreen.classList.add('active');
    }
    
    /**
     * Shows a modal
     * @param {HTMLElement} modal - The modal to show
     */
    function showModal(modal) {
        modal.style.display = 'flex';
    }
    
    /**
     * Hides a modal
     * @param {HTMLElement} modal - The modal to hide
     */
    function hideModal(modal) {
        modal.style.display = 'none';
    }
    
    /**
     * Shows the loading overlay
     * @param {string} message - The loading message
     */
    function showLoading(message = 'Loading...') {
        loadingMessage.textContent = message;
        loadingOverlay.style.display = 'flex';
    }
    
    /**
     * Hides the loading overlay
     */
    function hideLoading() {
        loadingOverlay.style.display = 'none';
    }
    
    /**
     * Updates the player name in the UI
     * @param {string} name - The player name
     */
    function updatePlayerName(name) {
        playerNameEl.textContent = name;
    }
    
    /**
     * Updates the WoT status in the UI
     * @param {boolean} isLinked - Whether the WoT account is linked
     */
    function updateWotStatus(isLinked) {
        if (isLinked) {
            wotStatusEl.textContent = 'Linked';
            wotStatusEl.className = 'status-linked';
        } else {
            wotStatusEl.textContent = 'Not Linked';
            wotStatusEl.className = 'status-unlinked';
        }
    }
    
    /**
     * Updates the resources in the UI
     * @param {Object} resources - The resources object
     */
    function updateResources(resources) {
        steelEl.textContent = resources.steel;
        woodEl.textContent = resources.wood;
        electronicsEl.textContent = resources.electronics;
        gasolineEl.textContent = resources.gasoline;
        baseLevelEl.textContent = resources.baseLevel;
    }
    
    /**
     * Updates the base grid in the UI
     * @param {Array} grid - The base grid
     */
    function updateBaseGrid(grid) {
        const cells = document.querySelectorAll('.grid-cell');
        
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            if (grid[row] && grid[row][col]) {
                const building = grid[row][col];
                cell.classList.add('occupied');
                cell.innerHTML = `<i class="fas ${ _getBuildingIcon(building.type)}"></i>`;
                cell.style.backgroundColor =  _getBuildingColor(building.type);
            } else {
                cell.classList.remove('occupied');
                cell.innerHTML = '';
                cell.style.backgroundColor = '';
            }
        });
    }
    
    /**
     * Gets the icon for a building type
     * @param {string} type - The building type
     * @returns {string} The icon class
     */
    function _getBuildingIcon(type) {
        switch (type) {
            case 'command-center':
                return 'fa-star';
            case 'garage':
                return 'fa-warehouse';
            case 'factory':
                return 'fa-industry';
            case 'defense-tower':
                return 'fa-chess-rook';
            case 'resource-extractor':
                return 'fa-cogs';
            default:
                return 'fa-building';
        }
    }
    
    /**
     * Gets the color for a building type
     * @param {string} type - The building type
     * @returns {string} The color
     */
    function _getBuildingColor(type) {
        switch (type) {
            case 'command-center':
                return 'var(--command-center-color)';
            case 'garage':
                return 'var(--garage-color)';
            case 'factory':
                return 'var(--factory-color)';
            case 'defense-tower':
                return 'var(--defense-tower-color)';
            case 'resource-extractor':
                return 'var(--resource-extractor-color)';
            default:
                return '#ccc';
        }
    }
    
    /**
     * Renders the tanks in the garage view
     */
    function renderTanks() {
        const tanks = WotApi.getPlayerTanks();
        
        if (tanks.length === 0) {
            tankList.innerHTML = '<div class="empty-message">No tanks available. Import tanks from World of Tanks.</div>';
            return;
        }
        
        tankList.innerHTML = '';
        
        tanks.forEach(tank => {
            const tankItem = document.createElement('div');
            tankItem.className = 'tank-item';
            
            tankItem.innerHTML = `
                <img src="${tank.image}" alt="${tank.name}">
                <div class="tank-info">
                    <h4>${tank.name}</h4>
                    <div class="tank-details">
                        <span class="tank-tier">Tier ${tank.tier}</span>
                        <span class="tank-type">${tank.type}</span>
                        <span class="tank-nation">${tank.nation}</span>
                    </div>
                </div>
            `;
            
            tankList.appendChild(tankItem);
        });
    }
    
    /**
     * Renders the missions in the missions view
     * @param {Array} missions - The missions array
     */
    function renderMissions(missions) {
        if (missions.length === 0) {
            missionList.innerHTML = '<div class="empty-message">No active missions. Create a new mission to begin.</div>';
            return;
        }
        
        missionList.innerHTML = '';
        
        missions.forEach(mission => {
            const missionItem = document.createElement('div');
            missionItem.className = 'mission-item';
            
            if (mission.completed) {
                missionItem.classList.add('mission-status-completed');
            }
            
            missionItem.innerHTML = `
                <div class="mission-header">
                    <h4>${mission.name}</h4>
                    <span class="mission-status">${mission.completed ? 'Completed' : 'In Progress'}</span>
                </div>
                <div class="mission-details">
                    <div class="mission-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${mission.target}</span>
                    </div>
                    <div class="mission-detail">
                        <i class="fas fa-clock"></i>
                        <span>${mission.timeRemaining}</span>
                    </div>
                    <div class="mission-detail">
                        <i class="fas fa-tank"></i>
                        <span>${mission.tanks.length} tanks deployed</span>
                    </div>
                </div>
            `;
            
            missionList.appendChild(missionItem);
        });
    }
    
    // Public API
    return {
        init,
        showLoginScreen,
        showGameScreen,
        showModal,
        hideModal,
        showLoading,
        hideLoading,
        updatePlayerName,
        updateWotStatus,
        updateResources,
        updateBaseGrid,
        renderTanks,
        renderMissions
    };
})();