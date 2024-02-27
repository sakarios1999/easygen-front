import { dashboardNameSpace } from "../features/dashboard/dashboard.i18n";
import { landingNameSpace } from "../features/landing/landing.i18n";

/**
 * English translation resources.
 * Each object correspond to a namespace related to a feature.
 */
let en = {
  landing: landingNameSpace.en,
  dashboard: dashboardNameSpace.en,

  common: {
    // Commands
    AUTHENTICATE: "Authenticate",
    REGISTER: "Register",
    LOG_IN: "Log In",
    LOG_OUT: "Log Out",
    RESET: "Reset",
    EDIT: "Edit",
    BACK: "Back",
    RESEND: "Resend",
    VERIFY: "Verify",

    // Labels
    EMAIL_LABEL: "Email address",
    MOBILE_LABEL: "Mobile number",
    PASSWORD_LABEL: "Password",

    // Placeholders
    EMAIL_PLACEHOLDER: "someone@example.com",
    MOBILE_PLACEHOLDER: "03112233",
    PASSWORD_PLACEHOLDER: "********",

    // Messages
    _404: "Sorry, the page you requested does not exist.",
  },
};

export default en;
