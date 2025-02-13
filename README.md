# Smart Resume

## How to Use    and Launch the App

### Requirements
- **Docker** must be installed on your Linux/Windows/macOS machine
- Create a `.env` file in the root directory of the project and fill it with the necessary variables. You can use the provided `.env.example` file as a reference. Copy the contents of `.env.example` to `.env` and update the values as needed for your environment.

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

### What Needs to Be Completed
- Fix the display of the ampersand (&) — it is displayed incorrectly.
- In the update form, `isSuccess` does not work correctly — the message persists longer than expected.
- In the list:
    - Improve the display of lists and objects.
    - Extract common functions from the list and form for easier maintenance.
    - Add spell check during form filling.

## Ideas for Next Features
- Generate cover letters using LaTeX + Mistral:
    - Generate text content based on profile information.
    - Generate formatting code with support for subsequent editing.
    - Allow selecting a profile as the basis for a letter and editing it.
    - Cloud-based LaTeX generation (saving local resources).
    - Separate the creation of TeX and the generation of PDF (to avoid dependency issues in the Docker image).