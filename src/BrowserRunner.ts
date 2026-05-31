import { Runner, StdLib, ValueType } from '../vendor/hank-ts/dist/index.js';
import type { Value, NativeFunc } from '../vendor/hank-ts/dist/index.js';

export interface BrowserRunnerOptions {
    env?: Record<string, string>;
    onPrint?: (msg: string) => void;
    onError?: (msg: string) => void;
    onWarn?: (msg: string) => void;
    onSignal?: (val: Value) => void;
}

/**
 * A Hank Runner specialized for the Browser environment.
 * Redirects logs to callbacks and provides access to performance.now().
 */
export class BrowserRunner extends Runner {
    constructor(private options: BrowserRunnerOptions = {}) {
        super();
        this.registerExtension(new StdLib());
        this.setupCore();
        
        // Default localizations
        this.registerLocalization({
            4001: "Target is not a function: {0}",
            4007: "Type Mismatch: Expected {0}, got {1} in {2}",
            4005: "Value exceeds safe integer bounds: {0} in {1}"
        });
    }

    private setupCore() {
        // Flat task registration
        this.registerTasks({
            log_print: (args) => {
                const msg = args.map(a => this.valToString(a)).join(' ');
                if (this.options.onPrint) this.options.onPrint(msg);
                else console.log(msg);
                return { type: ValueType.Void };
            },
            log_error: (args) => {
                const msg = args.map(a => this.valToString(a)).join(' ');
                if (this.options.onError) this.options.onError(msg);
                else console.error(msg);
                return { type: ValueType.Void };
            },
            log_warn: (args) => {
                const msg = args.map(a => this.valToString(a)).join(' ');
                if (this.options.onWarn) this.options.onWarn(msg);
                else console.warn(`[WARN] ${msg}`);
                return { type: ValueType.Void };
            },
            runtime_halt: (args) => {
                const code = args.length > 0 && args[0].type === ValueType.Number ? args[0].value : 0;
                throw new Error(`HANK_HALT:${code}`);
            },
            runtime_elapsedTime: () => ({ type: ValueType.Number, value: typeof performance !== 'undefined' ? performance.now() : 0 }),
            runtime_signal: (args) => {
                if (args.length > 0 && this.options.onSignal) this.options.onSignal(args[0]);
                return { type: ValueType.Void };
            },
            env_get: (args) => {
                if (args.length === 0) return { type: ValueType.Void };
                const key = this.valToString(args[0]);
                const val = (this.options.env || {})[key];
                return val !== undefined ? { type: ValueType.String, value: val } : { type: ValueType.Void };
            },
            env_set: () => ({ type: ValueType.Void }),
            env_keys: () => ({
                type: ValueType.Array,
                value: Object.keys(this.options.env || {}).map(k => ({ type: ValueType.String, value: k }))
            })
        });
    }

    private valToString(v: Value): string {
        switch (v.type) {
            case ValueType.String: return v.value;
            case ValueType.Number: {
                let s = v.value.toString();
                if (s.endsWith('.0')) s = s.substring(0, s.length - 2);
                return s;
            }
            case ValueType.Void: return 'Void';
            case ValueType.Array: return '[Array]';
            case ValueType.Map: return '[Map]';
            case ValueType.Opaque: return `[Opaque:${v.label}]`;
            case ValueType.Task: return '[Task]';
            case ValueType.Error: return `[Error:${v.code}]`;
            default: return 'Void';
        }
    }
}
