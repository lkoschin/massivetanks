/**
 * Massive Tanks: Armored Command
 * Main Application Module
 * 
 * This is the main entry point for the application.
 */

const App = (function() {
    /**
     * Initializes the application
     */
    function init() {
        console.log('Initializing Massive Tanks: Armored Command...');
        
        // Initialize UI
        UI.init();
        
        // Initialize Game
        Game.init();
        
        // Add event listener for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM fully loaded and parsed');
        });
        
        console.log('Initialization complete');
    }
    
    /**
     * Resets all application data
     */
    function resetAllData() {
        Game.resetAllData();
    }
    
    // Public API
    return {
        init,
        resetAllData
    };
})();

// Initialize the application when the window loads
window.addEventListener('load', () => {
    App.init();
});