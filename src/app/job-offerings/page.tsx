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
  Tab,
  Tabs,
  Badge,
  Tooltip
} from '@heroui/react';
import { mockJobOfferings, JobOffering, departmentColorMap, positionTypeColorMap } from './mockData';

export default function JobOfferingsPage() {
  const [jobOfferings, setJobOfferings] = useState(mockJobOfferings);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  const rowsPerPage = 5;

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Filter job offerings based on search query and filters
  const filteredJobOfferings = jobOfferings.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.positionType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' ? true : job.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Calculate pagination
  const pages = Math.ceil(filteredJobOfferings.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedJobOfferings = filteredJobOfferings.slice(start, end);
  
  // Get the total number of applications for a job
  const getApplicationCount = (job: JobOffering) => {
    return job.applications.length;
  };
  
  // Get the number of unseen applications for a job
  const getUnseenApplicationCount = (job: JobOffering) => {
    return job.applications.filter(app => !app.isSeen).length;
  };
  
  // Get all unique departments in the job offerings
  const departments = ['all', ...Array.from(new Set(jobOfferings.map(job => job.department)))];

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className={`transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Job Offerings</h1>
            <p className="text-gray-500 text-sm">Manage and track job positions and applications</p>
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
            New Job Offering
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-slate-50 to-slate-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '100ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Jobs</p>
                <h3 className="text-xl font-bold text-gray-800">{jobOfferings.length}</h3>
              </div>
              <div className="bg-slate-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-700">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-blue-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Applications</p>
                <h3 className="text-xl font-bold text-gray-800">{jobOfferings.reduce((acc, job) => acc + job.applications.length, 0)}</h3>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-700">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-amber-50 to-amber-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Departments</p>
                <h3 className="text-xl font-bold text-gray-800">{new Set(jobOfferings.map(job => job.department)).size}</h3>
              </div>
              <div className="bg-amber-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-700">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-emerald-50 to-emerald-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '400ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Countries</p>
                <h3 className="text-xl font-bold text-gray-800">{new Set(jobOfferings.map(job => job.countryName)).size}</h3>
              </div>
              <div className="bg-emerald-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-700">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main content card with table */}
        <Card className={`shadow-lg border-none overflow-visible rounded-xl transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '500ms'}}>
          <CardBody className="p-0">
            <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center p-4 gap-2">
              <Tabs 
                selectedKey={selectedDepartment} 
                onSelectionChange={setSelectedDepartment as any}
                color="primary"
                variant="underlined"
                size="sm"
                className="mb-0 overflow-x-auto"
              >
                {departments.map(dept => (
                  <Tab 
                    key={dept} 
                    title={
                      <div className="flex items-center gap-1 text-xs font-medium whitespace-nowrap">
                        <span>{dept === 'all' ? 'All Departments' : dept}</span>
                        <Badge color={dept !== 'all' && departmentColorMap[dept] ? departmentColorMap[dept].color as any : 'default'} variant="flat" size="sm">
                          {jobOfferings.filter(job => dept === 'all' ? true : job.department === dept).length}
                        </Badge>
                      </div>
                    }
                  />
                ))}
              </Tabs>
              
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search jobs..." 
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
              aria-label="Job Offerings table"
              removeWrapper
              selectionMode="single"
              classNames={{
                table: "min-h-[300px]",
                th: "bg-transparent text-default-600 border-b border-divider py-3 text-xs font-semibold",
                td: "py-3 px-2"
              }}
            >
              <TableHeader>
                <TableColumn>POSITION</TableColumn>
                <TableColumn>DEPARTMENT</TableColumn>
                <TableColumn>LOCATION</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>APPLICATIONS</TableColumn>
                <TableColumn>POSTED ON</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No job offerings found">
                {paginatedJobOfferings.map((job, index) => (
                  <TableRow 
                    key={job.id} 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{job.title}</p>
                        <p className="text-default-500 text-xs">{job.requirements.length} requirements</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        variant="dot"
                        color={departmentColorMap[job.department]?.color as any || 'default'}
                        size="sm"
                        className={`${departmentColorMap[job.department]?.bg || 'bg-gray-100'} border-none`}
                      >
                        <span className={`text-xs font-medium ${departmentColorMap[job.department]?.lightColor || 'text-gray-600'}`}>
                          {job.department}
                        </span>
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-sm">{job.cityName}, {job.countryName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        variant="flat"
                        color={positionTypeColorMap[job.positionType]?.color as any || 'default'}
                        size="sm"
                        className={`${positionTypeColorMap[job.positionType]?.bg || 'bg-gray-100'} border-none`}
                      >
                        <span className={`text-xs font-medium ${positionTypeColorMap[job.positionType]?.lightColor || 'text-gray-600'}`}>
                          {job.positionType}
                        </span>
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge 
                          content={getApplicationCount(job)} 
                          color="primary"
                          size="sm" 
                          variant="flat"
                          className="min-w-unit-5 min-h-unit-5"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Badge>
                        {getUnseenApplicationCount(job) > 0 && (
                          <Badge color="danger" content={getUnseenApplicationCount(job)} size="sm" variant="solid" placement="top-right">
                            <span className="text-xs">New</span>
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-sm">{new Date(job.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className="text-default-500 text-xs ml-5">{new Date(job.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
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
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </Tooltip>
                        <Tooltip content="Edit">
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="primary"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                          <DropdownMenu aria-label="Actions">
                            <DropdownItem 
                              key="view_applications"
                              description="View all applications"
                              className="text-xs"
                              startContent={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              }
                            >
                              View Applications
                            </DropdownItem>
                            <DropdownItem 
                              key="duplicate"
                              description="Create a copy"
                              className="text-xs"
                              startContent={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              }
                            >
                              Duplicate
                            </DropdownItem>
                            <DropdownItem 
                              key="delete"
                              className="text-danger text-xs"
                              color="danger"
                              startContent={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-danger">
                                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              }
                            >
                              Delete
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
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(end, filteredJobOfferings.length)}</span> of <span className="font-medium">{filteredJobOfferings.length}</span> job offerings
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
    </div>
  );
} 