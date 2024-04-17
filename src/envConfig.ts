// When we cannot use import dot meta dot env (e.g. in stackBlitz),
// this file is used to create "environment variables" on the
// fly. (For stackblitz it's overwritten before deploying.)

export const envConfig = {
  TINAD_IMAGE_LOCATION:           'https://raw.githubusercontent.com/willkessler/this-is-not-a-drill-examples/main/public/',
  TINAD_API_BASE_URL:             import.meta.env.VITE_TINAD_API_BASE_URL,
  TINAD_ENDUSER_ID:               import.meta.env.VITE_TINAD_ENDUSER_ID,
  TINAD_API_KEY:                  import.meta.env.VITE_TINAD_API_KEY,  // must be set actively to use TINAD
  TINAD_IS_DEMO_SITE:             import.meta.env.VITE_TINAD_IS_DEMO_SITE, // set to true if in use in the iframe demo site. Set to false if you are using this demo standalone.
  TINAD_IS_STACKBLITZ_PLAYGROUND: import.meta.env.VITE_TINAD_IS_STACKBLITZ_PLAYGROUND, // set to true if demo site is in use in stackblitz playground
  TINAD_DASHBOARDPANEL_URL:       import.meta.env.VITE_TINAD_DASHBOARDPANEL_URL,
  TINAD_DEMOPANEL_URL:            import.meta.env.VITE_TINAD_DEMOPANEL_URL,
};
