import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../configs/api';
import useAuthStore from '../stores/useAuthStore';
import toast from 'react-hot-toast';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  return { headers: { Authorization: token } };
};

// Fetch all resumes for the logged-in user
export const useResumes = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data } = await api.get('/api/users/resumes', getAuthHeaders());
      return data.resumes;
    },
    enabled: !!token,
  });
};

// Fetch a single resume by ID (authenticated)
export const useResume = (resumeId) => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['resume', resumeId],
    queryFn: async () => {
      const { data } = await api.get('/api/resumes/get/' + resumeId, getAuthHeaders());
      return data.resume;
    },
    enabled: !!token && !!resumeId,
  });
};

// Fetch a public resume (no auth)
export const usePublicResume = (resumeId) => {
  return useQuery({
    queryKey: ['publicResume', resumeId],
    queryFn: async () => {
      const { data } = await api.get('/api/resumes/public/' + resumeId);
      return data.resume;
    },
    enabled: !!resumeId,
  });
};

// Create a new resume
export const useCreateResume = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (title) => {
      const { data } = await api.post('/api/resumes/create', { title }, getAuthHeaders());
      return data.resume;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });
};

// Update a resume
export const useUpdateResume = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ resumeId, resumeData, removeBackground, image }) => {
      const formData = new FormData();
      formData.append('resumeId', resumeId);
      formData.append('resumeData', JSON.stringify(resumeData));
      if (removeBackground) formData.append('removeBackground', 'yes');
      if (image) formData.append('image', image);

      const { data } = await api.put('/api/resumes/update', formData, getAuthHeaders());
      return data;
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ['resumes'] });
      qc.invalidateQueries({ queryKey: ['resume', variables.resumeId] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });
};

// Delete a resume
export const useDeleteResume = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId) => {
      const { data } = await api.delete('/api/resumes/delete/' + resumeId, getAuthHeaders());
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });
};

// Upload resume (AI-parsed)
export const useUploadResume = () => {
  return useMutation({
    mutationFn: async ({ title, resumeText }) => {
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, getAuthHeaders());
      return data;
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });
};
