# A Simple React UI for a Bitcoin Lightning payments

This is project is a simple implementation of a bitcoin lightning wallet UI. It is purely an interface to connect to a service providing lightning payments. It is a React SPA PWA which makes API calls to a separate service.

<img width="195" height="424" alt="image" src="https://github.com/user-attachments/assets/656111c0-fd7e-45b3-b523-0373902f5cd6" />
<img width="195" height="424" alt="image" src="https://github.com/user-attachments/assets/cf68ce78-5c17-4dff-8013-cec2f1f4ae1d" />
<img width="195" height="424" alt="image" src="https://github.com/user-attachments/assets/827cdfb7-47ce-484e-90ad-2d5b19a171fe" />
<img width="195" height="424" alt="image" src="https://github.com/user-attachments/assets/3b2325d3-6581-4f40-8924-6fc37cd12072" />

It was redesigned in mid 2025 to be (loosely) based on wallet design specification at https://bitcoin.design/guide/

Note this is still needs alot of work and there are plenty of bugs :D

## Live Version

I have a live implementation running on Testnet4 at https://wallet.osys.com

Note: Its a custodial wallet that uses Oauth (Google / Github) It is what it is.. Its all kind of experimental so may not always be running. Have a look at osys.com for details on my nodes too.

## Service

A related Spring Boot application is located in a separate repository.


## Building and Running

### Standalone
Run these commands to run standalone
```
git clone https://github.com/2seaq/react-wallet.git

cd react-wallet/

git add .

npm install

npm cache clean -force 
```

### Spring Application
To build and run the react lightning UI with the Spring Boot application simply build the application using npm run build. This will create a js file (detailed in the build information)
That can then be copied and referenced in the index.html of the spring application. Note the url for the websocket should be configured to the correct url.

