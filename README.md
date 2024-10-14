

# Connly SDK

Connly SDK is a client-side JavaScript SDK, designed to facilitate real-time communication features such as messaging, typing indicators, user presence, and more. It provides an easy-to-use interface for developers to integrate real-time functionalities into their applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Importing Connly](#importing-connly)
  - [Initialization](#initialization)
  - [Connection](#connection)
- [Usage](#usage)
  - [Connection Events](#connection-events)
  - [User Status](#user-status)
  - [Messaging](#messaging)
    - [Message Format for Different Services](#message-format-for-different-services)
  - [Typing Indicators](#typing-indicators)
  - [Read Receipts](#read-receipts)
  - [Delivery Receipts](#delivery-receipts)
  - [Call Actions](#call-actions)
  - [Presence](#presence)
  - [Error Handling](#error-handling)
  - [Disconnect](#disconnect)
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

### Connection

To establish a connection, call the `connect()` method after initializing the Connly instance:

```javascript
connly.connect();
```

This ensures that a new connection is created. If there's an existing connection, it will be disconnected before creating a new one.

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
  "message_id": "345e6789-g09c-34e5-c678-636819384002",
  "receiver_id": "765e4321-g32b-34e5-c678-636819384789",
  "service": "text",
  "type": "msg",
  "content": "Hello, this is a text message via the in-app text service!"
}
connly.sendMessage(messageContent, (ack) => {
  console.log('Message sent acknowledgment:', ack);
});

// Listen for incoming messages
connly.onMessage((data) => {
  console.log('Received message:', data);
});
```

#### Message Format for Different Services

The message format varies depending on the service (`text`, `sms`, `whatsapp`) and the type (`msg`, `image`, `video`, etc.). Below are the detailed examples of how to send messages for text and image formats across different services.

##### Text Message Format

For a simple text message, the `service` would be `sms`, `text`, or `whatsapp`, and the `type` would be `msg`. You only need to include the message content and basic fields.

###### Example 1: Text Message for SMS

```json
{
  "message_id": "123e4567-e89b-12d3-a456-426614174000",
  "receiver_id": "987e6543-e21b-12d3-a456-426614174123",
  "service": "sms",
  "type": "msg",
  "content": "Hello, this is a text message via SMS!"
}
```

###### Example 2: Text Message for WhatsApp

```json
{
  "message_id": "234e5678-f98b-23d4-b567-526718274001",
  "receiver_id": "876e5432-f21b-23d4-b567-526718274456",
  "service": "whatsapp",
  "type": "msg",
  "content": "Hello, this is a text message via WhatsApp!"
}
```

###### Example 3: Text Message for an In-App Text Service

```json
{
  "message_id": "345e6789-g09c-34e5-c678-636819384002",
  "receiver_id": "765e4321-g32b-34e5-c678-636819384789",
  "service": "text",
  "type": "msg",
  "content": "Hello, this is a text message via the in-app text service!"
}
```

##### Image Message Format

For image messages, the `service` can be `whatsapp` or `text`, and the `type` would be `image`. You need to include the file URL and optionally the file details.

###### Example 1: Image Message for WhatsApp

```json
{
  "message_id": "456e789a-h10d-45f6-d789-746920495003",
  "receiver_id": "654e3210-h43c-45f6-d789-746920495123",
  "service": "whatsapp",
  "type": "image",
  "content": "Here is an image via WhatsApp!",
  "file_url": "https://example.com/image.jpg",
  "file_details": [
    {
      "file_name": "image.jpg",
      "file_type": "jpg",
      "file_size": 2048,
      "file_url": "https://example.com/image.jpg"
    }
  ]
}
```

###### Example 2: Image Message for an In-App Text Service

```json
{
  "message_id": "567f89ab-i21e-56g7-e890-857931516004",
  "receiver_id": "543f2109-i54d-56g7-e890-857931516456",
  "service": "text",
  "type": "image",
  "content": "Check out this image in our app!",
  "file_url": "https://example.com/image.jpg",
  "file_details": [
    {
      "file_name": "image.jpg",
      "file_type": "jpg",
      "file_size": 1024,
      "file_url": "https://example.com/image.jpg"
    }
  ]
}
```

---

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

### Disconnect

Manually disconnect from the server:

```javascript
connly.disconnect();
```

This will terminate the current socket connection and ensure the system is ready for reconnection if needed.



## API Reference

### Constructor

```javascript
new Connly(serverUrl, token)
```

- **`serverUrl`**: The URL of the Socket.IO server.
- **`token`**: Authentication token for secure connection.

### Methods

#### Connection Methods

- **`connect()`**: Establishes a new connection. If an existing connection is present, it will first disconnect.
- **`onConnect(callback)`**
  - **`callback`**: Function called when the connection is established.
  - Example:
    ```javascript
    connly.onConnect(({ isConnected }) => {
      console.log('Connected:', isConnected);
    });
    ```
- **`onDisconnect(callback)`**
  - **`callback`**: Function called when the connection is lost.
  - Example:
    ```javascript
    connly.onDisconnect(({ isConnected }) => {
      console.log('Disconnected:', isConnected);
    });
    ```
- **`disconnect()`**: Manually disconnects from the server.
  - Example:
    ```javascript
    connly.disconnect();
    ```

#### User Status Methods

- **`setStatus(status)`**
  - **`status`**: String representing the user's status (e.g., 'online', 'offline').
  - Example:
    ```javascript
    connly.setStatus('online');
    ```
- **`onStatus(callback)`**
  - **`callback`**: Function called when a status update is received.
  - Example:
    ```javascript
    connly.onStatus((data) => {
      console.log('User status updated:', data);
    });
    ```

#### Messaging Methods

- **`sendMessage(messageContent, callback)`**
  - **`messageContent`**: Object containing message details. Must include fields like `to` (recipient user ID) and `message` (message text).
  - **`callback`**: Optional function called upon acknowledgment.
  - Example:
    ```javascript
    const messageContent = {
      to: 'recipientUserId',
      message: 'Hello, how are you?',
    };

    connly.sendMessage(messageContent, (ack) => {
      console.log('Message sent acknowledgment:', ack);
    });
    ```
- **`onMessage(callback)`**
  - **`callback`**: Function called when a message is received.
  - Example:
    ```javascript
    connly.onMessage((data) => {
      console.log('Received message:', data);
    });
    ```

Here is the **reaction-related method** in the README format, as requested:

---

### Reaction Methods

#### **sendReaction(reaction, callback)**
Send a reaction to a specific message. This could be an emoji or any other type of reaction (e.g., like).

- **Parameters**:
  - `reaction`: An object containing the reaction details such as `message_id`, `user_id`, `reaction_type`, `content`, and `service`.
  - `callback`: An optional function that will be called when the reaction is acknowledged.

##### Example:
```javascript
const reaction = {
  message_id: "123e4567-e89b-12d3-a456-426614174000",
  reaction_type:  "👍"
};

connly.sendReaction(reaction, (ack) => {
  console.log('Reaction sent acknowledgment:', ack);
});
```

#### **onReaction(callback)**
Listen for incoming reactions on messages. This method triggers the `callback` whenever a new reaction is received.

- **Parameters**:
  - `callback`: A function that is called with the reaction data when a reaction is received.

##### Example:
```javascript
connly.onReaction((data) => {
  console.log('Reaction received:', data);
});
```


#### Typing Status Methods

- **`sendTypingStatus(details)`**
  - **`details`**: Object containing typing status information. Must include `to` (recipient user ID) and `isTyping` (boolean).
  - Example:
    ```javascript
    const typingDetails = {
      to: 'recipientUserId',
      isTyping: true,
    };

    connly.sendTypingStatus(typingDetails);
    ```
- **`onTypingStatus(callback)`**
  - **`callback`**: Function called when typing status is received.
  - Example:
    ```javascript
    connly.onTypingStatus((data) => {
      console.log('Typing status:', data);
    });
    ```

#### Read Receipt Methods

- **`sendReadReceipt(details)`**
  - **`details`**: Object containing read receipt details, such as `messageId` and `readerId`.
  - Example:
    ```javascript
    const readReceiptDetails = {
      messageId: 'messageId123',
      readerId: 'yourUserId',
    };

    connly.sendReadReceipt(readReceiptDetails);
    ```
- **`onReadReceipt(callback)`**
  - **`callback`**: Function called when a read receipt is received.
  - Example:
    ```javascript
    connly.onReadReceipt((data) => {
      console.log('Read receipt received:', data);
    });
    ```

#### Delivery Receipt Methods

- **`onDeliveryReceipt(callback)`**
  - **`callback`**: Function called when a delivery receipt is received.
  - Example:
    ```javascript
    connly.onDeliveryReceipt((data) => {
      console.log('Delivery receipt received:', data);
    });
    ```

#### Call Action Methods

- **`onCallAction(callback)`**
  - **`callback`**: Function called when a call action (like a start or end of a call) is received.
  - Example:
    ```javascript
    connly.onCallAction((data) => {
      console.log('Call action received:', data);
    });
    ```

#### Presence Methods

- **`onPresence(callback)`**
  - **`callback`**: Function called when presence information (e.g., user is online/offline) is received.
  - Example:
    ```javascript
    connly.onPresence((data) => {
      console.log('User presence updated:', data);
    });
    ```

#### Error Handling

- **`onError(callback)`**
  - **`callback`**: Function called when an error occurs.
  - Example:
    ```javascript
    connly.onError((error) => {
      console.error('An error occurred:', error);
    });
    ```

---
