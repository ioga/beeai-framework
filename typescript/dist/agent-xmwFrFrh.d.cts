import { GetRunContext, RunContext } from './context.cjs';
import { b as AgentMeta, a as BaseAgent } from './base-daM6fHUP.cjs';
import { AnyTool } from './tools/base.cjs';
import { BaseMemory } from './memory/base.cjs';
import { E as Emitter } from './emitter-C9EN5B0j.cjs';
import { BeeMeta, BeeCallbacks, BeeIterationToolResult, BeeRunOptions, BeeAgentRunIteration, BeeParserInput, BeeRunInput, BeeAgentTemplates, BeeAgentExecutionConfig, BeeRunOutput } from './agents/bee/types.cjs';
import { LinePrefixParser } from './parsers/linePrefix.cjs';
import { Serializable } from './internals/serializable.cjs';
import { ChatModel } from './backend/chat.cjs';
import { RetryCounter } from './internals/helpers/counter.cjs';

interface BeeRunnerLLMInput {
    meta: BeeMeta;
    signal: AbortSignal;
    emitter: Emitter<BeeCallbacks>;
}
interface BeeRunnerToolInput {
    state: BeeIterationToolResult;
    meta: BeeMeta;
    signal: AbortSignal;
    emitter: Emitter<BeeCallbacks>;
}
declare abstract class BaseRunner extends Serializable {
    protected readonly input: BeeInput;
    protected readonly options: BeeRunOptions;
    protected readonly run: GetRunContext<BeeAgent>;
    memory: BaseMemory;
    readonly iterations: BeeAgentRunIteration[];
    protected readonly failedAttemptsCounter: RetryCounter;
    constructor(input: BeeInput, options: BeeRunOptions, run: GetRunContext<BeeAgent>);
    createIteration(): Promise<{
        emitter: Emitter<BeeCallbacks>;
        state: LinePrefixParser.infer<BeeParserInput>;
        meta: BeeMeta;
        signal: AbortSignal;
    }>;
    init(input: BeeRunInput): Promise<void>;
    abstract llm(input: BeeRunnerLLMInput): Promise<BeeAgentRunIteration>;
    abstract tool(input: BeeRunnerToolInput): Promise<{
        output: string;
        success: boolean;
    }>;
    abstract get defaultTemplates(): BeeAgentTemplates;
    get templates(): BeeAgentTemplates;
    protected abstract initMemory(input: BeeRunInput): Promise<BaseMemory>;
    createSnapshot(): {
        input: BeeInput;
        options: BeeRunOptions;
        memory: BaseMemory<unknown>;
        failedAttemptsCounter: RetryCounter;
    };
    loadSnapshot(snapshot: ReturnType<typeof this.createSnapshot>): void;
}

type BeeTemplateFactory<K extends keyof BeeAgentTemplates> = (template: BeeAgentTemplates[K]) => BeeAgentTemplates[K];
interface BeeInput {
    llm: ChatModel;
    tools: AnyTool[];
    memory: BaseMemory;
    meta?: Omit<AgentMeta, "tools">;
    templates?: Partial<{
        [K in keyof BeeAgentTemplates]: BeeAgentTemplates[K] | BeeTemplateFactory<K>;
    }>;
    execution?: BeeAgentExecutionConfig;
    stream?: boolean;
}
declare class BeeAgent extends BaseAgent<BeeRunInput, BeeRunOutput, BeeRunOptions> {
    protected readonly input: BeeInput;
    readonly emitter: Emitter<BeeCallbacks>;
    protected runner: new (...args: ConstructorParameters<typeof BaseRunner>) => BaseRunner;
    constructor(input: BeeInput);
    set memory(memory: BaseMemory);
    get memory(): BaseMemory;
    get meta(): AgentMeta;
    protected _run(input: BeeRunInput, options: BeeRunOptions | undefined, run: GetRunContext<typeof this>): Promise<BeeRunOutput>;
    createSnapshot(): {
        input: BeeInput;
        emitter: Emitter<BeeCallbacks>;
        runner: new (input: BeeInput, options: BeeRunOptions, run: RunContext<BeeAgent, any>) => BaseRunner;
        isRunning: boolean;
    };
}

export { type BeeInput as B, BeeAgent as a, BaseRunner as b, type BeeRunnerLLMInput as c, type BeeRunnerToolInput as d, type BeeTemplateFactory as e };
