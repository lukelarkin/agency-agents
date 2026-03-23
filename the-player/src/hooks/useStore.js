import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createProfile, createDateEntry, createContactLog, createJournalEntry } from '../models/schemas.js';

const useStore = create(
  persist(
    (set, get) => ({
      // ── User Settings ──────────────────────────────────────────
      user: {
        name: '',
        zodiacSign: null,
        attachmentStyle: null,
        onboarded: false,
      },
      updateUser: (updates) => set(s => ({ user: { ...s.user, ...updates } })),
      completeOnboarding: () => set(s => ({ user: { ...s.user, onboarded: true } })),

      // ── Profiles ───────────────────────────────────────────────
      profiles: [],
      activeProfileId: null,

      addProfile: (overrides = {}) => {
        const profile = createProfile(overrides);
        set(state => ({ profiles: [...state.profiles, profile], activeProfileId: profile.id }));
        return profile.id;
      },

      updateProfile: (id, updates) => {
        set(state => ({
          profiles: state.profiles.map(p =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProfile: (id) => {
        set(state => ({
          profiles: state.profiles.filter(p => p.id !== id),
          activeProfileId: state.activeProfileId === id ? null : state.activeProfileId,
        }));
      },

      setActiveProfile: (id) => set({ activeProfileId: id }),

      getActiveProfile: () => {
        const { profiles, activeProfileId } = get();
        return profiles.find(p => p.id === activeProfileId) || null;
      },

      // ── Contact Log ────────────────────────────────────────────
      logContact: (profileId, type, note = '') => {
        const entry = createContactLog({ type, note });
        set(state => ({
          profiles: state.profiles.map(p =>
            p.id === profileId
              ? { ...p, contactLog: [...(p.contactLog || []), entry], updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      // ── Date Log ───────────────────────────────────────────────
      addDateEntry: (profileId, overrides = {}) => {
        const entry = createDateEntry(overrides);
        set(state => ({
          profiles: state.profiles.map(p =>
            p.id === profileId
              ? { ...p, dateLog: [...p.dateLog, entry], updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      // ── Important Details ──────────────────────────────────────
      addDetail: (profileId, detail) => {
        set(state => ({
          profiles: state.profiles.map(p =>
            p.id === profileId
              ? { ...p, importantDetails: [...(p.importantDetails || []), { id: crypto.randomUUID(), text: detail, addedAt: new Date().toISOString() }] }
              : p
          ),
        }));
      },

      removeDetail: (profileId, detailId) => {
        set(state => ({
          profiles: state.profiles.map(p =>
            p.id === profileId
              ? { ...p, importantDetails: (p.importantDetails || []).filter(d => d.id !== detailId) }
              : p
          ),
        }));
      },

      // ── Journal ────────────────────────────────────────────────
      journal: [],

      addJournalEntry: (overrides = {}) => {
        const entry = createJournalEntry(overrides);
        set(state => ({ journal: [...state.journal, entry] }));
        return entry.id;
      },

      updateJournalEntry: (id, updates) => {
        set(state => ({
          journal: state.journal.map(j => j.id === id ? { ...j, ...updates } : j),
        }));
      },

      // ── Computed: Intelligence Layer ───────────────────────────

      /**
       * Get profiles sorted by urgency — who needs attention right now.
       */
      getActionItems: () => {
        const { profiles } = get();
        const now = new Date();
        const items = [];

        for (const p of profiles) {
          if (['Archived', 'On Hold'].includes(p.relationshipStage)) continue;

          const contacts = p.contactLog || [];
          const lastContact = contacts.length > 0
            ? new Date(contacts[contacts.length - 1].timestamp)
            : null;
          const lastContactType = contacts.length > 0 ? contacts[contacts.length - 1].type : null;

          const hoursSinceContact = lastContact
            ? (now - lastContact) / (1000 * 60 * 60)
            : Infinity;

          const daysSinceContact = hoursSinceContact / 24;

          // Whose turn is it?
          const herTurn = lastContactType === 'text_sent' || lastContactType === 'you_initiated';
          const yourTurn = lastContactType === 'text_received' || lastContactType === 'she_initiated';

          // Action logic
          if (yourTurn && hoursSinceContact > 1) {
            items.push({
              profileId: p.id,
              profile: p,
              type: 'respond',
              urgency: hoursSinceContact > 12 ? 'high' : hoursSinceContact > 4 ? 'medium' : 'low',
              message: hoursSinceContact > 24
                ? `${p.name} texted ${Math.floor(daysSinceContact)}d ago. You're leaving her on read.`
                : hoursSinceContact > 4
                  ? `${p.name} texted ${Math.floor(hoursSinceContact)}h ago. Time to reply.`
                  : `${p.name} texted. Ball's in your court.`,
              action: 'Text her back',
            });
          } else if (herTurn && daysSinceContact > 3) {
            items.push({
              profileId: p.id,
              profile: p,
              type: 'follow_up',
              urgency: daysSinceContact > 7 ? 'high' : 'medium',
              message: daysSinceContact > 7
                ? `${p.name} hasn't responded in ${Math.floor(daysSinceContact)} days. Going cold.`
                : `It's been ${Math.floor(daysSinceContact)} days since you texted ${p.name}. Radio silence.`,
              action: daysSinceContact > 7 ? 'Send revival text or let go' : 'Give it another day or soft ping',
            });
          } else if (!lastContact) {
            items.push({
              profileId: p.id,
              profile: p,
              type: 'new',
              urgency: 'medium',
              message: `${p.name} is on your roster but you haven't logged any contact yet.`,
              action: 'Send first text',
            });
          } else if (daysSinceContact > 5 && !herTurn) {
            items.push({
              profileId: p.id,
              profile: p,
              type: 'going_cold',
              urgency: 'low',
              message: `No activity with ${p.name} in ${Math.floor(daysSinceContact)} days.`,
              action: 'Re-engage or archive',
            });
          }
        }

        // Sort by urgency
        const urgencyOrder = { high: 0, medium: 1, low: 2 };
        items.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
        return items;
      },

      /**
       * Get analytics summary.
       */
      getAnalytics: () => {
        const { profiles, journal } = get();
        const active = profiles.filter(p => !['Archived', 'On Hold'].includes(p.relationshipStage));
        const archived = profiles.filter(p => p.relationshipStage === 'Archived');

        const totalDates = profiles.reduce((sum, p) => sum + (p.dateLog?.length || 0), 0);
        const avgDateRating = profiles.reduce((sum, p) => {
          const dates = p.dateLog || [];
          return sum + dates.reduce((s, d) => s + d.howItWent, 0);
        }, 0) / (totalDates || 1);

        const totalContacts = profiles.reduce((sum, p) => sum + (p.contactLog?.length || 0), 0);

        // She-initiated ratio (higher = better game)
        const sheInitiated = profiles.reduce((sum, p) =>
          sum + (p.contactLog || []).filter(c => ['text_received', 'she_initiated'].includes(c.type)).length, 0);
        const youInitiated = profiles.reduce((sum, p) =>
          sum + (p.contactLog || []).filter(c => ['text_sent', 'you_initiated'].includes(c.type)).length, 0);
        const initiationRatio = youInitiated > 0 ? (sheInitiated / youInitiated).toFixed(2) : '0';

        // Depth score (based on journal usage and level)
        const depthPoints = journal.reduce((sum, j) => {
          if (!j.response || j.response.trim().length < 10) return sum;
          return sum + (j.level * 2);
        }, 0);

        // Connection score: high vibe dates + she-initiated + journal depth
        const highVibeDates = profiles.reduce((sum, p) =>
          sum + (p.dateLog || []).filter(d => d.howItWent >= 4).length, 0);

        const connectionScore = Math.min(100, Math.round(
          (highVibeDates * 8) + (sheInitiated * 3) + (depthPoints * 2)
        ));

        return {
          activeCount: active.length,
          archivedCount: archived.length,
          totalDates,
          avgDateRating: avgDateRating.toFixed(1),
          totalContacts,
          initiationRatio,
          sheInitiated,
          youInitiated,
          journalEntries: journal.length,
          depthPoints,
          connectionScore,
          // Stage breakdown
          stages: {
            Prospect: profiles.filter(p => p.relationshipStage === 'Prospect').length,
            Talking: profiles.filter(p => p.relationshipStage === 'Talking').length,
            Dating: profiles.filter(p => p.relationshipStage === 'Dating').length,
            Exclusive: profiles.filter(p => p.relationshipStage === 'Exclusive').length,
          },
        };
      },

      /**
       * Determine user's depth level based on usage patterns.
       * Level 1: New user, game-focused
       * Level 2: Regular user, starting to reflect
       * Level 3: Deep user, ready for truth
       */
      getDepthLevel: () => {
        const { profiles, journal } = get();
        const totalDates = profiles.reduce((sum, p) => sum + (p.dateLog?.length || 0), 0);
        const journalCount = journal.filter(j => j.response && j.response.trim().length > 20).length;
        const archivedCount = profiles.filter(p => p.relationshipStage === 'Archived').length;

        if (journalCount >= 5 && totalDates >= 8 && archivedCount >= 2) return 3;
        if (totalDates >= 3 || journalCount >= 2) return 2;
        return 1;
      },
    }),
    { name: 'the-player-storage' }
  )
);

export default useStore;
