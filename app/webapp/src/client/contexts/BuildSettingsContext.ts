/**
 * React context for build settings
 *
 * provides app settings to all components
 */
import * as React from "react";

export interface BuildSettings {
  readonly devMode: boolean;
  readonly enableDevTools: boolean;
  readonly enableDebugger: boolean;
  readonly enableSourceMaps: boolean;
}

// prettier-ignore
export const BuildSettingsContext: React.Context<BuildSettings> = React.createContext<BuildSettings>({
  devMode: false,
  enableDevTools: false,
  enableDebugger: false,
  enableSourceMaps: false
});

export default BuildSettingsContext;
