import AppTypes from "AppTypes";

export const appSettings: AppTypes.Injected.AppSettings = {
  name: "Arkansas",
  description: "No country for old men",
  supportedBrowsers: ["last 2 versions"],
  appURL: {
    development: "http://localhost:4200",
    staging: "https://app-staging.arkansas.com",
    production: "https://app.arkansas.com"
  },
  sitemap: {
    general: [
      { label: "about", link: "https://www.arkansas.com/about" },
      { label: "faq", link: "https://www.arkansas.com/faq" }
    ],
    legal: [
      { label: "terms of services", link: "https://www.arkansas.com/terms-of-services" },
      { label: "privacy policy", link: "https://www.arkansas.com/privacy-policy" },
      { label: "service agreement", link: "https://www.arkansas.com/service-agreement" }
    ]
  }
};
