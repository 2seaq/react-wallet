'use strict';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


export function register(registrations) {
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