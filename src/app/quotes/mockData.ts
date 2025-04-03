import { v4 as uuid } from 'uuid';

// Status colors for the chip
export const statusColorMap: Record<string, { color: string, icon: string, bg: string, lightColor: string, gradient: string }> = {
  New: { 
    color: 'primary', 
    icon: '🔔', 
    bg: 'bg-blue-50',
    lightColor: 'text-blue-600',
    gradient: 'from-blue-50 to-blue-100'
  },
  Contacted: { 
    color: 'warning', 
    icon: '📞', 
    bg: 'bg-amber-50',
    lightColor: 'text-amber-600',
    gradient: 'from-amber-50 to-amber-100'
  },
  Quoted: { 
    color: 'success', 
    icon: '📝', 
    bg: 'bg-emerald-50',
    lightColor: 'text-emerald-600',
    gradient: 'from-emerald-50 to-emerald-100'
  },
  Closed: { 
    color: 'danger', 
    icon: '✓', 
    bg: 'bg-rose-50',
    lightColor: 'text-rose-600',
    gradient: 'from-rose-50 to-rose-100'
  },
};

export const productCategories = [
  'Industrial Machinery',
  'Construction Equipment',
  'Electrical Components',
  'HVAC Systems',
  'Safety Equipment',
  'Office Supplies',
  'IT Hardware',
  'Automotive Parts'
];

export const productTypes = {
  'Industrial Machinery': [
    'CNC Machines',
    'Conveyor Systems',
    'Hydraulic Presses',
    'Industrial Robots',
    'Packaging Machines'
  ],
  'Construction Equipment': [
    'Excavators',
    'Bulldozers',
    'Cranes',
    'Concrete Mixers',
    'Scaffolding'
  ],
  'Electrical Components': [
    'Circuit Breakers',
    'Transformers',
    'Switches',
    'Cables',
    'Connectors'
  ],
  'HVAC Systems': [
    'Air Conditioners',
    'Heaters',
    'Ventilation Units',
    'Duct Systems',
    'Control Panels'
  ],
  'Safety Equipment': [
    'Hard Hats',
    'Safety Glasses',
    'Gloves',
    'Fall Protection',
    'Fire Extinguishers'
  ],
  'Office Supplies': [
    'Printers',
    'Desks',
    'Chairs',
    'Filing Cabinets',
    'Stationery'
  ],
  'IT Hardware': [
    'Servers',
    'Workstations',
    'Networking Equipment',
    'Storage Devices',
    'Peripherals'
  ],
  'Automotive Parts': [
    'Engines',
    'Transmissions',
    'Brakes',
    'Suspension',
    'Electrical Systems'
  ]
};

export interface QuoteRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  productCategory: string;
  productType: string;
  description: string;
  isSeen: boolean;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Generate random dates within a reasonable range
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate a random phone number
const generatePhoneNumber = () => {
  const formats = [
    '+1 (###) ###-####',
    '(###) ###-####',
    '###-###-####',
    '+## ## #### ####',
    '+## ### ### ###'
  ];
  
  const format = formats[Math.floor(Math.random() * formats.length)];
  
  return format.replace(/#/g, () => Math.floor(Math.random() * 10).toString());
};

// Generate realistic descriptions
const descriptions = [
  "We're looking for a reliable supplier for our manufacturing needs. We need detailed specifications and competitive pricing for bulk orders.",
  "Our company is expanding and we need to equip our new facility. Please provide information on your product range and availability.",
  "We're interested in upgrading our current equipment. Could you provide details on your latest models and their advantages over our existing setup?",
  "We require immediate replacement parts for our production line. Please quote urgently with delivery timeframes.",
  "Our project requires custom specifications. Can you advise on feasibility and provide a quote for custom manufacturing?",
  "We're comparing suppliers for our annual contract renewal. Please provide your best pricing structure for long-term partnership.",
  "We're looking to implement new safety measures in our facility. Please provide information on relevant products and compliance standards.",
  "Our company is launching a new product line and we need equipment that can handle our specific requirements. Detailed technical specifications will be provided upon initial contact.",
  "We need a comprehensive solution for our office relocation. Please include installation services in your quote.",
  "We're seeking energy-efficient alternatives to our current equipment. ROI calculations would be appreciated alongside your quote."
];

// Create mock data
const createMockQuotes = (count: number): QuoteRequest[] => {
  const quotes: QuoteRequest[] = [];
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
  const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'Robert', 'Linda', 'David', 'Jennifer', 'William', 'Patricia', 'James', 'Elizabeth', 'Thomas', 'Maria', 'Charles', 'Susan'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
  const companies = ['Acme Corp', 'Globex Industries', 'Soylent Corp', 'Initech', 'Umbrella Corporation', 'Stark Industries', 'Wayne Enterprises', 'Cyberdyne Systems', 'Massive Dynamic', 'Oscorp Industries'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com', 'business.org', 'enterprise.net', 'industry.co', 'tech.io'];
  
  const statuses = ['New', 'Contacted', 'Quoted', 'Closed'];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s/g, '')}${domain.includes('company') ? '' : '.' + domain}`;
    
    const category = productCategories[Math.floor(Math.random() * productCategories.length)];
    const type = productTypes[category][Math.floor(Math.random() * productTypes[category].length)];
    
    const createdAt = getRandomDate(oneMonthAgo, now);
    const updatedAt = getRandomDate(createdAt, now);
    
    const isSeen = Math.random() > 0.3; // 30% chance of being unseen
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    quotes.push({
      id: uuid(),
      firstName,
      lastName,
      email,
      companyName: company,
      phoneNumber: generatePhoneNumber(),
      productCategory: category,
      productType: type,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      isSeen,
      status,
      createdAt,
      updatedAt
    });
  }
  
  return quotes;
};

export const mockQuotes = createMockQuotes(15); 