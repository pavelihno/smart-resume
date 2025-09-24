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
    - Web client: <http://localhost> (production build on port 80) or <http://localhost:3000> when the React dev server is active
    - API (for debugging or integrations): <http://localhost:8080>
    - Optional database UI: uncomment the `mongo-express` block in `docker-compose.yml` and browse to <http://localhost:8081>

Press `Ctrl + C` in the terminal to stop the containers. Restart them anytime with `docker-compose up` (no need to rebuild unless
code or dependencies change).

---

## ⚙️ Environment Variables

All configuration lives in the root `.env` file and is automatically shared with every container.

| Variable                        | Required | Recommended Value                                 | Description                                                                                                                                               |
| ------------------------------- | -------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                      | ✅       | `production`                                      | Selects `client/Dockerfile.production` (Nginx on port 80) or `client/Dockerfile.development` (React dev server on port 3000). Switch to `development` only when working on the front end. |
| `REACT_APP_PDF_GENERATION_MODE` | ✅       | `local` or `external`                             | Chooses between `server/Dockerfile.local.*` and `server/Dockerfile.external.*` builds and controls how PDFs are produced (explained in the next section). |
| `MONGODB_DATABASE`              | ✅       | `smart_resume_db`                                 | Name of the MongoDB database that stores your data.                                                                                                       |
| `MONGODB_ROOT_USER`             | ✅       | `root`                                            | Administrative MongoDB username used by the Docker image during initialization.                                                                           |
| `MONGODB_ROOT_USER_PASSWORD`    | ✅       | `root`                                            | Password for the root MongoDB user. Change this in production deployments.                                                                                |
| `MONGODB_BASIC_USER`            | ✅       | `user`                                            | Read/write user created for the application.                                                                                                              |
| `MONGODB_BASIC_USER_PASSWORD`   | ✅       | `12345678`                                        | Password for the basic MongoDB user. Modify for security.                                                                                                 |
| `MONGODB_URI`                   | ✅       | `mongodb://root:root@mongo:27017/smart_resume_db` | Connection string the Express server uses. If you rename users/passwords, update this string too.                                                         |
| `TZ`                            | ➖       | `UTC`                                             | Time zone applied inside containers (helps keep generated documents consistent).                                                                          |

> ✅ **Tip:** After editing `.env`, save the file and restart your containers (`docker-compose up`) so changes take effect.

### Dockerfile Matrix & Ports

-   The client image always publishes ports 80 and 3000; only the port that matches `NODE_ENV` actually serves traffic.
-   The server resolves its Dockerfile dynamically as `server/Dockerfile.${REACT_APP_PDF_GENERATION_MODE}.${NODE_ENV}`, giving you four combinations to mix PDF strategy and runtime mode.
-   Changing either variable updates the Dockerfile path, so run `docker-compose build` after edits to rebuild the correct image.

---

## 🖨️ Local vs. External PDF Generation

The app supports two PDF generation strategies so you can pick what fits your environment:

| Mode                | Set `REACT_APP_PDF_GENERATION_MODE` to… | How it works                                                                                                                                                                         | When to choose it                                                                                                           |
| ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Local (default)** | `local`                                 | The Express server renders your data into a LaTeX template and immediately compiles it into a PDF inside the Docker container using `node-latex`; this bundles the full TeX Live toolchain so images are heavier and builds take longer. | You want instant PDFs without leaving the app and do not mind larger Docker images. This is the easiest option—just download and share the result. |
| **External**        | `external`                              | The server still creates the `.tex` file but skips PDF compilation, so the container stays lean (no TeX packages). The client offers you the LaTeX source to download for Overleaf or manual `pdflatex` runs. | Your machine cannot run LaTeX reliably, you need custom build flags, or you want the smallest possible container footprint. |

### Pros & Cons Quick Take

-   **Local PDFs** – Consistent output with no extra tooling, at the cost of ~1–2 GB larger images and slightly slower cold starts.
-   **External PDFs** – Light images and faster deploys, but you handle LaTeX yourself and PDF downloads are disabled inside the UI.

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
