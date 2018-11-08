import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Container, Header, Select, DropdownProps } from "semantic-ui-react";

import styles from "./styles.less";
import withSettings, {
  InjectedSettingsProps
} from "@client/views/wrappers/withSettings";
import withIntlSettings, {
  InjectedIntlSettingsProps
} from "@client/views/wrappers/withIntlSettings";

export type Props = {};

export type State = {};

class RootFooter extends React.Component<
  Props & InjectedIntlProps & InjectedSettingsProps & InjectedIntlSettingsProps,
  State
> {
  private languageOptions: { text: string; value: string }[];

  public constructor(
    props: Props &
      InjectedIntlProps &
      InjectedSettingsProps &
      InjectedIntlSettingsProps
  ) {
    super(props);

    this.languageOptions = this.props.intlSettings.supportedLanguages.map(
      (langCode: string) => ({
        text: langCode,
        value: langCode
      })
    );
  }

  private onLanguageChange = (
    e: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ): void => {
    this.props.intlSettings.setLocale(value as string);
  };

  public render(): React.ReactNode {
    const { settings, intlSettings } = this.props;

    return (
      <footer className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.colTitle}>
            <Header>{settings.app.name}</Header>
          </div>

          <div className={styles.colLangOptions}>
            <Select
              value={intlSettings.locale}
              compact={true}
              options={this.languageOptions}
              onChange={this.onLanguageChange}
            />
          </div>
        </Container>
      </footer>
    );
  }
}

export default withSettings(withIntlSettings(injectIntl(RootFooter)));
