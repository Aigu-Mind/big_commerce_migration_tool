'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAxios from '@/interceptor/axiosInterceptor'
import RenderToast from '@/components/RenderToast'
import LoadingSpinner from '@/components/LoadingSpinner'

const PLATFORMS = [
  { id: 'shopify', name: 'Shopify', img: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
  { id: 'woocommerce', name: 'WooCommerce', img: 'https://cdn.worldvectorlogo.com/logos/woocommerce.svg' },
  { id: 'wix', name: 'Wix', img: 'https://cdn.worldvectorlogo.com/logos/wix.svg' },
  { id: 'other', name: 'Other', img: null },
]

export default function MigrationPage() {
  // Step state
  const [step, setStep] = useState(1)
  const [platform, setPlatform] = useState(null)
  const [otherPlatform, setOtherPlatform] = useState('')
  const [csvFile, setCsvFile] = useState(null)
  const [csvHeaders, setCsvHeaders] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)
  const [mappings, setMappings] = useState({})
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef()
  const scrollContainerRef = useRef()

  // API hooks
  const { Post } = useAxios()



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

  // Progress
  const totalFields = Object.values(bigCommerceFields).flat().length
  const mappedFields = Object.keys(mappings).length
  const progress = (mappedFields / totalFields) * 100

  // Drag logic (allow scroll while dragging)
  const handleDragStart = (header) => {
    setDraggedItem(header)
    document.body.style.overflow = 'auto' // allow scroll
  }
  const handleDragEnd = () => {
    setDraggedItem(null)
    document.body.style.overflow = ''
  }
  const handleDrop = (targetField) => {
    if (draggedItem) {
      setMappings(prev => ({ ...prev, [targetField.id]: draggedItem }))
      setCsvHeaders(prev => prev.filter(h => h.id !== draggedItem.id))
    }
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    // Auto-scroll if near edge
    if (scrollContainerRef.current) {
      const { top, bottom } = scrollContainerRef.current.getBoundingClientRect()
      if (e.clientY - top < 60) scrollContainerRef.current.scrollBy({ top: -20, behavior: 'smooth' })
      if (bottom - e.clientY < 60) scrollContainerRef.current.scrollBy({ top: 20, behavior: 'smooth' })
    }
  }

  // Step 1: Platform selection
  const handlePlatformSelect = (plat) => {
    setPlatform(plat)
    setTimeout(() => setStep(2), 400)
  }

  // Step 2: CSV upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCsvFile(file)
      setCsvHeaders([])
      setMappings({})
    }
  }
  
  const handleDropCSV = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setCsvFile(file)
      setCsvHeaders([])
      setMappings({})
    }
  }

  // Upload CSV to API
  const uploadCSV = async () => {
    if (!csvFile) {
      RenderToast({
        message: "Please select a CSV file first",
        type: "warning"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('csv', csvFile);

      const { response, error } = await Post({
        route: 'orders/upload-csv',
        data: formData,
        isFormData: true,
        showAlert: false
      });

      if (error) {
        throw error;
      }

      if (response) {
        console.log('response?.data', response);
        // Convert API response headers to the format expected by the UI
        const apiHeaders = response?.headers.map((header, index) => ({
          id: `header_${index}`,
          label: header,
          preview: `Sample data for ${header}`
        }));

        setCsvHeaders(apiHeaders);
        
        RenderToast({
          message: response?.message || "CSV uploaded successfully",
          type: "success"
        });

        // Auto-advance to step 3 after successful upload
        setTimeout(() => {
          setStep(3);
        }, 1500);
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
      RenderToast({
        message: error?.response?.data?.message || "Failed to upload CSV. Please try again.",
        type: "error"
      });
    } finally {
      setIsUploading(false);
    }
  }

  // Step navigation
  const goBack = () => setStep(s => Math.max(1, s - 1))
  const goNext = () => setStep(s => Math.min(3, s + 1))
  const resetMapping = () => {
    setMappings({})
    // Keep the current CSV headers from API response
    if (csvHeaders.length > 0) {
      setCsvHeaders(csvHeaders)
    }
  }

  // Stepper UI
  const stepLabels = [
    'Select Platform',
    'Upload CSV',
    'Map Fields'
  ]

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Top Stepper */}
        <div className="text-center mb-8">
          <motion.div className="flex items-center justify-center space-x-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            {stepLabels.map((label, idx) => (
              <React.Fragment key={label}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold border-2 transition-all duration-300
                  ${step === idx + 1 ? 'bg-purple-500 text-white border-purple-400 scale-110 shadow-lg' : step > idx + 1 ? 'bg-green-500 text-white border-green-400' : 'bg-gray-600 text-white border-gray-500 opacity-60'}`}>{idx + 1}</div>
                {idx < stepLabels.length - 1 && <div className="w-16 h-1 rounded bg-gradient-to-r from-purple-500/30 to-blue-500/30"></div>}
              </React.Fragment>
            ))}
          </motion.div>
          <p className="text-purple-200 mt-2">Step {step} of 3</p>
        </div>
        {/* Step Content */}
        <div className="min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl mx-auto"
              >
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Select Your Source Platform</h1>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                  {PLATFORMS.map(p => (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePlatformSelect(p.id)}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 shadow-lg
                        ${platform === p.id ? 'border-purple-500 bg-purple-500/20 scale-105' : 'border-white/20 bg-white/5 hover:border-purple-400'}`}
                    >
                      {p.img ? (
                        <img src={p.img} alt={p.name} className="w-12 h-12 mb-3" />
                      ) : (
                        <span className="w-12 h-12 mb-3 flex items-center justify-center bg-gray-700 rounded-full text-white text-xl">?</span>
                      )}
                      <span className="text-white font-medium">{p.name}</span>
                    </motion.button>
                  ))}
                </div>
                {platform === 'other' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center">
                    <input
                      type="text"
                      className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:border-purple-400"
                      placeholder="Enter platform name..."
                      value={otherPlatform}
                      onChange={e => setOtherPlatform(e.target.value)}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg mx-auto flex flex-col items-center"
                onDrop={handleDropCSV}
                onDragOver={e => e.preventDefault()}
              >
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Upload Your CSV File</h1>
                
                {isUploading ? (
                  <div className="w-full flex flex-col items-center justify-center py-16">
                    <LoadingSpinner size="lg" text="Uploading CSV..." />
                  </div>
                ) : (
                  <>
                    <div
                      className="w-full flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-2xl bg-white/10 py-16 mb-6 cursor-pointer hover:bg-white/20 transition-all"
                      onClick={() => !isUploading && fileInputRef.current.click()}
                      onDrop={handleDropCSV}
                      onDragOver={e => e.preventDefault()}
                    >
                      <svg className="w-12 h-12 text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-white font-medium">Drag & drop your CSV here, or <span className="underline">browse</span></span>
                      <input
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                    </div>
                    
                    {csvFile && (
                      <div className="w-full bg-white/10 rounded-lg p-4 text-white text-center mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold">{csvFile.name}</span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={uploadCSV}
                          disabled={isUploading}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Upload & Process CSV</span>
                          </div>
                        </motion.button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
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
                     className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
                     ref={scrollContainerRef}
                     style={{
                       scrollbarWidth: 'thin',
                       scrollbarColor: '#ccc transparent'
                     }}
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
              </motion.div>
            )}
          </AnimatePresence>
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
                {step === 3 && (
                  <div className="text-white">
                    <span className="font-semibold">{mappedFields}</span> of <span className="font-semibold">{totalFields}</span> fields mapped
                  </div>
                )}
                {step === 3 && (
                  <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goBack}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                  >
                    Back
                  </motion.button>
                )}
                {step === 3 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetMapping}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                  >
                    Reset Mapping
                  </motion.button>
                )}
                {step < 3 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (step === 1 && (platform === 'other' ? otherPlatform.trim() : platform)) setStep(2)
                      else if (step === 2 && csvFile) setStep(3)
                    }}
                    disabled={
                      (step === 1 && !(platform === 'other' ? otherPlatform.trim() : platform)) ||
                      (step === 2 && !csvFile)
                    }
                    className={`px-8 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25
                      ${
                        (step === 1 && !(platform === 'other' ? otherPlatform.trim() : platform)) ||
                        (step === 2 && !csvFile)
                          ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    Continue
                  </motion.button>
                )}
              </div>
            </div>
          </div>
                 </motion.div>
       </div>
     </div>
     </>
   )
 }
