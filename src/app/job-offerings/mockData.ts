// Types that match the backend schema
export interface Requirement {
  id: string;
  description: string;
  isRequired: boolean;
  jobOfferingId: string;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  currentLocation: string;
  yearsOfExperience: number;
  highestEducation: string;
  coverLetter: string;
  jobOfferingId: string;
  isSeen: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface JobOffering {
  id: string;
  title: string;
  cityName: string;
  countryName: string;
  positionType: string;
  department: string;
  requirements: Requirement[];
  applications: Application[];
  createdAt: string;
  updatedAt: string;
}

// Department colors for visual distinctions
export const departmentColorMap: Record<string, { color: string, icon: string, bg: string, lightColor: string, gradient: string }> = {
  Engineering: { 
    color: 'primary', 
    icon: '💻', 
    bg: 'bg-blue-50',
    lightColor: 'text-blue-600',
    gradient: 'from-blue-50 to-blue-100'
  },
  Design: { 
    color: 'secondary', 
    icon: '🎨', 
    bg: 'bg-purple-50',
    lightColor: 'text-purple-600',
    gradient: 'from-purple-50 to-purple-100'
  },
  Marketing: { 
    color: 'success', 
    icon: '📊', 
    bg: 'bg-emerald-50',
    lightColor: 'text-emerald-600',
    gradient: 'from-emerald-50 to-emerald-100'
  },
  Sales: { 
    color: 'warning', 
    icon: '💼', 
    bg: 'bg-amber-50',
    lightColor: 'text-amber-600',
    gradient: 'from-amber-50 to-amber-100'
  },
  Finance: { 
    color: 'danger', 
    icon: '💰', 
    bg: 'bg-rose-50',
    lightColor: 'text-rose-600',
    gradient: 'from-rose-50 to-rose-100'
  },
  'Customer Support': { 
    color: 'default', 
    icon: '🎧', 
    bg: 'bg-gray-50',
    lightColor: 'text-gray-600',
    gradient: 'from-gray-50 to-gray-100'
  },
  'Human Resources': { 
    color: 'warning', 
    icon: '👥', 
    bg: 'bg-amber-50',
    lightColor: 'text-amber-600',
    gradient: 'from-amber-50 to-amber-100'
  },
  Operations: { 
    color: 'primary', 
    icon: '⚙️', 
    bg: 'bg-blue-50',
    lightColor: 'text-blue-600',
    gradient: 'from-blue-50 to-blue-100'
  },
};

// Position type colors
export const positionTypeColorMap: Record<string, { color: string, bg: string, lightColor: string }> = {
  'Full-time': { 
    color: 'success', 
    bg: 'bg-emerald-50',
    lightColor: 'text-emerald-600',
  },
  'Part-time': { 
    color: 'primary', 
    bg: 'bg-blue-50',
    lightColor: 'text-blue-600',
  },
  'Contract': { 
    color: 'warning', 
    bg: 'bg-amber-50',
    lightColor: 'text-amber-600',
  },
  'Internship': { 
    color: 'secondary', 
    bg: 'bg-purple-50',
    lightColor: 'text-purple-600',
  },
  'Temporary': { 
    color: 'default', 
    bg: 'bg-gray-50',
    lightColor: 'text-gray-600',
  },
};

// Mock job offerings data
export const mockJobOfferings: JobOffering[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Senior Software Engineer',
    cityName: 'San Francisco',
    countryName: 'United States',
    positionType: 'Full-time',
    department: 'Engineering',
    requirements: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb07a1',
        description: '5+ years of experience with JavaScript and TypeScript',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440000'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb07a2',
        description: 'Experience with React and Next.js',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440000'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb07a3',
        description: 'Familiarity with GraphQL',
        isRequired: false,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440000'
      }
    ],
    applications: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb07b1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1 (555) 123-4567',
        currentLocation: 'San Francisco, CA',
        yearsOfExperience: 7,
        highestEducation: 'Master\'s Degree',
        coverLetter: 'I am excited to apply for the Senior Software Engineer position...',
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440000',
        isSeen: true,
        createdAt: '2023-04-01T10:30:00Z',
        updatedAt: '2023-04-02T14:25:00Z',
        status: 'Pending'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb07b2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '+1 (555) 234-5678',
        currentLocation: 'San Jose, CA',
        yearsOfExperience: 8,
        highestEducation: 'Bachelor\'s Degree',
        coverLetter: 'With my extensive experience in software engineering...',
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440000',
        isSeen: true,
        createdAt: '2023-03-28T09:15:00Z',
        updatedAt: '2023-03-29T11:45:00Z',
        status: 'Reviewed'
      }
    ],
    createdAt: '2023-03-15T08:00:00Z',
    updatedAt: '2023-03-15T08:00:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'UX/UI Designer',
    cityName: 'New York',
    countryName: 'United States',
    positionType: 'Full-time',
    department: 'Design',
    requirements: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb08a1',
        description: '3+ years of experience in UX/UI design',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440001'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb08a2',
        description: 'Proficiency with Figma and Adobe Creative Suite',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440001'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb08a3',
        description: 'Knowledge of motion design',
        isRequired: false,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440001'
      }
    ],
    applications: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb08b1',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phoneNumber: '+1 (555) 345-6789',
        currentLocation: 'Brooklyn, NY',
        yearsOfExperience: 4,
        highestEducation: 'Bachelor\'s Degree',
        coverLetter: 'I am passionate about creating user-centric designs...',
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440001',
        isSeen: false,
        createdAt: '2023-04-03T13:45:00Z',
        updatedAt: '2023-04-03T13:45:00Z',
        status: 'Pending'
      }
    ],
    createdAt: '2023-03-20T09:30:00Z',
    updatedAt: '2023-03-20T09:30:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Marketing Manager',
    cityName: 'London',
    countryName: 'United Kingdom',
    positionType: 'Full-time',
    department: 'Marketing',
    requirements: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb09a1',
        description: '5+ years of marketing experience',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440002'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb09a2',
        description: 'Experience with digital marketing campaigns',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440002'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb09a3',
        description: 'Knowledge of SEO and content marketing',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440002'
      }
    ],
    applications: [],
    createdAt: '2023-04-01T11:00:00Z',
    updatedAt: '2023-04-01T11:00:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Product Manager',
    cityName: 'Berlin',
    countryName: 'Germany',
    positionType: 'Full-time',
    department: 'Operations',
    requirements: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb10a1',
        description: '3+ years of product management experience',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440003'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb10a2',
        description: 'Experience with agile methodologies',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440003'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb10a3',
        description: 'Technical background preferred',
        isRequired: false,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440003'
      }
    ],
    applications: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb10b1',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@example.com',
        phoneNumber: '+49 123 456789',
        currentLocation: 'Berlin, Germany',
        yearsOfExperience: 5,
        highestEducation: 'Master\'s Degree',
        coverLetter: 'I have successfully led product teams in the past...',
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440003',
        isSeen: true,
        createdAt: '2023-04-02T16:20:00Z',
        updatedAt: '2023-04-03T09:10:00Z',
        status: 'Approved'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb10b2',
        firstName: 'Sophie',
        lastName: 'Mueller',
        email: 'sophie.mueller@example.com',
        phoneNumber: '+49 234 567890',
        currentLocation: 'Munich, Germany',
        yearsOfExperience: 4,
        highestEducation: 'Bachelor\'s Degree',
        coverLetter: 'I am looking to bring my product management expertise...',
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440003',
        isSeen: false,
        createdAt: '2023-04-03T14:30:00Z',
        updatedAt: '2023-04-03T14:30:00Z',
        status: 'Pending'
      }
    ],
    createdAt: '2023-03-25T10:15:00Z',
    updatedAt: '2023-03-25T10:15:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Sales Representative',
    cityName: 'Sydney',
    countryName: 'Australia',
    positionType: 'Part-time',
    department: 'Sales',
    requirements: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb11a1',
        description: 'Previous sales experience',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440004'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb11a2',
        description: 'Excellent communication skills',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440004'
      }
    ],
    applications: [],
    createdAt: '2023-04-03T08:45:00Z',
    updatedAt: '2023-04-03T08:45:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title: 'Backend Developer',
    cityName: 'Toronto',
    countryName: 'Canada',
    positionType: 'Full-time',
    department: 'Engineering',
    requirements: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb12a1',
        description: 'Experience with Node.js and Express',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440005'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb12a2',
        description: 'Knowledge of database systems (SQL and NoSQL)',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440005'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb12a3',
        description: 'Experience with cloud services (AWS/Azure/GCP)',
        isRequired: false,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440005'
      }
    ],
    applications: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb12b1',
        firstName: 'David',
        lastName: 'Lee',
        email: 'david.lee@example.com',
        phoneNumber: '+1 (416) 123-4567',
        currentLocation: 'Toronto, Canada',
        yearsOfExperience: 6,
        highestEducation: 'Bachelor\'s Degree',
        coverLetter: 'I have extensive experience building scalable backend systems...',
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440005',
        isSeen: true,
        createdAt: '2023-04-01T09:30:00Z',
        updatedAt: '2023-04-02T11:20:00Z',
        status: 'Rejected'
      }
    ],
    createdAt: '2023-03-30T13:20:00Z',
    updatedAt: '2023-03-30T13:20:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    title: 'Customer Support Specialist',
    cityName: 'Singapore',
    countryName: 'Singapore',
    positionType: 'Full-time',
    department: 'Customer Support',
    requirements: [
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb13a1',
        description: 'Previous customer service experience',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440006'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb13a2',
        description: 'Excellent communication skills',
        isRequired: true,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440006'
      },
      {
        id: '4a0eebc6-9420-4c82-a378-1a0c52fb13a3',
        description: 'Fluency in multiple languages',
        isRequired: false,
        jobOfferingId: '550e8400-e29b-41d4-a716-446655440006'
      }
    ],
    applications: [],
    createdAt: '2023-04-02T07:30:00Z',
    updatedAt: '2023-04-02T07:30:00Z'
  }
]; 