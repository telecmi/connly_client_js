# Connly SDK

Connly SDK is a client-side JavaScript SDK , designed to facilitate real-time communication features such as messaging, typing indicators, user presence, and more. It provides an easy-to-use interface for developers to integrate real-time functionalities into their applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Importing Connly](#importing-connly)
  - [Initialization](#initialization)
- [Usage](#usage)
  - [Connection Events](#connection-events)
  - [User Status](#user-status)
  - [Messaging](#messaging)
  - [Typing Indicators](#typing-indicators)
  - [Read Receipts](#read-receipts)
  - [Delivery Receipts](#delivery-receipts)
  - [Call Actions](#call-actions)
  - [Presence](#presence)
  - [Error Handling](#error-handling)
- [API Reference](#api-reference)
- [License](#license)

## Features

- **Real-time Messaging**: Send and receive messages instantly.
- **User Presence**: Track user statuses like online, offline, etc.
- **Typing Indicators**: Show when a user is typing.
- **Read and Delivery Receipts**: Confirm message delivery and read status.
- **Call Actions**: Handle call-related events.
- **Error Handling**: Capture and handle connection errors.

## Installation

Install Connly via npm:

```bash
npm install connly
```

## Getting Started

### Importing Connly

Import Connly into your project using ES6 import syntax:

```javascript
import Connly from 'connly';
```

If you're using CommonJS modules, you can use:

```javascript
const Connly = require('connly');
```

### Initialization

Create an instance of Connly by providing the server URL and an authentication token:

```javascript
const serverUrl = 'https://your-socket-server.com';
const token = 'your-authentication-token';

const connly = new Connly(serverUrl, token);
```

## Usage

### Connection Events

Handle connection and disconnection events:

```javascript
connly.onConnect(({ isConnected }) => {
  console.log('Connected:', isConnected);
});

connly.onDisconnect(({ isConnected }) => {
  console.log('Disconnected:', isConnected);
});
```

### User Status

Set and listen for user status changes:

```javascript
// Set your status
connly.setStatus('online'); // Status can be 'online', 'offline', etc.

// Listen for status updates
connly.onStatus((data) => {
  console.log('User status updated:', data);
});
```

### Messaging

Send and receive messages:

```javascript
// Send a message
const messageContent = {
  to: 'recipientUserId',
  message: 'Hello, how are you?',
};
connly.sendMessage(messageContent, (ack) => {
  console.log('Message sent acknowledgment:', ack);
});

// Listen for incoming messages
connly.onMessage((data) => {
  console.log('Received message:', data);
});
```

### Typing Indicators

Send and receive typing status:

```javascript
// Send typing status
const typingDetails = {
  to: 'recipientUserId',
  isTyping: true,
};
connly.sendTypingStatus(typingDetails);

// Listen for typing status updates
connly.onTypingStatus((data) => {
  console.log('Typing status:', data);
});
```

### Read Receipts

Send and receive read receipts:

```javascript
// Send read receipt
const readReceiptDetails = {
  messageId: 'messageId123',
  readerId: 'yourUserId',
};
connly.sendReadReceipt(readReceiptDetails);

// Listen for read receipts
connly.onReadReceipt((data) => {
  console.log('Read receipt received:', data);
});
```

### Delivery Receipts

Listen for delivery receipts:

```javascript
connly.onDeliveryReceipt((data) => {
  console.log('Delivery receipt received:', data);
});
```

### Call Actions

Handle call-related events:

```javascript
// Listen for call actions
connly.onCallAction((data) => {
  console.log('Call action received:', data);
});
```

### Presence

Listen for presence updates:

```javascript
connly.onPresence((data) => {
  console.log('User presence updated:', data);
});
```

### Error Handling

Handle connection errors:

```javascript
connly.onError((error) => {
  console.error('An error occurred:', error);
});
```

## API Reference

### Constructor

```javascript
new Connly(serverUrl, token)
```

- **`serverUrl`**: The URL of the Socket.IO server.
- **`token`**: Authentication token for secure connection.

### Methods

#### Connection Methods

- **`onConnect(callback)`**
  - **`callback`**: Function called when the connection is established.
- **`onDisconnect(callback)`**
  - **`callback`**: Function called when the connection is lost.
- **`disconnect()`**
  - Manually disconnects from the server.

#### User Status Methods

- **`setStatus(status)`**
  - **`status`**: String representing the user's status.
- **`onStatus(callback)`**
  - **`callback`**: Function called when a status update is received.

#### Messaging Methods

- **`sendMessage(messageContent, callback)`**
  - **`messageContent`**: Object containing message details.
  - **`callback`**: Optional function called upon acknowledgment.
- **`onMessage(callback)`**
  - **`callback`**: Function called when a message is received.

#### Typing Status Methods

- **`sendTypingStatus(details)`**
  - **`details`**: Object containing typing status details.
- **`onTypingStatus(callback)`**
  - **`callback`**: Function called when typing status is received.

#### Read Receipt Methods

- **`sendReadReceipt(details)`**
  - **`details`**: Object containing read receipt details.
- **`onReadReceipt(callback)`**
  - **`callback`**: Function called when a read receipt is received.

#### Delivery Receipt Methods

- **`onDeliveryReceipt(callback)`**
  - **`callback`**: Function called when a delivery receipt is received.

#### Call Action Methods

- **`onCallAction(callback)`**
  - **`callback`**: Function called when a call action is received.

#### Presence Methods

- **`onPresence(callback)`**
  - **`callback`**: Function called when presence information is received.

#### Error Handling

- **`onError(callback)`**
  - **`callback`**: Function called when an error occurs.

## License

Connly SDK is released under the [MIT License](LICENSE).

---

For any questions or support, please contact [info@telecmi.com](mailto:info@telecmi.com).