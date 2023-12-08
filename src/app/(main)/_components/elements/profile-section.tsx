import { Card } from '@/components/ui/card';
import { InputHTMLAttributes, useRef, useState, useContext } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDesigner from '@/hooks/use-designer';
import Image from 'next/image';
import { AiOutlineYoutube } from 'react-icons/ai';

export default function ProfileSection() {
  const { setBio, setTitle, setProfileImg, profileImg } = useDesigner();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setProfileImg(imageUrl);
      }
    }
  };
  return (
    <Card className='my-2'>
      <div className={'flex flex-row items-center gap-x-6 p-4'}>
        <Input
          ref={fileInputRef}
          id='file-upload'
          type='file'
          onChange={handleChange}
          className='file:bg-blue-50 file:text-blue-700 hidden hover:file:bg-blue-100'
        />
        <div
          className={cn(
            'flex h-[120px] w-[120px] flex-col items-center justify-center gap-y-1 rounded-full border border-border ',
            'hover:cursor-pointer bg-background/50 overflow-hidden border-dashed relative'
          )}
          onClick={handleDivClick}
        >
          {profileImg ? (
            <>
              <Image
                key={profileImg}
                src={profileImg}
                alt='Profile link image'
                width={150}
                height={150}
                className='overflow-hidden'
              />
              <div className='hidden hover:flex absolute top-0 right-0 p-2 bg-white cursor-pointer'>
                <AiOutlineYoutube className='text-2xl hover:scale-125' />
              </div>
            </>
          ) : (
            <>
              <AiOutlineCloudUpload className='h-8 w-8 text-muted-foreground' />{' '}
              <Label htmlFor='file-upload'>Upload</Label>
            </>
          )}
        </div>
        <div>
          <Label htmlFor='profile'>Title</Label>
          <Input id='profile' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor='bio'>Bio</Label>
          <Input id='bio' onChange={(e) => setBio(e.target.value)} />
        </div>
      </div>
    </Card>
  );
}
