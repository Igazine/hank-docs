# Logic & Pattern Matching

Functional composition and regular expression support.

## `math` Module

* **`math_add(...nums)`**: Sum of arguments.
* **`math_sub(a, b)`**: Difference.
* **`math_mul(...nums)`**: Product.
* **`math_div(a, b)`**: Quotient.
* **`math_gt(a, b)`**: 1 if `a > b`.
* **`math_lt(a, b)`**: 1 if `a < b`.

## `logic` Module

* **`logic_and(...args)`**: Last arg if all are truthy, else Void.
* **`logic_or(...args)`**: First truthy arg, else Void.
* **`logic_eq(a, b)`**: Deep value equality (Strings, Numbers, Arrays, Maps, Error codes).

## `regex` Module

* **`regex_parse(p, ?f)`**: Compiles pattern to **Opaque** handle.
* **`regex_match(s, p)`**: Truthy if string matches pattern (Opaque or string).
* **`regex_replace(s, p, r)`**: Returns string with occurrences replaced.
