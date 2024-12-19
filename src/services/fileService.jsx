import api from "./api";

const SUPPORTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/dwg": [".dwg"],
};

// Maximum file size (15MB)
export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
export const CHUNK_SIZE = 1024 * 1024; // 1MB chunks for large files

// Validate file type
export const validateFileType = (file) => {
  const fileType = Object.keys(SUPPORTED_FILE_TYPES).find((type) =>
    SUPPORTED_FILE_TYPES[type].some((ext) =>
      file.name.toLowerCase().endsWith(ext),
    ),
  );
  return !!fileType;
};

// Validate file size
export const validateFileSize = (file) => {
  return file.size <= MAX_FILE_SIZE;
};

// Generate file checksum for integrity verification
const generateChecksum = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// Upload file in chunks
const uploadChunk = async (chunk, index, totalChunks, fileId, onProgress) => {
  const formData = new FormData();
  formData.append("chunk", chunk);
  formData.append("chunkIndex", index.toString());
  formData.append("totalChunks", totalChunks.toString());
  formData.append("fileId", fileId);

  try {
    await api.post("/documents/upload/chunk", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const chunkProgress =
          (progressEvent.loaded / progressEvent.total) * 100;
        const totalProgress =
          ((index + chunkProgress / 100) / totalChunks) * 100;
        onProgress?.(Math.round(totalProgress));
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to upload chunk ${index + 1}/${totalChunks}: ${error.message}`,
    );
  }
};

// Upload large file in chunks
const uploadLargeFile = async (file, onProgress) => {
  const fileId = await generateChecksum(file);
  const chunks = Math.ceil(file.size / CHUNK_SIZE);
  const uploads = [];

  for (let i = 0; i < chunks; i++) {
    uploads.push(
      uploadChunk(
        file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE),
        i,
        chunks,
        fileId,
        onProgress,
      ),
    );
  }

  return Promise.all(uploads);
};

// Export the uploadFiles function
export const uploadFiles = async (files, onProgress) => {
  const uploadPromises = files.map((file) => {
    if (file.size > CHUNK_SIZE) {
      return uploadLargeFile(file, onProgress);
    } else {
      const formData = new FormData();
      formData.append("file", file);
      return api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress?.(progress);
        },
      });
    }
  });

  return Promise.all(uploadPromises);
};
