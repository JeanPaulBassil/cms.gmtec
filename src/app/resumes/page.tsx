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
  Divider,
  Badge,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Select,
  SelectItem,
  Link,
  Image
} from '@heroui/react';
import { 
  mockResumes, 
  statusColorMap, 
  departmentColorMap, 
  fileTypeMap, 
  getFileExtension, 
  formatFileSize,
  getRandomFileSize
} from './mockData';

export default function ResumesPage() {
  // State for resumes and UI
  const [resumes, setResumes] = useState(mockResumes);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const rowsPerPage = 8;

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Get list of unique departments for filter
  const departments = ['all', ...new Set(resumes
    .filter(resume => resume.application?.position?.department)
    .map(resume => resume.application?.position?.department as string))
  ];

  // Get list of unique statuses for filter
  const statuses = ['all', ...new Set(resumes
    .filter(resume => resume.application?.status)
    .map(resume => resume.application?.status as string))
  ];

  // Filter resumes based on search query, department filter, and status filter
  const filteredResumes = resumes.filter((resume) => {
    const fullName = `${resume.application?.firstName} ${resume.application?.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      (resume.application?.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (resume.application?.position?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    // Apply department filter
    const matchesDepartment = selectedDepartment === 'all' ? true : 
      resume.application?.position?.department === selectedDepartment;
    
    // Apply status filter
    const matchesStatus = selectedStatus === 'all' ? true : 
      resume.application?.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Sort filtered resumes
  const sortedResumes = [...filteredResumes].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'nameAZ':
        return `${a.application?.firstName} ${a.application?.lastName}`.localeCompare(
          `${b.application?.firstName} ${b.application?.lastName}`
        );
      case 'nameZA':
        return `${b.application?.firstName} ${b.application?.lastName}`.localeCompare(
          `${a.application?.firstName} ${a.application?.lastName}`
        );
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Calculate pagination
  const pages = Math.ceil(sortedResumes.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedResumes = sortedResumes.slice(start, end);
  
  // Open the resume detail modal
  const openResumeModal = (resume: any) => {
    setSelectedResume(resume);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setShowPdfPreview(false);
  };

  // File type displays
  const getFileTypeDisplay = (fileUrl: string) => {
    const extension = getFileExtension(fileUrl);
    const fileType = fileTypeMap[extension] || fileTypeMap.default;
    
    return (
      <div className="flex items-center">
        <span className={`mr-2 ${fileType.color}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={fileType.color}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="text-sm">{extension.toUpperCase()}</span>
      </div>
    );
  };

  // Stats for dashboard
  const totalResumes = resumes.length;
  const totalApplications = new Set(resumes.map(resume => resume.applicationId)).size;
  const departmentCounts = resumes.reduce((acc, resume) => {
    const dept = resume.application?.position?.department;
    if (dept) {
      acc[dept] = (acc[dept] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Sort departments by count for stats
  const topDepartments = Object.entries(departmentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className={`transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Applicant Resumes</h1>
            <p className="text-gray-500 text-sm">Manage and review job application resumes</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-blue-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '100ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Resumes</p>
                <h3 className="text-xl font-bold text-gray-800">{totalResumes}</h3>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-700">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-purple-50 to-purple-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Unique Applicants</p>
                <h3 className="text-xl font-bold text-gray-800">{totalApplications}</h3>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-700">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-emerald-50 to-emerald-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Top Department</p>
                {topDepartments.length > 0 ? (
                  <h3 className="text-xl font-bold text-gray-800">
                    {topDepartments[0][0]} <span className="text-sm font-medium">({topDepartments[0][1]})</span>
                  </h3>
                ) : (
                  <h3 className="text-xl font-bold text-gray-800">N/A</h3>
                )}
              </div>
              <div className="bg-emerald-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-700">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Filters and search */}
        <Card className={`shadow-lg border-none overflow-visible rounded-xl transition-all duration-500 ease-in-out transform mb-6 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '400ms'}}>
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <Input 
                  placeholder="Search by name, email, or position..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-full shadow-sm"
                  size="sm"
                  startContent={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                />
              </div>
              
              <div className="w-full md:w-40">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <Select
                  selectedKeys={[selectedDepartment]}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  size="sm"
                  className="w-full"
                >
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div className="w-full md:w-40">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select
                  selectedKeys={[selectedStatus]}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  size="sm"
                  className="w-full"
                >
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div className="w-full md:w-40">
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <Select
                  selectedKeys={[sortBy]}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="sm"
                  className="w-full"
                >
                  <SelectItem key="newest" value="newest">Newest First</SelectItem>
                  <SelectItem key="oldest" value="oldest">Oldest First</SelectItem>
                  <SelectItem key="nameAZ" value="nameAZ">Name (A-Z)</SelectItem>
                  <SelectItem key="nameZA" value="nameZA">Name (Z-A)</SelectItem>
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Resumes Table */}
        <Card className={`shadow-lg border-none overflow-visible rounded-xl transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '500ms'}}>
          <CardBody className="p-0">            
            <Table 
              aria-label="Resumes table"
              removeWrapper
              className="min-h-[400px]"
              classNames={{
                table: "min-h-[400px]",
                th: "bg-transparent text-default-600 border-b border-divider py-3 text-xs font-semibold",
                td: "py-3 px-2"
              }}
            >
              <TableHeader>
                <TableColumn>APPLICANT</TableColumn>
                <TableColumn>FILE</TableColumn>
                <TableColumn>POSITION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>UPLOADED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No resumes found">
                {paginatedResumes.map((resume, index) => (
                  <TableRow 
                    key={resume.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    onClick={() => openResumeModal(resume)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">
                            {resume.application?.firstName} {resume.application?.lastName}
                          </p>
                          <p className="text-default-500 text-xs">{resume.application?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getFileTypeDisplay(resume.fileUrl)}
                        <p className="text-xs text-gray-500 ml-2">{formatFileSize(getRandomFileSize())}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {resume.application?.position && (
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{resume.application.position.title}</p>
                          <div className="flex items-center mt-1">
                            {resume.application.position.department && (
                              <Chip 
                                size="sm"
                                variant="flat"
                                className={`${departmentColorMap[resume.application.position.department]?.bgColor || 'bg-gray-100'} border-none`}
                              >
                                <span className="flex items-center text-xs">
                                  <span className="mr-1">{departmentColorMap[resume.application.position.department]?.icon}</span>
                                  <span className={departmentColorMap[resume.application.position.department]?.textColor || 'text-gray-700'}>
                                    {resume.application.position.department}
                                  </span>
                                </span>
                              </Chip>
                            )}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {resume.application?.status && (
                        <Chip 
                          size="sm"
                          variant="flat"
                          className={`${statusColorMap[resume.application.status]?.bgColor || 'bg-gray-100'} border-none`}
                        >
                          <span className={`text-xs ${statusColorMap[resume.application.status]?.textColor || 'text-gray-700'}`}>
                            {resume.application.status.charAt(0).toUpperCase() + resume.application.status.slice(1)}
                          </span>
                        </Chip>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="text-sm">{new Date(resume.createdAt).toLocaleDateString()}</p>
                        <p className="text-default-500 text-xs">{new Date(resume.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 opacity-70 hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <Tooltip content="Download Resume">
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="primary"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                            as={Link}
                            href={resume.fileUrl}
                            target="_blank"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </Tooltip>
                        <Tooltip content="View Details">
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="secondary"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                            onPress={() => openResumeModal(resume)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </Tooltip>
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
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(end, filteredResumes.length)}</span> of <span className="font-medium">{filteredResumes.length}</span> resumes
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
      </div>

      {/* Resume Detail Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={closeModal}
        className="bg-white rounded-lg"
        size="3xl"
        scrollBehavior="inside"
      >
        {selectedResume && (
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Resume Details
                  </h3>
                  <p className="text-sm text-gray-500">
                    Application ID: {selectedResume.applicationId}
                  </p>
                </div>
                {selectedResume.application?.status && (
                  <Chip 
                    variant="flat"
                    className={`${statusColorMap[selectedResume.application.status]?.bgColor || 'bg-gray-100'} border-none`}
                  >
                    <span className={`text-xs font-medium ${statusColorMap[selectedResume.application.status]?.textColor || 'text-gray-700'}`}>
                      {selectedResume.application.status.charAt(0).toUpperCase() + selectedResume.application.status.slice(1)}
                    </span>
                  </Chip>
                )}
              </div>
              
              <div className="flex items-center mt-2">
                <div>
                  <p className="text-lg font-semibold">{selectedResume.application?.firstName} {selectedResume.application?.lastName}</p>
                  <div className="flex items-center mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500 mr-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-sm text-gray-500">{selectedResume.application?.phoneNumber}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500 mr-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-sm text-gray-500">{selectedResume.application?.email}</p>
                  </div>
                </div>
              </div>
            </ModalHeader>
            
            <Divider />
            
            <ModalBody>
              <div className="py-2">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h4 className="text-md font-semibold mb-3">Application Details</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Position</p>
                        <p className="text-sm font-semibold">{selectedResume.application?.position?.title}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Department</p>
                        <div className="flex items-center">
                          {selectedResume.application?.position?.department && (
                            <Chip 
                              size="sm"
                              variant="flat"
                              className={`${departmentColorMap[selectedResume.application.position.department]?.bgColor || 'bg-gray-100'} border-none mt-1`}
                            >
                              <span className="flex items-center text-xs">
                                <span className="mr-1">{departmentColorMap[selectedResume.application.position.department]?.icon}</span>
                                <span className={departmentColorMap[selectedResume.application.position.department]?.textColor || 'text-gray-700'}>
                                  {selectedResume.application.position.department}
                                </span>
                              </span>
                            </Chip>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Applied On</p>
                        <p className="text-sm">
                          {selectedResume.application?.appliedAt ? new Date(selectedResume.application.appliedAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Resume Uploaded</p>
                        <p className="text-sm">
                          {new Date(selectedResume.createdAt).toLocaleDateString()} at {' '}
                          {new Date(selectedResume.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Last Updated</p>
                        <p className="text-sm">
                          {new Date(selectedResume.updatedAt).toLocaleDateString()} at {' '}
                          {new Date(selectedResume.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-md font-semibold mb-3">Resume Preview</h4>
                    
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 p-3 flex items-center justify-between border-b border-gray-200">
                        <div className="flex items-center">
                          {getFileTypeDisplay(selectedResume.fileUrl)}
                          <span className="ml-2 text-sm font-medium">
                            {selectedResume.fileUrl.split('/').pop()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatFileSize(getRandomFileSize())}
                        </div>
                      </div>
                      
                      {getFileExtension(selectedResume.fileUrl) === 'pdf' ? (
                        <div className="h-80 bg-gray-100 flex items-center justify-center">
                          {showPdfPreview ? (
                            <div className="w-full h-full p-4">
                              <img 
                                src="/sample-resume-preview.png" 
                                alt="Resume Preview" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="text-center p-6">
                              <div className="text-red-600 mb-3">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <h5 className="font-medium text-gray-700 mb-2">PDF Preview</h5>
                              <p className="text-sm text-gray-500 mb-4">Click below to preview this PDF document</p>
                              <Button
                                color="primary"
                                variant="flat"
                                onPress={() => setShowPdfPreview(true)}
                                size="sm"
                              >
                                Load Preview
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-80 bg-gray-100 flex items-center justify-center p-6 text-center">
                          <div>
                            <div className="text-blue-600 mb-3">
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <h5 className="font-medium text-gray-700 mb-2">Document Preview</h5>
                            <p className="text-sm text-gray-500 mb-4">
                              Preview not available for {getFileExtension(selectedResume.fileUrl).toUpperCase()} files.
                              Please download to view.
                            </p>
                            <Button
                              as={Link}
                              href={selectedResume.fileUrl}
                              target="_blank"
                              color="primary"
                              variant="flat"
                              size="sm"
                            >
                              Download File
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <div className="flex justify-between w-full">
                <div>
                  <Button 
                    color="danger" 
                    variant="flat" 
                    className="font-medium"
                    startContent={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                  >
                    Delete
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    color="default" 
                    variant="flat" 
                    onPress={closeModal}
                    className="font-medium"
                  >
                    Close
                  </Button>
                  <Button 
                    as={Link}
                    href={selectedResume.fileUrl}
                    target="_blank"
                    color="primary"
                    className="shadow-sm font-medium"
                    startContent={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
} 