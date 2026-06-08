<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { BrowserRunner } from '../../../src/BrowserRunner'

const activeTab = ref<'script' | 'vfs'>('script')
const script = ref(`() {
  log_print("Hello from Hank!")

  // New Map Syntax
  user = [
    "name": "Tamas",
    "role": "Architect"
  ]

  // Flat Namespace (Procedural)
  ? math_eq(map_get(user, "name"), "Tamas") {
    log_print(str_format("Welcome, %1!", map_get(user, "name")))
  } : {
    log_print("Access Denied")
  }

  // Safe Error Rescuing
  ? math_add(map_get(user, "name"), 100) {
    log_print("Success")
  } ~ (e) {
    log_error(str_format("Error %1: %2", err_code(e), err_message(e)))
  }
}`)

const vfs = ref(JSON.stringify({
  "add_ten": "(n) { ^ math_add(n, 10) }"
}, null, 2))

const output = ref<{ msg: string, type: 'stdout' | 'stderr' | 'warn' | 'error' | 'system' }[]>([])
const isRunning = ref(false)

const runTask = async () => {
  if (isRunning.value) return
  isRunning.value = true
  output.value = []
  output.value.push({ msg: "Starting execution...", type: 'system' })

  try {
    const virtualFiles = JSON.parse(vfs.value)
    
    // Simple mock Resource for VFS
    class MemoryResource {
        public content: string | null = null;
        public ast: any = null;
        constructor(public id: string) {}
        async load() {
            if (this.id === 'main') this.content = script.value;
            else if (virtualFiles[this.id]) this.content = virtualFiles[this.id];
            else throw new Error(`File not found: ${this.id}`);
        }
        resolve(path: string) { return new MemoryResource(path); }
    }

    const runner = new BrowserRunner({
      onPrint: (msg) => output.value.push({ msg, type: 'stdout' }),
      onError: (msg) => output.value.push({ msg, type: 'stderr' }),
      onWarn: (msg) => output.value.push({ msg, type: 'warn' }),
    })

    const mainRes = new MemoryResource('main')
    const result = await runner.run(mainRes as any)
    
    output.value.push({ msg: `Script returned: ${result.toString()}`, type: 'system' })
  } catch (e: any) {
    if (e.message?.startsWith('HANK_HALT:')) {
      const code = e.message.split(':')[1]
      output.value.push({ msg: `Process exited with code ${code}`, type: 'system' })
    } else {
      output.value.push({ msg: e.toString(), type: 'error' })
    }
  } finally {
    isRunning.value = false
  }
}
</script>

<template>
  <div class="playground-container">
    <div class="editor-section">
      <div class="tabs">
        <button 
            :class="['tab-btn', { active: activeTab === 'script' }]" 
            @click="activeTab = 'script'"
        >main.hank</button>
        <button 
            :class="['tab-btn', { active: activeTab === 'vfs' }]" 
            @click="activeTab = 'vfs'"
        >Virtual Files (JSON)</button>
      </div>
      
      <div class="editor-wrapper">
        <textarea 
            v-if="activeTab === 'script'"
            v-model="script" 
            spellcheck="false"
            class="code-editor"
        ></textarea>
        <textarea 
            v-else
            v-model="vfs" 
            spellcheck="false"
            class="code-editor"
        ></textarea>
      </div>

      <div class="controls">
        <button @click="runTask" :disabled="isRunning" class="run-btn">
            {{ isRunning ? 'Running...' : 'Run Task' }}
        </button>
      </div>
    </div>

    <div class="output-section">
      <div class="output-header">Console Output</div>
      <div class="console">
        <div v-for="(line, i) in output" :key="i" :class="['console-line', line.type]">
          <span class="line-prefix">[{{ line.type }}]</span>
          <span class="line-content">{{ line.msg }}</span>
        </div>
        <div v-if="output.length === 0" class="console-placeholder">
          Click "Run Task" to see output here...
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-container {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.editor-section {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tabs {
  display: flex;
  background: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-btn {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border: none;
  background: transparent;
  cursor: pointer;
}

.tab-btn.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  border-bottom: 2px solid var(--vp-c-brand);
}

.editor-wrapper {
  height: 350px;
  position: relative;
}

.code-editor {
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  background: transparent;
  color: var(--vp-c-text-1);
  border: none;
  resize: none;
  outline: none;
}

.controls {
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: flex-end;
}

.run-btn {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.run-btn:hover {
  opacity: 0.9;
}

.run-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.output-section {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--vp-c-divider);
  background: #1e1e1e;
  color: #d4d4d4;
  min-width: 0;
}

.output-header {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  background: #252526;
  border-bottom: 1px solid #333;
}

.console {
  height: 250px;
  padding: 0.5rem;
  overflow-y: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}

.console-line {
  margin-bottom: 0.25rem;
  white-space: pre-wrap;
  word-break: break-all;
}

.line-prefix {
  opacity: 0.5;
  margin-right: 0.5rem;
  font-size: 0.7rem;
}

.stdout .line-content { color: #fff; }
.stderr .line-content { color: #ff5555; }
.warn .line-content { color: #ffb86c; }
.error .line-content { color: #ff5555; font-weight: bold; }
.system .line-content { color: #8be9fd; font-style: italic; }

.console-placeholder {
  color: #666;
  font-style: italic;
  padding: 1rem;
}
</style>
