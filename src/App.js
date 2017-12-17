import './App.less';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthRoute from './routes/AuthRoute';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import HelloPage from './pages/hello/HelloPage';
import { Layout, Menu, Icon, Button } from 'antd';
import { USER_LOGOUT } from './actionTypes/authType';
const { Header, Sider, Content } = Layout;

class App extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired
  };

  state = {
    collapsed: false
  };

  componentWillReceiveProps () {
    this.setState({ selectedKeys: [ this.props.history.location.pathname ] });
  }

  componentDidMount () {
    this.setState({ selectedKeys: [ this.props.history.location.pathname ] });
  }

  handleMenuVisibleToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      selectedKeys: []
    });
  };

  handleMenuClick = (item) => {
    this.setState({ selectedKeys: [ item.key ] });
  };

  render () {
    const { currentUser, dispatch, history } = this.props;

    return (
      <Router history={this.props.history}>
        <Switch>
          <Route path="/auth/login" component={LoginPage} />
          <Route>
            <Layout id="admin" className="AppLayout">
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.handleMenuVisibleToggle}
                />
                <h1 className="logo-title">React Admin Kit</h1>
                <div className="current-user">
                  <span>{currentUser.username}</span>
                  <Button icon="logout" onClick={() => dispatch({ type: USER_LOGOUT, history })}>로그아웃</Button>
                </div>
              </Header>
              <Layout>
                <Sider
                  className="sidebar"
                  trigger={null}
                  collapsible
                  collapsedWidth={0}
                  collapsed={this.state.collapsed}
                >
                  <div className="header">Menu</div>
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={[ '', '/' ]}
                        selectedKeys={this.state.selectedKeys} onClick={this.handleMenuClick}>
                    <Menu.Item key="/">
                      <NavLink to="/">
                        <Icon type="appstore-o"/>
                        <span className="nav-text">Home</span>
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/hello">
                      <NavLink to="/hello">
                        <Icon type="appstore-o"/>
                        <span className="nav-text">Hello</span>
                      </NavLink>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout>
                  <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <Switch>
                      <AuthRoute path="/hello" component={HelloPage}/>
                      <AuthRoute path="/" component={DashboardPage}/>
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </Route>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(App);
