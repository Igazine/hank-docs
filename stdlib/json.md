# JSON Serialization

Hank provides first-class support for JSON, ensuring data can flow seamlessly across the Air Gap.

## `json` Module

* **`parse(s)`**: Converts a JSON string into Hank data. JSON Objects are converted to **Hank Maps**.
* **`stringify(val)`**: Converts Hank data into a JSON string.

```hank
() {
  json_str = '{"user": "tamas", "id": 123}'
  data = json.parse(json_str)
  
  log.print(data.user) // "tamas"
  
  // Re-serialization
  m = [ "x": 10, "y": 20 ]
  log.print(json.stringify(m)) // '{"x": 10, "y": 20}'
}
```

## Non-Serializable Data

Certain Hank types cannot be stringified because they represent volatile runtime state. Attempting to stringify these will result in `Void` or an error:

* **Opaque handles** (e.g. active Regex engines)
* **Task definitions**
* **Error payloads**
