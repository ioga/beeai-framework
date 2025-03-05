'use strict';

var agent_cjs = require('../agents/bee/agent.cjs');
var workflow_cjs = require('./workflow.cjs');
var message_cjs = require('../backend/message.cjs');
var zod = require('zod');
var unconstrainedMemory_cjs = require('../memory/unconstrainedMemory.cjs');
var base_cjs = require('../agents/base.cjs');
var remeda = require('remeda');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class AgentWorkflow {
  static {
    __name(this, "AgentWorkflow");
  }
  workflow;
  static schema = zod.z.object({
    messages: zod.z.array(zod.z.instanceof(message_cjs.Message)).min(1),
    finalAnswer: zod.z.string().optional(),
    newMessages: zod.z.array(zod.z.instanceof(message_cjs.Message)).default([])
  });
  constructor(name = "AgentWorkflow") {
    this.workflow = new workflow_cjs.Workflow({
      name,
      schema: AgentWorkflow.schema,
      outputSchema: AgentWorkflow.schema.required()
    });
  }
  run(messages, options = {}) {
    return this.workflow.run({
      messages
    }, options);
  }
  addAgent(agent) {
    if (agent instanceof base_cjs.BaseAgent) {
      return agent.clone().then((clone) => {
        const factory = /* @__PURE__ */ __name((memory) => {
          clone.memory = memory;
          return clone;
        }, "factory");
        return this._add(clone.meta.name, factory);
      });
    }
    const name = agent.name || `Agent${remeda.randomString(4)}`;
    return this._add(name, remeda.isFunction(agent) ? agent : this._createFactory(agent));
  }
  delAgent(name) {
    return this.workflow.delStep(name);
  }
  _createFactory(input) {
    return (memory) => new agent_cjs.BeeAgent({
      llm: input.llm,
      tools: input.tools ?? [],
      memory,
      meta: {
        name: input.name,
        description: input.instructions ?? ""
      },
      execution: input.execution,
      ...input.instructions && {
        templates: {
          system: /* @__PURE__ */ __name((template) => template.fork((config) => {
            config.defaults.instructions = input.instructions || config.defaults.instructions;
          }), "system")
        }
      }
    });
  }
  _add(name, factory) {
    this.workflow.addStep(name, async (state, ctx) => {
      const memory = new unconstrainedMemory_cjs.UnconstrainedMemory();
      await memory.addMany([
        ...state.messages,
        ...state.newMessages
      ]);
      const agent = await factory(memory.asReadOnly());
      const { result } = await agent.run({
        prompt: null
      }, {
        signal: ctx.signal
      });
      state.finalAnswer = result.text;
      state.newMessages.push(new message_cjs.AssistantMessage([
        `Assistant Name: ${name}`,
        `Assistant Response: ${result.text}`
      ].join("\n")));
    });
    return this;
  }
}

exports.AgentWorkflow = AgentWorkflow;
//# sourceMappingURL=agent.cjs.map
//# sourceMappingURL=agent.cjs.map