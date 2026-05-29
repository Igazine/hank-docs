# Hank Documentation & Playground

Hank is a purely symbolic, instruction-oriented embeddable language designed to bring secure, dynamic automation to any host application. Built on a strict air-gapped execution model, Hank has zero built-in I/O, guaranteeing that scripts cannot access the filesystem, network, or OS without explicit delegation. This makes it the perfect predictable environment for game scripting, microservice orchestration, and user-facing plugin systems. With a highly readable, keyword-less syntax and universal cross-platform parity, Hank seamlessly bridges the gap between static configuration files and complex general-purpose programming.

This repository hosts the official educational documentation and the interactive playground for the Hank language.

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
