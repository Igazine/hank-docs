# Building a Runner

Building a compliant Hank Runner requires implementing the formal **Hybrid Automation Language Specifications**. These documents provide the ironclad behavioral contracts necessary for cross-engine parity.

- **`Hank.md`**: Grammar, Lexical Rules, and AST Contract.
- **`RUNNER.md`**: The Host Handshake, Macro Pre-processing, and Execution Lifecycle.
- **`STDLIB.md`**: The Functional Specification for foundational modules.

## Native Task Interface

Every native task in Hank follows a strict function signature.

```typescript
// Example in TypeScript
function myNativeTask(args: Value[], ctx: ExecutionContext): Value {
  // 1. Validate arguments
  if (args.length < 1) return VVoid;

  // 2. Perform host operation
  const path = valToString(args[0]);
  const content = fs.readFileSync(path, 'utf8');

  // 3. Return a Hank value
  return VString(content);
}
```

## The Execution Context

The `ExecutionContext` provided to every native task allows the host to interact safely with the engine during execution.

- **`parse(source)`**: Dynamically parse new Hank code.
- **`eval(node)`**: Evaluate a pre-parsed node in the current scope.
- **`call(task, args)`**: Invoke a Hank task (native or user-defined).
- **`scope`**: Read or write to the local lexical scope.

## Registering Extensions

The recommended way to provide native capabilities is via the **Extension** architecture. Host implementations provide pre-built extensions that can be registered with a single call.

```haxe
// Example in Haxe
var runner = new Runner();

// Register the Pure Standard Library
runner.registerExtension(new StdLib());

// Register Optional Extensions (e.g. Sys/OS interaction)
runner.registerExtension(new SysExtension());
```

A compliant Runner implementation should provide a `registerExtension` method that iterates through the provided modules and injects them into the `coreScope`.

## Manual Module Registration

If you are not using a formal Extension object, you can group tasks into objects manually to keep the global namespace clean.

## Security & Data Sanitization

Hank is designed as a secure sandbox with a strict **Air Gap**. The engine guarantees:
1. **Memory Isolation**: Scripts cannot access host memory unless explicitly provided.
2. **Deterministic Execution**: Zero built-in I/O (no `print`, `read`, or `network` calls in the core).

### The Boundary of Responsibility

While the Hank Engine protects your system from arbitrary memory access, **it does NOT sanitize or parse the literal content of Strings or Numbers** passed into Native Tasks.

If you expose a Native Task that performs sensitive operations (like database queries or shell commands), it is the **Host Application's absolute responsibility** to sanitize that data before use. Hank serves as a secure conduit, but not a data-validation engine.

### Example: Secure DbExtension

If you were building a custom database extension, you should use parameterized queries or escape strings within your native implementation:

```typescript
// SECURE: Parameterizing the query in the Host implementation
tasks.set("db_findUser", (args, ctx) => {
    const userId = valToString(args[0]);
    
    // In the host logic, we use parameters to prevent SQL Injection.
    // The Hank script just sends the string; the Host handles the security.
    const result = db.query("SELECT * FROM users WHERE id = ?", [userId]);
    
    return mapAnyToHank(result);
});
```

By maintaining this clear boundary, you ensure that even if a Hank script is written by an untrusted user, they cannot "break out" of the Native Task's intended logic into your host system.

