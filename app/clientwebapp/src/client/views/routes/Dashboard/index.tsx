import * as React from "react";
import { Menu, Input } from "semantic-ui-react";
// import { connect } from "react-redux";

import styles from "./styles.less";

export interface Props {}

export interface State {}

export class Dashboard extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <Menu vertical={true}>
          <Menu.Item>
            <Menu.Header>{"Dashboard"}</Menu.Header>
            <Menu.Menu>
              <Menu.Item>
                <Input placeholder={"Search"} />
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>{"Users"}</Menu.Header>
            <Menu.Menu>
              <Menu.Item>{"Active"}</Menu.Item>
              <Menu.Item>{"Missing"}</Menu.Item>
              <Menu.Item>{"Dead"}</Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>{"Monitoring"}</Menu.Header>
            <Menu.Menu>
              <Menu.Item>{"Logs"}</Menu.Item>
              <Menu.Item>{"Traces"}</Menu.Item>
              <Menu.Item>{"Metrics"}</Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>{"Cloud Services"}</Menu.Header>
            <Menu.Menu>
              <Menu.Item>{"Vault US"}</Menu.Item>
              <Menu.Item>{"Vault EU"}</Menu.Item>
              <Menu.Item>{"Nomad Swarm"}</Menu.Item>
              <Menu.Item>{"Consul Cluster"}</Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>{"Inventory"}</Menu.Header>
            <Menu.Menu>
              <Menu.Item>{"Poutine"}</Menu.Item>
              <Menu.Item>{"Carbonara"}</Menu.Item>
              <Menu.Item>{"Mee Goreng"}</Menu.Item>
              <Menu.Item>{"Ramen"}</Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>{"Food"}</Menu.Header>
            <Menu.Menu>
              <Menu.Item>{"Im"}</Menu.Item>
              <Menu.Item>{"Actually"}</Menu.Item>
              <Menu.Item>{"Really"}</Menu.Item>
              <Menu.Item>{"Hungry"}</Menu.Item>
              <Menu.Item>{"Right"}</Menu.Item>
              <Menu.Item>{"Now"}</Menu.Item>
              <Menu.Item>{"Might"}</Menu.Item>
              <Menu.Item>{"Get"}</Menu.Item>
              <Menu.Item>{"Pizza"}</Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Dashboard;
