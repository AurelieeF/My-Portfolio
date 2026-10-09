# Aurélie Fidelia — Engineering Portfolio (https://aurelie-portfolio-nu.vercel.app/)

A responsive French-default, bilingual single-page portfolio for a software
engineering student at ÉTS, styled as an enchanted night garden with restrained
inline floral SVG, ambient stars, an interactive breadboard, and a rotatable 3D
globe in the collaborations filter.
The site presents software and embedded-systems projects, collaborations,
experience, skills, education, and contact links in French by default, with an
English/French language toggle. Project records use only details supplied by
Aurélie; planned StudentCorner work is distinguished from its current HTML/CSS
contribution.

## Technology

- One `index.html` with embedded CSS, inline SVG, and minimal vanilla
  JavaScript.
- The existing `3d/earth.glb` model and the version-pinned
  `@google/model-viewer` browser component, loaded from unpkg.
- No framework or build step.
- A lightweight Node.js test suite using the built-in `node:test` runner.

## Preview with VS Code Live Server

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Open `index.html`, then choose **Open with Live Server** from its context
   menu (or click **Go Live** in the status bar).

Use Live Server to preview the site so the local GLB model can be fetched over
HTTP. Opening `index.html` directly may prevent browsers from loading the model.

## Run tests

Install Node.js if it is not available, then run from the repository root:

```sh
node --test
```

These dependency-free automated tests check the embedded document and script,
anchor targets, populated filter categories, supplied content, optional
project fields, French as the default language, language switching, the GLB
scene and named pins, responsive/reduced-motion rules, and public contact links.
They inspect the GLB metadata and are otherwise structural checks;
assistive-technology testing remains a manual follow-up.

## Typewriter project

The Software filter includes the self-directed **Typewriter** learning project,
described as deployed and still being improved. Its card links to the
[live demo](https://typewriter-mu-drab.vercel.app/) and
[public source repository](https://github.com/AurelieeF/Typewriter). The
portfolio links to the separate project; it does not copy its implementation
or combine it with the portfolio's cursor effects.

The public source README lists the app's 2D/3D modes, keyboard input, sounds,
ambient music, saved notes, visual effects, and its HTML/CSS/JavaScript,
Three.js, Python/Flask, and PostgreSQL stack. Source review confirmed the
mode-switch handler and Three.js scene, keyboard handlers, audio controls,
note API calls, and date-filter handler. A read-only live-browser check
confirmed physical-key input and switching to a rendered 3D scene. The live
page showed zero saved notes during review; no notes were saved or deleted.
Saved-note persistence/deletion, audio playback, and the README's additional
visual details were not independently tested end to end.

## AI-assisted workshop workflow

This personal portfolio was developed during a Rewriting the Code workshop
with AI assistance. The workflow inspected the existing static project,
recorded the design and scope decision in `docs/adr/portfolio.md`, adapted the
existing SVG and visual direction, used only user-provided details, added
lightweight structural tests, and reviewed the result in a browser. The site is
not an official Rewriting the Code project.

## Publish with a public GitHub repository

1. Sign in to GitHub and create a **public** repository for the portfolio.
   Do not add credentials or private information. If the existing local
   repository already has commits, create the GitHub repository without
   generating a second README or license.
2. From this folder, connect the new remote and push the current branch:

   ```sh
   git remote add origin https://github.com/<your-username>/<repository>.git
   git push -u origin <your-current-branch>
   ```

   Replace the placeholders with your own repository and branch. If `origin`
   already exists, inspect it rather than adding a duplicate.
3. Confirm on GitHub that the repository is public and contains
   `index.html`, `docs/adr/portfolio.md`, `README.md`, and `tests/`.

## Deploy with Netlify

1. Sign in to Netlify and select **Add new site → Import an existing project**.
2. Choose **GitHub**, authorize Netlify if prompted, and select the public
   portfolio repository.
3. Leave the build command empty. Set the publish directory to the repository
   root (`.`), then deploy.
4. Open the Netlify-provided site URL and verify the page and links. A custom
   domain is optional and can be configured from the Netlify site settings.
