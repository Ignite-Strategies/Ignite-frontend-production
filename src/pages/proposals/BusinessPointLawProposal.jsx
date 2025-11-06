import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function BusinessPointLawProposal() {
  const navigate = useNavigate();

  const roadmapPhases = [
    {
      title: 'Phase 1: Foundation (Months 1-3)',
      description: 'Establish clarity, credibility, and a working system.',
      icon: '🌱',
      color: 'bg-red-500',
      activities: [
        'Complete Growth Assessment (Revenue, Human Capital, Target Acquisition, BD Baseline)',
        'Map Business Ecosystem (Identify collaborators, partners, platforms)',
        'Define Key Personas (Buyers, Tech Partners, Anchor Collaborators)',
        'Set up BD Pipeline (HubSpot-style deal stages)',
        'Publish First Visibility Asset (1 LinkedIn post + 1 case study)',
        'Establish Contact List (50 target prospects + 20 partners)',
      ],
      deliverables: [
        'BD Assessment Report',
        'Ecosystem Map',
        'Persona Profiles',
        'Pipeline Setup',
        '1 Public Post',
        '1 Case Study',
        '70 Named Contacts',
        'BD CRM Live'
      ],
      kpis: [
        '1 public proof piece published',
        '70 qualified contacts in CRM',
        'BD system operational'
      ]
    },
    {
      title: 'Phase 2: Growth Acceleration (Months 4-6)',
      description: 'Generate real leads and start closing early clients.',
      icon: '🚀',
      color: 'bg-orange-500',
      activities: [
        'Pick One Primary Engine (LinkedIn + email outreach to debt-to-liquidity providers)',
        'Set up Conversion Flow (landing page → consultation → CRM deal)',
        'Launch Targeted Ad Campaigns (Google Ads, Meta Ads for NDA services)',
        'Implement Email Automation (Nurture sequences, outreach campaigns)',
        'Participate in Strategic Events (Networking, speaking engagements)',
      ],
      deliverables: [
        'Conversion Flow Setup',
        'Ad Campaign Performance',
        'Email Sequences',
        'Event Attendance',
        'Client Meeting Pipeline'
      ],
      kpis: [
        '3 new client conversations/month',
        '1 new retainer signed',
        'Validated acquisition engine'
      ]
    },
    {
      title: 'Phase 3: Scale & Expand (Months 7-9)',
      description: 'Multiply what\'s working and begin brand authority building.',
      icon: '📈',
      color: 'bg-yellow-500',
      activities: [
        'Repurpose High-Performing Content (top 5 posts into video/podcast/email)',
        'Run Retargeting Ads (use prior visitor data)',
        'Expand Event Presence (More conferences, webinars)',
        'Explore Co-Marketing Opportunities with Tech Partners',
        'Implement Lead Scoring and Nurturing Workflows',
      ],
      deliverables: [
        'Authority Kit (5 best-performing assets)',
        'Case Study Deck',
        'Testimonials Collection',
        'Retargeting Campaigns',
        'Lead Scoring System'
      ],
      kpis: [
        '5 repurposed high-performing assets',
        'Authority layer established',
        'Amplified lead flow'
      ]
    },
    {
      title: 'Phase 4: Optimize & Innovate (Months 10-12)',
      description: 'Convert system into a machine with automation and referrals.',
      icon: '💡',
      color: 'bg-green-500',
      activities: [
        'Comprehensive Analytics Review (Identify top-performing channels)',
        'Automate BD Outreach (Advanced CRM integrations)',
        'Implement Client Success Loop (NPS, upsells, referrals)',
        'Launch Referral Program',
        'Launch Annual Planning Session (roll roadmap forward)',
      ],
      deliverables: [
        'Analytics Dashboard',
        'Automation Playbook',
        'Referral Program',
        'Client Success System',
        'Next Year Roadmap'
      ],
      kpis: [
        'Data-driven BD engine',
        'Referral program active',
        'System ready for optimization loop'
      ]
    }
  ];

    return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Business Point Law - BD Roadmap</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 font-medium">
                Please see below our planned/proposed roadmap to help BusinessPoint Law increase customers. We look forward to collaborating with you!
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {roadmapPhases.map((phase, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center text-2xl text-white`}>
                      {phase.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{phase.title}</h3>
                      <p className="text-gray-600">{phase.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pl-16">
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Key Activities:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-red-500">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Deliverables:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {phase.deliverables.map((deliverable, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Success KPIs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.kpis.map((kpi, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        ✓ {kpi}
                      </span>
              ))}
            </div>
                </div>
              </div>
            ))}
          </div>

          {/* High-Conversion Summary Table */}
          <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">High-Conversion BD Roadmap</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Quarter</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Phase</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Core Focus</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Deliverables</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Q1</td>
                    <td className="py-3 px-4 text-gray-700">Foundation</td>
                    <td className="py-3 px-4 text-gray-700">Clarity & setup</td>
                    <td className="py-3 px-4 text-gray-600">1 case study + 70 contact list + CRM live</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Q2</td>
                    <td className="py-3 px-4 text-gray-700">Acceleration</td>
                    <td className="py-3 px-4 text-gray-700">Lead generation</td>
                    <td className="py-3 px-4 text-gray-600">3 client meetings/mo + conversion flow</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Q3</td>
                    <td className="py-3 px-4 text-gray-700">Scale</td>
                    <td className="py-3 px-4 text-gray-700">Authority & amplification</td>
                    <td className="py-3 px-4 text-gray-600">5 best assets repurposed + retargeting ads</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Q4</td>
                    <td className="py-3 px-4 text-gray-700">Optimize</td>
                    <td className="py-3 px-4 text-gray-700">Automation & referrals</td>
                    <td className="py-3 px-4 text-gray-600">Analytics dashboard + referral program</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 italic">
                The strongest conversion points: First proof asset (Q1) → Consult booking funnel (Q2) → 
                Retargeting & testimonials (Q3) → Referral engine (Q4)
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Ready to get started? Return to your dashboard to begin implementing this roadmap.
            </p>
            <button
              onClick={() => navigate('/growth-dashboard')}
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Dashboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}