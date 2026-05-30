# Data Manipulation

Tasks for managing Strings, Arrays, and Maps.

## `str` Module (String)

* **`length(s)`**: Returns character count.
* **`format(tmpl, ...args)`**: Replaces `%1`, `%2`, etc. with args.
* **`concat(...args)`**: Joins all arguments.
* **`trim(s)`**: Removes leading/trailing whitespace.

## `arr` Module (Array)

* **`length(a)`**: Returns item count.
* **`get(a, idx)`**: Returns item at index.
* **`push(a, item)`**: Appends item (In-place).
* **`pop(a)`**: Removes and returns last item.
* **`each(a, task)`**: Iterates over a snapshot. Task receives `(item, idx)`.

## `map` Module (Map)

* **`get(m, key)`**: Returns value for string key.
* **`set(m, key, val)`**: Updates key-value (In-place).
* **`keys(m)`**: Returns array of string keys.

> **Security Note**: `map.set` and `arr.push` only work on native data types. Attempting to mutate an **Opaque** handle will trigger a Type Mismatch.

## `num` Module (Number)

* **`parse(s, ?base)`**: Parses string to number. Auto-detects `0x`, `0b`, `0o`.
* **`format(n, ?base)`**: Converts number to string in base 2-36.
