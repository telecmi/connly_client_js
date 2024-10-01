import io from 'socket.io-client';

export default class ConnlySDK {
    constructor( serverUrl, token ) {

        // Initialize Socket.IO client internally
        this.socket = io( serverUrl, {
            query: {
                token: token,
            },
        } );

        this.isConnected = false;

        // Handle connection events
        this.socket.on( 'connect', () => {
            this.isConnected = true;
            if ( this.onConnectCallback ) this.onConnectCallback( { isConnected: this.isConnected } );
        } );

        this.socket.on( 'disconnect', () => {
            this.isConnected = false;
            if ( this.onDisconnectCallback ) this.onDisconnectCallback( { isConnected: this.isConnected } );
        } );

        // Optionally store event handlers
        this.eventHandlers = {};
    }

    // Connection Event Handlers
    onConnect ( callback ) {
        this.onConnectCallback = callback;
    }

    onDisconnect ( callback ) {
        this.onDisconnectCallback = callback;
    }

    // User Status Methods
    setStatus ( status ) {
        if ( !this.isConnected ) return;
        this.socket.emit( 'connly_status', { status } );
    }

    onStatus ( callback ) {
        this.socket.on( 'connly_on_status', ( data ) => {
            callback( data );
        } );
    }

    // Message Handling Methods
    sendMessage ( messageContent, callback ) {
        if ( !this.isConnected ) return;
        this.socket.emit( 'connly_message', messageContent, ( ack ) => {
            if ( callback ) callback( ack );
        } );
    }

    onMessage ( callback ) {
        this.socket.on( 'connly_on_message', ( data ) => {
            callback( data );
        } );
    }

    // Message Read Receipt Methods
    sendReadReceipt ( details ) {
        if ( !this.isConnected ) return;
        this.socket.emit( 'connly_read_receipt', details );
    }

    onReadReceipt ( callback ) {
        this.socket.on( 'connly_on_read_receipt', ( data ) => {
            callback( data );
        } );
    }

    // Message Delivery Receipt Methods
    onDeliveryReceipt ( callback ) {
        this.socket.on( 'connly_on_delivery_receipt', ( data ) => {
            callback( data );
        } );
    }

    // Typing Status Methods
    sendTypingStatus ( details ) {
        if ( !this.isConnected ) return;
        this.socket.emit( 'connly_type_status', details );

    }

    // Typing Status Methods
    onTypingStatus ( callback ) {
        this.socket.on( 'connly_on_type_status', ( data ) => {
            callback( data );
        } );
    }

    onCallAction ( callback ) {
        this.socket.on( 'connly_on_call_status', ( data ) => {
            callback( data );
        } );
    }

    // Call Action Methods
    onPresence ( callback ) {
        this.socket.on( 'connly_user_status', ( data ) => {
            callback( data );
        } );
    }

    // Error Handling
    onError ( callback ) {
        this.socket.on( 'connect_error', ( error ) => {
            callback( error );
        } );

        this.socket.on( 'error', ( error ) => {
            callback( error );
        } );
    }

    // Disconnect Method
    disconnect () {
        if ( this.socket ) {
            this.socket.disconnect();
            this.isConnected = false;
        }
    }
}


