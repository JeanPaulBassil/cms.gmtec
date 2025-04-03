'use client';

import React, { useState, useEffect } from 'react';
import {
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Card, 
  CardBody,
  Button,
  Chip,
  Pagination,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Divider,
  Tab,
  Tabs,
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from '@heroui/react';

// Mock data for applications
const mockApplications = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    currentLocation: 'New York, NY',
    yearsOfExperience: 5,
    highestEducation: 'Master\'s Degree',
    coverLetter: 'I am excited to apply for the Software Engineer position...',
    positionId: 'job-001',
    position: {
      id: 'job-001',
      title: 'Software Engineer',
      department: 'Engineering'
    },
    isSeen: true,
    createdAt: '2023-04-01T10:30:00Z',
    updatedAt: '2023-04-02T14:25:00Z',
    status: 'Pending',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+1 (555) 234-5678',
    currentLocation: 'San Francisco, CA',
    yearsOfExperience: 7,
    highestEducation: 'Bachelor\'s Degree',
    coverLetter: 'With my extensive experience in product management...',
    positionId: 'job-002',
    position: {
      id: 'job-002',
      title: 'Product Manager',
      department: 'Product'
    },
    isSeen: true,
    createdAt: '2023-03-28T09:15:00Z',
    updatedAt: '2023-03-29T11:45:00Z',
    status: 'Reviewed',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    phoneNumber: '+1 (555) 345-6789',
    currentLocation: 'Austin, TX',
    yearsOfExperience: 4,
    highestEducation: 'Bachelor\'s Degree',
    coverLetter: 'As a passionate UX designer with 4 years of experience...',
    positionId: 'job-003',
    position: {
      id: 'job-003',
      title: 'UX Designer',
      department: 'Design'
    },
    isSeen: true,
    createdAt: '2023-03-25T14:20:00Z',
    updatedAt: '2023-03-26T10:35:00Z',
    status: 'Approved',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    phoneNumber: '+1 (555) 456-7890',
    currentLocation: 'Chicago, IL',
    yearsOfExperience: 3,
    highestEducation: 'Bachelor\'s Degree',
    coverLetter: 'I believe my background in marketing would be perfect for...',
    positionId: 'job-004',
    position: {
      id: 'job-004',
      title: 'Marketing Specialist',
      department: 'Marketing'
    },
    isSeen: true,
    createdAt: '2023-03-22T11:10:00Z',
    updatedAt: '2023-03-23T13:40:00Z',
    status: 'Rejected',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    phoneNumber: '+1 (555) 567-8901',
    currentLocation: 'Seattle, WA',
    yearsOfExperience: 2,
    highestEducation: 'Master\'s Degree',
    coverLetter: 'Having recently completed my Master\'s in Data Science...',
    positionId: 'job-005',
    position: {
      id: 'job-005',
      title: 'Data Analyst',
      department: 'Analytics'
    },
    isSeen: false,
    createdAt: '2023-03-20T08:45:00Z',
    updatedAt: '2023-03-20T08:45:00Z',
    status: 'Pending',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    firstName: 'Emily',
    lastName: 'Roberts',
    email: 'emily.roberts@example.com',
    phoneNumber: '+1 (555) 678-9012',
    currentLocation: 'Boston, MA',
    yearsOfExperience: 4,
    highestEducation: 'Bachelor\'s Degree',
    coverLetter: 'I have been following your company\'s work and would love...',
    positionId: 'job-001',
    position: {
      id: 'job-001',
      title: 'Frontend Developer',
      department: 'Engineering'
    },
    isSeen: false,
    createdAt: '2023-03-19T15:30:00Z',
    updatedAt: '2023-03-19T15:30:00Z',
    status: 'Reviewed',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    firstName: 'Alex',
    lastName: 'Taylor',
    email: 'alex.taylor@example.com',
    phoneNumber: '+1 (555) 789-0123',
    currentLocation: 'Denver, CO',
    yearsOfExperience: 6,
    highestEducation: 'Ph.D.',
    coverLetter: 'With my strong backend development experience...',
    positionId: 'job-001',
    position: {
      id: 'job-001',
      title: 'Backend Developer',
      department: 'Engineering'
    },
    isSeen: true,
    createdAt: '2023-03-18T10:20:00Z',
    updatedAt: '2023-03-19T09:15:00Z',
    status: 'Approved',
  },
];

// Status colors for the chip
const statusColorMap: Record<string, { color: string, icon: string, bg: string, lightColor: string, gradient: string }> = {
  Pending: { 
    color: 'warning', 
    icon: '⏳', 
    bg: 'bg-amber-50',
    lightColor: 'text-amber-600',
    gradient: 'from-amber-50 to-amber-100'
  },
  Reviewed: { 
    color: 'primary', 
    icon: '🔍', 
    bg: 'bg-blue-50',
    lightColor: 'text-blue-600',
    gradient: 'from-blue-50 to-blue-100'
  },
  Approved: { 
    color: 'success', 
    icon: '✅', 
    bg: 'bg-emerald-50',
    lightColor: 'text-emerald-600',
    gradient: 'from-emerald-50 to-emerald-100'
  },
  Rejected: { 
    color: 'danger', 
    icon: '❌', 
    bg: 'bg-rose-50',
    lightColor: 'text-rose-600',
    gradient: 'from-rose-50 to-rose-100'
  },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const rowsPerPage = 5;

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Filter applications based on search query and tab selection
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      selectedFilter === 'all' ? true : 
      selectedFilter === 'unseen' ? !app.isSeen :
      app.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesTab;
  });

  // Calculate pagination
  const pages = Math.ceil(filteredApplications.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedApplications = filteredApplications.slice(start, end);

  // Handle status change
  const handleStatusChange = (id: string, newStatus: string) => {
    setApplications(
      applications.map((app) => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // Get counts for status badges
  const getStatusCount = (status: string) => {
    return applications.filter(app => 
      status === 'all' ? true : app.status.toLowerCase() === status.toLowerCase()
    ).length;
  };

  // Handle row click to view application details
  const handleRowClick = (app: any) => {
    // Mark application as seen if it wasn't already
    if (!app.isSeen) {
      setApplications(
        applications.map((a) => 
          a.id === app.id ? { ...a, isSeen: true } : a
        )
      );
    }
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  // Toggle unseen filter
  const toggleUnseenFilter = () => {
    setSelectedFilter(selectedFilter === 'unseen' ? 'all' : 'unseen');
  };

  // Close detail modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className={`transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Applications</h1>
            <p className="text-gray-500 text-sm">Manage and track candidate applications</p>
          </div>
          <Button 
            color="primary" 
            size="md"
            className="font-medium shadow-sm hover:shadow transition-all duration-200"
            startContent={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            New Application
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-slate-50 to-slate-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '100ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Total</p>
                <h3 className="text-xl font-bold text-gray-800">{applications.length}</h3>
              </div>
              <div className="bg-slate-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-700">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br ${statusColorMap.Pending.gradient} ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Pending</p>
                <h3 className="text-xl font-bold text-gray-800">{getStatusCount('pending')}</h3>
              </div>
              <div className="bg-amber-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-700">
                  <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br ${statusColorMap.Approved.gradient} ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Approved</p>
                <h3 className="text-xl font-bold text-gray-800">{getStatusCount('approved')}</h3>
              </div>
              <div className="bg-emerald-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-700">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br ${statusColorMap.Rejected.gradient} ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '400ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Rejected</p>
                <h3 className="text-xl font-bold text-gray-800">{getStatusCount('rejected')}</h3>
              </div>
              <div className="bg-rose-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-700">
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <Card className={`shadow-lg border-none overflow-visible rounded-xl transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '500ms'}}>
          <CardBody className="p-0">
            <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center p-4 gap-2">
              <Tabs 
                selectedKey={selectedFilter} 
                onSelectionChange={setSelectedFilter as any}
                color="primary"
                variant="underlined"
                size="sm"
                className="mb-0"
              >
                <Tab 
                  key="all" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>All</span>
                      <Badge color="default" variant="flat" size="sm">{getStatusCount('all')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="pending" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Pending</span>
                      <Badge color="warning" variant="flat" size="sm">{getStatusCount('pending')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="reviewed" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Reviewed</span>
                      <Badge color="primary" variant="flat" size="sm">{getStatusCount('reviewed')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="approved" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Approved</span>
                      <Badge color="success" variant="flat" size="sm">{getStatusCount('approved')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="rejected" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Rejected</span>
                      <Badge color="danger" variant="flat" size="sm">{getStatusCount('rejected')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="unseen" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Unseen</span>
                      <Badge color="danger" variant="flat" size="sm">{applications.filter(app => !app.isSeen).length}</Badge>
                    </div>
                  }
                />
              </Tabs>
              
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search applications..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 h-9 text-sm shadow-sm"
                  size="sm"
                  startContent={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                />
              </div>
            </div>
            
            <Divider/>
            
            <Table 
              aria-label="Applications table"
              removeWrapper
              selectionMode="single"
              classNames={{
                table: "min-h-[300px]",
                th: "bg-transparent text-default-600 border-b border-divider py-3 text-xs font-semibold",
                td: "py-3 px-2"
              }}
              onRowAction={(key) => {
                const app = applications.find(app => app.id === key);
                if (app) handleRowClick(app);
              }}
            >
              <TableHeader>
                <TableColumn>APPLICANT</TableColumn>
                <TableColumn>POSITION</TableColumn>
                <TableColumn>LOCATION</TableColumn>
                <TableColumn>EXPERIENCE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>APPLIED ON</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No applications found">
                {paginatedApplications.map((app, index) => (
                  <TableRow 
                    key={app.id} 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${!app.isSeen ? 'bg-blue-50' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">{`${app.firstName} ${app.lastName}`}</p>
                          <p className="text-default-500 text-xs">{app.email}</p>
                          {!app.isSeen && (
                            <span className="inline-block bg-red-500 rounded-full w-2 h-2 mr-1"></span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{app.position.title}</p>
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                          <p className="text-default-500 text-xs">{app.position.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-sm">{app.currentLocation}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-sm">{app.yearsOfExperience} years</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 12v5c0 2 1 3 6 3s6-1 6-3v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-default-500 text-xs">{app.highestEducation}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tooltip content={`Current status: ${app.status}`}>
                        <Chip 
                          color={statusColorMap[app.status].color as any}
                          variant="dot"
                          size="sm"
                          className={`${statusColorMap[app.status].bg} text-xs px-2 py-1 h-auto border-none`}
                        >
                          <span className={`font-medium ${statusColorMap[app.status].lightColor}`}>{app.status}</span>
                        </Chip>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-sm">{new Date(app.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className="text-default-500 text-xs ml-5">{new Date(app.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 opacity-70 hover:opacity-100 transition-opacity">
                        <Tooltip content="View Details">
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="primary"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                            onClick={() => handleRowClick(app)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </Tooltip>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button 
                              size="sm" 
                              variant="light"
                              isIconOnly
                              className="w-7 h-7 min-w-0"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Status actions">
                            <DropdownItem 
                              key="view"
                              description="View details"
                              className="text-xs"
                              startContent={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              }
                            >
                              View Details
                            </DropdownItem>
                            <DropdownItem 
                              key="status"
                              description="Update status"
                              className="text-xs"
                              startContent={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M17.5 3.5C17.8978 3.10217 18.4374 2.87868 19 2.87868C19.5626 2.87868 20.1022 3.10217 20.5 3.5C20.8978 3.89782 21.1213 4.43739 21.1213 5C21.1213 5.56261 20.8978 6.10217 20.5 6.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              }
                            >
                              <Dropdown>
                                <DropdownTrigger className="w-full h-full cursor-pointer">
                                  <div className="text-xs">Change Status</div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Status options">
                                  <DropdownItem 
                                    key="pending"
                                    onClick={() => handleStatusChange(app.id, 'Pending')}
                                    startContent={<span className="mr-1 text-amber-500">{statusColorMap.Pending.icon}</span>}
                                    className="text-xs"
                                  >
                                    Pending
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="reviewed"
                                    onClick={() => handleStatusChange(app.id, 'Reviewed')}
                                    startContent={<span className="mr-1 text-blue-500">{statusColorMap.Reviewed.icon}</span>}
                                    className="text-xs"
                                  >
                                    Reviewed
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="approved"
                                    onClick={() => handleStatusChange(app.id, 'Approved')}
                                    startContent={<span className="mr-1 text-emerald-500">{statusColorMap.Approved.icon}</span>}
                                    className="text-xs"
                                  >
                                    Approved
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="rejected"
                                    onClick={() => handleStatusChange(app.id, 'Rejected')}
                                    startContent={<span className="mr-1 text-rose-500">{statusColorMap.Rejected.icon}</span>}
                                    className="text-xs"
                                  >
                                    Rejected
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            {pages > 0 && (
              <div className="flex justify-between items-center py-3 px-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(end, filteredApplications.length)}</span> of <span className="font-medium">{filteredApplications.length}</span> applications
                </p>
                <Pagination
                  total={pages}
                  page={page}
                  onChange={setPage}
                  showControls
                  size="sm"
                  color="primary"
                  className="rounded-lg shadow-sm"
                  classNames={{
                    cursor: "shadow-md bg-primary",
                    item: "bg-transparent",
                    prev: "bg-transparent hover:bg-gray-100",
                    next: "bg-transparent hover:bg-gray-100",
                  }}
                />
              </div>
            )}
          </CardBody>
        </Card>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal}
            size="4xl"
            scrollBehavior="inside"
            classNames={{
              base: "bg-white dark:bg-gray-900 p-0 rounded-lg shadow-2xl border-none",
              header: "border-b border-gray-100 bg-gray-50/70",
              footer: "border-t border-gray-100 bg-gray-50/70",
              closeButton: "hover:bg-gray-200/50 active:bg-gray-200/80 rounded-full"
            }}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn"
                  }
                }
              }
            }}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center">
                  <h3 className="text-xl font-bold text-gray-800">Application Details</h3>
                  <Chip 
                    color={statusColorMap[selectedApplication.status].color as any}
                    variant="dot"
                    size="sm"
                    className={`${statusColorMap[selectedApplication.status].bg} ml-3 text-xs px-2 h-auto border-none`}
                  >
                    <span className={`font-medium ${statusColorMap[selectedApplication.status].lightColor}`}>{selectedApplication.status}</span>
                  </Chip>
                </div>
                <p className="text-sm text-default-500">
                  Applied for <span className="font-medium">{selectedApplication.position.title}</span> on {new Date(selectedApplication.createdAt).toLocaleDateString()}
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Applicant Information */}
                  <div className="md:col-span-1 space-y-4">
                    <Card className="shadow-sm border-none overflow-visible bg-gray-50/50">
                      <CardBody className="p-4">
                        <div className="flex flex-col items-center">
                          <div className="mb-3">
                            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-full w-24 h-24 flex items-center justify-center shadow-md">
                              <span className="text-primary-600 font-bold text-3xl">
                                {`${selectedApplication.firstName.charAt(0)}${selectedApplication.lastName.charAt(0)}`}
                              </span>
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold">{`${selectedApplication.firstName} ${selectedApplication.lastName}`}</h4>
                          <div className="flex items-center gap-1.5 mt-1 text-primary-500">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-sm font-medium">{selectedApplication.phoneNumber}</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-primary-500">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-sm">{selectedApplication.email}</p>
                          </div>
                        </div>
                        
                        <Divider className="my-4" />
                        
                        <div>
                          <h5 className="text-sm font-semibold mb-3 text-gray-800">Application Details</h5>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-md bg-gray-100">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-500">
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-default-500">Location</p>
                                <p className="text-sm font-medium">{selectedApplication.currentLocation}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-md bg-gray-100">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-500">
                                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-default-500">Experience</p>
                                <p className="text-sm font-medium">{selectedApplication.yearsOfExperience} years</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-md bg-gray-100">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-500">
                                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M6 12v5c0 2 1 3 6 3s6-1 6-3v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-default-500">Education</p>
                                <p className="text-sm font-medium">{selectedApplication.highestEducation}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-md bg-gray-100">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-500">
                                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-default-500">Applied On</p>
                                <p className="text-sm font-medium">
                                  {new Date(selectedApplication.createdAt).toLocaleDateString()} at {' '}
                                  {new Date(selectedApplication.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-md bg-gray-100">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-500">
                                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-default-500">Last Updated</p>
                                <p className="text-sm font-medium">
                                  {new Date(selectedApplication.updatedAt).toLocaleDateString()} at {' '}
                                  {new Date(selectedApplication.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  
                  {/* Cover Letter and Resume */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-gray-800 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5 text-primary-500">
                          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Position Information
                      </h5>
                      <Card className="shadow-sm border-none">
                        <CardBody className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-md bg-primary-50 text-primary-500">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div>
                              <h6 className="text-base font-semibold text-gray-800">{selectedApplication.position.title}</h6>
                              <div className="flex items-center gap-2 mt-1">
                                <Chip size="sm" variant="flat" color="primary" className="px-2 h-auto">
                                  {selectedApplication.position.department}
                                </Chip>
                                <p className="text-xs text-default-500">ID: {selectedApplication.positionId}</p>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-gray-800 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5 text-primary-500">
                          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Cover Letter
                      </h5>
                      <Card className="shadow-sm border-none hover:shadow-md transition-shadow duration-200">
                        <CardBody className="p-4">
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-sm whitespace-pre-line leading-relaxed">{selectedApplication.coverLetter}</p>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-gray-800 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5 text-primary-500">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Resume
                      </h5>
                      <Card className="shadow-sm border-none hover:shadow-md transition-all duration-200">
                        <CardBody className="p-0">
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col items-center justify-center rounded-lg">
                            <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-16 h-20 flex items-center justify-center">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-400">
                                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <p className="text-sm font-medium mb-2">Resume.pdf</p>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                color="primary" 
                                variant="flat"
                                endContent={
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                }
                                className="shadow-sm hover:shadow-md transition-all duration-200"
                              >
                                Download
                              </Button>
                              <Button 
                                size="sm" 
                                color="default" 
                                variant="bordered"
                                endContent={
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                }
                                className="shadow-sm hover:shadow-md transition-all duration-200"
                              >
                                Preview
                              </Button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-between w-full">
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button 
                          color="primary" 
                          variant="flat"
                          className="shadow-sm hover:shadow transition-all duration-200"
                          startContent={
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M7.5 12L10.5 15L16.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          }
                        >
                          Change Status
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Change application status" variant="flat">
                        <DropdownItem 
                          key="pending"
                          startContent={<span className="mr-1 text-amber-500">{statusColorMap.Pending.icon}</span>}
                          onClick={() => handleStatusChange(selectedApplication.id, 'Pending')}
                        >
                          Pending
                        </DropdownItem>
                        <DropdownItem 
                          key="reviewed"
                          startContent={<span className="mr-1 text-blue-500">{statusColorMap.Reviewed.icon}</span>}
                          onClick={() => handleStatusChange(selectedApplication.id, 'Reviewed')}
                        >
                          Reviewed
                        </DropdownItem>
                        <DropdownItem 
                          key="approved"
                          startContent={<span className="mr-1 text-emerald-500">{statusColorMap.Approved.icon}</span>}
                          onClick={() => handleStatusChange(selectedApplication.id, 'Approved')}
                        >
                          Approved
                        </DropdownItem>
                        <DropdownItem 
                          key="rejected"
                          startContent={<span className="mr-1 text-rose-500">{statusColorMap.Rejected.icon}</span>}
                          onClick={() => handleStatusChange(selectedApplication.id, 'Rejected')}
                        >
                          Rejected
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      color="danger" 
                      variant="flat"
                      className="shadow-sm hover:shadow transition-all duration-200"
                      startContent={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    >
                      Reject
                    </Button>
                    <Button 
                      color="primary" 
                      className="shadow-sm hover:shadow transition-all duration-200"
                      onPress={closeModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
} 