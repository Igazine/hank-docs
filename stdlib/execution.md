# Execution & Logging

Tasks for timing, signaling, engine control, and output.

## `log` Namespace

* **`log_print(...args)`**: Standard output.
* **`log_error(...args)`**: Error stream.
* **`log_warn(...args)`**: Warning decoration.

## `runtime` Namespace

* **`runtime_halt(?code)`**: Stops execution. Returns code to Host.
* **`runtime_elapsedTime()`**: Monotonic milliseconds.
* **`runtime_signal(val)`**: Emits event to Host.

## `loop` Namespace

* **`loop_while(cond_task, body_task)`**: Symbolic loop.
* **`loop_break()`**: Terminate innermost loop.

## `err` Namespace

* **`err_code(e)`**: Returns numeric error code.
* **`err_message(e)`**: Returns host-localized message.
* **`err_args(e)`**: Returns raw context array.

