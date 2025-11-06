/**
 * CONTACT FIELD MAPPER SERVICE
 * Maps form fields to Contact, Company, and Pipeline models
 * Based on IgniteBD Contact-First Architecture
 * 
 * Contact Model Fields:
 * - firstName, lastName, goesBy, email, phone, title
 * - contactCompanyId (reference to Company)
 * 
 * Company Model Fields:
 * - companyName, companyHQId
 * 
 * Pipeline Model Fields:
 * - pipeline (type), stage
 */

/**
 * Map form data to Contact model format
 */
export function mapFormToContact(formData, companyHQId) {
  return {
    // Required
    companyId: companyHQId, // CompanyHQId for multi-tenancy
    firstName: formData.firstName || null,
    lastName: formData.lastName || null,
    
    // Optional contact fields
    goesBy: formData.goesBy || null,
    email: formData.email || null,
    phone: formData.phone || null,
    title: formData.title || null,
    notes: formData.notes || null,
    buyerDecision: formData.buyerDecision || null,
    howMet: formData.howMet || null,
    
    // Company association (will be set after company upsert)
    contactCompanyId: null // Set after company upsert
  };
}

/**
 * Map form data to Company model format
 * Returns null if no company name provided
 */
export function mapFormToCompany(formData, companyHQId) {
  if (!formData.companyName || formData.companyName.trim() === '') {
    return null;
  }
  
  return {
    companyHQId: companyHQId,
    companyName: formData.companyName.trim(),
    // Optional company fields
    industry: formData.companyIndustry || null,
    // Note: companyURL would need to be added to Company model schema if needed
    // For now, we'll skip it as it's not in the schema
  };
}

/**
 * Map form data to Pipeline model format
 * Returns null if no pipeline selected
 */
export function mapFormToPipeline(formData) {
  if (!formData.pipeline || formData.pipeline.trim() === '') {
    return null;
  }
  
  return {
    pipeline: formData.pipeline,
    stage: formData.stage || null // Stage is optional, can be set later
  };
}

/**
 * Validate required fields
 */
export function validateContactForm(formData) {
  const errors = [];
  
  if (!formData.firstName || formData.firstName.trim() === '') {
    errors.push('First name is required');
  }
  
  if (!formData.lastName || formData.lastName.trim() === '') {
    errors.push('Last name is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get default pipeline stages for a pipeline type
 * This should match backend config/pipelineConfig.js
 * Note: This is a fallback - the form should fetch from backend
 */
export function getPipelineStages(pipelineType) {
  // Default stages (matches backend config/pipelineConfig.js)
  const stageMap = {
    'prospect': ['interest', 'meeting', 'proposal', 'negotiation', 'qualified'],
    'client': ['onboarding', 'active', 'renewal', 'upsell'],
    'collaborator': ['initial', 'active', 'partnership'],
    'institution': ['awareness', 'engagement', 'partnership']
  };
  
  return stageMap[pipelineType] || [];
}

