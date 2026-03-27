import { create } from 'zustand';

const useUIStore = create((set) => ({
  // Modal states
  showCreateResume: false,
  showUploadResume: false,
  editResumeId: '',

  // Builder state
  activeSectionIndex: 0,
  removeBackground: false,
  showATSPreview: false,

  // Actions
  setShowCreateResume: (show) => set({ showCreateResume: show }),
  setShowUploadResume: (show) => set({ showUploadResume: show }),
  setEditResumeId: (id) => set({ editResumeId: id }),
  setActiveSectionIndex: (index) => set({ activeSectionIndex: index }),
  setRemoveBackground: (val) => set({ removeBackground: val }),
  setShowATSPreview: (val) => set({ showATSPreview: val }),

  // Reset builder state when navigating away
  resetBuilderState: () => set({ activeSectionIndex: 0, removeBackground: false, showATSPreview: false }),
}));

export default useUIStore;
