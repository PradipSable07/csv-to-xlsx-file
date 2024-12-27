
import React, { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadFiles } from "../apis/files";
import { FaFileCsv } from "react-icons/fa";
import { BsFiletypeCsv, BsFiletypeXlsx } from "react-icons/bs";


const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ sheetName: "" });
  const inputRefs = {
    xlsx: useRef(null),
    csv: useRef(null),
  };

  const uploadMutation = useMutation({
    mutationFn: (data) => uploadFiles(data),
    onSuccess: (data) => {
      setIsUploading(false);
      toast.success("Files uploaded successfully!");
      console.log('data',data)
      console.log("Download Updated Master Sheet:", data.updatedSheetPath);
      console.log("Download PDF:", data.pdfPath);
    },
    onError: (error) => {
      setIsUploading(false);
      toast.error(error.message || "Something went wrong!");
    },
  });

  const handleFileChange = (type) => (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles((prev) => ({ ...prev, [type]: file }));
      
    }
  };

  const handleSubmit = () => {
    if (!selectedFiles.xlsx || !selectedFiles.csv) {
      toast.error("Please upload both an XLSX and a CSV file!");
      return;
    }
    setIsUploading(true);
    uploadMutation.mutate({
      files: [selectedFiles.xlsx, selectedFiles.csv],
      sheetName: formData.sheetName,
    });

    setSelectedFiles({ xlsx: null, csv: null });
    setFormData({ sheetName: "" });
    if(inputRefs.xlsx.current.value) {
      inputRefs.xlsx.current.value = null;
    }
    if(inputRefs.csv.current.value) {
      inputRefs.csv.current.value = null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen space-y-8 bg-sky-50 lg:min-w-7xl">
      <h1 className="text-3xl font-bold text-gray-700">Upload Master Sheet and Data</h1>
      
      <div className="flex items-center justify-center w-full h-full max-w-6xl gap-2 ">
        {/* XLSX Upload */}
        <div className="relative w-full p-2 h-80 ">
          <label htmlFor="xlsx-upload" className="block mb-2 text-sm font-medium text-gray-700">
            Upload XLSX File
          </label>
          <div className="flex items-center justify-center w-full h-full bg-gray-50">
            <label
              htmlFor="xlsx-upload"
              className="relative flex items-center justify-center w-full h-full border border-gray-200 rounded-lg cursor-pointer bg-gray-50"
            >
              
               
            
                <div className={`flex items-center justify-center w-full h-full   shadow-inner shadow-[#7b80c1]/20 backdrop-blur-[7.5px] flex-col rounded-lg  border-white/20 transition-all duration-300 p-4 ${selectedFiles?.xlsx ? "bg-violet-50 text-gray-900 " : "bg-gray-50 text-gray-500"}`}>
                  <BsFiletypeXlsx className="w-24 h-24 " />
                  <span className="text-sm text-bold ">{selectedFiles.xlsx ?`${selectedFiles?.xlsx?.name}` : "Upload XLSX File"}</span>
                </div>
              
              <input
                type="file"
                accept=".xlsx"
                id="xlsx-upload"
                className="hidden"
                ref={inputRefs.xlsx}
                onChange={handleFileChange("xlsx")}
              />
            </label>
          </div>
        </div>

        {/* CSV Upload */}
        <div className="relative w-full p-2 h-80 ">
          <label htmlFor="csv-upload" className="block mb-2 text-sm font-medium text-gray-700">
            Upload CSV File
          </label>
          <div className="flex items-center justify-center w-full h-full bg-gray-50">
            <label
              htmlFor="csv-upload"
              className="relative flex items-center justify-center w-full h-full border border-gray-200 rounded-lg cursor-pointer bg-gray-50"
            >
              
               
            
                <div className={`flex items-center justify-center w-full h-full  shadow-inner shadow-[#7b80c1]/20 backdrop-blur-[7.5px] flex-col p-4 rounded-lg border transition-all duration-300  ${selectedFiles?.csv ? "bg-violet-50 text-gray-900 " : "bg-gray-50 text-gray-500"} `}>
                  <BsFiletypeCsv className="w-24 h-24 " />
                  <span className="text-sm text-bold ">{selectedFiles.csv ?`${selectedFiles.csv.name}` : "Upload CSV File"}</span>
                </div>
              
              <input
                type="file"
                accept=".csv"
                id="csv-upload"
                className="hidden"
                ref={inputRefs.csv}
                onChange={handleFileChange("csv")}
              />
            </label>
          </div>
        </div>
      </div>       
       {/* Sheet Name Input */}
      <div className="flex items-center max-w-6xl gap-2 mx-auto ">
          <label htmlFor="sheetName" className="text-sm font-medium text-gray-700 ">
            XLSX File Sheet Name: 
          </label>
          <input
            type="text"
            id="sheetName"
            name="sheetName"
            value={formData.sheetName}
            onChange={handleInputChange}
            className="p-2 mx-auto text-sm font-medium border border-gray-300 rounded-lg bg-slate-50 text-slate-800 focus:outline-sky-300 focus:ring-none focus:ring-sky-500 active:border-transparent min-w-2xl"
            placeholder="Enter the XLSX file sheet name"
          />
        </div>

      <button
        onClick={handleSubmit}
        disabled={isUploading}
        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isUploading ? "Uploading..." : "Upload Files"}
      </button>

      {uploadMutation.isSuccess && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-light ">Files Processed Successfully</h3>
          <div className="flex items-center w-full gap-2 mt-4 justify-evenly">
          <a
            href={`http://localhost:3000/${uploadMutation.data.updatedSheetPath}`}
            download
            target="_blank"
            className="text-base font-medium  px-4 py-2 rounded-lg border text-gray-500 hover:bg-sky-400 hover:text-white transition-all duration-200  hover:after:content-['_📋']"
            >
            Download Updated Master Sheet
          </a>
          <a
            href={`http://localhost:3000/${uploadMutation.data.pdfPath}`}
            download
            target="_blank"
            className="text-base font-medium  px-4 py-2 rounded-lg border text-gray-500 hover:bg-gray-400 hover:text-white transition-all duration-500 hover:after:content-['_📂'] "
            >
            Download PDF Report
          </a>
            </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
