'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, PercentCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import setCanvasPreview from '../appearance/profile-section/set-canvas-preview';

function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(',');
  const match = arr[0]?.match(/:(.*?);/);
  const mime = match ? match[1] : ''; // Fallback to an empty string if match is null
  if (!arr[1]) {
    throw new Error('Invalid data URL'); // Or handle it another way
  }
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;
// Dialog for image crop
export default function ImageCropDialog({
  open,
  setOpen,
  imgSrcUrl,
  onCropComplete
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  imgSrcUrl: string;
  onCropComplete: (croppedImageBlob: Blob) => {};
}) {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [crop, setCrop] = useState<PercentCrop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;

    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCrop = async () => {
    if (imgRef.current && previewCanvasRef.current && completedCrop) {
      setCanvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      const dataUrl = previewCanvasRef.current.toDataURL();
      // You can now use the dataUrl as needed
      setOpen(false);
      console.log({ dataUrl });
      onCropComplete(dataURLtoBlob(dataUrl));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-max max-w-sm md:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>
        <ReactCrop
          crop={crop}
          onChange={(_: PixelCrop, percentCrop: PercentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          circularCrop
          keepSelection
          aspect={ASPECT_RATIO}
          minWidth={MIN_DIMENSION}
          maxHeight={250}
        >
          {/* <img src={'https://profilee-webapp.s3.amazonaws.com/clznqd7y70000nr6gw3l2iaid'} /> */}
          <img ref={imgRef} src={imgSrcUrl} alt='Upload' onLoad={onImageLoad} />
        </ReactCrop>

        <div className='flex gap-x-4'>
          <Button type='button' variant='outline' onClick={handleCrop} className='w-full'>
            Crop
          </Button>
        </div>
      </DialogContent>
      {completedCrop && (
        <canvas
          ref={previewCanvasRef}
          className='mt-4'
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: completedCrop.width,
            height: completedCrop.height
          }}
        />
      )}
    </Dialog>
  );
}
