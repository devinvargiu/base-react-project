import React from 'react';

export interface Props {
  title?: string;
  errorCode?: string | number;
}

class ErrorMessage extends React.Component<Props> {
  render() {
    const { title, errorCode } = this.props;
    return (
      <div className="error-message">
        <div className="error-message__icon">{/*  <IconError size={144} /> */}</div>
        {title && (
          <div className="error-message__title">
            <p>{title}</p>
          </div>
        )}
        {errorCode && (
          <div className="error-message__errorCode">
            <p>Error code: {errorCode}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorMessage;
