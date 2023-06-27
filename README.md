# Home Library Service

Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

# Install
### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

### Downloading

```
git clone {repository URL}
```

### Installing NPM modules

```
npm install
```

### Rename .env.example file to .env

```
 .env.example  =>  .env
```

# Running application

### Standalone (without docker)
- Production mode
```bash
npm start
```
- Development mode
```bash
npm run start:dev
```

### Start in docker container
- Production mode
```bash
npm run docker:prod
```
- Development mode
```bash
npm run docker:dev
```
# Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
### Scan it for security vulnerabilities (with docker scout)
```
npm run scansecurity
```
