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
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem
} from '@heroui/react';
import { mockRequirementsWithPosition, mockJobOfferings, departmentColorMap, positionTypeColorMap } from './mockData';

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState(mockRequirementsWithPosition);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<any>(null);
  const [newRequirementTitle, setNewRequirementTitle] = useState('');
  const [selectedPositionId, setSelectedPositionId] = useState('');
  const [animateCards, setAnimateCards] = useState(false);
  const rowsPerPage = 10;

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Filter requirements based on search query and position filter
  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch = 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.position?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.position?.department || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPosition = selectedPosition === 'all' ? true : req.positionId === selectedPosition;
    
    return matchesSearch && matchesPosition;
  });

  // Calculate pagination
  const pages = Math.ceil(filteredRequirements.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedRequirements = filteredRequirements.slice(start, end);
  
  // Open the modal to add a new requirement
  const openAddModal = () => {
    setEditingRequirement(null);
    setNewRequirementTitle('');
    setSelectedPositionId(mockJobOfferings[0]?.id || '');
    setShowModal(true);
  };

  // Open the modal to edit an existing requirement
  const openEditModal = (requirement: any) => {
    setEditingRequirement(requirement);
    setNewRequirementTitle(requirement.title);
    setSelectedPositionId(requirement.positionId);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle save (add or update)
  const handleSave = () => {
    if (newRequirementTitle.trim() === '') return;
    
    if (editingRequirement) {
      // Update existing requirement
      setRequirements(requirements.map(req => 
        req.id === editingRequirement.id 
          ? { 
              ...req, 
              title: newRequirementTitle,
              positionId: selectedPositionId,
              position: mockJobOfferings.find(job => job.id === selectedPositionId),
              updatedAt: new Date().toISOString()
            } 
          : req
      ));
    } else {
      // Add new requirement
      const newPosition = mockJobOfferings.find(job => job.id === selectedPositionId);
      const newRequirement = {
        id: `req-${Date.now()}`,
        title: newRequirementTitle,
        positionId: selectedPositionId,
        position: newPosition,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setRequirements([...requirements, newRequirement]);
    }
    
    closeModal();
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setRequirements(requirements.filter(req => req.id !== id));
  };

  // Get all unique positions for filtering
  const positionOptions = [
    { id: 'all', title: 'All Positions' },
    ...mockJobOfferings.map(job => ({ id: job.id, title: job.title }))
  ];

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className={`transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Requirements</h1>
            <p className="text-gray-500 text-sm">Manage position requirements for job offerings</p>
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
            onPress={openAddModal}
          >
            Add Requirement
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-slate-50 to-slate-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '100ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Requirements</p>
                <h3 className="text-xl font-bold text-gray-800">{requirements.length}</h3>
              </div>
              <div className="bg-slate-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-700">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-blue-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Positions</p>
                <h3 className="text-xl font-bold text-gray-800">{new Set(requirements.map(req => req.positionId)).size}</h3>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-700">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-amber-50 to-amber-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Departments</p>
                <h3 className="text-xl font-bold text-gray-800">{new Set(requirements.map(req => req.position?.department)).size}</h3>
              </div>
              <div className="bg-amber-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-700">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main content card with table */}
        <Card className={`shadow-lg border-none overflow-visible rounded-xl transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '400ms'}}>
          <CardBody className="p-0">
            <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center p-4 gap-2">
              <Select 
                label="Filter by Position" 
                size="sm"
                selectedKeys={[selectedPosition]}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="max-w-xs"
              >
                {positionOptions.map((position) => (
                  <SelectItem key={position.id} value={position.id}>
                    {position.title}
                  </SelectItem>
                ))}
              </Select>
              
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search requirements..." 
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
              aria-label="Requirements table"
              removeWrapper
              className="min-h-[400px]"
              classNames={{
                table: "min-h-[400px]",
                th: "bg-transparent text-default-600 border-b border-divider py-3 text-xs font-semibold",
                td: "py-3 px-2"
              }}
            >
              <TableHeader>
                <TableColumn>REQUIREMENT</TableColumn>
                <TableColumn>POSITION</TableColumn>
                <TableColumn>DEPARTMENT</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>UPDATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No requirements found">
                {paginatedRequirements.map((req, index) => (
                  <TableRow 
                    key={req.id} 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{req.title}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <p className="text-default-500 text-xs">ID: {req.id.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="text-sm">{req.position?.title || 'Unknown Position'}</p>
                        <p className="text-default-500 text-xs">
                          {req.position?.cityName}, {req.position?.countryName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {req.position?.department && (
                        <Chip 
                          variant="dot"
                          color={departmentColorMap[req.position.department]?.color as any || 'default'}
                          size="sm"
                          className={`${departmentColorMap[req.position.department]?.bg || 'bg-gray-100'} border-none`}
                        >
                          <span className={`text-xs font-medium ${departmentColorMap[req.position.department]?.lightColor || 'text-gray-600'}`}>
                            {req.position.department}
                          </span>
                        </Chip>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-sm">{new Date(req.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className="text-default-500 text-xs ml-5">{new Date(req.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-400">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-sm">{new Date(req.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <p className="text-default-500 text-xs ml-5">{new Date(req.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 opacity-70 hover:opacity-100 transition-opacity">
                        <Tooltip content="Edit Requirement">
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="primary"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                            onPress={() => openEditModal(req)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete Requirement">
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="danger"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                            onPress={() => handleDelete(req.id)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-danger">
                              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(end, filteredRequirements.length)}</span> of <span className="font-medium">{filteredRequirements.length}</span> requirements
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

      {/* Add/Edit Requirement Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={closeModal}
        className="bg-white rounded-lg"
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-gray-800">
              {editingRequirement ? 'Edit Requirement' : 'Add New Requirement'}
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <Select 
                  label="Position" 
                  placeholder="Select a position" 
                  selectedKeys={[selectedPositionId]}
                  onChange={(e) => setSelectedPositionId(e.target.value)}
                  className="w-full"
                >
                  {mockJobOfferings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} ({job.department})
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Input
                  label="Requirement Title"
                  placeholder="Enter requirement title"
                  value={newRequirementTitle}
                  onChange={(e) => setNewRequirementTitle(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="default" 
              variant="light" 
              onPress={closeModal}
            >
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleSave}
              className="shadow-sm"
            >
              {editingRequirement ? 'Update' : 'Add'} Requirement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 