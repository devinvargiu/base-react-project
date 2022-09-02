import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { logout } from '../../../store';
import { IdentityState, RouterProps } from '../../../types';
import withRouter from '../../../utils/withRouter';
import BrandLogo from '../../../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export interface StateProps {
  auth: IdentityState;
}

export const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => {
      dispatch(logout({}));
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OwnState {}
export interface OwnProps {
  logout: () => void;
}

export type Props = OwnProps & RouterProps & StateProps & WithTranslationProps;

class Home extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand className="me-5" href="/home">
              <img alt="" src={BrandLogo} width="30" height="30" className="d-inline-block align-top" />
              React Application
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Views" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown
                  title={
                    <>
                      <FontAwesomeIcon className="me-2" icon={faUser} />
                      {this.props.auth.username}
                    </>
                  }
                  id="navbarUserDropdown"
                >
                  <NavDropdown.Item onClick={() => this.props.logout()}>Logout</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>v 0.1.0</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container fluid>
          <h2 className="mt-2">Home Page</h2>
        </Container>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Home)));
