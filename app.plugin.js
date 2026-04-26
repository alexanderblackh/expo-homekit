const { withEntitlementsPlist, withInfoPlist } = require("@expo/config-plugins");

/**
 * Adds the HomeKit entitlement and NSHomeKitUsageDescription to the iOS project.
 *
 * Usage in app.json:
 *   ["@alexanderblackh/expo-homekit"]
 *   ["@alexanderblackh/expo-homekit", { "usageDescription": "Control your smart home." }]
 */
function withExpoHomekit(config, options = {}) {
  const usageDescription =
    options.usageDescription ??
    "This app uses HomeKit to control and monitor your smart home devices.";

  config = withEntitlementsPlist(config, (cfg) => {
    cfg.modResults["com.apple.developer.homekit"] = true;
    return cfg;
  });

  config = withInfoPlist(config, (cfg) => {
    cfg.modResults["NSHomeKitUsageDescription"] = usageDescription;
    return cfg;
  });

  return config;
}

module.exports = withExpoHomekit;
