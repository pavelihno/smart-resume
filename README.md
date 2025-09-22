# Smart Resume

## How to Use and Launch the App

### Requirements

-   **Docker** must be installed on your Linux/Windows/macOS machine
-   Create a `.env` file in the root directory of the project and fill it with the necessary variables. You can use the provided `.env.example` file as a reference. Copy the contents of `.env.example` to `.env` and update the values as needed for your environment.

### Launching the Project

1. Clone the repository.
2. Ensure you have created a `.env` file with the correct settings in the root directory.
3. Build and launch the containers using the command:
    ```
    docker-compose build
    ```
    ```bash
    docker-compose up
    ```
4. The application is divided into two services:
    - **Client (React)** — available at `http://localhost:3000`
    - **Server (Express)** — API available at `http://localhost:5000`
5. Mongo Express is also included for accessing the view of the database. It is available at `http://localhost:8081`. Note that Mongo Express can be removed from the `docker-compose` configuration if it is not required.

## Ideas for Next Features/Fixes

-   Fix update form, `isSuccess` does not work correctly — the message persists longer than expected.
-   Fix the display of the ampersand (&) and probably other special characters — displayed incorrectly.
-   Generate cover letters using LaTeX + Mistral:
    -   Generate text content based on profile information and the job description.
