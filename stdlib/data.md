# Data Manipulation

Tasks for managing Strings, Arrays, and Maps.

## `str` Module (String)

* **`str_length(s)`**: Returns character count.
* **`str_format(tmpl, ...args)`**: Replaces `%1`, `%2`, etc. with args.
* **`str_concat(...args)`**: Joins all arguments.
* **`str_trim(s)`**: Removes leading/trailing whitespace.

## `arr` Module (Array)

* **`arr_length(a)`**: Returns item count.
* **`arr_get(a, idx)`**: Returns item at index.
* **`arr_push(a, item)`**: Appends item (In-place).
* **`arr_pop(a)`**: Removes and returns last item.
* **`arr_each(a, task)`**: Iterates over a snapshot. Task receives `(item, idx)`.

## `map` Module (Map)

* **`map_get(m, key)`**: Returns value for string key.
* **`map_set(m, key, val)`**: Updates key-value (In-place).
* **`map_keys(m)`**: Returns array of string keys.

> **Security Note**: `map_set` and `arr_push` only work on native data types. Attempting to mutate an **Opaque** handle will trigger a Type Mismatch.

## `num` Module (Number)

* **`num_parse(s, ?base)`**: Parses string to number. Auto-detects `0x`, `0b`, `0o`.
* **`num_format(n, ?base)`**: Converts number to string in base 2-36.
