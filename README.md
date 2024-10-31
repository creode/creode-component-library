# Creode Component Library
This component library is built using Vanilla JS, ScSS and HTML elements. It is designed to be lightweight and mostly used for keeping versions of snippets that we would use on various websites.

## Installation
To install the component library, you can use npm or yarn.

```bash
npm install creode-components
```

## Docs
The docs folder is maintained by a Github action that runs on every push to the release (e.g. main, 2.x etc.) branch. The README.md and index.html files can be changed a dev however all other files will be rebuilt and dynamically generated on each merge to the release (e.g. main, 2.x etc.) branch. The action will build the docs folder and push it to the gh-pages branch. This will then be available at [https://components.creode.co.uk](https://components.creode.co.uk).

## Vue Components
Previously this package contained vue components within the 1.x branch of the project. This has now changed as of version "2.14" and the vue components have been moved to a separate package. You can find the new package [here](https://github.com/creode/creode-vue-components).

This therefore means that the 1.x branch on this repository has been deprecated and changes should be added and merged into the above repository.

We are keeping the compatible 1.x branch around for now to give other projects the chance to update to the new package however new changes moving forwards will not be added to this branch.
