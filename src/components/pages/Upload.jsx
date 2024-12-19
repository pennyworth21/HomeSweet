import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "../../services/fileService";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError(
        "Some files were rejected. Ensure they meet the format and size requirements.",
      );
      return;
    }
    setFiles(acceptedFiles);
    setError("");
    setMessage("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/dwg": [".dwg"],
    },
    maxSize: 15 * 1024 * 1024, // 15MB
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select files to upload");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
      await uploadFiles(files); // Assume this uploads files to your server/API
      setMessage("Files uploaded successfully!");
      setFiles([]); // Clear files after successful upload
    } catch (err) {
      setError(err.message || "Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Upload Documents
      </h1>

      <div
        {...getRootProps()}
        className={`mb-4 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"}`}
      >
        <input {...getInputProps()} />
        <p className="mb-2 text-lg font-medium">
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop files here, or click to select files"}
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: PDF, DOC, DOCX, DWG (Max size: 15MB)
        </p>
      </div>

      {files.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Selected Files:
          </h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between rounded bg-white p-3 shadow-sm"
              >
                <span>{file.name}</span>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div
          className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
          role="status"
        >
          {message}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className={`w-full rounded-lg px-4 py-2 font-semibold ${
          uploading || files.length === 0
            ? "cursor-not-allowed bg-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  );
};

export default Upload;
