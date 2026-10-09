# Portfolio website decision record

- **Status:** Accepted
- **Date:** 2026-10-09

## Context

Build Aurélie Fidelia's public engineering portfolio as a focused introduction
to her current learning, projects, and experience. The site should make her
positioning clear: an ÉTS software engineering student exploring software and
embedded systems, interested in practical tools and in how software connects
with physical systems.

The primary audience is recruiters, potential collaborators, and technical
peers. All content must come from information Aurélie supplied. In particular,
planned work must remain distinct from implemented work, and missing project
details, links, employers, dates, results, and achievements must not be
invented.

## Decision

Use one responsive `index.html` with embedded CSS, inline SVG, and minimal
vanilla JavaScript. Require no framework, backend, or build step; use only the
small, version-pinned Google `<model-viewer>` browser component for the supplied
GLB asset.
Provide anchor navigation, a French-default English/French language toggle,
and one filterable project-and-experience timeline. Translate site navigation,
sections, project details, statuses, and filters together when switching
languages. Show only filters whose categories contain real entries.

The selected sections and structure are:

1. **Introduction** — name, location, languages, studies, and stated interests.
2. **Projects** — a single list filterable by All, Software, Embedded Systems,
   Collaborations, and Experience, when those categories have entries.
3. **Embedded Systems** — a lightweight R4 WiFi-inspired SVG workbench with a
   board, breadboard, jumper wires, LEDs, and subtle LED matrix. Hovering,
   keyboard-focusing, or activating the embedded project card illuminates its
   corresponding wire and LED.
4. **Skills** — languages and technologies used, plus technologies currently
   being learned; no proficiency scores.
5. **Education** — the two supplied credentials without dates or GPA.
6. **About and Contact** — supplied work-experience wording, interests, and
   only public links Aurélie supplied.
7. **Collaborations** — include the supplied `3d/earth.glb` as an interactive,
   accessible 3D globe. Its named selectable pin objects show their supplied
   location/project labels; treat the USA Space Apps association as symbolic.
   Keep equivalent descriptive text outside the viewer.
8. **Software** — include the self-directed Typewriter learning project with
   its supplied description, current Learning / In progress status, verified
   stack, and user-provided live-demo and public-source links. Keep its own
   implementation separate from the portfolio's cursor effects. Distinguish
   source-reviewed behavior from features only described in its README or not
   independently tested.

Use an enchanted night garden visual direction: midnight indigo, soft plum and
lavender gradients, orchid and lilac flowers with fine cyan veins, restrained
fairy lights, ivory body text, gently rounded surfaces, and generous spacing.
Keep decorative flowers around the hero and section edges so text stays clear.
Use sparse, slowly twinkling stars and subdued edge mist to suggest a night sky
and nearby water. A bounded cursor sparkle trail is available only to fine
pointer devices; the normal cursor remains visible. Decorative artwork is
inline SVG/CSS, has no pointer events or accessible name, and is disabled or
paused with reduced-motion preferences and when the tab is hidden.

Preserve a lightweight R4-inspired SVG breadboard interaction but integrate it
into the garden palette. Its responsive viewBox and `xMidYMid meet` scaling
keep the complete illustration visible on mobile. Use readable light-on-dark
annotations and dark-on-breadboard pin labels. Ensure the whole portfolio
remains usable without decorative animation.

Load the existing `3d/earth.glb` without renaming or moving it. Use the model's
selected GLB scene, preserve its emissive continents, inner sun, and separate
red pin objects, enable drag rotation, and use slow automatic rotation unless
reduced motion is requested. The web presentation supplies a restrained CSS
halo for the emissive inner sun; the supplied model's own compositor-independent
emissive materials remain intact. Retain vertical page scrolling on touch
screens, show explicit load/error feedback, and provide text alternatives and
pin associations outside the 3D canvas.

The StudentCorner card distinguishes Aurélie's initial HTML/CSS navigation
contribution from planned Projects and Study Buddy pages and labels desired
product capabilities as intended, not confirmed functionality.

## Options considered

- **One static document (selected):** fits the requested single-page format,
  existing static project, and small content set; simple to preview and publish.
- **Multiple pages:** rejected because the requested experience is a single
  anchored page and a unified, filterable list.
- **A framework, backend, or CMS:** rejected because there is no need for
  server-side functionality.
- **A general-purpose 3D engine:** rejected in favor of the smaller,
  purpose-built `<model-viewer>` component for displaying the existing GLB.
- **Creating or rebuilding Blender assets:** deferred. Load the supplied model
  directly, and recreate only a subtle sun halo in the browser.

## Out of scope

- Subpages.
- A backend, database, CMS, or account system.
- Creating or modifying Blender assets; display the supplied `3d/earth.glb`
  without altering the model.
- Invented achievements, affiliations, employment details, project results,
  metrics, awards, testimonials, locations, or project functionality.
- Unconfirmed contact links and project links.

## Consequences

The site remains static and has no build command; the globe requires the
`3d/earth.glb` asset and network access to the pinned `@google/model-viewer`
browser module. Project details are maintained in the inline JavaScript data,
while optional fields are omitted when absent.
The embedded SVG is illustrative and is not a claim of a completed circuit or
embedded project.
