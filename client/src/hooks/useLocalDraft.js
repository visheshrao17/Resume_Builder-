import { useState, useEffect, useCallback } from 'react';

const DRAFT_KEY = 'resume_local_drafts';

/**
 * Local-first hook: saves resume drafts to localStorage for guest users.
 * Authenticated users still sync via the server, but drafts auto-save locally
 * so edits survive page refreshes even before hitting "Save".
 */
const useLocalDraft = (resumeId) => {
  const storageKey = `${DRAFT_KEY}_${resumeId}`;

  const [draft, setDraft] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const saveDraft = useCallback(
    (data) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setDraft(data);
      } catch (e) {
        console.warn('Failed to save local draft:', e);
      }
    },
    [storageKey]
  );

  const clearDraft = useCallback(() => {
    localStorage.removeItem(storageKey);
    setDraft(null);
  }, [storageKey]);

  return { draft, saveDraft, clearDraft };
};

export default useLocalDraft;
