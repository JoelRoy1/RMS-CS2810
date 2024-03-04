import React, { useState } from "react";
import "styles/CustomerLoginPage.css";
function CustomerLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [error, setError] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [receiveMenuUpdate, setReceiveMenuUpdate] = useState(false);
  const [reserveTable, setReserveTable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isForgotPassword) {
      // Simulate sending reset password link to the provided email
      console.log(`Reset password link sent to ${email}`);
      // Reset the form after sending the link
      setEmail("");
      setIsForgotPassword(false);
      return;
    }

    if (isGuest) {
      if (!tableNumber.trim()) {
        setError("Please enter the table number.");
        return;
      }
      // Handle guest login
      console.log(`Guest login successful for table ${tableNumber}!`);
      setError(null);
    } else {
      // Simulate backend authentication (replace with your actual logic)
      const isAuthenticated = username === "test" && password === "password123";

      if (isAuthenticated) {
        // Handle successful login
        console.log("Login successful!");

        if (receiveMenuUpdate) {
          // Simulate sending menu update notification
          sendMenuUpdateNotification();
        }

        if (reserveTable) {
          // Simulate table reservation
          reserveTableForUser();
        }

        setError(null); // Clear any previous errors
      } else {
        setError("Invalid username or password. Please try again.");
      }
    }
  };

  const sendNotificationEmail = () => {
    // Simulate sending email notification with offer details
    const offerMessage = "£10 off your next 5 orders* till [Offer End Date].";
    const loyaltyPointsMessage = "You have earned 100 loyalty points.";
    const emailMessage = `${offerMessage}\n${loyaltyPointsMessage}`;
    console.log("Notification email sent to", email, ":", emailMessage);
  };

  const sendMenuUpdateNotification = () => {
    // Simulate sending menu update notification
    console.log("Menu update notification sent.");
  };

  const reserveTableForUser = () => {
    // Simulate table reservation
    console.log(`Table reserved for user ${username}.`);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {!isForgotPassword && (
        <>
          {!isGuest && (
            <>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="receiveMenuUpdate"
                  checked={receiveMenuUpdate}
                  onChange={() => setReceiveMenuUpdate(!receiveMenuUpdate)}
                />
                <label htmlFor="receiveMenuUpdate">Receive Menu Update Notifications</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="reserveTable"
                  checked={reserveTable}
                  onChange={() => setReserveTable(!reserveTable)}
                />
                <label htmlFor="reserveTable">Reserve a Table</label>
              </div>
            </>
          )}
          <div className="text-right">
            {!isGuest && (
              <button className="forgot-password" onClick={() => setIsForgotPassword(true)}>
                Forgot Password?
              </button>
            )}
            <button className="login-button" type="submit">
              {isGuest ? "Guest Login" : "Login"}
            </button>
            {!isGuest && (
              <input
                type="checkbox"
                id="isGuest"
                checked={isGuest}
                onChange={() => setIsGuest(!isGuest)}
              />
            )}
            <label htmlFor="isGuest">Login as Guest</label>
          </div>
        </>
      )}
      {isForgotPassword && (
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-right">
            <button className="reset-password-button" type="submit">
              Send Reset Password Link
            </button>
            <button className="cancel-button" onClick={() => setIsForgotPassword(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {isGuest && (
        <div className="form-group">
          <label htmlFor="tableNumber">Table Number:</label>
          <input
            type="text"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
          <div className="text-right">
            <button className="login-button" type="submit">
              Guest Login
            </button>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default CustomerLoginPage;

