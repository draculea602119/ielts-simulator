/**
 * Shared Gemini-based IELTS writing evaluation
 */

async function evaluateWriting(taskLabel, prompt, essay) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !essay || essay.trim().length < 30) {
    const wordCount = (essay || '').trim().split(/\s+/).filter(w => w).length;
    const band = wordCount >= 400 ? 6.5 : wordCount >= 250 ? 6 : wordCount >= 150 ? 5.5 : 5;
    return {
      band,
      task_achievement: { score: band, comment: '未配置AI评分，根据字数估算。' },
      coherence: { score: band, comment: '未配置AI评分。' },
      lexical: { score: band, comment: '未配置AI评分。' },
      grammar: { score: band, comment: '未配置AI评分。' },
      overall_feedback: apiKey ? '评分服务暂时不可用，已按字数估算分数。' : '请联系管理员配置 GEMINI_API_KEY 以启用 AI 评分。',
      suggestions: '建议配置 GEMINI_API_KEY 获取详细写作反馈。'
    };
  }

  const userPrompt = `You are a certified IELTS examiner. Evaluate this IELTS Academic Writing ${taskLabel} response.

Task prompt: "${prompt}"

Student's essay:
"${essay}"

Evaluate strictly on 4 IELTS criteria. Respond ONLY with valid JSON, no other text:
{
  "band": <overall band 1-9, use 0.5 increments>,
  "task_achievement": {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "coherence":        {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "lexical":          {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "grammar":          {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "overall_feedback": "<3-4 sentences overall assessment in Chinese>",
  "suggestions":      "<3 bullet-point improvement suggestions in Chinese, separated by |>"
}`;

  try {
    const resp = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-2.5-flash',
          messages: [{ role: 'user', content: userPrompt }],
          temperature: 0.2,
          max_tokens: 8192
        }),
        signal: AbortSignal.timeout(60000)
      }
    );
    if (!resp.ok) throw new Error(`Gemini API ${resp.status}`);
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('No JSON in response');
  } catch (e) {
    console.error('Gemini error:', e.message);
    const wordCount = essay.trim().split(/\s+/).filter(w => w).length;
    const band = wordCount >= 400 ? 6 : wordCount >= 250 ? 5.5 : 5;
    return {
      band,
      task_achievement: { score: band, comment: 'AI评分暂时不可用，已按字数估算。' },
      coherence: { score: band, comment: 'AI评分暂时不可用。' },
      lexical: { score: band, comment: 'AI评分暂时不可用。' },
      grammar: { score: band, comment: 'AI评分暂时不可用。' },
      overall_feedback: '当前AI评分服务遇到错误，分数为估算值，请稍后重试。',
      suggestions: '请稍后重新提交以获取详细AI评分。'
    };
  }
}

module.exports = { evaluateWriting };
