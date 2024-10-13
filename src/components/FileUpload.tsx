import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone, Accept, FileRejection } from 'react-dropzone';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import useNotification from '@/hooks/useNotification';

interface FileWithPreview extends File {
  preview: string;
}
interface DropzoneProps {
  accept?: Accept;
  files: FileWithPreview[];
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  onDrop: (acceptedFiles: File[]) => void;
  onDelete: (file: FileWithPreview) => void;
}

const FileUpload: React.FC<DropzoneProps> = ({ 
  accept = {
    "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp"],
    "text/csv": [".csv"],
    "application/msword": [".doc", ".docx"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/pdf": [".pdf"]
  }, 
  files, 
  maxFiles = 5, 
  maxSize = 5242880,
  multiple = true, 
  onDrop, 
  onDelete 
}) => {
  const notify = useNotification();

  const handleRejectedFiles = (filesReject: FileRejection[]) => {
    if (filesReject.length + files.length > maxFiles) {
      notify({
        error: `You cannot upload more than ${maxFiles} files!`,
        severity: 'error'
      });
      return;
    }

    if (filesReject.length > 0) {
      filesReject.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            notify({
              message: `"${file.name}" is too large. Max file size is ${maxSize / 1000000}MB.`,
              severity: 'error',
            });
          }
          if (error.code === 'file-invalid-type') {
            notify({
              message: `"${file.name}" is not an accepted file type.`,
              severity: 'error',
            });
          }
        });
      });
      return;
    }
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("acceptedFiles", acceptedFiles);
      
      if (acceptedFiles.length + files.length > maxFiles) {
        notify({
          message: `You cannot upload more than ${maxFiles} files!`,
          severity: 'error',
        });
        return;
      }

      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxFiles,
    maxSize,
    multiple,
    onDropRejected: handleRejectedFiles,
  });

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: '1px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '10px',
          backgroundColor: isDragActive ? '#f0f8ff' : '#fff',
          cursor: 'pointer'
        }}
      >
        <input {...getInputProps()} />
        <FileUploadOutlinedIcon fontSize='large' />
        <Typography sx={{ cursor: 'pointer' }}>Drag 'n' drop some files here, or click to select files</Typography>
        {maxFiles && <em>({maxFiles} files are the maximum number of files you can drop here)</em>}
      </Box>
      {files.length > 0 && (
        <>
          <List>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(file)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  {file.type.startsWith('image/') ? (
                    <Avatar 
                      sx={{ bgcolor: 'unset' }} 
                      src={file.preview} 
                    />
                  ) : (
                    <Avatar sx={{ bgcolor: 'unset' }}>
                      <UploadFileOutlinedIcon sx={{ color: 'gray' }} />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  sx={{ wordBreak: 'break-word' }}
                  primary={file.name}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default FileUpload;