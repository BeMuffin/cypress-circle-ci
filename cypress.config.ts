import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv';
dotenv.config()

export default defineConfig({
  e2e: {
    env:{
      BASE_URL:process.env.CYPRESS_BASE_URL,
    },
    // baseUrl:process.env.CYPRESS_BASE_URL,
    supportFile: 'cypress/support/index.ts',
    video: true,
    screenshotsFolder: 'cypress/screenshots',
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
