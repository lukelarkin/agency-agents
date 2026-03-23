import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createProfile, createDateEntry } from '../models/schemas.js';

const useStore = create(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,

      // Profile CRUD
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

      // Date log
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

      // Search / filter
      getProfilesByStage: (stage) => get().profiles.filter(p => p.relationshipStage === stage),
    }),
    { name: 'the-player-storage' }
  )
);

export default useStore;
