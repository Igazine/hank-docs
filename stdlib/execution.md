# Execution & Logging

Tasks for timing, signaling, engine control, and output.

## `log` Module

* **`print(...args)`**: Standard output.
* **`error(...args)`**: Error stream.
* **`warn(...args)`**: Warning decoration.

## `runtime` Module

* **`halt(?code)`**: Stops execution. Returns code to Host.
* **`elapsedTime()`**: Monotonic milliseconds.
* **`signal(val)`**: Emits event to Host.

## `loop` Module

* **`while(cond_task, body_task)`**: Symbolic loop.
* **`break()`**: Terminate innermost loop.

## `err` Module

* **`code(e)`**: Returns numeric error code.
* **`message(e)`**: Returns host-localized message.
* **`args(e)`**: Returns raw context array.
* **`isError(val)`**: Returns `1` if type is Error.
