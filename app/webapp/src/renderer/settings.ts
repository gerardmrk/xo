import { UnknownSettingError, InvalidOptionError, MissingSettingError } from "@renderer/errors";

export interface Settings {
  mode: string;
  addr?: string;
}

export const settingOptions: { [k: string]: string[] } = {
  _: [],
  mode: ["uds", "http"],
  addr: []
};

export const requiredSettings: string[] = ["mode", "addr"];

export const validateSettings = (settings: { [k: string]: string }) => {
  for (const [s, opt] of Object.entries(settings)) {
    const options: string[] = settingOptions[s];

    if (!options) {
      throw new UnknownSettingError(s);
    }

    if (options.length !== 0 && !options.includes(opt)) {
      throw new InvalidOptionError(s, opt);
    }
  }

  for (let snames = Object.keys(settings), ln = requiredSettings.length, i = 0; i < ln; i++) {
    if (!snames.includes(requiredSettings[i])) {
      throw new MissingSettingError(requiredSettings[i]);
    }
  }
};

export const printUsage = () => {};
