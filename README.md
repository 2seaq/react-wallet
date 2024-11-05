# A Simple React UI for a Bitcoin Lightning payments

This is project is a simple implementation of a bitcoin lightning wallet UI. It is purely an interface to connect to a service providing lightning payments. It is a react SPA which makes API calls to a separate service.

![React Wallet Home](https://github.com/2seaq/react-wallet/tree/main/public/react-wallet-home.png)
![React Wallet Recieve](https://github.com/2seaq/react-wallet/tree/main/public/react-wallet-receive.png)
![React Wallet QR Code](https://github.com/2seaq/react-wallet/tree/main/public/react-wallet-qr.png)
![React Wallet History](https://github.com/2seaq/react-wallet/tree/main/public/react-wallet-history.png)


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
To build and run the react lightning UI with the Spring Boot application. Follow these steps:

