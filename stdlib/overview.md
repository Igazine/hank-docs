# Standard Library Overview

The Hank Standard Library is a collection of native tasks provided by the Host environment. To maintain the **Air Gap Principle**, all I/O and platform-specific capabilities are decoupled from the core language and delivered as optional task namespaces.

## Task Namespaces

| Namespace | Purpose |
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
| **`type`** | Explicit reflection and type-checking. |
| **`regex`** | Pattern matching via Opaque handles. |
| **`json`** | Industry-standard data serialization. |
| **`err`** | Structured inspection of Native Error payloads. |

## Philosophical Constraints

1. **The Flat Namespace**: In accordance with the Hank v1.5.0 architecture, the Standard Library does not use dot-notation. All tasks are registered as root-level identifiers using underscores to denote categories (e.g., `math_add`, `str_length`).
2. **Strict Procedural Purity**: Values are inert. You never call methods on variables. Use `str_length(s)`, not `s.length()`.
3. **Fail-Fast Typing**: Standard tasks strictly enforce parameter types. Passing a String to `math_add` triggers a catchable **Type Mismatch** Error.
4. **Targeted Mutation**: Most tasks return new values. Only `arr_push`, `arr_pop`, `arr_shift`, `arr_unshift`, `arr_sort`, and `map_set` perform in-place mutation, and only on internal data types (never on Opaque handles).

## Official Extensions

Capabilities that touch the environment (Filesystem, Network, OS Metadata) are quarantined into **Extensions** and must be explicitly registered by the Runner.

* **`sys`**: FS, OS, and Process management.
* **`platform`**: Hardware quirks and precision-constrained logic (e.g. `bin` bitwise).
