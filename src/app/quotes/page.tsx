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
  Tooltip,
  Select,
  SelectItem
} from '@heroui/react';

import { mockQuotes, statusColorMap, productCategories, productTypes, QuoteRequest } from './mockData';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const rowsPerPage = 5;

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Filter quotes based on search query and tab selection
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = 
      quote.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.productCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.productType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      selectedFilter === 'all' ? true : 
      selectedFilter === 'unseen' ? !quote.isSeen :
      quote.status?.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesTab;
  });

  // Calculate pagination
  const pages = Math.ceil(filteredQuotes.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedQuotes = filteredQuotes.slice(start, end);

  // Handle status change
  const handleStatusChange = (id: string, newStatus: string) => {
    setQuotes(
      quotes.map((quote) => 
        quote.id === id ? { ...quote, status: newStatus } : quote
      )
    );
  };

  // Get counts for status badges
  const getStatusCount = (status: string) => {
    return quotes.filter(quote => 
      status === 'all' ? true : quote.status?.toLowerCase() === status.toLowerCase()
    ).length;
  };

  // Handle row click to view quote details
  const handleRowClick = (quote: QuoteRequest) => {
    // Mark quote as seen if it wasn't already
    if (!quote.isSeen) {
      setQuotes(
        quotes.map((q) => 
          q.id === quote.id ? { ...q, isSeen: true } : q
        )
      );
    }
    setSelectedQuote(quote);
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Quote Requests</h1>
            <p className="text-gray-500 text-sm">Manage and track incoming product quote requests</p>
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
            New Quote
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-slate-50 to-slate-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '100ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Total</p>
                <h3 className="text-xl font-bold text-gray-800">{quotes.length}</h3>
              </div>
              <div className="bg-slate-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-700">
                  <path d="M8 10H16M8 14H16M8 18H12M10 6H14M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br ${statusColorMap.New.gradient} ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">New</p>
                <h3 className="text-xl font-bold text-gray-800">{getStatusCount('new')}</h3>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-700">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br ${statusColorMap.Quoted.gradient} ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Quoted</p>
                <h3 className="text-xl font-bold text-gray-800">{getStatusCount('quoted')}</h3>
              </div>
              <div className="bg-emerald-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-700">
                  <path d="M9 12L11 14L15 10M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br ${statusColorMap.Closed.gradient} ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '400ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Closed</p>
                <h3 className="text-xl font-bold text-gray-800">{getStatusCount('closed')}</h3>
              </div>
              <div className="bg-rose-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-700">
                  <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  key="new" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>New</span>
                      <Badge color="primary" variant="flat" size="sm">{getStatusCount('new')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="contacted" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Contacted</span>
                      <Badge color="warning" variant="flat" size="sm">{getStatusCount('contacted')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="quoted" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Quoted</span>
                      <Badge color="success" variant="flat" size="sm">{getStatusCount('quoted')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="closed" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Closed</span>
                      <Badge color="danger" variant="flat" size="sm">{getStatusCount('closed')}</Badge>
                    </div>
                  }
                />
                <Tab 
                  key="unseen" 
                  title={
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <span>Unseen</span>
                      <Badge color="danger" variant="flat" size="sm">{quotes.filter(quote => !quote.isSeen).length}</Badge>
                    </div>
                  }
                />
              </Tabs>
              
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search quotes..." 
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
              aria-label="Quote Requests table"
              removeWrapper
              selectionMode="single"
              classNames={{
                table: "min-h-[300px]",
                th: "bg-transparent text-default-600 border-b border-divider py-3 text-xs font-semibold",
                td: "py-3 px-2"
              }}
              onRowAction={(key) => {
                const quote = quotes.find(quote => quote.id === key);
                if (quote) handleRowClick(quote);
              }}
            >
              <TableHeader>
                <TableColumn>CONTACT</TableColumn>
                <TableColumn>COMPANY</TableColumn>
                <TableColumn>PRODUCT</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No quote requests found">
                {paginatedQuotes.map((quote, index) => (
                  <TableRow 
                    key={quote.id} 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${!quote.isSeen ? 'bg-blue-50' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">{quote.firstName} {quote.lastName}</p>
                          <p className="text-default-500 text-xs">{quote.email}</p>
                          <p className="text-default-500 text-xs">{quote.companyName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{quote.companyName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{quote.productType}</p>
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                          <p className="text-default-500 text-xs">{quote.productCategory}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tooltip content={`Current status: ${quote.status || 'Not set'}`}>
                        <Chip 
                          color={(quote.status ? statusColorMap[quote.status].color : 'default') as any}
                          variant="dot"
                          size="sm"
                          className={`${quote.status ? statusColorMap[quote.status].bg : 'bg-gray-100'} text-xs px-2 py-1 h-auto border-none`}
                        >
                          <span className={`font-medium ${quote.status ? statusColorMap[quote.status].lightColor : 'text-gray-600'}`}>
                            {quote.status || 'Not set'}
                          </span>
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
                          <p className="text-sm">{new Date(quote.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className="text-default-500 text-xs ml-5">{new Date(quote.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
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
                            onClick={() => handleRowClick(quote)}
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
                                  <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              }
                            >
                              <Dropdown>
                                <DropdownTrigger className="w-full h-full cursor-pointer">
                                  <div className="text-xs">Change Status</div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Status options">
                                  <DropdownItem 
                                    key="new"
                                    onClick={() => handleStatusChange(quote.id, 'New')}
                                    startContent={<span className="mr-1 text-blue-500">{statusColorMap.New.icon}</span>}
                                    className="text-xs"
                                  >
                                    New
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="contacted"
                                    onClick={() => handleStatusChange(quote.id, 'Contacted')}
                                    startContent={<span className="mr-1 text-amber-500">{statusColorMap.Contacted.icon}</span>}
                                    className="text-xs"
                                  >
                                    Contacted
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="quoted"
                                    onClick={() => handleStatusChange(quote.id, 'Quoted')}
                                    startContent={<span className="mr-1 text-emerald-500">{statusColorMap.Quoted.icon}</span>}
                                    className="text-xs"
                                  >
                                    Quoted
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="closed"
                                    onClick={() => handleStatusChange(quote.id, 'Closed')}
                                    startContent={<span className="mr-1 text-rose-500">{statusColorMap.Closed.icon}</span>}
                                    className="text-xs"
                                  >
                                    Closed
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
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(end, filteredQuotes.length)}</span> of <span className="font-medium">{filteredQuotes.length}</span> quotes
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

        {/* Quote Detail Modal */}
        {selectedQuote && (
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
                  <h3 className="text-xl font-bold text-gray-800">Quote Request Details</h3>
                  <Chip 
                    color={(selectedQuote.status ? statusColorMap[selectedQuote.status].color : 'default') as any}
                    variant="dot"
                    size="sm"
                    className={`${selectedQuote.status ? statusColorMap[selectedQuote.status].bg : 'bg-gray-100'} ml-3 text-xs px-2 h-auto border-none`}
                  >
                    <span className={`font-medium ${selectedQuote.status ? statusColorMap[selectedQuote.status].lightColor : 'text-gray-600'}`}>
                      {selectedQuote.status || 'Not set'}
                    </span>
                  </Chip>
                </div>
                <p className="text-sm text-default-500">
                  Submitted on <span className="font-medium">{new Date(selectedQuote.createdAt).toLocaleDateString()}</span> at <span className="font-medium">{new Date(selectedQuote.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Contact Information */}
                  <div className="md:col-span-1 space-y-4">
                    <Card className="shadow-sm border-none overflow-visible bg-gray-50/50">
                      <CardBody className="p-4">
                        <div className="flex items-center mt-2">
                          <div>
                            <p className="text-lg font-semibold">{selectedQuote.firstName} {selectedQuote.lastName}</p>
                            <div className="flex items-center mt-1">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500 mr-1">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <p className="text-sm text-gray-500">{selectedQuote.phoneNumber}</p>
                            </div>
                            <div className="flex items-center mt-1">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500 mr-1">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <p className="text-sm text-gray-500">{selectedQuote.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Divider className="my-4" />
                        
                        <div>
                          <h5 className="text-sm font-semibold mb-3 text-gray-800">Company Information</h5>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-md bg-gray-100">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-default-500">
                                  <path d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1m2-14h-5v3h5m0-3v18M5 21V8a2 2 0 012-2h6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-default-500">Company</p>
                                <p className="text-sm font-medium">{selectedQuote.companyName}</p>
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
                                <p className="text-xs text-default-500">Submitted On</p>
                                <p className="text-sm font-medium">
                                  {new Date(selectedQuote.createdAt).toLocaleDateString()} at {' '}
                                  {new Date(selectedQuote.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
                                  {new Date(selectedQuote.updatedAt).toLocaleDateString()} at {' '}
                                  {new Date(selectedQuote.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Product Information and Description */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-gray-800 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5 text-primary-500">
                          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Product Information
                      </h5>
                      <Card className="shadow-sm border-none">
                        <CardBody className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <p className="text-xs text-default-500 mb-1">Product Category</p>
                              <Chip 
                                variant="flat" 
                                color="primary" 
                                className="w-fit"
                              >
                                {selectedQuote.productCategory}
                              </Chip>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs text-default-500 mb-1">Product Type</p>
                              <Chip 
                                variant="flat" 
                                color="secondary" 
                                className="w-fit"
                              >
                                {selectedQuote.productType}
                              </Chip>
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
                        Description
                      </h5>
                      <Card className="shadow-sm border-none hover:shadow-md transition-shadow duration-200">
                        <CardBody className="p-4">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-sm whitespace-pre-line leading-relaxed">{selectedQuote.description}</p>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-gray-800 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5 text-primary-500">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Notes
                      </h5>
                      <Card className="shadow-sm border-none hover:shadow-md transition-all duration-200">
                        <CardBody className="p-4">
                          <div className="flex flex-col">
                            <Input
                              placeholder="Add a note about this quote request..."
                              className="w-full"
                              variant="bordered"
                              size="sm"
                              endContent={
                                <Button size="sm" color="primary" variant="flat" isIconOnly className="min-w-0 w-6 h-6">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Button>
                              }
                            />
                            <div className="mt-4 space-y-3 max-h-32 overflow-y-auto">
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div className="flex flex-col">
                                    <p className="text-sm">Customer requested a follow-up call to discuss pricing options.</p>
                                    <p className="text-xs text-gray-500 mt-1">Added by John Doe • 2 days ago</p>
                                  </div>
                                  <Button size="sm" variant="light" color="danger" isIconOnly className="min-w-0 w-6 h-6">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </Button>
                                </div>
                              </div>
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
                      <DropdownMenu aria-label="Change quote status" variant="flat">
                        <DropdownItem 
                          key="new"
                          startContent={<span className="mr-1 text-blue-500">{statusColorMap.New.icon}</span>}
                          onClick={() => handleStatusChange(selectedQuote.id, 'New')}
                        >
                          New
                        </DropdownItem>
                        <DropdownItem 
                          key="contacted"
                          startContent={<span className="mr-1 text-amber-500">{statusColorMap.Contacted.icon}</span>}
                          onClick={() => handleStatusChange(selectedQuote.id, 'Contacted')}
                        >
                          Contacted
                        </DropdownItem>
                        <DropdownItem 
                          key="quoted"
                          startContent={<span className="mr-1 text-emerald-500">{statusColorMap.Quoted.icon}</span>}
                          onClick={() => handleStatusChange(selectedQuote.id, 'Quoted')}
                        >
                          Quoted
                        </DropdownItem>
                        <DropdownItem 
                          key="closed"
                          startContent={<span className="mr-1 text-rose-500">{statusColorMap.Closed.icon}</span>}
                          onClick={() => handleStatusChange(selectedQuote.id, 'Closed')}
                        >
                          Closed
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      color="primary" 
                      variant="solid"
                      className="shadow-sm hover:shadow transition-all duration-200"
                      startContent={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    >
                      Send Email
                    </Button>
                    <Button 
                      color="default" 
                      variant="light"
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