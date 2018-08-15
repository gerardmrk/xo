// tslint:disable:max-classes-per-file no-console
import { settingOptions, requiredSettings } from "./settings";

export class ServerSettingsError extends Error {
  private settingOptions: typeof settingOptions;
  private requiredSettings: typeof requiredSettings;

  public constructor(msg: string) {
    super(msg);
  }

  public printUsage(): void {
    for (const [k, v] of Object.entries(this.settingOptions)) {
      const suffix = this.requiredSettings.includes(k) ? "required" : "optional";
      console.info(`--${k} = (${v.join("|")}) [${suffix}]`);
    }
  }
}

export class MissingSettingError extends ServerSettingsError {
  public constructor(setting: string) {
    super(`--${setting} is required.`);
  }
}

export class UnknownSettingError extends ServerSettingsError {
  public constructor(setting: string) {
    super(`Unknown setting ${setting}`);
  }
}

export class InvalidOptionError extends ServerSettingsError {
  public constructor(setting: string, option: string) {
    super(`Unknown option ${option} provided for ${setting}`);
  }
}
