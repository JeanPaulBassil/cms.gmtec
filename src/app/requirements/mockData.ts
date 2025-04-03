// Types that match the backend schema
export interface JobOffering {
  id: string;
  title: string;
  cityName: string;
  countryName: string;
  positionType: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface Requirement {
  id: string;
  title: string;
  positionId: string;
  position?: JobOffering; // For when we want to include the related position
  createdAt: string;
  updatedAt: string;
}

// Department colors for visual distinctions (same as in job-offerings)
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

// Mock job offerings data (simplified from job-offerings)
export const mockJobOfferings: JobOffering[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Senior Software Engineer',
    cityName: 'San Francisco',
    countryName: 'United States',
    positionType: 'Full-time',
    department: 'Engineering',
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
    createdAt: '2023-03-30T13:20:00Z',
    updatedAt: '2023-03-30T13:20:00Z'
  }
];

// Mock requirements data
export const mockRequirements: Requirement[] = [
  // Requirements for Senior Software Engineer
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb07a1',
    title: '5+ years of experience with JavaScript and TypeScript',
    positionId: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: '2023-03-15T08:10:00Z',
    updatedAt: '2023-03-15T08:10:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb07a2',
    title: 'Experience with React and Next.js',
    positionId: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: '2023-03-15T08:11:00Z',
    updatedAt: '2023-03-15T08:11:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb07a3',
    title: 'Familiarity with GraphQL',
    positionId: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: '2023-03-15T08:12:00Z',
    updatedAt: '2023-03-15T08:12:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb07a4',
    title: 'Experience with CI/CD pipelines',
    positionId: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: '2023-03-15T08:13:00Z',
    updatedAt: '2023-03-15T08:13:00Z'
  },
  
  // Requirements for UX/UI Designer
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb08a1',
    title: '3+ years of experience in UX/UI design',
    positionId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2023-03-20T09:31:00Z',
    updatedAt: '2023-03-20T09:31:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb08a2',
    title: 'Proficiency with Figma and Adobe Creative Suite',
    positionId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2023-03-20T09:32:00Z',
    updatedAt: '2023-03-20T09:32:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb08a3',
    title: 'Knowledge of motion design',
    positionId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2023-03-20T09:33:00Z',
    updatedAt: '2023-03-20T09:33:00Z'
  },
  
  // Requirements for Marketing Manager
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb09a1',
    title: '5+ years of marketing experience',
    positionId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2023-04-01T11:01:00Z',
    updatedAt: '2023-04-01T11:01:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb09a2',
    title: 'Experience with digital marketing campaigns',
    positionId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2023-04-01T11:02:00Z',
    updatedAt: '2023-04-01T11:02:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb09a3',
    title: 'Knowledge of SEO and content marketing',
    positionId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2023-04-01T11:03:00Z',
    updatedAt: '2023-04-01T11:03:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb09a4',
    title: 'Experience managing social media campaigns',
    positionId: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: '2023-04-01T11:04:00Z',
    updatedAt: '2023-04-01T11:04:00Z'
  },
  
  // Requirements for Product Manager
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb10a1',
    title: '3+ years of product management experience',
    positionId: '550e8400-e29b-41d4-a716-446655440003',
    createdAt: '2023-03-25T10:16:00Z',
    updatedAt: '2023-03-25T10:16:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb10a2',
    title: 'Experience with agile methodologies',
    positionId: '550e8400-e29b-41d4-a716-446655440003',
    createdAt: '2023-03-25T10:17:00Z',
    updatedAt: '2023-03-25T10:17:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb10a3',
    title: 'Technical background preferred',
    positionId: '550e8400-e29b-41d4-a716-446655440003',
    createdAt: '2023-03-25T10:18:00Z',
    updatedAt: '2023-03-25T10:18:00Z'
  },
  
  // Requirements for Sales Representative
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb11a1',
    title: 'Previous sales experience',
    positionId: '550e8400-e29b-41d4-a716-446655440004',
    createdAt: '2023-04-03T08:46:00Z',
    updatedAt: '2023-04-03T08:46:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb11a2',
    title: 'Excellent communication skills',
    positionId: '550e8400-e29b-41d4-a716-446655440004',
    createdAt: '2023-04-03T08:47:00Z',
    updatedAt: '2023-04-03T08:47:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb11a3',
    title: 'Ability to meet sales targets',
    positionId: '550e8400-e29b-41d4-a716-446655440004',
    createdAt: '2023-04-03T08:48:00Z',
    updatedAt: '2023-04-03T08:48:00Z'
  },
  
  // Requirements for Backend Developer
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb12a1',
    title: 'Experience with Node.js and Express',
    positionId: '550e8400-e29b-41d4-a716-446655440005',
    createdAt: '2023-03-30T13:21:00Z',
    updatedAt: '2023-03-30T13:21:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb12a2',
    title: 'Knowledge of database systems (SQL and NoSQL)',
    positionId: '550e8400-e29b-41d4-a716-446655440005',
    createdAt: '2023-03-30T13:22:00Z',
    updatedAt: '2023-03-30T13:22:00Z'
  },
  {
    id: '4a0eebc6-9420-4c82-a378-1a0c52fb12a3',
    title: 'Experience with cloud services (AWS/Azure/GCP)',
    positionId: '550e8400-e29b-41d4-a716-446655440005',
    createdAt: '2023-03-30T13:23:00Z',
    updatedAt: '2023-03-30T13:23:00Z'
  }
];

// Requirements with position data included for display purposes
export const mockRequirementsWithPosition = mockRequirements.map(requirement => {
  const position = mockJobOfferings.find(job => job.id === requirement.positionId);
  return {
    ...requirement,
    position
  };
}); 