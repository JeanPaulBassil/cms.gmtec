// Types that match the backend schema
export interface Resume {
  id: string;
  applicationId: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  application?: Application; // Populate the relation for UI display
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  position?: {
    id: string;
    title: string;
    department: string;
  };
  status?: string;
  appliedAt?: string;
}

// Status colors for visual display
export const statusColorMap: Record<string, { color: string, bgColor: string, textColor: string }> = {
  'pending': {
    color: 'warning',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-800',
  },
  'reviewing': {
    color: 'primary',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
  },
  'interview': {
    color: 'secondary',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
  },
  'offered': {
    color: 'success',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-800',
  },
  'rejected': {
    color: 'danger',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-800',
  },
  'hired': {
    color: 'success',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
  },
};

// Department colors for visual display
export const departmentColorMap: Record<string, { color: string, bgColor: string, textColor: string, icon: string }> = {
  'Engineering': {
    color: 'primary',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    icon: '💻',
  },
  'Design': {
    color: 'secondary',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    icon: '🎨',
  },
  'Marketing': {
    color: 'success',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    icon: '📣',
  },
  'Sales': {
    color: 'warning',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-800',
    icon: '💼',
  },
  'Finance': {
    color: 'danger',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-800',
    icon: '💰',
  },
  'Human Resources': {
    color: 'default',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-800',
    icon: '👥',
  },
  'Customer Support': {
    color: 'warning',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    icon: '🤝',
  },
};

// File type icons and colors
export const fileTypeMap: Record<string, { icon: string, color: string }> = {
  'pdf': {
    icon: 'solar:file-pdf-linear',
    color: 'text-red-600',
  },
  'doc': {
    icon: 'solar:file-text-linear',
    color: 'text-blue-600',
  },
  'docx': {
    icon: 'solar:file-text-linear',
    color: 'text-blue-600',
  },
  'txt': {
    icon: 'solar:file-text-linear',
    color: 'text-gray-600',
  },
  'default': {
    icon: 'solar:file-linear',
    color: 'text-gray-600',
  },
};

// Helper function to generate a random date within the last 90 days
function getRandomDate(): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 90);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

// Generate mock applications
const generateMockApplications = (count: number = 30): Application[] => {
  const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Susan', 'Richard', 'Jessica', 'Joseph', 'Sarah',
    'Thomas', 'Karen', 'Charles', 'Nancy', 'Christopher', 'Lisa', 'Daniel', 'Margaret',
    'Matthew', 'Betty', 'Anthony', 'Sandra', 'Mark', 'Ashley'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson',
    'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
    'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee',
    'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King'
  ];

  const positions = [
    { id: 'pos-1', title: 'Frontend Developer', department: 'Engineering' },
    { id: 'pos-2', title: 'Backend Developer', department: 'Engineering' },
    { id: 'pos-3', title: 'Full Stack Developer', department: 'Engineering' },
    { id: 'pos-4', title: 'UX Designer', department: 'Design' },
    { id: 'pos-5', title: 'UI Designer', department: 'Design' },
    { id: 'pos-6', title: 'Marketing Manager', department: 'Marketing' },
    { id: 'pos-7', title: 'Sales Representative', department: 'Sales' },
    { id: 'pos-8', title: 'Financial Analyst', department: 'Finance' },
    { id: 'pos-9', title: 'HR Manager', department: 'Human Resources' },
    { id: 'pos-10', title: 'Customer Support Specialist', department: 'Customer Support' },
  ];

  const statuses = ['pending', 'reviewing', 'interview', 'offered', 'rejected', 'hired'];

  const applications: Application[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const phoneNumber = `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const position = positions[Math.floor(Math.random() * positions.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const appliedAt = getRandomDate();

    applications.push({
      id: `app-${i + 1}`,
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      status,
      appliedAt,
    });
  }

  return applications;
};

// Generate mock applications
const mockApplications = generateMockApplications(30);

// Generate mock resumes based on applications
export const generateMockResumes = (applications: Application[]): Resume[] => {
  const fileTypes = ['pdf', 'doc', 'docx'];
  const baseFileNames = [
    'Resume', 'CV', 'Professional_Resume', 'Career_History',
    'Job_Application', 'Professional_CV', 'Work_History',
  ];

  return applications.map((application, index) => {
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const baseName = baseFileNames[Math.floor(Math.random() * baseFileNames.length)];
    const fileName = `${application.firstName}_${application.lastName}_${baseName}.${fileType}`;
    const fileUrl = `/resumes/${fileName.replace(/\s+/g, '_')}`;
    const createdAt = application.appliedAt || getRandomDate();
    
    // Create an updated date that's after the created date
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(createdDate.getTime() + Math.floor(Math.random() * 48) * 60 * 60 * 1000);
    
    return {
      id: `resume-${index + 1}`,
      applicationId: application.id,
      fileUrl,
      createdAt,
      updatedAt: updatedDate.toISOString(),
      application,
    };
  });
};

// Generate mock resumes
export const mockResumes = generateMockResumes(mockApplications);

// Helper function to get file extension from URL
export const getFileExtension = (fileUrl: string): string => {
  const parts = fileUrl.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return 'default';
};

// Helper function to format file size
export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};

// Helper to generate random file sizes for mock data
export const getRandomFileSize = (): number => {
  // Random size between 100KB and 5MB
  return Math.floor(Math.random() * (5 * 1024 * 1024 - 100 * 1024) + 100 * 1024);
}; 