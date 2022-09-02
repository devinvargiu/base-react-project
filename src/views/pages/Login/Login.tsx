import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../../../store/slices';
import * as Yup from 'yup';
import BrandLogo from '../../../assets/logo.svg';
import { IdentityState, LoginFormValues, RouterProps } from '../../../types';
import Utils from '../../../utils/utils';
import withRouter from '../../../utils/withRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.scss';

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
    login: (username: string, password: string, rememberMe = false) => {
      dispatch(login({ username, password, rememberMe }));
    },
  };
};

export interface OwnState {
  type: 'text' | 'password';
}

export interface OwnProps {
  login: (username: string, password: string, remember: boolean) => void;
}

export type Props = OwnProps & RouterProps & StateProps & WithTranslationProps;

class Login extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: 'password',
    };
  }

  componentDidMount(): any {
    if (this.props.auth.token !== null) {
      this.props.navigate('/home');
    }
  }

  componentDidUpdate(prevProps: Props): any {
    if (prevProps.auth.token !== this.props.auth.token && this.props.auth.token !== null && this.props.navigate) {
      this.props.navigate('/home');
    }
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            remember: false,
          }}
          validationSchema={Yup.object({
            username: Yup.string().required().min(6),
            password: Yup.string().required().min(8),
          })}
          onSubmit={(values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
            actions.setSubmitting(false);
            this.props.login(values.username, values.password, values.remember);
          }}
        >
          {({ handleSubmit, handleChange, touched, values, errors }) => (
            <Form className="form-signin" onSubmit={handleSubmit} noValidate={true} method="post">
              <img className="brand-logo mb-1" src={BrandLogo} alt="" width="100" height="100" />

              <h1 className="h3 mb-2 font-weight-normal text-center">Please sign in</h1>

              {this.props.auth.error !== null && (
                <div className="text-center text-danger">{this.props.auth.error.message}</div>
              )}

              <div className="wrapper-signin-controls">
                <Form.Group className="mt-3" controlId="username">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={Utils.validator([errors.username, touched.username])}
                    required={true}
                    minLength={6}
                  />
                  {errors.username && touched.username ? (
                    <Form.Text className="text-danger">{errors.username}</Form.Text>
                  ) : (
                    <Form.Text className="text-muted">username min length is 6</Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mt-3 form-password" controlId="password">
                  <Form.Control
                    type={this.state.type}
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={Utils.validator([errors.password, touched.password])}
                    required={true}
                    minLength={8}
                  />
                  <div className="form-password--revel-toggler text-muted">
                    {this.state.type === 'password' ? (
                      <FontAwesomeIcon
                        className="ui-icon"
                        icon={faEyeSlash}
                        onClick={() => this.setState({ type: 'text' })}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="ui-icon"
                        icon={faEye}
                        onClick={() => this.setState({ type: 'password' })}
                      />
                    )}
                  </div>

                  {errors.password && touched.password ? (
                    <Form.Text className="text-danger no-select">{errors.password}</Form.Text>
                  ) : (
                    <Form.Text className="text-muted no-select">password min length is 8</Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mt-3" controlId="remember">
                  <Form.Check
                    label="Remember me"
                    name="remember"
                    value={Number(values.remember)}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className="mt-3 w-100" variant="primary" type="submit">
                  Login
                </Button>
              </div>

              <p className="mt-4 mb-3 align-self-center text-muted">2022-2023</p>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Login)));
