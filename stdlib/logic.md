# Logic & Pattern Matching

Functional composition and regular expression support.

## `math` Module

* **`add(...nums)`**: Sum of arguments.
* **`sub(a, b)`**: Difference.
* **`mul(...nums)`**: Product.
* **`div(a, b)`**: Quotient.
* **`gt(a, b)`**: 1 if `a > b`.
* **`lt(a, b)`**: 1 if `a < b`.

## `logic` Module

* **`and(...args)`**: Last arg if all are truthy, else Void.
* **`or(...args)`**: First truthy arg, else Void.
* **`eq(a, b)`**: Deep value equality (Strings, Numbers, Arrays, Maps, Error codes).

## `regex` Module

* **`parse(p, ?f)`**: Compiles pattern to **Opaque** handle.
* **`match(s, p)`**: Truthy if string matches pattern (Opaque or string).
* **`replace(s, p, r)`**: Returns string with occurrences replaced.
