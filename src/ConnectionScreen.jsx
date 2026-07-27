import React from 'react';

const { Button, Field, Icon, Input } = window.HoursDesignSystem_76f0a9;

export default function ConnectionScreen({ status, error, onConnect, onRetry }) {
  const [accessToken, setAccessToken] = React.useState('');
  const [validation, setValidation] = React.useState('');

  if (status === 'loading') {
    return (
      <main className="connection-screen">
        <div className="connection-panel">
          <div className="connection-mark">Hours<span>.</span></div>
          <div className="connection-status">
            <Icon name="RefreshCw" size={18} />
            <span>Opening your work ledger</span>
          </div>
        </div>
      </main>
    );
  }

  if (status === 'auth') {
    const submit = (event) => {
      event.preventDefault();
      if (!accessToken.trim()) {
        setValidation('Enter the access token configured for this Hours instance.');
        return;
      }
      setValidation('');
      onConnect(accessToken);
    };
    return (
      <main className="connection-screen">
        <form className="connection-panel" onSubmit={submit}>
          <div className="connection-mark">Hours<span>.</span></div>
          <div>
            <h1>Open your ledger</h1>
            <p>Enter the access token from your Docker or server configuration.</p>
          </div>
          <Field label="Access token" error={validation}>
            <Input
              autoFocus
              type="password"
              autoComplete="current-password"
              value={accessToken}
              onChange={(event) => setAccessToken(event.target.value)}
            />
          </Field>
          <Button type="submit" variant="primary" full>Open Hours</Button>
        </form>
      </main>
    );
  }

  return (
    <main className="connection-screen">
      <div className="connection-panel">
        <div className="connection-mark">Hours<span>.</span></div>
        <div>
          <h1>Server unavailable</h1>
          <p>{error || 'Hours could not reach its SQLite service. Check that the server is running.'}</p>
        </div>
        <Button icon="RefreshCw" onClick={onRetry}>Try again</Button>
      </div>
    </main>
  );
}
