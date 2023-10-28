import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../Button';
import { uploadProfileImage } from '../../services/worker.api';
import { useModalToggle } from '../../context/ConfirmationModal.context';

export default function ProfileImageUploader({ imageUrl }) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [ImageUrl, setImageUrl] = useState(imageUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useModalToggle();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*', // Allow only image files
    multiple: false, // Allow only one file at a time
    onDrop: (acceptedFiles) => {
      // Handle the dropped file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        console.log(acceptedFiles[0]);
        setImageUrl(URL.createObjectURL(file));
        setNewImageUrl(file);
      }
    },
  });

  const handleSaveImage = () => {
    if (newImageUrl) {
      // Send the new image to the server or perform any desired action
      console.log(newImageUrl);
      setIsLoading(true);

      //   const formData = new FormData();
      //   formData.append('file', newImageUrl);

      // You can add additional data to the form if needed
      //formData.append('additionalData', 'someValue');

      try {
        const uploadImg = uploadProfileImage(newImageUrl);
        if (uploadImg?.status === 200) {
          closeModal();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col gap-10">
        <h3 className="font-bold text-primary">Manage Profile Image</h3>
        <div {...getRootProps()} style={dropzoneStyles}>
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
        {ImageUrl && (
          <div>
            <img
              src={ImageUrl}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
              className="rounded"
            />
          </div>
        )}

        <Button
          onClick={handleSaveImage}
          isLoading={isLoading}
          title="Upload Image"
          type="submit"
        />
      </div>
    </>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};
