# Execution & Logging

Tasks for timing, signaling, engine control, and output.

## `log` Module

* **`log_print(...args)`**: Standard output.
* **`log_error(...args)`**: Error stream.
* **`log_warn(...args)`**: Warning decoration.

## `runtime` Module

* **`runtime_halt(?code)`**: Stops execution. Returns code to Host.
* **`runtime_elapsedTime()`**: Monotonic milliseconds.
* **`runtime_signal(val)`**: Emits event to Host.

## `loop` Module

* **`loop_while(cond_task, body_task)`**: Symbolic loop.
* **`loop_break()`**: Terminate innermost loop.

## `err` Module

* **`err_code(e)`**: Returns numeric error code.
* **`err_message(e)`**: Returns host-localized message.
* **`err_args(e)`**: Returns raw context array.
* **`err_isError(val)`**: Returns `1` if type is Error.
