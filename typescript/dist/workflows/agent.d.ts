import { Run } from '../context.js';
import { Workflow, WorkflowRunOptions, WorkflowRun } from './workflow.js';
import { Message, MessageContentPart } from '../backend/message.js';
import { AnyTool } from '../tools/base.js';
import { ReadOnlyMemory } from '../memory/base.js';
import { z } from 'zod';
import { a as BaseAgent } from '../base-mmG-8Pk9.js';
import { BeeRunInput, BeeRunOutput, BeeRunOptions, BeeAgentExecutionConfig } from '../agents/bee/types.js';
import { ChatModel } from '../backend/chat.js';
import '../emitter-BxVxGBbJ.js';
import '../internals/types.js';
import '../internals/helpers/guards.js';
import '../internals/serializable.js';
import '../internals/helpers/promise.js';
import '../errors.js';
import 'ai';
import 'ajv';
import 'promise-based-task';
import '../cache/base.js';
import '../internals/helpers/schema.js';
import 'zod-to-json-schema';
import '../agents/bee/prompts.js';
import '../template.js';
import '../parsers/linePrefix.js';
import '../parsers/field.js';
import '@streamparser/json';
import 'jsonrepair/stream';
import '../parsers/errors.js';
import '../backend/utils.js';
import '../backend/constants.js';
import '@ai-sdk/provider';

type AgentInstance = BaseAgent<BeeRunInput, BeeRunOutput, BeeRunOptions>;
type AgentFactory = (memory: ReadOnlyMemory) => AgentInstance | Promise<AgentInstance>;
interface AgentFactoryInput {
    name: string;
    llm: ChatModel;
    instructions?: string;
    tools?: AnyTool[];
    execution?: BeeAgentExecutionConfig;
}
declare class AgentWorkflow {
    protected readonly workflow: Workflow<z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodOptional<z.ZodString>;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        newMessages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodString;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages: Message<MessageContentPart, string>[];
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, string>;
    static readonly schema: z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodOptional<z.ZodString>;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        newMessages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>;
    constructor(name?: string);
    run(messages: Message[], options?: WorkflowRunOptions<string>): Run<WorkflowRun<z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodOptional<z.ZodString>;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        newMessages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodString;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages: Message<MessageContentPart, string>[];
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, string>, Workflow<z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodOptional<z.ZodString>;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        newMessages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodString;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages: Message<MessageContentPart, string>[];
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, string>, readonly [{
        messages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }, WorkflowRunOptions<string>]>;
    addAgent(agent: AgentFactory | AgentFactoryInput): this;
    addAgent(agent: AgentInstance): Promise<this>;
    delAgent(name: string): Workflow<z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodOptional<z.ZodString>;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        newMessages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer?: string | undefined;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, z.ZodObject<{
        messages: z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">;
        finalAnswer: z.ZodString;
        newMessages: z.ZodDefault<z.ZodArray<z.ZodType<Message<MessageContentPart, string>, z.ZodTypeDef, Message<MessageContentPart, string>>, "many">>;
    }, "strip", z.ZodTypeAny, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages: Message<MessageContentPart, string>[];
    }, {
        messages: Message<MessageContentPart, string>[];
        finalAnswer: string;
        newMessages?: Message<MessageContentPart, string>[] | undefined;
    }>, never>;
    protected _createFactory(input: AgentFactoryInput): AgentFactory;
    protected _add(name: string, factory: AgentFactory): this;
}

export { AgentWorkflow };
