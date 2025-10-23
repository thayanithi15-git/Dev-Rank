import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

interface Project {
  name: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  featured: boolean;
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  portfolio?: string;
  stackoverflow?: string;
  leetcode?: string;
  hackerrank?: string;
  codechef?: string;
  codeforces?: string;
  medium?: string;
  devto?: string;
  behance?: string;
  dribbble?: string;
}

interface ProfileBuilderState {
  // Personal Info
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  bio: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  timezone: string;
  gender: string;
  dateOfBirth: string;
  profileImage: string;
  bannerImage: string;

  // Social Links
  socialLinks: SocialLinks;

  // Skills & Experience
  currentRole: string;
  seniorityLevel: string;
  yearsOfExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
  workExperience: WorkExperience[];

  // Career Preferences
  jobTypes: string[];
  workArrangement: string[];
  availableForWork: string;
  noticePeriod: string;
  willingToRelocate: string;
  remoteWorkPreference: string;
  expectedSalary: string;
  salaryCurrency: string;
  preferredCompanySize: string[];
  preferredIndustries: string[];

  // Portfolio
  projects: Project[];
  education: Education[];

  // UI State
  currentStep: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  setField: (field: string, value: any) => void;
  setSocialLink: (platform: string, url: string) => void;
  addSkill: (type: 'primary' | 'secondary', skill: string) => void;
  removeSkill: (type: 'primary' | 'secondary', skill: string) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (index: number, field: string, value: any) => void;
  removeWorkExperience: (index: number) => void;
  addProject: () => void;
  updateProject: (index: number, field: string, value: any) => void;
  removeProject: (index: number) => void;
  addEducation: () => void;
  updateEducation: (index: number, field: string, value: any) => void;
  removeEducation: (index: number) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitProfile: () => Promise<boolean>;
  reset: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
  displayName: "",
  username: "",
  bio: "",
  email: "",
  phone: "",
  country: "",
  location: "",
  timezone: "",
  gender: "",
  dateOfBirth: "",
  profileImage: "",
  bannerImage: "",
  socialLinks: {},
  currentRole: "",
  seniorityLevel: "",
  yearsOfExperience: "",
  primarySkills: [],
  secondarySkills: [],
  workExperience: [],
  jobTypes: [],
  workArrangement: [],
  availableForWork: "",
  noticePeriod: "",
  willingToRelocate: "",
  remoteWorkPreference: "",
  expectedSalary: "",
  salaryCurrency: "USD",
  preferredCompanySize: [],
  preferredIndustries: [],
  projects: [],
  education: [],
  currentStep: 1,
  isLoading: false,
  error: null,
};

export const useProfileBuilderStore = create<ProfileBuilderState>((set, get) => ({
  ...initialState,

  setField: (field, value) => set({ [field]: value }),

  setSocialLink: (platform, url) =>
    set((state) => ({
      socialLinks: { ...state.socialLinks, [platform]: url },
    })),

  addSkill: (type, skill) => {
    const field = type === 'primary' ? 'primarySkills' : 'secondarySkills';
    set((state) => ({
      [field]: [...state[field], skill],
    }));
  },

  removeSkill: (type, skill) => {
    const field = type === 'primary' ? 'primarySkills' : 'secondarySkills';
    set((state) => ({
      [field]: state[field].filter((s) => s !== skill),
    }));
  },

  addWorkExperience: () =>
    set((state) => ({
      workExperience: [
        ...state.workExperience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    })),

  updateWorkExperience: (index, field, value) =>
    set((state) => ({
      workExperience: state.workExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    })),

  removeWorkExperience: (index) =>
    set((state) => ({
      workExperience: state.workExperience.filter((_, i) => i !== index),
    })),

  addProject: () =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          name: "",
          description: "",
          image: "",
          liveUrl: "",
          githubUrl: "",
          techStack: [],
          featured: false,
        },
      ],
    })),

  updateProject: (index, field, value) =>
    set((state) => ({
      projects: state.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      ),
    })),

  removeProject: (index) =>
    set((state) => ({
      projects: state.projects.filter((_, i) => i !== index),
    })),

  addEducation: () =>
    set((state) => ({
      education: [
        ...state.education,
        {
          institution: "",
          degree: "",
          field: "",
          startYear: "",
          endYear: "",
        },
      ],
    })),

  updateEducation: (index, field, value) =>
    set((state) => ({
      education: state.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    })),

  removeEducation: (index) =>
    set((state) => ({
      education: state.education.filter((_, i) => i !== index),
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  submitProfile: async () => {
    const state = get();
    const { showToast } = useToastStore.getState();

    // Validation
    if (!state.firstName || !state.lastName || !state.email || !state.username) {
      showToast(
        "Missing Information",
        "Please fill in all required fields (First Name, Last Name, Email, Username).",
        "error"
      );
      return false;
    }

    if (state.primarySkills.length === 0) {
      showToast(
        "Skills Required",
        "Please add at least one primary skill to your profile.",
        "error"
      );
      return false;
    }

    set({ isLoading: true, error: null });

    try {
      const profileData = {
        firstName: state.firstName,
        lastName: state.lastName,
        displayName: state.displayName || `${state.firstName} ${state.lastName}`,
        username: state.username,
        bio: state.bio,
        email: state.email,
        phone: state.phone,
        location: state.location,
        country: state.country,
        timezone: state.timezone,
        gender: state.gender,
        dateOfBirth: state.dateOfBirth,
        avatar: state.profileImage,
        bannerImage: state.bannerImage,
        
        // Professional Info
        currentRole: state.currentRole,
        seniorityLevel: state.seniorityLevel,
        yearsOfExperience: state.yearsOfExperience,
        skills: [...state.primarySkills, ...state.secondarySkills],
        primarySkills: state.primarySkills,
        secondarySkills: state.secondarySkills,
        
        // Experience & Education
        experience: state.workExperience.map(exp => ({
          company: exp.company,
          position: exp.position,
          duration: exp.current 
            ? `${exp.startDate} - Present` 
            : `${exp.startDate} - ${exp.endDate}`,
          startDate: exp.startDate,
          endDate: exp.current ? null : exp.endDate,
          current: exp.current,
          description: exp.description,
        })),
        education: state.education.map(edu => ({
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field,
          year: edu.endYear,
          startYear: edu.startYear,
          endYear: edu.endYear,
        })),
        
        // Career Preferences
        jobTypes: state.jobTypes,
        workArrangement: state.workArrangement,
        availableForWork: state.availableForWork,
        noticePeriod: state.noticePeriod,
        willingToRelocate: state.willingToRelocate,
        remoteWorkPreference: state.remoteWorkPreference,
        expectedSalary: state.expectedSalary,
        salaryCurrency: state.salaryCurrency,
        preferredCompanySize: state.preferredCompanySize,
        preferredIndustries: state.preferredIndustries,
        
        // Portfolio
        projects: state.projects,
        
        // Social Links
        website: state.socialLinks.website,
        socialLinks: state.socialLinks,
      };

      const response = await api.post("/profile-builder/complete", profileData);

      set({ isLoading: false, error: null });

      showToast(
        "Profile Created Successfully! 🎉",
        "Your developer profile has been created. Redirecting to your profile...",
        "success"
      );

      // Optional: Store profile data or redirect
      setTimeout(() => {
        window.location.href = `/profile/${state.username}`;
      }, 2000);

      return true;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to create profile. Please try again.";
      
      set({ error: errorMessage, isLoading: false });
      
      showToast("Profile Creation Failed", errorMessage, "error");
      
      return false;
    }
  },

  reset: () => set(initialState),
}));