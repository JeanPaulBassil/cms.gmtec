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
  AvatarGroup,
  Select,
  SelectItem
} from '@heroui/react';
import { mockContactMessages, subjectCategoryMap } from './mockData';

export default function ContactMessagesPage() {
  // State for messages and UI
  const [messages, setMessages] = useState(mockContactMessages);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [animateCards, setAnimateCards] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'unread', 'read'
  const rowsPerPage = 10;

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Filter messages based on search query, category filter, and view mode
  const filteredMessages = messages.filter((msg) => {
    const fullName = `${msg.firstName} ${msg.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = selectedCategory === 'all' ? true : 
      getCategoryFromSubject(msg.subject) === selectedCategory;
    
    // Apply view mode filter
    let matchesViewMode = true;
    if (viewMode === 'unread') {
      matchesViewMode = !msg.isRead;
    } else if (viewMode === 'read') {
      matchesViewMode = !!msg.isRead;
    }
    
    return matchesSearch && matchesCategory && matchesViewMode;
  });

  // Calculate pagination
  const pages = Math.ceil(filteredMessages.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedMessages = filteredMessages.slice(start, end);
  
  // Open the message detail modal
  const openMessageModal = (message: any) => {
    setSelectedMessage(message);
    
    // Mark as read when opened
    if (!message.isRead) {
      setMessages(messages.map(msg => 
        msg.id === message.id 
          ? { ...msg, isRead: true } 
          : msg
      ));
    }
    
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setReplyText('');
  };

  // Handle reply
  const handleReply = () => {
    if (replyText.trim() === '') return;
    
    // In a real app, this would send the reply to the backend
    alert(`Reply sent: ${replyText}`);
    closeModal();
  };

  // Delete a message
  const handleDelete = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) {
      closeModal();
    }
  };

  // Mark as read/unread
  const toggleReadStatus = (id: string, isRead: boolean) => {
    setMessages(messages.map(msg => 
      msg.id === id 
        ? { ...msg, isRead: !isRead } 
        : msg
    ));
  };

  // Get the category based on the subject (for demo purposes)
  const getCategoryFromSubject = (subject: string): string => {
    const lowerSubject = subject.toLowerCase();
    
    if (lowerSubject.includes('support') || lowerSubject.includes('help') || lowerSubject.includes('issue')) {
      return 'Support';
    } else if (lowerSubject.includes('feedback') || lowerSubject.includes('suggestion')) {
      return 'Feedback';
    } else if (lowerSubject.includes('partner') || lowerSubject.includes('collaboration')) {
      return 'Partnership';
    } else if (lowerSubject.includes('complaint') || lowerSubject.includes('problem')) {
      return 'Complaint';
    } else if (lowerSubject.includes('question') || lowerSubject.includes('inquiry')) {
      return 'General';
    } else {
      return 'Other';
    }
  };

  // Get all unique categories for the filter dropdown
  const categories = ['all', ...Object.keys(subjectCategoryMap)];

  // Count of unread messages
  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className={`transition-all duration-500 ease-in-out transform ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Messages</h1>
            <p className="text-gray-500 text-sm">Manage customer contact form submissions</p>
          </div>
          <div className="space-x-2">
            <Badge content={unreadCount} color="danger" placement="top-right" isInvisible={unreadCount === 0}>
              <Button 
                variant={viewMode === 'unread' ? 'solid' : 'flat'} 
                color={viewMode === 'unread' ? 'primary' : 'default'}
                size="md"
                className="font-medium"
                onPress={() => setViewMode(viewMode === 'unread' ? 'all' : 'unread')}
              >
                Unread
              </Button>
            </Badge>
            <Button 
              variant={viewMode === 'read' ? 'solid' : 'flat'}
              color={viewMode === 'read' ? 'primary' : 'default'}
              size="md" 
              className="font-medium"
              onPress={() => setViewMode(viewMode === 'read' ? 'all' : 'read')}
            >
              Read
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-blue-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '100ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Messages</p>
                <h3 className="text-xl font-bold text-gray-800">{messages.length}</h3>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-700">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-amber-50 to-amber-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Unread Messages</p>
                <h3 className="text-xl font-bold text-gray-800">{unreadCount}</h3>
              </div>
              <div className="bg-amber-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-700">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardBody>
          </Card>

          <Card className={`col-span-1 border-none shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-emerald-50 to-emerald-100 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            <CardBody className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Response Rate</p>
                <h3 className="text-xl font-bold text-gray-800">97%</h3>
              </div>
              <div className="bg-emerald-200 p-3 rounded-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-700">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                label="Filter by Category" 
                size="sm"
                selectedKeys={[selectedCategory]}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="max-w-xs"
              >
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </Select>
              
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search messages..." 
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
              aria-label="Contact messages table"
              removeWrapper
              className="min-h-[400px]"
              classNames={{
                table: "min-h-[400px]",
                th: "bg-transparent text-default-600 border-b border-divider py-3 text-xs font-semibold",
                td: "py-3 px-2"
              }}
            >
              <TableHeader>
                <TableColumn>CONTACT</TableColumn>
                <TableColumn>SUBJECT</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No messages found">
                {paginatedMessages.map((msg, index) => (
                  <TableRow 
                    key={msg.id} 
                    className={`${!msg.isRead ? 'bg-blue-50' : ''} hover:bg-gray-50 cursor-pointer transition-colors duration-150`}
                    onClick={() => openMessageModal(msg)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">{msg.firstName} {msg.lastName}</p>
                          <p className="text-default-500 text-xs">{msg.email}</p>
                          {!msg.isRead && (
                            <span className="ml-0 h-2.5 w-2.5 rounded-full bg-red-500 inline-block"></span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col max-w-xs">
                        <p className="text-sm font-medium truncate">{msg.subject}</p>
                        <p className="text-default-500 text-xs truncate">
                          {msg.message.substring(0, 60)}...
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const category = getCategoryFromSubject(msg.subject);
                        const categoryStyle = subjectCategoryMap[category];
                        return (
                          <Chip 
                            variant="dot"
                            color={categoryStyle?.color as any || 'default'}
                            size="sm"
                            className={`${categoryStyle?.bg || 'bg-gray-100'} border-none`}
                          >
                            <span className={`text-xs font-medium ${categoryStyle?.lightColor || 'text-gray-600'}`}>
                              {category}
                            </span>
                          </Chip>
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="text-sm">{new Date(msg.createdAt).toLocaleDateString()}</p>
                        <p className="text-default-500 text-xs">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 opacity-70 hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <Tooltip content={msg.isRead ? "Mark as unread" : "Mark as read"}>
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="primary"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                            onPress={() => toggleReadStatus(msg.id, !!msg.isRead)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete Message">
                          <Button 
                            size="sm" 
                            variant="light" 
                            color="danger"
                            isIconOnly
                            className="w-7 h-7 min-w-0"
                            onPress={() => handleDelete(msg.id)}
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
                  Showing <span className="font-medium">{start + 1}</span> to <span className="font-medium">{Math.min(end, filteredMessages.length)}</span> of <span className="font-medium">{filteredMessages.length}</span> messages
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

      {/* Message Detail Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={closeModal}
        className="bg-white rounded-lg"
        size="3xl"
      >
        {selectedMessage && (
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedMessage.subject}
                  </h3>
                  <p className="text-sm text-gray-500">
                    From: {selectedMessage.firstName} {selectedMessage.lastName} &lt;{selectedMessage.email}&gt;
                  </p>
                </div>
                <div>
                  {(() => {
                    const category = getCategoryFromSubject(selectedMessage.subject);
                    const categoryStyle = subjectCategoryMap[category];
                    return (
                      <Chip 
                        variant="dot"
                        color={categoryStyle?.color as any || 'default'}
                        size="sm"
                        className={`${categoryStyle?.bg || 'bg-gray-100'} border-none`}
                      >
                        <span className={`text-xs font-medium ${categoryStyle?.lightColor || 'text-gray-600'}`}>
                          {categoryStyle?.icon} {category}
                        </span>
                      </Chip>
                    );
                  })()}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-sm font-medium">{selectedMessage.firstName} {selectedMessage.lastName}</p>
                  <p className="text-xs text-gray-500">{selectedMessage.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(selectedMessage.createdAt).toLocaleDateString()} at {new Date(selectedMessage.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </ModalHeader>
            
            <Divider />
            
            <ModalBody>
              <div className="py-2">
                <div className="rounded-lg bg-gray-50 p-4 my-2">
                  <p className="whitespace-pre-line text-sm">{selectedMessage.message}</p>
                </div>
                
                <Divider className="my-4" />
                
                <div>
                  <p className="font-medium text-sm mb-2">Reply</p>
                  <Input
                    type="textarea"
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full min-h-[150px]"
                    size="lg"
                  />
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                color="danger" 
                variant="light" 
                onPress={() => handleDelete(selectedMessage.id)}
                className="font-medium"
                startContent={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Delete
              </Button>
              <Button 
                color="default" 
                variant="flat" 
                onPress={closeModal}
                className="font-medium"
              >
                Close
              </Button>
              <Button 
                color="primary" 
                onPress={handleReply}
                className="shadow-sm font-medium"
                isDisabled={replyText.trim() === ''}
                startContent={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Send Reply
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
} 