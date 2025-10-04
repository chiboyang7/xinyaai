// Report generation algorithm and content matching logic
// src/utils/reportGenerator.ts

import {
  dimensionAnalysisLibrary,
  abilityPatternLibrary,
  answerPatternLibrary,
  learningPathLibrary
} from '@/data/reportAnalysisLibrary';
import { youngTestQuestions } from '@/data/youngTestQuestions';

/**
 * 报告生成器核心算法
 */

// ==================== 类型定义 ====================

interface DimensionScores {
  E: number;
  R: number;
  I: number;
  C: number;
  A: number;
}

interface TestAnswer {
  questionId: number;
  selectedOption: string;
  score: number;
}

interface DetailedReport {
  // 综合信息
  overview: {
    totalScore: number;
    level: string;
    title: string;
    summary: string;
    percentile: number; // 超越百分比
  };
  
  // 五维分析
  dimensions: DimensionAnalysis[];
  
  // 能力组合模式
  abilityPattern: AbilityPatternAnalysis;
  
  // 思维特质
  thinkingStyle: ThinkingStyleAnalysis;
  
  // 优势与提升
  strengthsWeaknesses: {
    topStrengths: DimensionSummary[];
    areasForImprovement: DimensionSummary[];
  };
  
  // 学习路径
  learningPath: LearningPathRecommendation;
  
  // 职业建议（成人版）
  careerAdvice?: CareerAdvice;
}

interface DimensionAnalysis {
  dimension: string;
  name: string;
  icon: string;
  score: number;
  rawScore: number;
  level: number;
  levelLabel: string;
  progress: number; // 到下一等级的进度百分比
  
  title: string;
  summary: string;
  characteristics: string[];
  strengths?: string[];
  weaknesses?: string[];
  examples: string[];
  improvements: string[];
  resources: string[];
  practicalSteps?: string[];
  encouragement?: string;
}

interface AbilityPatternAnalysis {
  patternType: string;
  title: string;
  icon: string;
  description: string;
  strengths: string[];
  weaknesses?: string[];
  suggestions: string[];
  practicalSteps?: string[];
  careerAdvice?: string;
}

interface ThinkingStyleAnalysis {
  primaryStyle: string;
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  suggestions: string[];
}

interface DimensionSummary {
  dimension: string;
  name: string;
  score: number;
  level: string;
  keyPoint: string;
  actionItem: string;
}

interface LearningPathRecommendation {
  level: string;
  duration: string;
  goal: string;
  phases: LearningPhase[];
  checkpoints: string[];
  specialFocus?: SpecialFocus[];
}

interface LearningPhase {
  title: string;
  objectives: string[];
  actions: string[];
  resources: string[];
}

interface SpecialFocus {
  dimension: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  quickWins: string[];
  systematicApproach: string[];
}

interface CareerAdvice {
  suitableRoles: string[];
  developmentPath: string[];
  skillsToAcquire: string[];
}

// ==================== 核心匹配算法 ====================

/**
 * 主函数：生成完整的详细报告
 */
export function generateDetailedReport(
  answers: Record<number, string>,
  scores: { totalScore: number; dimensions: DimensionScores; rawDimensions: DimensionScores }
): DetailedReport {
  
  // 1. 匹配维度详细分析
  const dimensionAnalysis = matchDimensionAnalysis(scores.dimensions, scores.rawDimensions, answers);
  
  // 2. 识别能力组合模式
  const abilityPattern = identifyAbilityPattern(scores.dimensions);
  
  // 3. 分析思维特质
  const thinkingStyle = analyzeThinkingStyle(answers);
  
  // 4. 提取优势与短板
  const strengthsWeaknesses = identifyStrengthsWeaknesses(dimensionAnalysis);
  
  // 5. 生成学习路径
  const learningPath = generateLearningPath(scores.totalScore, scores.dimensions, dimensionAnalysis);
  
  // 6. 生成综合评价
  const overview = generateOverview(scores.totalScore, abilityPattern);
  
  // 7. 组装完整报告
  return {
    overview,
    dimensions: dimensionAnalysis,
    abilityPattern,
    thinkingStyle,
    strengthsWeaknesses,
    learningPath
  };
}

// ==================== 维度分析匹配 ====================

/**
 * 匹配每个维度的详细分析内容
 */
function matchDimensionAnalysis(
  normalizedScores: DimensionScores,
  rawScores: DimensionScores,
  answers: Record<number, string>
): DimensionAnalysis[] {
  
  const dimensions: (keyof DimensionScores)[] = ['E', 'R', 'I', 'C', 'A'];
  
  return dimensions.map(dim => {
    const score = normalizedScores[dim];
    const rawScore = rawScores[dim];
    const level = getScoreLevel(score);
    const levelData = dimensionAnalysisLibrary[dim].levels[level];
    
    // 计算到下一等级的进度
    const progress = calculateProgress(score, level);
    
    // 获取该维度的答题案例
    const examples = extractDimensionExamples(dim, answers);
    
    return {
      dimension: dim,
      name: dimensionAnalysisLibrary[dim].name,
      icon: dimensionAnalysisLibrary[dim].icon,
      score: Math.round(score * 10) / 10,
      rawScore: Math.round(rawScore * 10) / 10,
      level,
      levelLabel: levelData.title,
      progress,
      
      title: levelData.title,
      summary: levelData.summary,
      characteristics: levelData.characteristics,
      strengths: levelData.strengths,
      weaknesses: levelData.weakPoints || levelData.weaknesses,
      examples: examples.length > 0 ? examples : levelData.examples || [],
      improvements: levelData.improvements,
      resources: levelData.resources,
      practicalSteps: levelData.practicalSteps,
      encouragement: levelData.encouragement
    };
  });
}

/**
 * 根据分数确定等级（1-5）
 */
function getScoreLevel(score: number): number {
  if (score >= 17) return 5;
  if (score >= 13) return 4;
  if (score >= 9) return 3;
  if (score >= 5) return 2;
  return 1;
}

/**
 * 计算到下一等级的进度百分比
 */
function calculateProgress(score: number, currentLevel: number): number {
  const levelThresholds = [0, 5, 9, 13, 17, 20];
  
  if (currentLevel >= 5) return 100; // 已经最高级
  
  const currentThreshold = levelThresholds[currentLevel];
  const nextThreshold = levelThresholds[currentLevel + 1];
  const range = nextThreshold - currentThreshold;
  const progress = ((score - currentThreshold) / range) * 100;
  
  return Math.max(0, Math.min(100, Math.round(progress)));
}

/**
 * 提取该维度相关的答题案例
 */
function extractDimensionExamples(
  dimension: string,
  answers: Record<number, string>
): string[] {
  const examples: string[] = [];
  
  // 查找该维度得分高的题目
  Object.entries(answers).forEach(([questionId, selectedOption]) => {
    const question = youngTestQuestions.find(q => q.id === parseInt(questionId));
    if (!question) return;
    
    const option = question.options.find(opt => opt.label === selectedOption);
    if (!option) return;
    
    // 如果该选项在该维度得分较高
    const dimScore = option.dimensions[dimension as keyof typeof option.dimensions] || 0;
    if (dimScore >= 2) {
      const exampleText = `在"${question.title}"问题中，您选择了强调${getDimensionFocus(dimension, dimScore)}的方案，这体现了您${getDimensionStrength(dimension)}。`;
      examples.push(exampleText);
    }
  });
  
  return examples.slice(0, 2); // 最多返回2个案例
}

/**
 * 获取维度焦点描述
 */
function getDimensionFocus(dimension: string, score: number): string {
  const focuses: Record<string, string[]> = {
    E: ['实践操作', '工具使用', '系统设计'],
    R: ['批判性思维', '信息验证', '深度分析'],
    I: ['创新方法', '探索精神', '独特视角'],
    C: ['清晰表达', '有效沟通', '需求分析'],
    A: ['团队协作', '资源整合', '协同设计']
  };
  
  return focuses[dimension]?.[Math.min(Math.floor(score / 2), 2)] || '综合能力';
}

/**
 * 获取维度优势描述
 */
function getDimensionStrength(dimension: string): string {
  const strengths: Record<string, string> = {
    E: '出色的工程实践能力',
    R: '敏锐的批判性思维',
    I: '富有创新精神',
    C: '良好的沟通能力',
    A: '优秀的协作意识'
  };
  
  return strengths[dimension] || '相关能力';
}

// ==================== 能力组合模式识别 ====================

/**
 * 识别用户的能力组合模式
 */
function identifyAbilityPattern(scores: DimensionScores): AbilityPatternAnalysis {
  
  // 遍历所有模式，找到第一个匹配的
  for (const [patternKey, pattern] of Object.entries(abilityPatternLibrary)) {
    if (pattern.condition(scores)) {
      const analysis = pattern.analysis as any;
      
      return {
        patternType: patternKey,
        title: analysis.title,
        icon: analysis.icon,
        description: analysis.description,
        strengths: analysis.strengths || analysis.characteristics || [],
        weaknesses: analysis.weaknesses || analysis.weakPoints || [],
        suggestions: analysis.suggestions || analysis.improvements || [],
        practicalSteps: analysis.practicalSteps || [],
        careerAdvice: analysis.careerAdvice || analysis.encouragement || ''
      };
    }
  }
  
  // 默认返回均衡型
  return {
    patternType: 'balanced',
    title: '综合发展型',
    icon: '⚖️',
    description: '您在各个维度的发展较为均衡。',
    strengths: ['全面的能力基础'],
    suggestions: ['继续保持均衡发展，同时可以选择一个方向深化']
  };
}

// ==================== 思维特质分析 ====================

/**
 * 分析用户的思维特质和答题模式
 */
function analyzeThinkingStyle(answers: Record<number, string>): ThinkingStyleAnalysis {
  
  // 统计各种特征
  const styleScores = {
    practiceOriented: 0,    // 实践导向
    theoryOriented: 0,      // 理论导向
    cautious: 0,            // 谨慎保守
    innovative: 0,          // 创新探索
    independent: 0,         // 独立思考
    toolDependent: 0        // 工具依赖
  };
  
  // 分析每道题的选择
  Object.entries(answers).forEach(([questionId, selectedOption]) => {
    const question = youngTestQuestions.find(q => q.id === parseInt(questionId));
    if (!question) return;
    
    const option = question.options.find(opt => opt.label === selectedOption);
    if (!option) return;
    
    // 根据选项特征评分
    analyzeOptionCharacteristics(option, question, styleScores);
  });
  
  // 找出主导的思维风格
  const primaryStyleKey = Object.entries(styleScores).reduce((a, b) => 
    styleScores[a[0] as keyof typeof styleScores] > styleScores[b[0] as keyof typeof styleScores] ? a : b
  )[0] as keyof typeof styleScores;
  
  const styleData = answerPatternLibrary[primaryStyleKey];
  
  if (!styleData) {
    // 返回默认值
    return {
      primaryStyle: 'balanced',
      title: '均衡思维型',
      description: '您的思维方式较为均衡。',
      characteristics: ['思考全面', '方法灵活'],
      strengths: ['能够根据情况选择合适的方法'],
      suggestions: ['继续保持灵活性，根据任务特点选择最佳方案']
    };
  }
  
  const characteristics = (styleData.characteristics || {}) as any;
  
  return {
    primaryStyle: primaryStyleKey,
    title: characteristics.title || styleData.indicators?.[0] || '思维特质',
    description: characteristics.description || '',
    characteristics: styleData.indicators || [],
    strengths: characteristics.strengths || [],
    suggestions: characteristics.suggestions || characteristics.improvements || []
  };
}

/**
 * 分析选项特征，更新风格评分
 */
function analyzeOptionCharacteristics(
  option: any,
  question: any,
  styleScores: Record<string, number>
): void {
  
  const text = option.text.toLowerCase();
  
  // 实践导向特征
  if (text.includes('做') || text.includes('尝试') || text.includes('练习') || 
      text.includes('实践') || text.includes('动手')) {
    styleScores.practiceOriented++;
  }
  
  // 理论导向特征
  if (text.includes('原理') || text.includes('理解') || text.includes('为什么') || 
      text.includes('机制') || text.includes('分析')) {
    styleScores.theoryOriented++;
  }
  
  // 谨慎保守特征
  if (text.includes('验证') || text.includes('核对') || text.includes('确认') || 
      text.includes('检查') || text.includes('查课本')) {
    styleScores.cautious++;
  }
  
  // 创新探索特征
  if (text.includes('创新') || text.includes('新方法') || text.includes('尝试') || 
      text.includes('探索') || text.includes('独特')) {
    styleScores.innovative++;
  }
  
  // 独立思考特征
  if (text.includes('自己') || text.includes('独立') || text.includes('我先') || 
      text.includes('思考') || text.includes('判断')) {
    styleScores.independent++;
  }
  
  // 工具依赖特征
  if (text.includes('ai') && text.includes('帮') && !text.includes('自己')) {
    styleScores.toolDependent++;
  }
  
  // 根据分数高低也判断
  if (option.score >= 5) {
    // 高分选项通常是独立思考+验证的
    styleScores.independent++;
    styleScores.cautious++;
  } else if (option.score <= 2) {
    // 低分选项可能是过度依赖
    styleScores.toolDependent++;
  }
}

// ==================== 优势与短板识别 ====================

/**
 * 识别最强和最弱的维度
 */
function identifyStrengthsWeaknesses(
  dimensionAnalysis: DimensionAnalysis[]
): {
  topStrengths: DimensionSummary[];
  areasForImprovement: DimensionSummary[];
} {
  
  // 按分数排序
  const sorted = [...dimensionAnalysis].sort((a, b) => b.score - a.score);
  
  // 最强的2个
  const topStrengths = sorted.slice(0, 2).map(dim => ({
    dimension: dim.dimension,
    name: dim.name,
    score: dim.score,
    level: dim.levelLabel,
    keyPoint: getStrengthKeyPoint(dim),
    actionItem: getStrengthAction(dim)
  }));
  
  // 最弱的2个
  const areasForImprovement = sorted.slice(-2).reverse().map(dim => ({
    dimension: dim.dimension,
    name: dim.name,
    score: dim.score,
    level: dim.levelLabel,
    keyPoint: getWeaknessKeyPoint(dim),
    actionItem: getImprovementAction(dim)
  }));
  
  return { topStrengths, areasForImprovement };
}

/**
 * 获取优势的关键点描述
 */
function getStrengthKeyPoint(dimension: DimensionAnalysis): string {
  if (dimension.strengths && dimension.strengths.length > 0) {
    return dimension.strengths[0];
  }
  return `${dimension.name}能力较强`;
}

/**
 * 获取如何发挥优势的行动建议
 */
function getStrengthAction(dimension: DimensionAnalysis): string {
  const actions: Record<string, string> = {
    E: '可以承担更多需要工具使用和系统设计的任务，并尝试指导他人',
    R: '可以在团队中担任质量把关角色，帮助验证和评估信息',
    I: '可以多提出创新想法，并尝试将创意转化为实际项目',
    C: '可以在团队中担任沟通协调角色，帮助他人更好地表达需求',
    A: '可以主导团队协作项目，发挥资源整合和流程设计能力'
  };
  
  return actions[dimension.dimension] || '继续发挥这一优势，帮助他人';
}

/**
 * 获取短板的关键点描述
 */
function getWeaknessKeyPoint(dimension: DimensionAnalysis): string {
  if (dimension.weaknesses && dimension.weaknesses.length > 0) {
    return dimension.weaknesses[0];
  }
  return `${dimension.name}有较大提升空间`;
}

/**
 * 获取改进行动建议
 */
function getImprovementAction(dimension: DimensionAnalysis): string {
  if (dimension.improvements && dimension.improvements.length > 0) {
    // 返回第一个改进建议（通常是最重要的）
    return dimension.improvements[0].replace(/\*\*/g, '').replace(/：/g, ':');
  }
  return `专注提升${dimension.name}，从基础练习开始`;
}

// ==================== 学习路径生成 ====================

/**
 * 生成个性化学习路径
 */
function generateLearningPath(
  totalScore: number,
  dimensionScores: DimensionScores,
  dimensionAnalysis: DimensionAnalysis[]
): LearningPathRecommendation {
  
  // 根据总分确定基础学习路径
  let basePath: any;
  
  if (totalScore >= 70) {
    basePath = learningPathLibrary.advanced;
  } else if (totalScore >= 40) {
    basePath = learningPathLibrary.intermediate;
  } else {
    basePath = learningPathLibrary.beginner;
  }
  
  // 识别需要特别关注的维度
  const specialFocus = identifySpecialFocus(dimensionScores, dimensionAnalysis);
  
  return {
    level: basePath.level,
    duration: basePath.duration,
    goal: basePath.goal,
    phases: [
      basePath.phase1,
      basePath.phase2,
      basePath.phase3
    ].filter(p => p), // 过滤掉undefined
    checkpoints: basePath.checkpoints,
    specialFocus
  };
}

/**
 * 识别需要特别关注的维度
 */
function identifySpecialFocus(
  scores: DimensionScores,
  dimensionAnalysis: DimensionAnalysis[]
): SpecialFocus[] {
  
  const focus: SpecialFocus[] = [];
  
  // 找出低于9分的维度（需要重点提升）
  Object.entries(scores).forEach(([dim, score]) => {
    if (score < 9) {
      const analysis = dimensionAnalysis.find(d => d.dimension === dim);
      if (!analysis) return;
      
      const dimLibrary = learningPathLibrary.dimensionSpecific?.[dim as keyof typeof learningPathLibrary.dimensionSpecific];
      if (!dimLibrary) return;
      
      focus.push({
        dimension: dim,
        name: analysis.name,
        priority: score < 5 ? 'high' : 'medium',
        quickWins: dimLibrary.weakness?.quickWins || [],
        systematicApproach: dimLibrary.weakness?.systematic || []
      });
    }
  });
  
  return focus;
}

// ==================== 综合评价生成 ====================

/**
 * 生成综合评价
 */
function generateOverview(
  totalScore: number,
  abilityPattern: AbilityPatternAnalysis
): {
  totalScore: number;
  level: string;
  title: string;
  summary: string;
  percentile: number;
} {
  
  // 确定等级
  let level: string;
  let title: string;
  
  if (totalScore >= 90) {
    level = '优秀';
    title = 'AI应用专家';
  } else if (totalScore >= 75) {
    level = '良好';
    title = 'AI熟练使用者';
  } else if (totalScore >= 60) {
    level = '中等';
    title = 'AI应用实践者';
  } else if (totalScore >= 40) {
    level = '及格';
    title = 'AI初级使用者';
  } else {
    level = '待提升';
    title = 'AI学习探索者';
  }
  
  // 生成总结
  const summary = generateSummary(totalScore, abilityPattern);
  
  // 计算超越百分比（模拟值，实际应该基于大数据）
  const percentile = calculatePercentile(totalScore);
  
  return {
    totalScore,
    level,
    title,
    summary,
    percentile
  };
}

/**
 * 生成总结性描述
 */
function generateSummary(
  totalScore: number,
  abilityPattern: AbilityPatternAnalysis
): string {
  
  if (totalScore >= 90) {
    return `您展现出卓越的AI素养，${abilityPattern.description}这是非常难得的综合能力，继续保持并深化专业方向，您有潜力成为AI领域的领军人才。`;
  } else if (totalScore >= 75) {
    return `您具备良好的AI应用能力，${abilityPattern.description}继续在实践中深化理解，您可以在AI相关领域发挥重要作用。`;
  } else if (totalScore >= 60) {
    return `您已经掌握了AI使用的基本方法，${abilityPattern.description}通过持续学习和实践，您可以快速提升到更高水平。`;
  } else if (totalScore >= 40) {
    return `您对AI有了初步认识，${abilityPattern.description}建议系统学习AI使用方法，多实践、多思考，能力会快速提升。`;
  } else {
    return `您的AI素养还处于起步阶段，${abilityPattern.description}不要气馁，每个专家都是从零开始的。建议从基础学习，保持好奇心和实践热情。`;
  }
}

/**
 * 计算超越百分比（模拟）
 */
function calculatePercentile(totalScore: number): number {
  // 基于正态分布的模拟计算
  // 假设平均分60，标准差15
  const mean = 60;
  const stdDev = 15;
  const zScore = (totalScore - mean) / stdDev;
  
  // 简化的累积分布函数
  let percentile: number;
  if (zScore >= 2) percentile = 98;
  else if (zScore >= 1.5) percentile = 93;
  else if (zScore >= 1) percentile = 84;
  else if (zScore >= 0.5) percentile = 69;
  else if (zScore >= 0) percentile = 50;
  else if (zScore >= -0.5) percentile = 31;
  else if (zScore >= -1) percentile = 16;
  else if (zScore >= -1.5) percentile = 7;
  else percentile = 2;
  
  return percentile;
}

// ==================== 辅助函数 ====================

/**
 * 获取维度的等级描述
 */
export function getDimensionLevelDescription(score: number): {
  level: number;
  label: string;
  description: string;
  color: string;
} {
  const level = getScoreLevel(score);
  
  const labels = {
    5: { label: '精通', description: '深度理解，能创新应用', color: '#10b981' },
    4: { label: '熟练', description: '熟练使用，具备优化能力', color: '#3b82f6' },
    3: { label: '应用', description: '能基本使用，有初步判断', color: '#f59e0b' },
    2: { label: '了解', description: '知道能做什么，缺乏实践', color: '#ef4444' },
    1: { label: '初识', description: '认知有误区或盲区', color: '#6b7280' }
  };
  
  return {
    level,
    ...labels[level as keyof typeof labels]
  };
}

/**
 * 生成雷达图数据
 */
export function generateRadarChartData(scores: DimensionScores) {
  return {
    labels: ['工程力', '思辨力', '创新力', '沟通力', '协作力'],
    datasets: [
      {
        label: '您的得分',
        data: [scores.E, scores.R, scores.I, scores.C, scores.A],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)'
      },
      {
        label: '同龄平均',
        data: [12, 12, 12, 12, 12], // 平均水平
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderColor: 'rgb(156, 163, 175)',
        borderDash: [5, 5],
        pointBackgroundColor: 'rgb(156, 163, 175)',
        pointBorderColor: '#fff'
      }
    ]
  };
}

/**
 * 导出报告为JSON（用于保存或分享）
 */
export function exportReportData(report: DetailedReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * 生成分享文本
 */
export function generateShareText(report: DetailedReport): string {
  return `🎯 我的AI素养测评结果

📊 综合得分：${report.overview.totalScore}分 (${report.overview.level})
🏆 能力定位：${report.overview.title}
📈 超越了${report.overview.percentile}%的同龄人

💪 能力特点：${report.abilityPattern.title}

🌟 最强维度：${report.strengthsWeaknesses.topStrengths[0].name} (${report.strengthsWeaknesses.topStrengths[0].score}分)

来测测你的AI素养吧！`;
}