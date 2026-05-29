---
layout: home

hero:
  name: "Hank"
  text: "The Air-Gapped Embeddable Language"
  tagline: "A purely symbolic, instruction-oriented language designed for secure orchestration, plugin systems, and API interfaces."
  actions:
    - theme: brand
      text: Get Started
      link: ./guide/syntax.md
    - theme: alt
      text: Documentation
      link: ./stdlib/overview.md

features:
  - title: Air Gapped
    details: Target-agnostic logic with zero built-in I/O for absolute security.
  - title: Pure Symbolic
    details: Zero reserved keywords for values. Everything is an identifier.
  - title: Multi-Engine
    details: Bit-perfect execution parity across all officially supported native implementations.
---

# Hybrid Automation Language (Hank)

Hank is a purely symbolic, instruction-oriented embeddable language designed to bring secure, dynamic automation to any host application. Built on a strict air-gapped execution model, Hank has zero built-in I/O, guaranteeing that scripts cannot access the filesystem, network, or OS without explicit delegation. This makes it the perfect predictable environment for game scripting, microservice orchestration, and user-facing plugin systems. With a highly readable, keyword-less syntax and universal cross-platform parity, Hank seamlessly bridges the gap between static configuration files and complex general-purpose programming.

## The Core Repository

This site contains the educational guides and playground for the Hank ecosystem. The **Source of Truth**, including formal language specifications and engine conformance tests, is maintained in the core repository:

👉 **[github.com/Igazine/hank](https://github.com/Igazine/hank)**

## Core Philosophy

Hank is built on three unbreakable pillars that ensure absolute predictability across different host environments. [Read the full Philosophy & Vision &rarr;](./guide/philosophy.md)

### 1. The Air Gap Principle
Hank is target-agnostic and has zero built-in I/O capabilities. It cannot read files, access the network, or interact with the operating system on its own. All environmental mutations are deferred to host-provided Native Tasks.

### 2. Everything is an Identifier
There are no reserved keywords for values or control flow definitions. Keywords common in other languages—such as `true`, `false`, `null`, `import`, `func`, `var`, `let`, `for`, `if`, or `private`—do not exist as language primitives. They are simply identifiers that resolve to Hank values (usually `Void` for falsy states and `Number(1)` for truthy states).

### 3. Dumb Variables
Variables in Hank (Strings, Numbers, Arrays, Objects) are purely inert memory containers. They do not have methods, prototypes, or hidden logic. All operations on data must be performed by passing the variable to an explicit module task.

## Architectural Rigor

Beyond its core pillars, Hank enforces structural purity to eliminate ambiguity.

### 4. Explicit Instruction Only
Hank has no binary operators for data manipulation. There is no inline arithmetic (`+`, `-`, `*`, `/`) and no built-in syntax for String or Array concatenation. Every operation that transforms or combines data must be invoked via an explicit, host-defined Task call (e.g., `math.add(a, b)` or `str.concat(s1, s2)`).

### 5. Symbol Delimited
Hank is whitespace-insensitive and semicolon-free. Because every operation is triggered by an explicit symbol or a task call, instructions are unambiguously delimited by their own tokens. Newlines are purely for readability and error reporting.

## Case Study: The "Eddie" Embedded Milestone

Hank was recently stress-tested on a resource-constrained ARM Linux system (custom Buildroot image) to verify its utility in the "Extreme Edge." 

The project, codenamed **Eddie** (*Embedded Device Directive Interpreter Engine*), successfully demonstrated that high-level orchestration doesn't require high-level overhead.

- **Portability**: Cross-compiled from Rust to `aarch64-unknown-linux-musl` for absolute standalone execution.
- **Binary Size**: Compressed to a lean **581 KB**, including the full STDLIB and native hardware modules (GPIO, thermal/RAM telemetry).
- **Runtime Footprint**: Achieved a remarkable **672 KB RSS** memory footprint while running a persistent 2-second heartbeat/monitoring loop.
- **Deployment**: Integrated as a standard BusyBox service (`/etc/init.d/S99eddie`), proving that Hank is ready for air-gapped automation in everything from cloud servers to IoT gateways.
