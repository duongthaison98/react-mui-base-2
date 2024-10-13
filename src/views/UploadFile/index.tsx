import FileUpload from '@/components/FileUpload';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import { Box, Grid2, Paper, Typography } from '@mui/material';
import { useState } from 'react';

interface FileWithPreview extends File {
  preview: string;
}

const UploadFilePage = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(previousFile => [
      ...previousFile,
      ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }) as FileWithPreview)
    ]);
  };

  const handleDelete = (fileToDelete: File) => {
    setFiles((prevFiles) => prevFiles.filter(file => file !== fileToDelete));
    
  }

  return (
    <PageWrapper title={'File Upload'}>
      <PageBreadcrumbs
        title={('File Upload')}
        items={[{ link: '/products', text: 'Sản phẩm' }]}
      />
      <Paper>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ paddingX: '20px' }}>
              <Typography variant='h3'>Here is a test dropzone</Typography>
              <FileUpload 
                onDrop={handleDrop} 
                onDelete={handleDelete} 
                files={files} 
                maxFiles={2}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
    </PageWrapper>
  )
};

export default UploadFilePage;
