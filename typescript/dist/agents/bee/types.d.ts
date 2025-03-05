import { BaseMemory } from '../../memory/base.js';
import { Message } from '../../backend/message.js';
import { C as Callback } from '../../emitter-BxVxGBbJ.js';
import { AnyTool, BaseToolRunOptions, ToolOutput, ToolError } from '../../tools/base.js';
import { BeeSystemPrompt, BeeAssistantPrompt, BeeUserPrompt, BeeUserEmptyPrompt, BeeToolErrorPrompt, BeeToolInputErrorPrompt, BeeToolNoResultsPrompt, BeeToolNotFoundPrompt, BeeSchemaErrorPrompt } from './prompts.js';
import { LinePrefixParser } from '../../parsers/linePrefix.js';
import { ZodParserField, JSONParserField } from '../../parsers/field.js';
import { NonUndefined } from '../../internals/types.js';
import { ChatModelOutput } from '../../backend/chat.js';
import '../../errors.js';
import '../../internals/helpers/guards.js';
import '../../internals/serializable.js';
import 'ai';
import 'ajv';
import '../../context.js';
import '../../internals/helpers/promise.js';
import 'promise-based-task';
import '../../cache/base.js';
import '../../internals/helpers/schema.js';
import 'zod';
import 'zod-to-json-schema';
import '../../template.js';
import '../../parsers/errors.js';
import '@streamparser/json';
import 'jsonrepair/stream';
import '../../backend/utils.js';
import '../../backend/constants.js';
import '@ai-sdk/provider';

/**
 * Copyright 2025 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface BeeRunInput {
    prompt: string | null;
}
interface BeeRunOutput {
    result: Message;
    iterations: BeeAgentRunIteration[];
    memory: BaseMemory;
}
interface BeeAgentRunIteration {
    raw: ChatModelOutput;
    state: BeeIterationResult;
}
interface BeeAgentExecutionConfig {
    totalMaxRetries?: number;
    maxRetriesPerStep?: number;
    maxIterations?: number;
}
interface BeeRunOptions {
    signal?: AbortSignal;
    execution?: BeeAgentExecutionConfig;
}
interface BeeMeta {
    iteration: number;
}
interface BeeUpdateMeta extends BeeMeta {
    success: boolean;
}
interface BeeCallbacks {
    start?: Callback<{
        meta: BeeMeta;
        tools: AnyTool[];
        memory: BaseMemory;
    }>;
    error?: Callback<{
        error: Error;
        meta: BeeMeta;
    }>;
    retry?: Callback<{
        meta: BeeMeta;
    }>;
    success?: Callback<{
        data: Message;
        iterations: BeeAgentRunIteration[];
        memory: BaseMemory;
        meta: BeeMeta;
    }>;
    update?: Callback<{
        data: BeeIterationResult;
        update: {
            key: keyof BeeIterationResult;
            value: string;
            parsedValue: unknown;
        };
        meta: BeeUpdateMeta;
        memory: BaseMemory;
    }>;
    partialUpdate?: Callback<{
        data: BeeIterationResultPartial;
        update: {
            key: keyof BeeIterationResult;
            value: string;
            parsedValue: unknown;
        };
        meta: BeeUpdateMeta;
    }>;
    toolStart?: Callback<{
        data: {
            tool: AnyTool;
            input: unknown;
            options: BaseToolRunOptions;
            iteration: BeeIterationToolResult;
        };
        meta: BeeMeta;
    }>;
    toolSuccess?: Callback<{
        data: {
            tool: AnyTool;
            input: unknown;
            options: BaseToolRunOptions;
            result: ToolOutput;
            iteration: BeeIterationToolResult;
        };
        meta: BeeMeta;
    }>;
    toolError?: Callback<{
        data: {
            tool: AnyTool;
            input: unknown;
            options: BaseToolRunOptions;
            error: ToolError;
            iteration: BeeIterationToolResult;
        };
        meta: BeeMeta;
    }>;
}
interface BeeAgentTemplates {
    system: typeof BeeSystemPrompt;
    assistant: typeof BeeAssistantPrompt;
    user: typeof BeeUserPrompt;
    userEmpty: typeof BeeUserEmptyPrompt;
    toolError: typeof BeeToolErrorPrompt;
    toolInputError: typeof BeeToolInputErrorPrompt;
    toolNoResultError: typeof BeeToolNoResultsPrompt;
    toolNotFoundError: typeof BeeToolNotFoundPrompt;
    schemaError: typeof BeeSchemaErrorPrompt;
}
type BeeParserInput = LinePrefixParser.define<{
    thought: ZodParserField<string>;
    tool_name: ZodParserField<string>;
    tool_input: JSONParserField<Record<string, any>>;
    tool_output: ZodParserField<string>;
    final_answer: ZodParserField<string>;
}>;
type BeeParser = LinePrefixParser<BeeParserInput>;
type BeeIterationResult = LinePrefixParser.inferOutput<BeeParser>;
type BeeIterationResultPartial = LinePrefixParser.inferPartialOutput<BeeParser>;
type BeeIterationToolResult = NonUndefined<BeeIterationResult, "tool_input" | "tool_name">;

export type { BeeAgentExecutionConfig, BeeAgentRunIteration, BeeAgentTemplates, BeeCallbacks, BeeIterationResult, BeeIterationResultPartial, BeeIterationToolResult, BeeMeta, BeeParserInput, BeeRunInput, BeeRunOptions, BeeRunOutput, BeeUpdateMeta };
