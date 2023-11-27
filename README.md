# cryptocraftsmen-sports-card-trading

Establish a Hyperledger Fabric network for trading sports cards exclusively among authorized participants. This permissioned blockchain caters to football, basketball, and cricket cards. The secure and controlled environment ensures exclusive access, fostering seamless transactions within dedicated channels for each sport. 

## Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- **Docker Engine:** Version 17.03 or higher
- **Docker-Compose:** Version 1.8 or higher
- **Node:** 8.9 or higher (Note: Version 9 is not supported)
- **npm:** v5.x
- **git:** 2.9.x or higher
- **Python:** 2.7.x
- A code editor of your choice (we recommend VSCode)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/Da45haN7/cryptocraftsmen-sports-card-trading.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo
    ```

3. Install necessary development tools:

    ```bash
    npm install
    ```

4. Start the `composer-rest-server`:

    ```bash
    composer-rest-server
    ```

   Keep the server running. This will start the rest server which can be accessible at [http://localhost:3000](http://localhost:3000).

5. Navigate to the app directory:

    ```bash
    cd app
    ```

6. Install dependencies:

    ```bash
    npm install
    ```

7. Run the application:

    ```bash
    npm start
    ```

   Your application should now be accessible at [http://localhost:4200](http://localhost:4200).

## Notes

- Ensure that the `composer-rest-server` is running while you start the application.
