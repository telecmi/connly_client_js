import io from 'socket.io-client';

export default class ConnlySDK {
    constructor( serverUrl, token ) {
        this.serverUrl = serverUrl;
        this.token = token;
        this.isConnected = false;
        this.eventHandlers = {};
        this.pingInterval = null;
    }

    // Initialize a new connection
    connect () {
        // Check if socket is already connected, if so, disconnect it first
        if ( this.socket && this.isConnected ) {
            this.disconnect();
        }

        // Initialize a new socket connection
        this.socket = io( this.serverUrl, {
            query: {
                token: this.token,
            },
        } );

        // Handle connection events
        this.socket.on( 'connect', () => {
            this.isConnected = true;
            if ( this.onConnectCallback ) this.onConnectCallback( { isConnected: this.isConnected } );

            if ( this.pingInterval ) clearInterval( this.pingInterval );
            this.pingInterval = setInterval( () => {
                if ( this.isConnected ) {
                    console.log( 'ping' );
                    this.socket.emit( 'connly_ping', { status: 'ping' } ); // Send ping to the server
                }
            }, 300000 );
        } );

        this.socket.on( 'disconnect', () => {
            this.isConnected = false;
            if ( this.onDisconnectCallback ) this.onDisconnectCallback( { isConnected: this.isConnected } );
            // Stop pinging when disconnected
            if ( this.pingInterval ) {
                clearInterval( this.pingInterval );
                console.log( 'ping interval cleared' );
                this.pingInterval = null; // Ensure pingInterval is reset
            }
        } );

        // Error handling
        this.socket.on( 'connect_error', ( error ) => {
            if ( this.onErrorCallback ) this.onErrorCallback( error );
        } );

        this.socket.on( 'error', ( error ) => {
            if ( this.onErrorCallback ) this.onErrorCallback( error );
        } );
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


    //Send Ractions
    sendReaction ( reaction, callback ) {
        if ( !this.isConnected ) return;
        this.socket.emit( 'connly_reaction', reaction, ( data ) => {
            if ( callback ) callback( data );
        } );
    }

    onReaction ( callback ) {
        this.socket.on( 'connly_on_reaction', ( data ) => {
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

    onTypingStatus ( callback ) {
        this.socket.on( 'connly_on_type_status', ( data ) => {
            callback( data );
        } );
    }

    // Call Action Methods
    onCallAction ( callback ) {
        this.socket.on( 'connly_on_call_status', ( data ) => {
            callback( data );
        } );
    }

    // Presence Methods
    onPresence ( callback ) {
        this.socket.on( 'connly_users_status', ( data ) => {
            callback( data );
        } );
    }


    // Channel and user changes 
    onChange ( callback ) {
        this.socket.on( 'connly_user_channel_changes', ( data ) => {
            callback( data );
        } );
    }

    // Error Handling
    onError ( callback ) {
        this.onErrorCallback = callback;
    }

    // Disconnect Method
    disconnect () {
        if ( this.socket ) {
            this.socket.disconnect();
            this.isConnected = false;
        }
    }
}
