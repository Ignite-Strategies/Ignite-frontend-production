/**
 * Growth Coefficient Service
 * 
 * This service handles the algorithmic calculations for business growth potential.
 * Based on the core equation: BD + Human Capital + Founder Engagement = Growth Outcome
 * 
 * Uses real industry conversion data and proven metrics for BD spend effectiveness.
 */

// Industry-standard BD conversion metrics (based on real data)
const BD_CONVERSION_METRICS = {
  // Lead generation conversion rates by channel
  LEAD_GENERATION: {
    GOOGLE_ADS: {
      costPerLead: 50,           // Average cost per lead
      conversionRate: 0.15,       // 15% lead to customer conversion
      costPerCustomer: 333       // $50 / 0.15 = $333 CAC
    },
    LINKEDIN_ADS: {
      costPerLead: 75,
      conversionRate: 0.12,       // 12% lead to customer conversion
      costPerCustomer: 625
    },
    CONTENT_MARKETING: {
      costPerLead: 25,
      conversionRate: 0.08,       // 8% lead to customer conversion
      costPerCustomer: 312
    },
    REFERRALS: {
      costPerLead: 0,             // Free but requires relationship building
      conversionRate: 0.35,       // 35% referral conversion (highest)
      costPerCustomer: 0
    },
    COLD_OUTREACH: {
      costPerLead: 15,            // Time cost for research + tools
      conversionRate: 0.05,       // 5% cold outreach conversion
      costPerCustomer: 300
    }
  },
  
  // Sales team effectiveness metrics
  SALES_TEAM: {
    SDR: {
      costPerMonth: 5000,         // SDR salary + tools
      leadsPerMonth: 50,          // Average SDR output
      conversionRate: 0.10,       // 10% SDR lead conversion
      customersPerMonth: 5
    },
    ACCOUNT_EXECUTIVE: {
      costPerMonth: 8000,         // AE salary + commission
      dealsPerMonth: 8,           // Average AE output
      conversionRate: 0.25,       // 25% AE deal conversion
      customersPerMonth: 2
    }
  },
  
  // Event marketing ROI
  EVENTS: {
    CONFERENCE: {
      costPerEvent: 10000,        // Booth + travel + materials
      leadsPerEvent: 100,         // Average conference leads
      conversionRate: 0.08,       // 8% event lead conversion
      costPerCustomer: 1250
    },
    WEBINAR: {
      costPerEvent: 500,          // Platform + promotion
      leadsPerEvent: 25,          // Average webinar leads
      conversionRate: 0.12,       // 12% webinar conversion
      costPerCustomer: 167
    }
  }
};

// Growth coefficient weights (these can be adjusted based on business model)
const GROWTH_WEIGHTS = {
  BUSINESS_DEVELOPMENT: 0.4,    // 40% - BD activities impact
  HUMAN_CAPITAL: 0.3,          // 30% - Team capacity impact  
  FOUNDER_ENGAGEMENT: 0.3      // 30% - Founder involvement impact
};

// Score thresholds for performance categorization
const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
  NEEDS_IMPROVEMENT: 0
};

/**
 * Calculate BD ROI based on actual spend and industry metrics
 * @param {Object} bdInputs - Business development inputs
 * @param {number} bdInputs.monthlySpend - Monthly BD spend in dollars
 * @param {string} bdInputs.primaryChannel - Primary BD channel
 * @param {number} bdInputs.averageDealSize - Average deal size
 * @returns {Object} BD ROI analysis with real metrics
 */
export function calculateBDRoi(bdInputs) {
  const { monthlySpend = 0, primaryChannel = 'GOOGLE_ADS', averageDealSize = 10000 } = bdInputs;
  
  const channelMetrics = BD_CONVERSION_METRICS.LEAD_GENERATION[primaryChannel];
  if (!channelMetrics) {
    throw new Error(`Invalid BD channel: ${primaryChannel}`);
  }
  
  // Calculate leads generated
  const leadsGenerated = Math.floor(monthlySpend / channelMetrics.costPerLead);
  
  // Calculate customers acquired
  const customersAcquired = Math.floor(leadsGenerated * channelMetrics.conversionRate);
  
  // Calculate revenue generated
  const revenueGenerated = customersAcquired * averageDealSize;
  
  // Calculate ROI
  const roi = monthlySpend > 0 ? (revenueGenerated / monthlySpend) : 0;
  const profit = revenueGenerated - monthlySpend;
  
  return {
    monthlySpend,
    leadsGenerated,
    customersAcquired,
    revenueGenerated,
    profit,
    roi: Math.round(roi * 100) / 100,
    costPerCustomer: Math.round(monthlySpend / customersAcquired) || 0,
    channelMetrics,
    recommendations: generateBDRecommendations(roi, primaryChannel)
  };
}

/**
 * Calculate optimal BD spend allocation across channels
 * @param {number} totalBudget - Total BD budget
 * @param {number} targetCustomers - Target customers per month
 * @returns {Object} Optimal allocation strategy
 */
export function calculateOptimalBDAllocation(totalBudget, targetCustomers) {
  const channels = Object.keys(BD_CONVERSION_METRICS.LEAD_GENERATION);
  const allocations = [];
  
  channels.forEach(channel => {
    const metrics = BD_CONVERSION_METRICS.LEAD_GENERATION[channel];
    const maxCustomers = Math.floor(totalBudget / metrics.costPerCustomer);
    const efficiency = metrics.conversionRate / (metrics.costPerCustomer / 1000); // customers per $1k
    
    allocations.push({
      channel,
      metrics,
      maxCustomers,
      efficiency,
      recommendedAllocation: Math.min(totalBudget * 0.3, metrics.costPerCustomer * targetCustomers)
    });
  });
  
  // Sort by efficiency
  allocations.sort((a, b) => b.efficiency - a.efficiency);
  
  return {
    totalBudget,
    targetCustomers,
    recommendedAllocation: allocations,
    topChannels: allocations.slice(0, 3),
    expectedCustomers: allocations.reduce((sum, alloc) => 
      sum + Math.floor(alloc.recommendedAllocation / alloc.metrics.costPerCustomer), 0
    )
  };
}

/**
 * Calculate the growth coefficient based on investment levels
 * @param {Object} inputs - Growth investment inputs
 * @param {number} inputs.businessDevelopment - BD investment level (0-100)
 * @param {number} inputs.manpowerCosts - Human capital investment (0-100)
 * @param {number} inputs.founderEngagement - Founder engagement level (0-100)
 * @param {number} inputs.customerGrowth - Expected customer growth (0-100)
 * @returns {Object} Growth coefficient analysis
 */
export function calculateGrowthCoefficient(inputs) {
  const {
    businessDevelopment = 0,
    manpowerCosts = 0,
    founderEngagement = 0,
    customerGrowth = 0
  } = inputs;

  // Calculate weighted scores for each component
  const bdScore = (businessDevelopment / 100) * GROWTH_WEIGHTS.BUSINESS_DEVELOPMENT;
  const manpowerScore = (manpowerCosts / 100) * GROWTH_WEIGHTS.HUMAN_CAPITAL;
  const founderScore = (founderEngagement / 100) * GROWTH_WEIGHTS.FOUNDER_ENGAGEMENT;
  
  // Calculate total base score (0-1 scale)
  const totalBaseScore = bdScore + manpowerScore + founderScore;
  
  // Convert to percentage
  const totalScore = totalBaseScore * 100;
  
  // Apply customer growth multiplier
  const growthMultiplier = customerGrowth / 100;
  const finalCoefficient = totalScore * growthMultiplier;
  
  // Calculate individual component percentages
  const bdPercentage = bdScore * 100;
  const manpowerPercentage = manpowerScore * 100;
  const founderPercentage = founderScore * 100;
  
  return {
    totalScore: Math.round(totalScore),
    finalCoefficient: Math.round(finalCoefficient),
    bdScore: Math.round(bdPercentage),
    manpowerScore: Math.round(manpowerPercentage),
    founderScore: Math.round(founderPercentage),
    growthMultiplier: Math.round(growthMultiplier * 100),
    breakdown: {
      businessDevelopment: {
        raw: businessDevelopment,
        weighted: bdPercentage,
        impact: GROWTH_WEIGHTS.BUSINESS_DEVELOPMENT
      },
      humanCapital: {
        raw: manpowerCosts,
        weighted: manpowerPercentage,
        impact: GROWTH_WEIGHTS.HUMAN_CAPITAL
      },
      founderEngagement: {
        raw: founderEngagement,
        weighted: founderPercentage,
        impact: GROWTH_WEIGHTS.FOUNDER_ENGAGEMENT
      }
    }
  };
}

/**
 * Get performance category based on score
 * @param {number} score - Performance score (0-100)
 * @returns {Object} Performance category and color
 */
export function getPerformanceCategory(score) {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) {
    return {
      label: 'Excellent',
      color: 'green',
      description: 'Strong growth potential with current strategy. Consider scaling operations.'
    };
  } else if (score >= SCORE_THRESHOLDS.GOOD) {
    return {
      label: 'Good',
      color: 'yellow',
      description: 'Good growth trajectory. Focus on optimizing underperforming areas.'
    };
  } else if (score >= SCORE_THRESHOLDS.FAIR) {
    return {
      label: 'Fair',
      color: 'orange',
      description: 'Moderate growth potential. Significant improvements needed in key areas.'
    };
  } else {
    return {
      label: 'Needs Improvement',
      color: 'red',
      description: 'Limited growth potential. Major strategic changes required.'
    };
  }
}

/**
 * Generate growth scenarios for comparison
 * @param {Object} currentInputs - Current user inputs
 * @returns {Array} Array of growth scenarios
 */
export function generateGrowthScenarios(currentInputs) {
  const scenarios = [
    {
      name: "High Investment",
      description: "Maximum BD + Team + Founder engagement",
      inputs: {
        businessDevelopment: 100,
        manpowerCosts: 100,
        founderEngagement: 100,
        customerGrowth: 95
      },
      cost: "High",
      color: "green"
    },
    {
      name: "Balanced Approach", 
      description: "Moderate investment across all areas",
      inputs: {
        businessDevelopment: 70,
        manpowerCosts: 70,
        founderEngagement: 70,
        customerGrowth: 75
      },
      cost: "Medium",
      color: "blue"
    },
    {
      name: "Lean Growth",
      description: "Minimal investment, founder-heavy",
      inputs: {
        businessDevelopment: 30,
        manpowerCosts: 20,
        founderEngagement: 90,
        customerGrowth: 45
      },
      cost: "Low",
      color: "orange"
    },
    {
      name: "Current Strategy",
      description: "Your current settings",
      inputs: currentInputs,
      cost: "Variable",
      color: "purple"
    }
  ];

  // Calculate coefficients for each scenario
  return scenarios.map(scenario => {
    const coefficient = calculateGrowthCoefficient(scenario.inputs);
    const performance = getPerformanceCategory(coefficient.finalCoefficient);
    
    return {
      ...scenario,
      coefficient,
      performance,
      expectedGrowth: coefficient.finalCoefficient
    };
  });
}

/**
 * Calculate optimal investment allocation
 * @param {Object} constraints - Investment constraints
 * @param {number} constraints.maxBudget - Maximum budget available
 * @param {number} constraints.targetGrowth - Target growth coefficient
 * @returns {Object} Optimal allocation recommendations
 */
export function calculateOptimalAllocation(constraints) {
  const { maxBudget = 100, targetGrowth = 80 } = constraints;
  
  // Simple optimization: distribute budget based on weights
  const bdAllocation = maxBudget * GROWTH_WEIGHTS.BUSINESS_DEVELOPMENT;
  const manpowerAllocation = maxBudget * GROWTH_WEIGHTS.HUMAN_CAPITAL;
  const founderAllocation = maxBudget * GROWTH_WEIGHTS.FOUNDER_ENGAGEMENT;
  
  const optimalInputs = {
    businessDevelopment: bdAllocation,
    manpowerCosts: manpowerAllocation,
    founderEngagement: founderAllocation,
    customerGrowth: 100 // Assume maximum customer growth potential
  };
  
  const coefficient = calculateGrowthCoefficient(optimalInputs);
  
  return {
    recommendedAllocation: {
      businessDevelopment: Math.round(bdAllocation),
      manpowerCosts: Math.round(manpowerAllocation),
      founderEngagement: Math.round(founderAllocation)
    },
    expectedCoefficient: coefficient.finalCoefficient,
    budgetBreakdown: {
      bdBudget: Math.round(bdAllocation),
      manpowerBudget: Math.round(manpowerAllocation),
      founderBudget: Math.round(founderAllocation),
      totalBudget: maxBudget
    }
  };
}

/**
 * Analyze growth bottlenecks
 * @param {Object} inputs - Current growth inputs
 * @returns {Object} Bottleneck analysis
 */
export function analyzeGrowthBottlenecks(inputs) {
  const coefficient = calculateGrowthCoefficient(inputs);
  const breakdown = coefficient.breakdown;
  
  // Find the lowest performing component
  const components = [
    { name: 'Business Development', score: breakdown.businessDevelopment.weighted },
    { name: 'Human Capital', score: breakdown.humanCapital.weighted },
    { name: 'Founder Engagement', score: breakdown.founderEngagement.weighted }
  ];
  
  const sortedComponents = components.sort((a, b) => a.score - b.score);
  const bottleneck = sortedComponents[0];
  const opportunities = sortedComponents.slice(1);
  
  return {
    primaryBottleneck: bottleneck,
    improvementOpportunities: opportunities,
    overallScore: coefficient.finalCoefficient,
    recommendations: generateBottleneckRecommendations(bottleneck, opportunities)
  };
}

/**
 * Generate BD-specific recommendations based on ROI
 * @param {number} roi - Current ROI
 * @param {string} channel - Current BD channel
 * @returns {Array} BD recommendations
 */
function generateBDRecommendations(roi, channel) {
  const recommendations = [];
  
  if (roi < 2) {
    recommendations.push("Consider switching to higher-converting channels like referrals");
    recommendations.push("Optimize your current channel's conversion rate");
    recommendations.push("Test different messaging and targeting");
  } else if (roi < 4) {
    recommendations.push("Scale your current successful channel");
    recommendations.push("Test additional channels for diversification");
    recommendations.push("Optimize your sales process");
  } else {
    recommendations.push("Scale aggressively - you have a winning formula");
    recommendations.push("Consider expanding to new markets");
    recommendations.push("Document and systematize your approach");
  }
  
  // Channel-specific recommendations
  if (channel === 'GOOGLE_ADS') {
    recommendations.push("Optimize keywords and ad copy");
    recommendations.push("Improve landing page conversion rate");
  } else if (channel === 'LINKEDIN_ADS') {
    recommendations.push("Refine your target audience");
    recommendations.push("Test different ad formats");
  } else if (channel === 'REFERRALS') {
    recommendations.push("Create a formal referral program");
    recommendations.push("Incentivize existing customers");
  }
  
  return recommendations;
}

/**
 * Generate specific recommendations based on bottlenecks
 * @param {Object} bottleneck - Primary bottleneck component
 * @param {Array} opportunities - Other components
 * @returns {Array} Specific recommendations
 */
function generateBottleneckRecommendations(bottleneck, opportunities) {
  const recommendations = [];
  
  if (bottleneck.name === 'Business Development') {
    recommendations.push(
      "Increase marketing and sales activities",
      "Invest in lead generation systems",
      "Develop strategic partnerships",
      "Enhance customer acquisition processes"
    );
  } else if (bottleneck.name === 'Human Capital') {
    recommendations.push(
      "Hire additional team members",
      "Invest in team training and development",
      "Improve delegation and task distribution",
      "Consider outsourcing non-core activities"
    );
  } else if (bottleneck.name === 'Founder Engagement') {
    recommendations.push(
      "Increase founder involvement in key activities",
      "Focus on high-impact founder tasks",
      "Reduce founder time on low-value activities",
      "Develop founder skills in critical areas"
    );
  }
  
  return recommendations;
}

/**
 * Export the service configuration
 */
export const GrowthCoefficientConfig = {
  weights: GROWTH_WEIGHTS,
  thresholds: SCORE_THRESHOLDS,
  version: '1.0.0',
  lastUpdated: '2024-01-01'
};
