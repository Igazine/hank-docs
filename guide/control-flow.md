# Control Flow

Hank provides a unified flow-control system based on three sigils: `?` (If), `:` (Fallback), and `~` (Rescue).

## Unified Gates

The `?`, `:`, and `~` sigils form a single control chain. 

```hank
() {
  user_score = 95
  
  ? math.gt(user_score, 90) {
    log.print("Grade: A")
  } : {
    log.print("Grade: B")
  }
}
```

### Optional Parentheses

Since Hank evaluates truthiness directly from expressions, parentheses around the condition are **optional**.

```hank
// Paren-less (Idiomatic)
? math.eq(x, y) { ... }

// Parentheses (Valid Grouped Expression)
? (math.eq(x, y)) { ... }
```

## Rescue Gate (`~`)

The Rescue gate allows you to catch **Runtime Exceptions** (such as Type Mismatches or missing functions) without halting the script.

```hank
() {
  ? result = risky_task() {
    log.print("Task succeeded")
  } ~ (e) {
    log.error(str.format("Task failed with code: %1", err.code(e)))
  }
}
```

If you don't need to inspect the error, the capture variable is optional:

```hank
? risky_task() { } ~ {
  log.print("Swallowed the error")
}
```

## Truthiness in Hank

Hank follows a simple "Existence-is-Truth" model:
* **Truthy**: Any concrete value (Number, String, Array, Map, Opaque, Task, Error).
* **Falsy**: Only `Void` (the absence of a value).

This means `0`, `""`, and `[]` are all **Truthy**. 

```hank
? 0 { log.print("Zero is truthy") }
? [] { log.print("Empty array is truthy") }
? _ { } : { log.print("Unbound identifier is falsy (Void)") }
```

