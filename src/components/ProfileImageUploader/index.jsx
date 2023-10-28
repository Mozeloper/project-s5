import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ModalPopup from './ModalPopup'; // Import your modal component

export default function ProfileImageUploader({ imageUrl, onImageChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl || '');
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*', // Allow only image files
    multiple: false, // Allow only one file at a time
    onDrop: (acceptedFiles) => {
      // Handle the dropped file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setNewImageUrl(URL.createObjectURL(file));
      }
    },
  });

  const handleSaveImage = () => {
    if (newImageUrl) {
      // Send the new image to the server or perform any desired action
      onImageChange(newImageUrl);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <img
        src={newImageUrl || imageUrl}
        alt="Profile"
        onClick={() => setIsModalOpen(true)}
        style={{ cursor: 'pointer' }}
      />

      {/* This is your modal component to display the uploader */}
      <ModalPopup isOpen={isModalOpen}>
        <div className="p-4">
          <h3>Upload New Profile Image</h3>
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
          {newImageUrl && (
            <div>
              <img
                src={newImageUrl}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </div>
          )}
          <button onClick={handleSaveImage}>Submit</button>
        </div>
      </ModalPopup>
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
