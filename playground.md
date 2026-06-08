# Hank Playground

Experiment with Hank syntax and the standard library directly in your browser.

<ClientOnly>
  <Playground />
</ClientOnly>

## How to use
1. Enter your Hank script in the editor above.
2. Click **Run Task** to execute.
3. View the results in the **Output** terminal.

### Example: Logic and Math
```hal
() {
  score = 85
  ? math_gt(score, 90) {
    log_print("Grade: A")
  } : {
    log_print("Grade: B or lower")
  }
}
```

### Example: Data Manipulation
```hal
() {
  fruits = ["apple", "banana"]
  arr_push(fruits, "cherry")
  
  arr_each(fruits, (item, i) {
    log_print(str_format("%1: %2", i, item))
  })
}
```

### Example: Browser-Specific Tasks
This example uses the `browser` module, which is **only** available in the BrowserRunner.

```hal
() {
  msg = "Hello from the browser!"
  
  // This prints to the playground's internal output
  log_print(msg)
  
  // This prints to your browser's Developer Console (F12)
  browser_log(msg)
  
  // This triggers a native browser alert
  browser_alert(msg)
}
```

### Example: Virtual File System (VFS)
The Playground includes a virtual filesystem. You can define multiple files in the **Virtual Files** tab and include them in your main script using the `@` macro.

By default, an `add_ten` file is provided that adds 10 to its argument.

```hal
@ "add_ten"
() {
  // The @ macro above binds the task defined in 'add_ten.hank'
  // to the 'add_ten' identifier in this scope.
  result = add_ten(5)
  
  log_print(str_format("Result from VFS: %1", result))
}
```
