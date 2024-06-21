const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Cambia el puerto según sea necesario
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
