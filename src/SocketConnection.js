import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


export default class SocketConnection {

	constructor(endPointIn) {
		this.state = {
            endPoint: endPointIn,
			isConnected: false
		};
	}

	isEndPointActive = () => {

		return new Promise((resolve, reject) => {
			fetch(this.state.endPoint, { method: 'HEAD' })
			  .then(response => {
				if (response.ok) {
				  resolve(true);
				} else {
				  reject(new Error(`Endpoint returned status ${response.status}`));
				}
			  })
			  .catch(error => {
				reject(new Error(`Failed to reach the endpoint: ${error.message}`));
			  });
		  });
	}

	getStatus = () => {
		return this.state.isConnected;
	}


	register(registrations) {
		return new Promise((resolve, reject) => {
			let socket;
			let stompClient;

			
			try {
				socket = new SockJS('/websocket');
			} catch (socketError) {
				console.error('Failed to create SockJS socket:', socketError);
				reject('Socket creation failed');
				return;
			}

			try {
				stompClient = Stomp.over(socket);
			} catch (stompError) {
				console.error('Failed to create Stomp client:', stompError);
				reject('Stomp client creation failed');
				return;
			}

			stompClient.connect({}, function(frame) {
				try {
					registrations.forEach(function (registration) {
						stompClient.subscribe(registration.route, registration.callback);
					});
					resolve('Connection successful');
				} catch (subscribeError) {
					console.error('Failed to subscribe to route:', subscribeError);
					reject('Subscription failed');
				}
			}, function(error) {
				console.error('STOMP connection error:', error);
				reject('Connection failed');
			});
		});
	}



}