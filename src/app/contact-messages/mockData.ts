// Types that match the backend schema
export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  isRead?: boolean; // Additional field for UI purposes
}

// Priority categories with visual styling
export const subjectCategoryMap: Record<string, { color: string, icon: string, bg: string, lightColor: string }> = {
  'Support': { 
    color: 'primary',
    icon: '🛟',
    bg: 'bg-blue-50',
    lightColor: 'text-blue-600',
  },
  'Feedback': { 
    color: 'success',
    icon: '💬',
    bg: 'bg-emerald-50',
    lightColor: 'text-emerald-600',
  },
  'Partnership': { 
    color: 'secondary',
    icon: '🤝',
    bg: 'bg-purple-50',
    lightColor: 'text-purple-600', 
  },
  'Complaint': { 
    color: 'danger',
    icon: '⚠️',
    bg: 'bg-rose-50',
    lightColor: 'text-rose-600',
  },
  'General': { 
    color: 'warning',
    icon: '📝',
    bg: 'bg-amber-50',
    lightColor: 'text-amber-600',
  },
  'Other': { 
    color: 'default',
    icon: '❓',
    bg: 'bg-gray-50',
    lightColor: 'text-gray-600',
  },
};

// Helper function to get a random category
function getRandomCategory(): string {
  const categories = Object.keys(subjectCategoryMap);
  return categories[Math.floor(Math.random() * categories.length)];
}

// Helper function to generate a random date within the last 30 days
function getRandomDate(): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

// Helper function to generate a random boolean with bias towards true
function getRandomBoolean(trueBias: number = 0.7): boolean {
  return Math.random() < trueBias;
}

// Generate random mock data
export const generateMockContactMessages = (count: number = 20): ContactMessage[] => {
  const messages: ContactMessage[] = [];
  
  const firstNames = [
    'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 
    'Robert', 'Olivia', 'William', 'Sophia', 'Joseph', 'Isabella', 'Thomas', 'Mia',
    'Charles', 'Charlotte', 'Daniel', 'Amelia', 'Matthew', 'Harper', 'Anthony', 'Evelyn'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia',
    'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore',
    'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris'
  ];
  
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com', 'example.org', 'business.net'];
  
  const subjectPrefixes = [
    'Question about', 'Inquiry regarding', 'Information on', 'Help with', 'Problem with',
    'Feedback on', 'Suggestion for', 'Request for', 'Issue with', 'Interested in'
  ];
  
  const subjectTopics = [
    'your services', 'your products', 'pricing', 'technical support', 'customer service',
    'my account', 'the website', 'my order', 'my purchase', 'your company',
    'partnership opportunities', 'job opportunities', 'your latest release'
  ];
  
  const messageTemplates = [
    "I'm writing to inquire about ${topic}. Could you please provide more information?",
    "I recently came across ${topic} and I have a few questions that I'd like to discuss.",
    "I'm experiencing an issue with ${topic} and would appreciate your assistance in resolving it.",
    "I would like to provide some feedback regarding ${topic}. Overall, my experience has been positive, but there are some areas for improvement.",
    "I'm interested in learning more about ${topic}. Could you send me additional details?",
    "We are looking for potential partners in ${topic}. Would your company be interested in discussing a possible collaboration?",
    "I'm having trouble with ${topic} and need technical support. Here's what's happening...",
    "I wanted to express my appreciation for ${topic}. It has been extremely helpful for our team.",
    "I have a complaint regarding ${topic}. I've been trying to resolve this issue for several days now.",
    "I'm writing to request more information about ${topic} for a project I'm working on."
  ];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const emailDomain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;
    
    const subjectPrefix = subjectPrefixes[Math.floor(Math.random() * subjectPrefixes.length)];
    const subjectTopic = subjectTopics[Math.floor(Math.random() * subjectTopics.length)];
    const subject = `${subjectPrefix} ${subjectTopic}`;
    
    const messageTemplate = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    const message = messageTemplate.replace('${topic}', subjectTopic) + 
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.";
    
    const createdAt = getRandomDate();
    // Ensure updatedAt is same as or after createdAt
    const createdDate = new Date(createdAt);
    const minutesAfter = Math.floor(Math.random() * 60 * 24); // Random minutes within 24 hours
    const updatedDate = new Date(createdDate.getTime() + minutesAfter * 60 * 1000);
    const updatedAt = updatedDate.toISOString();
    
    messages.push({
      id: `msg-${i+1}-${Date.now().toString(36)}`,
      firstName,
      lastName,
      email,
      subject,
      message,
      createdAt,
      updatedAt,
      isRead: getRandomBoolean()
    });
  }
  
  // Sort by created date, newest first
  return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Generate the mock data
export const mockContactMessages = generateMockContactMessages(35); 