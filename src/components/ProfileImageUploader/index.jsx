import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../Button';
import { uploadProfileImage } from '../../services/worker.api';
import { useModalToggle } from '../../context/ConfirmationModal.context';
import toast from 'react-hot-toast';


export default function ProfileImageUploader({ imageUrl, handleUpload }) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [ImageUrl, setImageUrl] = useState(imageUrl || '');
  const [isSubmtting, setIsSubmtting] = useState(false);
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

  const handleSaveImage = async () => {
    if (newImageUrl === '') {
      toast.error('Please choose an image before attempting an upload');
      return;
    }

    try {
      setIsSubmtting(true);
      const uploadImg = await uploadProfileImage(newImageUrl);

      if (uploadImg?.StatusCode === 200) {
        setIsSubmtting(false);
        closeModal();
        handleUpload();
        //location.reload();
      }


    } catch (error) {
      console.log(error);
      setIsSubmtting(false);
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
          disabled={newImageUrl === ''}
          onClick={handleSaveImage}
          isLoading={isSubmtting}
          title="Upload Image"
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
