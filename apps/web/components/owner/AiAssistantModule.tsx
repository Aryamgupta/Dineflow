'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type ChatMessage = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  summary?: string;
  insights?: string[];
  references?: { source: string; detail: string }[];
  actions?: string[];
};

const initialChat: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Good evening! I am your DineFlow AI Business Assistant. I analyze your restaurant sales, table turn times, staff rosters, and verified guest feedback to provide grounded operational intelligence. How can I assist you with The Rustic Oak today?',
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'How is our restaurant performing this week, and what menu items are driving margin?',
  },
  {
    id: 'msg-3',
    sender: 'assistant',
    text: 'Here is your executive performance summary for the current week:',
    summary: 'Gross revenue is tracking at $32,450 (+14.2% week-over-week). Average dining check increased from $31.20 to $34.10, fueled by high dessert attachment and vintage wine pairings.',
    insights: [
      'Top Gross Margin Item: Truffle Tagliatelle (68% food margin, 184 units ordered this week).',
      'Beverage Upsell Rate: Server Alex Moreno is converting 44% of entree orders into wine glass pairings.',
      'Operational Bottleneck: Grill station experienced a 6-minute delay surge on Friday between 8:00 PM and 9:15 PM.',
    ],
    references: [
      { source: 'Sales Analytics', detail: 'Weekly Gross Sales & Dish Margin breakdown' },
      { source: 'Staff Performance', detail: 'Table turns and server beverage attachment rates' },
      { source: 'Reviews & Ratings', detail: '94% positive sentiment on pasta & steak dishes' },
    ],
    actions: [
      'Consider pre-portioning dry-aged ribeye steaks prior to the 7:30 PM weekend rush.',
      'Highlight Barolo Reserve wine pairing directly in the digital QR cart checkout flow.',
    ],
  },
];

const samplePrompts = [
  'How is our restaurant performing this week?',
  'Which staff members have the highest customer satisfaction?',
  'What are our best-selling dishes vs highest margin dishes?',
  'What operational escalations require my immediate attention?',
];

export function AiAssistantModule() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSendPrompt = (promptText: string) => {
    const text = promptText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse: ChatMessage;

      if (text.toLowerCase().includes('staff') || text.toLowerCase().includes('satisfaction')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: 'Here is your workforce satisfaction analysis:',
          summary: 'Alex Moreno and Head Chef Marco Bellini hold the highest positive guest feedback (4.90★ and 4.92★ respectively across 200+ customer reviews).',
          insights: [
            'Alex Moreno has served 320 tables with 0 complaints and earned 114 positive reviews.',
            'Kitchen order turnaround under Chef Marco averaged 14 minutes, exceeding the 16-minute restaurant SLA.',
            'Priya Kapoor showed strong wine pairing upsells, though Table 4 experienced a minor grill delay.',
          ],
          references: [
            { source: 'Staff Performance', detail: 'Attendance & customer satisfaction scorecard' },
            { source: 'Escalations Center', detail: '1 active case logged for Table 4 entrée delay' },
          ],
          actions: [
            'Nominate Alex Moreno as Floor Lead for weekend dinner shifts.',
            'Review station prep allocations with Line Cook David Chen.',
          ],
        };
      } else if (text.toLowerCase().includes('escalation') || text.toLowerCase().includes('attention')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: 'Here are the operational matters requiring immediate supervisor attention:',
          summary: 'There is 1 High-Priority escalation and 1 safety maintenance task currently open.',
          insights: [
            'High Priority: Table 4 Entrée Delay reported by Priya Kapoor (gas pressure drop at grill station).',
            'Maintenance: Dishwashing station drain line scheduled for plumber inspection tomorrow at 8:00 AM.',
            'Manager Capacity: 2 of 2 General Managers currently allocated under restaurant business policy.',
          ],
          references: [
            { source: 'Escalations & Incidents', detail: 'Tickets ESC-101 and ESC-102' },
            { source: 'Staff Directory', detail: 'Manager allocation status check' },
          ],
          actions: [
            'Confirm Table 4 guest satisfaction follow-up with GM Elena Rostova.',
          ],
        };
      } else {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Analysis for "${text}":`,
          summary: 'Sales and dining volume are robust with 142 orders today ($4,820.50 gross). Guest sentiment remains in the upper decile (4.82★).',
          insights: [
            'Dinner service accounts for 67% of today’s volume.',
            'Truffle Tagliatelle and Prime Ribeye are currently leading item contributions.',
            '18 of 24 tables are currently seated and in active service.',
          ],
          references: [
            { source: 'Sales Analytics', detail: 'Hourly sales telemetry' },
            { source: 'Live Operations Rail', detail: 'Real-time table status' },
          ],
          actions: [
            'Maintain current floor staffing through the 9:30 PM post-dinner wind-down.',
          ],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Business Intelligence</p>
          <h1>DineFlow AI Assistant</h1>
          <p className="owner-page-subtitle">
            Executive conversational intelligence grounded in your restaurant&apos;s live data, reviews, and operational logs.
          </p>
        </div>

        <div className="owner-header-actions">
          <button
            className="owner-btn owner-btn-secondary"
            onClick={() => setMessages(initialChat.slice(0, 1))}
            type="button"
          >
            <Icon name="refresh" /> Clear Chat
          </button>
        </div>
      </div>

      {/* AI Transparency Banner */}
      <div className="owner-banner owner-banner-info">
        <div className="owner-banner-content">
          <Icon name="auto_awesome" />
          <div>
            <strong>Grounded Business Intelligence Prototype:</strong> Insights generated below reflect verified database records from Sales Analytics, Staff Reviews, and Escalation logs.
          </div>
        </div>
      </div>

      {/* Prompt Suggestions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <small style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>
          Suggested executive inquiries:
        </small>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {samplePrompts.map((p) => (
            <button
              key={p}
              className="owner-btn owner-btn-sm owner-btn-secondary"
              onClick={() => handleSendPrompt(p)}
              type="button"
            >
              <Icon name="chat" /> {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Area */}
      <div className="owner-ai-chat" aria-label="Conversation with DineFlow AI">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`owner-ai-bubble ${
              m.sender === 'user' ? 'owner-ai-user-bubble' : 'owner-ai-bot-bubble'
            }`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <Icon
                name={m.sender === 'user' ? 'person' : 'auto_awesome'}
                style={{ fontSize: '1rem', color: m.sender === 'user' ? '#ffffff' : 'var(--color-primary)' }}
              />
              <strong style={{ fontSize: '0.75rem' }}>
                {m.sender === 'user' ? 'Restaurant Owner' : 'DineFlow AI'}
              </strong>
            </div>

            <p style={{ margin: 0 }}>{m.text}</p>

            {m.summary && (
              <div
                style={{
                  marginTop: '0.625rem',
                  padding: '0.75rem',
                  background: 'var(--color-surface-low)',
                  borderRadius: 'var(--radius-control)',
                  borderLeft: '3px solid var(--color-primary)',
                  fontWeight: 500,
                }}
              >
                {m.summary}
              </div>
            )}

            {m.insights && m.insights.length > 0 && (
              <div style={{ marginTop: '0.625rem' }}>
                <strong style={{ fontSize: '0.75rem' }}>Supporting Quantitative Findings:</strong>
                <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {m.insights.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>
            )}

            {m.actions && m.actions.length > 0 && (
              <div style={{ marginTop: '0.625rem' }}>
                <strong style={{ fontSize: '0.75rem' }}>Recommended Operational Actions:</strong>
                <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {m.actions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}

            {m.references && m.references.length > 0 && (
              <div className="owner-ai-references">
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Audit Trail &amp; Data References:
                </span>
                {m.references.map((ref, idx) => (
                  <div key={idx} className="owner-ai-ref-item">
                    <span>{ref.source}:</span>
                    <span>{ref.detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="owner-ai-bubble owner-ai-bot-bubble" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="auto_awesome" className="text-primary" />
            <span>Analyzing restaurant performance telemetry...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(inputPrompt);
        }}
        style={{ display: 'flex', gap: '0.5rem' }}
      >
        <input
          className="owner-form-input"
          placeholder="Ask DineFlow AI about margins, staffing, dining trends, or reviews..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
        />
        <button type="submit" className="owner-btn owner-btn-primary">
          <Icon name="send" /> Send
        </button>
      </form>
    </div>
  );
}

