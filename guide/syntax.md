# Syntax & Types

Hank's syntax is purely symbolic, emphasizing data density and procedural purity.

## Core Sigils

* **`()`**: Defines a Task (User Function).
* **`{}`**: Defines an executable Block of statements.
* **`[]`**: Defines a Data Collection (Array or Map).
* **`?`**: Initiates Flow Control (If).
* **`:`**: Fallback branch.
* **`~`**: Rescue branch (Catch).
* **`#`**: Core Scope escape (direct Native Task lookup).
* **`@`**: Parse-time Macro inclusion.
* **`^`**: Return operator.
* **`!`**: Logical NOT.

## Intrinsic Types

An implementation must support the following eight value types:

| Type | Description | Literal Example |
| :--- | :--- | :--- |
| **Void** | Absence of value. The only falsy state. | `_` (unbound identifier) |
| **Number** | 64-bit floating point. | `123.45`, `-10` |
| **String** | UTF-8 character sequence. | `"tamas"`, `'hello'` |
| **Array** | Ordered list of values. | `[1, "a", []]` |
| **Map** | Unordered key-value map. Keys must be strings. | `[ "x": 1, "y": 2 ]` |
| **Opaque** | Handle to Host state (e.g. Regex). | (Created by Native Tasks) |
| **Task** | A callable unit of execution. | `(x) { ^ math.add(x, 1) }` |
| **Error** | A structured runtime failure payload. | (Yielded by Engine) |

## Maps vs. Blocks

Hank uses `[]` for **Maps** and `{}` for **Blocks**. This permanently resolves the ambiguity found in many C-style languages.

```hank
// This is a Map (Data)
user = [ "name": "tamas", "age": 30 ]

// This is a Block (Executable Logic)
logic = {
  log.print("I am executing code")
  "result"
}
```

Empty maps use the `[:]` literal:

```hank
empty_map = [:]
```

## Scoping

Hank uses **strict lexical scoping**.

1. **Evaluate-Then-Bind**: The right side of an assignment is evaluated fully before the left side is bound to the **local scope only**.
2. **Shadowing by Design**: You can safely shadow parent variables without mutating them.

```hank
() {
  count = 10
  (x) {
    count = 20 // Shadows outer 'count' in this scope
  }(1)
  log.print(count) // Still 10
}
```

To mutate shared state, use reference types like **Arrays** or **Maps**.

```hank
() {
  state = [ "count": 10 ]
  () {
    map.set(state, "count", 20) // Mutates the shared Map
  }()
  log.print(state.count) // 20
}
```
