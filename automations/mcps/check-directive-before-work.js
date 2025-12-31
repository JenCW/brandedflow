/**
 * Check Directive Before Work (DOE Method Enforcement)
 * 
 * This MCP enforces the directive-check process by making it deterministic.
 * It searches for relevant directives and applies the 3-question test.
 * 
 * This solves the problem of AI skipping directive checks by moving
 * the enforcement to the execution layer (deterministic) rather than
 * orchestration layer (probabilistic).
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Checks for relevant directive before work begins. Enforces DOE method directive-check process.',
  
  params: {
    task_description: {
      type: 'string',
      required: true,
      description: 'Description of the task/work being requested'
    },
    task_type: {
      type: 'string',
      required: false,
      description: 'Type of task: investigation, development, deployment, automation, etc.'
    },
    client_name: {
      type: 'string',
      required: false,
      description: 'Client name if this is client-specific work'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { task_description, task_type, client_name } = params;

    if (!task_description) {
      throw new Error('task_description is required');
    }

    const directivesDir = path.join(PROJECT_ROOT, 'systems', 'doe-engine', 'directives');
    
    // Ensure directives directory exists
    if (!await fs.pathExists(directivesDir)) {
      return {
        ok: false,
        error: 'Directives directory not found',
        recommendation: 'Create directives directory first'
      };
    }

    // Search for relevant directives
    const directives = await searchDirectives(directivesDir, task_description, task_type, client_name);
    
    // If directive found, return it
    if (directives.found.length > 0) {
      const bestMatch = directives.found[0];
      const directiveContent = await fs.readFile(bestMatch.path, 'utf-8');
      
      return {
        ok: true,
        directive_found: true,
        directive: {
          path: bestMatch.path,
          name: bestMatch.name,
          title: extractTitle(directiveContent),
          summary: extractSummary(directiveContent),
          content: directiveContent
        },
        must_read: true,
        recommendation: 'Read directive before proceeding with work',
        check_id: generateCheckId(),
        three_question_test: null
      };
    }

    // No directive found - apply 3-question test
    const threeQuestionTest = applyThreeQuestionTest(task_description, task_type);
    
    return {
      ok: true,
      directive_found: false,
      directive: null,
      must_read: false,
      recommendation: threeQuestionTest.recommendation,
      check_id: generateCheckId(),
      three_question_test: {
        recurring: threeQuestionTest.recurring,
        complex: threeQuestionTest.complex,
        consistency_matters: threeQuestionTest.consistency_matters,
        score: threeQuestionTest.score,
        recommendation: threeQuestionTest.recommendation,
        suggested_directive_name: threeQuestionTest.suggested_directive_name
      }
    };
  }
};

/**
 * Search for relevant directives
 */
async function searchDirectives(directivesDir, taskDescription, taskType, clientName) {
  const files = await fs.readdir(directivesDir);
  const directives = [];
  
  // Extract keywords from task description
  const keywords = extractKeywords(taskDescription, taskType);
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(directivesDir, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const fileName = file.replace('.md', '');
    
    // Calculate relevance score
    const score = calculateRelevanceScore(content, fileName, keywords, taskType, clientName);
    
    if (score > 0) {
      directives.push({
        name: fileName,
        path: filePath,
        score: score
      });
    }
  }
  
  // Sort by relevance score (highest first)
  directives.sort((a, b) => b.score - a.score);
  
  return {
    found: directives,
    searched: files.length
  };
}

/**
 * Extract keywords from task description
 */
function extractKeywords(description, taskType) {
  const words = description.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['the', 'and', 'for', 'with', 'from'].includes(word));
  
  if (taskType) {
    words.push(taskType.toLowerCase());
  }
  
  return words;
}

/**
 * Calculate relevance score for a directive
 */
function calculateRelevanceScore(content, fileName, keywords, taskType, clientName) {
  const contentLower = content.toLowerCase();
  const fileNameLower = fileName.toLowerCase();
  let score = 0;
  
  // Check if keywords appear in content
  for (const keyword of keywords) {
    if (contentLower.includes(keyword)) {
      score += 10;
    }
    if (fileNameLower.includes(keyword)) {
      score += 20; // Higher weight for filename match
    }
  }
  
  // Check if task type matches
  if (taskType) {
    const taskTypeLower = taskType.toLowerCase();
    if (contentLower.includes(taskTypeLower) || fileNameLower.includes(taskTypeLower)) {
      score += 15;
    }
  }
  
  // Check if client name matches (for client-specific directives)
  if (clientName) {
    const clientNameLower = clientName.toLowerCase();
    if (contentLower.includes(clientNameLower) || fileNameLower.includes(clientNameLower)) {
      score += 25; // High weight for client match
    }
  }
  
  return score;
}

/**
 * Apply 3-question test
 */
function applyThreeQuestionTest(taskDescription, taskType) {
  const descLower = taskDescription.toLowerCase();
  
  // Question 1: Will I do this again? (Recurring)
  const recurringKeywords = ['deploy', 'build', 'create', 'setup', 'configure', 'verify', 'check'];
  const recurring = recurringKeywords.some(keyword => descLower.includes(keyword)) ||
                   taskType === 'deployment' ||
                   taskType === 'automation' ||
                   taskType === 'development';
  
  // Question 2: Is this complex? (Multiple steps)
  const complexKeywords = ['and', 'then', 'after', 'before', 'multiple', 'several', 'steps'];
  const complex = complexKeywords.some(keyword => descLower.includes(keyword)) ||
                  taskDescription.split(' ').length > 10 ||
                  taskType === 'development' ||
                  taskType === 'automation';
  
  // Question 3: Does consistency matter? (Same quality every time)
  const consistencyKeywords = ['deploy', 'build', 'create', 'setup', 'verify', 'standard'];
  const consistency = consistencyKeywords.some(keyword => descLower.includes(keyword)) ||
                      taskType === 'deployment' ||
                      taskType === 'automation';
  
  const score = [recurring, complex, consistency].filter(Boolean).length;
  
  let recommendation;
  let suggestedName;
  
  if (score >= 2) {
    // Suggest directive name based on task
    suggestedName = generateDirectiveName(taskDescription, taskType);
    recommendation = `Create directive - ${score}/3 criteria met. Suggested name: ${suggestedName}.md`;
  } else {
    recommendation = `Skip directive - ${score}/3 criteria met. This appears to be a one-off or simple task.`;
  }
  
  return {
    recurring,
    complex,
    consistency_matters: consistency,
    score,
    recommendation,
    suggested_directive_name: suggestedName
  };
}

/**
 * Generate suggested directive name
 */
function generateDirectiveName(taskDescription, taskType) {
  // Extract main action and object
  const words = taskDescription.toLowerCase().split(/\s+/);
  const action = words[0]; // First word is usually the action
  const object = words.slice(1, 3).join('-'); // Next 2 words as object
  
  // Convert to kebab-case
  const name = `${action}-${object}`.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
  
  return name || `${taskType || 'task'}-directive`;
}

/**
 * Extract title from directive content
 */
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled Directive';
}

/**
 * Extract summary from directive content
 */
function extractSummary(content) {
  // Look for GOAL section
  const goalMatch = content.match(/##\s+1\.\s+GOAL\s*\n\n(.+?)(?:\n\n|$)/s);
  if (goalMatch) {
    return goalMatch[1].trim().substring(0, 200);
  }
  
  // Fallback: first paragraph
  const firstPara = content.split('\n\n').find(p => p.trim().length > 20);
  return firstPara ? firstPara.trim().substring(0, 200) : 'No summary available';
}

/**
 * Generate unique check ID for tracking
 */
function generateCheckId() {
  return `check_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

