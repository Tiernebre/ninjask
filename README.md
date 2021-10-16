# ninjask <img src="./static/ninjask.png" style="height: 30px; margin-left: 10px" />

Web application for making it easier to organize challenge runs of Pokemon with friends.

## Prerequisite Software Dependencies Needed

- Docker
- Docker-Compose V1
    - Integration testing infrastructure is not compatible with V2 just yet.
- Node.js version 14+

For installing these tools, I suggest using [asdf vm](https://asdf-vm.com/). This project
is asdf-vm compatible! If you want to install the proper and working prerequisite software
just run the command below:

```
asdf install
```

## Getting Started

Ninjask is a monorepo built and organized using Lerna. The front-end and back-end
codebases are located within this same repository under the `packages` folder.

For getting started in the back-end codebase, check out [its README](./packages/back-end/README.md).

For getting started in the front-end codebase, check out [its README](./packages/front-end/README.md).

## Technologies Used

### Back-End

The back-end is a RESTful HTTP based API that is built using Node.js, TypeScript, and uses
Koa.js as its middleware framework for handling HTTP requests and responses.

### Front-End

The front-end is a React application that uses TypeScript.
