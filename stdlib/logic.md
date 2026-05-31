# Logic & Reflection

Functional composition, arithmetic, and type reflection.

## `math` Namespace

* **`math_add(...nums)`**: Sum of arguments.
* **`math_sub(a, b)`**: Difference.
* **`math_mul(...nums)`**: Product.
* **`math_div(a, b)`**: Quotient.
* **`math_mod(a, b)`**: Modulo (remainder).
* **`math_gt(a, b)`**: 1 if `a > b`.
* **`math_lt(a, b)`**: 1 if `a < b`.

## `logic` Namespace

* **`logic_and(...args)`**: Last arg if all are truthy, else Void.
* **`logic_or(...args)`**: First truthy arg, else Void.
* **`logic_eq(a, b)`**: Deep value equality.

## `type` Namespace (Reflection)

Explicit type-checking for all 8 core Hank types. Returns `1` if match, otherwise `Void`.

* **`type_isVoid(v)`**
* **`type_isNumber(v)`**
* **`type_isString(v)`**
* **`type_isArray(v)`**
* **`type_isMap(v)`**
* **`type_isOpaque(v)`**
* **`type_isTask(v)`**
* **`type_isError(v)`**

## `regex` Namespace

* **`regex_parse(p, ?f)`**: Compiles pattern to **Opaque** handle.
* **`regex_match(s, p)`**: Truthy if string matches pattern (Opaque or string).
* **`regex_replace(s, p, r)`**: Returns string with occurrences replaced.

