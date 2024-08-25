import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import useDesigner from '@/hooks/use-designer';
import { api } from '@/trpc/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Dropzone } from './dropzone';

export const PicDropzoneBox = () => {
  const { state, dispatch } = useDesigner();
  const deleteProfilePic = api.images.delete.useMutation();
  const upload = api.images.upload.useMutation();
  const signedUrlMutation = api.images.signedUrl.useMutation();
  const [progress, setProgress] = useState<number>(0); // Track upload progress
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Create a ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    setIsUploading(true);
    setProgress(10);

    const signedUrl = await signedUrlMutation.mutateAsync();

    if (!signedUrl || !file) {
      toast.error('Failed to get signed URL or file is not valid');
      setIsUploading(false);
      return;
    }

    setProgress(30);

    try {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', signedUrl.url, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(30 + percentComplete * 0.7); // Adjusting progress bar range
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          dispatch({
            type: 'UPDATE_PROFILE_IMG',
            payload: state.id
          });
          toast.success('Upload successful!');
        } else {
          toast.error('Upload failed. Please try again.');
        }
        setIsUploading(false);
        setProgress(0);
      };

      xhr.onerror = () => {
        toast.error('Something went wrong. Please try again.');
        setIsUploading(false);
        setProgress(0);
      };

      await xhr.send(file);
      await upload.mutateAsync();
    } catch (error) {
      toast.error('An error occurred during the upload.');
      setIsUploading(false);
      setProgress(0);
    }
  };

  // Handle the file input change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onDrop(Array.from(files));
    }
  };

  return (
    <div className='max-h-50 flex flex-col items-center justify-center w-full relative rounded-md border border-input px-8 py-4 text-sm shadow-sm mb-4'>
      {state?.userProfile?.pic ? (
        <div className='flex w-full items-center justify-around'>
          <div className='grow'>
            {state?.userProfile?.pic && (
              <img
                src={`https://profilee-webapp.s3.amazonaws.com/${
                  state.userProfile.pic
                }?lastUpdated=${Date.now()}`}
                alt='Profile link image'
                width={120}
                height={120}
                className='flex h-[120px] w-[120px] m-auto rounded-full hover:cursor-pointer'
              />
            )}
          </div>
          <div className='flex flex-col grow gap-5'>
            <Button
              className='w-full rounded-full bg-red-500 text-sm font-medium text-white hover:text-white hover:bg-red-400'
              variant='ghost'
              onClick={async (e) => {
                e.stopPropagation();
                const res = await deleteProfilePic.mutateAsync();
                if (res?.message) {
                  dispatch({
                    type: 'UPDATE_PROFILE_IMG',
                    payload: ''
                  });
                }
              }}
            >
              Remove
            </Button>
            <Button
              className='w-full rounded-full bg-blue-500 text-sm font-medium text-white hover:text-white hover:bg-blue-400'
              onClick={() => {
                // Trigger the hidden file input click
                fileInputRef.current?.click();
              }}
              variant='ghost'
            >
              Update Photo
            </Button>
          </div>
        </div>
      ) : (
        <Dropzone
          title='Drag and drop an image file here, or click to select a file'
          accept={{
            'image/jpeg': [],
            'image/png': [],
            'image/avif': [],
            'image/gif': [],
            'image/webp': []
          }}
          onDrop={onDrop}
        />
      )}
      {isUploading && (
        <div className='w-3/6 mt-4'>
          <Progress value={progress} className='w-full' />
        </div>
      )}
      {/* Hidden file input element for update to work*/}
      <input
        type='file'
        accept='image/jpeg,image/png,image/avif,image/gif,image/webp'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
