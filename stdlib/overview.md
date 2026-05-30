# Standard Library Overview

The Hank Standard Library is a modular collection of native tasks provided by the Host environment. To maintain the **Air Gap Principle**, all I/O and platform-specific capabilities are decoupled from the core language and delivered as optional modules.

## Standard Modules

| Module | Purpose |
| :--- | :--- |
| **`log`** | Output and debugging. |
| **`runtime`** | Monotonic timing, signaling, and engine control. |
| **`loop`** | Symbolic iteration and flow termination. |
| **`str`** | String manipulation and formatting. |
| **`arr`** | Array management and iteration. |
| **`map`** | Map access and mutation (isolated to internal memory). |
| **`num`** | Numeric parsing and base conversion. |
| **`math`** | Fundamental arithmetic and comparisons. |
| **`logic`** | Functional composition of logical operations. |
| **`regex`** | Pattern matching via Opaque handles. |
| **`json`** | Industry-standard data serialization. |
| **`err`** | Structured inspection of Native Error payloads. |

## Philosophical Constraints

1. **Strict Procedural Purity**: Values are inert. You never call methods on variables. Use `str.length(s)`, not `s.length()`.
2. **Fail-Fast Typing**: Standard tasks strictly enforce parameter types. Passing a String to `math.add` triggers a catchable **Type Mismatch** Error.
3. **Immutability by Default**: Most tasks return new values. Only `arr.push`, `arr.pop`, and `map.set` perform in-place mutation, and only on internal data types (never on Opaque handles).

## Official Extensions

Capabilities that touch the environment (Filesystem, Network, OS Metadata) are quarantined into **Extensions** and must be explicitly registered by the Runner.

* **`sys`**: FS, OS, and Process management.
* **`platform`**: Hardware quirks and precision-constrained logic (e.g. `bin` bitwise).
