import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import MatchScorePanel from '../components/scoring/MatchScorePanel';
import DownloadButton from '../components/pdf/DownloadButton';
import ATSPreview from '../components/ats/ATSPreview';
import useAuthStore from '../stores/useAuthStore';
import useUIStore from '../stores/useUIStore';
import { useResume, useUpdateResume } from '../hooks/useResumes';
import useLocalDraft from '../hooks/useLocalDraft';
import toast from 'react-hot-toast';

const ResumeBuilder = () => {

  const { resumeId } = useParams();
  const token = useAuthStore((s) => s.token);

  const { activeSectionIndex, setActiveSectionIndex, removeBackground, setRemoveBackground, showATSPreview, setShowATSPreview } = useUIStore();

  const showAuthToast = () => toast(
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-gray-900 text-sm">Sign up or Log in</span>
      <span className="text-sm text-gray-600">Please sign up or log in to save your progress and access all features.</span>
    </div>,
    { duration: 4000 }
  );

  const { data: serverResume } = useResume(resumeId);
  const updateResumeMutation = useUpdateResume();
  const { draft, saveDraft, clearDraft } = useLocalDraft(resumeId);

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false
  })

  const [showGuestPopup, setShowGuestPopup] = useState(false);

  useEffect(() => {
    if (!token && resumeId === 'draft') {
      setShowGuestPopup(true);
    }
  }, [token, resumeId]);

  // Sync server data into local state (prefer server over draft)
  useEffect(() => {
    if (serverResume) {
      setResumeData(serverResume);
      document.title = serverResume.title;
      clearDraft(); // clear local draft once server data loads
    } else if (draft) {
      setResumeData(draft);
    }
  }, [serverResume])

  // Auto-save draft to localStorage on changes
  useEffect(() => {
    if (resumeData._id) {
      saveDraft(resumeData);
    }
  }, [resumeData])

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex];

  const changeResumeVisibility = async () => {
    try {
      await updateResumeMutation.mutateAsync({
        resumeId,
        resumeData: { public: !resumeData.public },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(resumeData.public ? 'Resume is now private' : 'Resume is now public');
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0]
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" })
    } else {
      alert('Share not supported on this browser')
    }
  }

  // Removed old downloadResume in favor of <DownloadButton />

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)
      let image = null;

      if (typeof resumeData.personal_info.info_image === 'object') {
        image = resumeData.personal_info.image;
        delete updatedResumeData.personal_info.image;
      }

      const data = await updateResumeMutation.mutateAsync({
        resumeId,
        resumeData: updatedResumeData,
        removeBackground,
        image,
      });

      if (data.resume) {
        setResumeData(data.resume);
      }
      clearDraft();
      toast.success(data.message || 'Saved');
    } catch (error) {
      console.error("Error Saving Resume: ", error)
    }
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto py-6 px-4'>
        <Link to={token ? "/app" : "/"} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all ">
          <ArrowLeftIcon className='size-4' /> Back to {token ? "Dashboard" : "Home"}
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8 '>
          {/* Left Panel Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* Progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />

              {/* Section Navigation */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>

                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex(Math.max(activeSectionIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}
                  <button onClick={() => setActiveSectionIndex(Math.min(activeSectionIndex + 1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}>
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>

              {/* From Content */}
              <div className='space-y-6'>
                {activeSection.id === "personal" && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}
                {
                  activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={(setResumeData)} />
                  )
                }
                {
                  activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                  )
                }
                {
                  activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                  )
                }
                {
                  activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                  )
                }
                {
                  activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                  )
                }
              </div>
              {token ? (
                  <button onClick={() => { toast.promise(saveResume(), { loading: "Saving..." }) }} className='bg-gradient-to-br from-green-100 to-green-500 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                    Save Changes
                  </button>
              ) : (
                  <button onClick={showAuthToast} className='bg-gradient-to-br from-green-100 to-green-500 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                    Save to Cloud
                  </button>
              )}
              {!token && (
                  <p className='text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded border border-amber-200'>You are drafting as a guest. Your work is saved locally in this browser. Log in to save to the cloud and share.</p>
              )}
            </div>
          </div>
          {/* Right Panel Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {token && resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2Icon className='size-4' /> Share
                  </button>
                )}
                {token && (
                    <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                      {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                      {resumeData.public ? "Public" : "Private"}
                    </button>
                )}
                <button onClick={() => setShowATSPreview(!showATSPreview)} className={`flex items-center p-2 px-4 gap-2 text-xs rounded-lg ring hover:ring transition-colors ${showATSPreview ? 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300' : 'bg-white border text-gray-700 ring-gray-200 border-gray-300'}`}>
                  ATS {showATSPreview ? 'On' : 'Off'}
                </button>
                <DownloadButton data={resumeData} />
              </div>
            </div>

            {showATSPreview ? (
              <ATSPreview data={resumeData} />
            ) : (
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            )}
          </div>
        </div>
      </div>
      {showGuestPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
           <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-bold mb-3 text-gray-900">Welcome to Guest Mode</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  You can build and download your resume without logging in. However, please <Link to="/app?state=register" className="text-green-600 font-semibold hover:underline">Sign Up</Link> or <Link to="/app?state=login" className="text-green-600 font-semibold hover:underline">Log In</Link> to save your progress to the cloud and unlock all features, including AI enhancements.
              </p>
              <div className="flex justify-end">
                 <button onClick={() => setShowGuestPopup(false)} className="px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                     Continue as Guest
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

export default ResumeBuilder