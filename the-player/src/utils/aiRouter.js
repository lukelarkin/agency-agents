/**
 * GAP 6: MULTI-MODEL ROUTING — AI model routing configuration.
 *
 * When the app evolves to use AI-generated suggestions (e.g., personalized
 * text messages, date ideas, relationship advice), this router determines
 * which model handles which task for cost optimization.
 *
 * Current architecture: all logic is rule-based (zero API cost).
 * Future architecture: AI-augmented with smart routing.
 */

export const MODEL_ROUTES = {
  // High-volume, simple tasks → cheapest model
  textFormatting: {
    model: 'claude-haiku-4-5-20251001',
    costPerCall: 0.001,
    description: 'Format and personalize text templates',
  },

  // Mid-tier reasoning → balanced model
  cycleAnalysis: {
    model: 'claude-sonnet-4-6',
    costPerCall: 0.01,
    description: 'Analyze cycle patterns and predict optimal timing',
  },

  // Mid-tier reasoning → balanced model
  evalJudging: {
    model: 'claude-sonnet-4-6',
    costPerCall: 0.01,
    description: 'LLM-as-judge for grading suggestion quality',
  },

  // Deep reasoning, nuanced writing → premium model
  personalizedAdvice: {
    model: 'claude-opus-4-6',
    costPerCall: 0.08,
    description: 'Generate deeply personalized relationship strategy',
  },

  // Deep reasoning for complex pattern matching
  attachmentAnalysis: {
    model: 'claude-opus-4-6',
    costPerCall: 0.08,
    description: 'Analyze communication patterns to infer attachment style',
  },
};

/**
 * Route a task to the appropriate model.
 */
export function getModelForTask(taskType) {
  return MODEL_ROUTES[taskType] || MODEL_ROUTES.textFormatting;
}

/**
 * Estimate cost for a batch of operations.
 */
export function estimateBatchCost(tasks) {
  return tasks.reduce((total, task) => {
    const route = MODEL_ROUTES[task] || MODEL_ROUTES.textFormatting;
    return total + route.costPerCall;
  }, 0);
}
