'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'

export default function MigrationPage() {
  // Dummy CSV headers with preview values
  const [csvHeaders, setCsvHeaders] = useState([
    { id: 'product_name', label: 'Product Name', preview: 'iPhone 15 Pro Max' },
    { id: 'sku', label: 'SKU', preview: 'IPH15PM-256-BLK' },
    { id: 'price', label: 'Price', preview: '$1,199.00' },
    { id: 'description', label: 'Description', preview: 'Latest iPhone with advanced features...' },
    { id: 'category', label: 'Category', preview: 'Electronics > Phones' },
    { id: 'brand', label: 'Brand', preview: 'Apple' },
    { id: 'weight', label: 'Weight', preview: '221g' },
    { id: 'dimensions', label: 'Dimensions', preview: '159.9 x 77.6 x 8.25mm' },
    { id: 'stock', label: 'Stock Quantity', preview: '45' },
    { id: 'images', label: 'Image URLs', preview: 'https://example.com/iphone.jpg' }
  ])

  // BigCommerce target fields grouped by category
  const bigCommerceFields = {
    'Product Information': [
      { id: 'name', label: 'Product Name', required: true },
      { id: 'sku', label: 'SKU', required: true },
      { id: 'price', label: 'Price', required: true },
      { id: 'description', label: 'Description', required: false },
      { id: 'brand_name', label: 'Brand', required: false }
    ],
    'Inventory & Shipping': [
      { id: 'inventory_level', label: 'Stock Quantity', required: false },
      { id: 'weight', label: 'Weight', required: false },
      { id: 'width', label: 'Width', required: false },
      { id: 'height', label: 'Height', required: false },
      { id: 'depth', label: 'Depth', required: false }
    ],
    'Categories & Images': [
      { id: 'categories', label: 'Categories', required: false },
      { id: 'images', label: 'Images', required: false }
    ]
  }

  // Mapping state
  const [mappings, setMappings] = useState({})
  const [draggedItem, setDraggedItem] = useState(null)

  // Calculate progress
  const totalFields = Object.values(bigCommerceFields).flat().length
  const mappedFields = Object.keys(mappings).length
  const progress = (mappedFields / totalFields) * 100

  const handleDragStart = (header) => {
    setDraggedItem(header)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDrop = (targetField) => {
    if (draggedItem) {
      setMappings(prev => ({
        ...prev,
        [targetField.id]: draggedItem
      }))
      
      // Remove the mapped header from the left panel
      setCsvHeaders(prev => prev.filter(h => h.id !== draggedItem.id))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const resetMapping = () => {
    setMappings({})
    setCsvHeaders([
      { id: 'product_name', label: 'Product Name', preview: 'iPhone 15 Pro Max' },
      { id: 'sku', label: 'SKU', preview: 'IPH15PM-256-BLK' },
      { id: 'price', label: 'Price', preview: '$1,199.00' },
      { id: 'description', label: 'Description', preview: 'Latest iPhone with advanced features...' },
      { id: 'category', label: 'Category', preview: 'Electronics > Phones' },
      { id: 'brand', label: 'Brand', preview: 'Apple' },
      { id: 'weight', label: 'Weight', preview: '221g' },
      { id: 'dimensions', label: 'Dimensions', preview: '159.9 x 77.6 x 8.25mm' },
      { id: 'stock', label: 'Stock Quantity', preview: '45' },
      { id: 'images', label: 'Image URLs', preview: 'https://example.com/iphone.jpg' }
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Map your CSV fields to BigCommerce
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-2"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">1</div>
              <div className="w-16 h-1 bg-purple-500/30 rounded"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">2</div>
              <div className="w-16 h-1 bg-purple-500/30 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">3</div>
            </div>
          </motion.div>
          <p className="text-purple-200 mt-2">Step 2 of 3</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Left Panel - CSV Headers */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">CSV Headers</h2>
            <div className="space-y-3">
              <AnimatePresence>
                {csvHeaders.map((header) => (
                  <motion.div
                    key={header.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    transition={{ duration: 0.3 }}
                    draggable
                    onDragStart={() => handleDragStart(header)}
                    onDragEnd={handleDragEnd}
                    className="group cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{header.label}</h3>
                          <p className="text-purple-200 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Preview: {header.preview}
                          </p>
                        </div>
                        <div className="text-purple-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Panel - BigCommerce Fields */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">BigCommerce Fields</h2>
            {Object.entries(bigCommerceFields).map(([category, fields]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-medium text-purple-200">{category}</h3>
                <div className="space-y-3">
                  {fields.map((field) => {
                    const isMapped = mappings[field.id]
                    const isDragOver = draggedItem && !isMapped
                    
                    return (
                      <motion.div
                        key={field.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onDrop={() => handleDrop(field)}
                        onDragOver={handleDragOver}
                        className={`relative min-h-[80px] border-2 border-dashed rounded-xl p-4 transition-all duration-300 ${
                          isMapped 
                            ? 'border-green-500 bg-green-500/10' 
                            : isDragOver 
                              ? 'border-purple-400 bg-purple-500/20 scale-105' 
                              : 'border-white/30 bg-white/5 hover:border-white/50 hover:bg-white/10'
                        }`}
                      >
                        {isMapped ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-white font-medium">{field.label}</h4>
                                {field.required && (
                                  <span className="text-red-400 text-xs">Required</span>
                                )}
                              </div>
                              <p className="text-green-300 text-sm mt-1">
                                Mapped to: {isMapped.label}
                              </p>
                            </div>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <div className="flex items-center justify-between h-full">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-white font-medium">{field.label}</h4>
                                {field.required && (
                                  <span className="text-red-400 text-xs">Required</span>
                                )}
                              </div>
                              <p className="text-purple-200 text-sm mt-1">
                                Drop a CSV header here
                              </p>
                            </div>
                            <div className="text-white/30">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Sticky Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/20"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-white">
                  <span className="font-semibold">{mappedFields}</span> of <span className="font-semibold">{totalFields}</span> fields mapped
                </div>
                <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetMapping}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                >
                  Reset Mapping
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Continue
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
