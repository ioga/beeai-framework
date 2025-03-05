import { Run } from '../context.cjs';
import { Workflow, WorkflowRunOptions, WorkflowRun } from './workflow.cjs';
import { Message, MessageContentPart } from '../backend/message.cjs';
import { AnyTool } from '../tools/base.cjs';
import { ReadOnlyMemory } from '../memory/base.cjs';
import { z } from 'zod';
import { a as BaseAgent } from '../base-daM6fHUP.cjs';
import { BeeRunInput, BeeRunOutput, BeeRunOptions, BeeAgentExecutionConfig } from '../agents/bee/types.cjs';
import { ChatModel } from '../backend/chat.cjs';
import '../emitter-C9EN5B0j.cjs';
import '../internals/types.cjs';
import '../internals/helpers/guards.cjs';
import '../internals/serializable.cjs';
import '../internals/helpers/promise.cjs';
import '../errors.cjs';
import 'ai';
import 'ajv';
import 'promise-based-task';
import '../cache/base.cjs';
import '../internals/helpers/schema.cjs';
import 'zod-to-json-schema';
import '../agents/bee/prompts.cjs';
import '../template.cjs';
import '../parsers/linePrefix.cjs';
import '../parsers/field.cjs';
import '@streamparser/json';
import 'jsonrepair/stream';
import '../parsers/errors.cjs';
import '../backend/utils.cjs';
import '../backend/constants.cjs';
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
