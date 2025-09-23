# Smart Resume

Smart Resume helps you craft consistent résumés and cover letters from a single profile. The app stores your professional
information in MongoDB, lets you tweak document templates from the web UI, and exports polished PDFs (or LaTeX files) that you
can send directly to recruiters.

---

## 🧭 Guided Tour

-   **Profile once, reuse everywhere** – Add your details, projects, and experience in the web dashboard and reuse them across
    different document templates.
-   **Résumé & cover letter builder** – Switch between predefined LaTeX templates to generate résumés and tailored cover letters.
-   **PDF or LaTeX exports** – Let the app compile a PDF for you (local mode) or grab the `.tex` source if you prefer compiling in
    Overleaf or another LaTeX tool (external mode).
-   **Docker-first workflow** – All services (React client, Express API, MongoDB) are containerized so you do not need Node.js or
    MongoDB installed locally.

---

## 🚀 Quick Start (Production Mode)

> 💡 These steps assume zero prior Docker experience—just copy and run the commands exactly as written.

1. **Install prerequisites**
    - [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose) for Windows/macOS.
    - [Docker Engine & Compose plugin](https://docs.docker.com/engine/install/) for Linux.
2. **Clone the repository**
    ```bash
    git clone https://github.com/pavelihno/smart-resume.git
    cd smart-resume
    ```
3. **Create your environment file**
    ```bash
    cp .env.example .env
    ```
    Open `.env` in any text editor and review the values (see the table below). For a regular install set
    `NODE_ENV=production` so the containers use the optimized builds.
4. **Start the stack**
    ```bash
    docker-compose build
    docker-compose up
    ```
    The first run downloads Docker images, so it can take several minutes—watch for the `react`, `express`, and `mongo` containers
    to report `Started` in the logs.
5. **Use the app**
    - Web client: <http://localhost> (served on port 80)
    - API (for debugging or integrations): <http://localhost:8080>
    - Optional database UI: uncomment the `mongo-express` block in `docker-compose.yml` and browse to <http://localhost:8081>

Press `Ctrl + C` in the terminal to stop the containers. Restart them anytime with `docker-compose up` (no need to rebuild unless
code or dependencies change).

---

## ⚙️ Environment Variables

All configuration lives in the root `.env` file and is automatically shared with every container.

| Variable                        | Required | Recommended Value                                 | Description                                                                                                                                               |
| ------------------------------- | -------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                      | ✅       | `production`                                      | Chooses the Dockerfile for the React client. Use `production` for normal usage and switch to `development` only when modifying the front end (see below). |
| `REACT_APP_PDF_GENERATION_MODE` | ✅       | `local` or `external`                             | Controls how PDFs are produced (explained in the next section).                                                                                           |
| `MONGODB_DATABASE`              | ✅       | `smart_resume_db`                                 | Name of the MongoDB database that stores your data.                                                                                                       |
| `MONGODB_ROOT_USER`             | ✅       | `root`                                            | Administrative MongoDB username used by the Docker image during initialization.                                                                           |
| `MONGODB_ROOT_USER_PASSWORD`    | ✅       | `root`                                            | Password for the root MongoDB user. Change this in production deployments.                                                                                |
| `MONGODB_BASIC_USER`            | ✅       | `user`                                            | Read/write user created for the application.                                                                                                              |
| `MONGODB_BASIC_USER_PASSWORD`   | ✅       | `12345678`                                        | Password for the basic MongoDB user. Modify for security.                                                                                                 |
| `MONGODB_URI`                   | ✅       | `mongodb://root:root@mongo:27017/smart_resume_db` | Connection string the Express server uses. If you rename users/passwords, update this string too.                                                         |
| `TZ`                            | ➖       | `UTC`                                             | Time zone applied inside containers (helps keep generated documents consistent).                                                                          |

> ✅ **Tip:** After editing `.env`, save the file and restart your containers (`docker-compose up`) so changes take effect.

---

## 🖨️ Local vs. External PDF Generation

The app supports two PDF generation strategies so you can pick what fits your environment:

| Mode                | Set `REACT_APP_PDF_GENERATION_MODE` to… | How it works                                                                                                                                                                         | When to choose it                                                                                                           |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Local (default)** | `local`                                 | The Express server renders your data into a LaTeX template and immediately compiles it into a PDF inside the Docker container using `node-latex`.                                    | You want instant PDFs without leaving the app. This is the easiest option—just download and share the result.               |
| **External**        | `external`                              | The server still creates the `.tex` file but skips PDF compilation. The client offers you the LaTeX source to download, so you can upload it to Overleaf or run `pdflatex` manually. | Your machine cannot run LaTeX reliably, or you want full control of the build process (e.g., custom fonts or CI pipelines). |

When external mode is enabled, the Download PDF buttons in the UI will explain that PDFs are disabled and point you to the `.tex`
file instead.

---

## 🛠️ Development Mode (Optional)

Need to tweak the app itself?

1. Set `NODE_ENV=development` in `.env` (the React service now uses `Dockerfile.development`, which enables hot reloading).
2. Optionally keep `REACT_APP_PDF_GENERATION_MODE=local` so you can instantly preview PDF changes.
3. Rebuild the containers:
    ```bash
    docker-compose build
    docker-compose up
    ```
4. The client will now run on <http://localhost:3000> with the standard React development server, while the production-ready Nginx
   container is skipped.

Switch `NODE_ENV` back to `production` once you are done editing so future launches use the optimized build.

---

## 🧹 Stopping & Cleaning Up

-   `docker-compose down` stops the containers.
-   `docker-compose down -v` stops everything and removes the MongoDB volume (this wipes stored résumés, so export documents first).

---

## 🧠 Next Steps & Ideas

-   Experiment with AI-assisted cover letter drafts built with LaTeX + Mistral models.

Have fun building résumés that stand out!
