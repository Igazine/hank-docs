# Hank Documentation & Playground

This repository hosts the official educational documentation and the interactive playground for the **Hank** language.

## Live Documentation
Visit the live site here: [https://igazine.github.io/hank-docs/](https://igazine.github.io/hank-docs/)

## Project Structure
- **`/guide`**: Language tutorials and philosophy.
- **`/stdlib`**: Functional guides for the standard library.
- **`/runner`**: Integration guides for host applications.
- **`/src`**: Browser-specific implementations (e.g., `BrowserRunner.ts`).
- **`/vendor/hank-ts`**: Git submodule pointing to the official TypeScript engine.

## Core Language
For the formal language specifications and conformance tests, visit the core repository:
[https://github.com/Igazine/hank](https://github.com/Igazine/hank)

## Development
To run the documentation locally:
```bash
npm install
npm run docs:dev
```
