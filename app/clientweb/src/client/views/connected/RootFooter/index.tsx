import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Header, Select, Container, DropdownProps } from "semantic-ui-react";

import styles from "./styles.less";
import withSettings, { InjectedSettingsProps } from "@client/views/wrappers/withSettings";
import withIntlSettings, { InjectedIntlSettingsProps } from "@client/views/wrappers/withIntlSettings"; // prettier-ignore

export type Props = InjectedIntlProps & InjectedSettingsProps & InjectedIntlSettingsProps & {};

export type State = {};

export class RootFooter extends React.PureComponent<Props, State> {
  private languageOptions: { text: string; value: string }[];

  public constructor(props: Props) {
    super(props);

    this.languageOptions = this.props.intlSettings.supportedLanguages.map((langCode: string) => ({
      text: langCode,
      value: langCode
    }));
  }

  // prettier-ignore
  private onLanguageChange = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps): void => {
    this.props.intlSettings.setLocale(value as string);
  };

  public render(): React.ReactNode {
    const {
      intlSettings: { locale },
      settings: {
        app: { name }
      }
    } = this.props;

    return (
      <footer className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.colTitle}>
            <Header as={"h3"}>{name}</Header>
          </div>

          <div className={styles.colLangOptions}>
            <Select
              value={locale}
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
