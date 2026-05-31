# Data Manipulation

Tasks for managing Strings, Arrays, and Maps.

## `str` Namespace (String)

* **`str_length(s)`**: Returns character count.
* **`str_format(tmpl, ...args)`**: Replaces `%1`, `%2`, etc. with args.
* **`str_concat(...args)`**: Joins all arguments.
* **`str_trim(s)`**: Removes leading/trailing whitespace.

## `arr` Namespace (Array)

* **`arr_length(a)`**: Returns item count.
* **`arr_get(a, idx)`**: Returns item at index.
* **`arr_push(a, item)`**: Appends item (In-place).
* **`arr_pop(a)`**: Removes and returns last item.
* **`arr_shift(a)`**: Removes and returns first item.
* **`arr_unshift(a, item)`**: Inserts item at beginning.
* **`arr_slice(a, start, ?end)`**: Returns a shallow copy portion.
* **`arr_sort(a, ?task)`**: Sorts array in-place.
* **`arr_indexof(a, item)`**: Returns index of first occurrence.
* **`arr_each(a, task)`**: Iterates over a snapshot. Task receives `(item, idx)`.
* **`arr_map(a, task)`**: Returns new array with mapped results.
* **`arr_filter(a, task)`**: Returns new array with filtered results.

## `map` Namespace (Map)

* **`map_get(m, key)`**: Returns value for string key.
* **`map_set(m, key, val)`**: Updates key-value (In-place).
* **`map_remove(m, key)`**: Deletes a key from the map.
* **`map_keys(m)`**: Returns array of string keys.

> **Security Note**: `map_set`, `map_remove`, and `arr_push` only work on native data types. Attempting to mutate an **Opaque** handle will trigger a Type Mismatch.

## `num` Namespace (Number)

* **`num_parse(s, ?base)`**: Parses string to number. Auto-detects `0x`, `0b`, `0o`.
* **`num_format(n, ?base)`**: Converts number to string in base 2-36.

