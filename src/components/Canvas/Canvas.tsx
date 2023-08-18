import {useEffect, useRef} from 'react';
import ImageCropper from "@/components/ImageCropper/ImageCropper";
import {StepType} from "@/pages/post/createPostModal/CreatePostModal";
import {Crop} from "react-image-crop";


type CanvasPropsType = {
  imageSRC: string
  filters: { [key: string]: string }
  step: StepType
  crop:Crop
}


export const Canvas = ({ imageSRC, filters, step, crop} : CanvasPropsType) => {
  //const { images, currentImage } = useAppSelector((state) => state.images);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    //const [{ src, originalSRC, type, filters }] = images.filter(
     // (image: ImageType) => image.originalSRC === imageSRC,
    //);

    const effects = filters.color;
    // const aspectRatio = +filters.crop;

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.src = imageSRC;

    img.onload = () => {
      const imageRatio = img.width/img.height
      const scale = img.width / 462;
      const defRatio = 462/346

      if (!crop) {
        crop ={
          unit: 'px',
          x: 0,
          y: 0,
          width: 462,
          height: 462 / imageRatio,
        }
      }


      let outputWidth =  crop.width
      let outputHeight =  crop.height


      const imageAspectRatio = crop.width / crop.height;
      // if (aspectRatio) {
      //   // if it's bigger than our target aspect ratio
      //   if (imageAspectRatio > aspectRatio) {
      //     outputWidth = outputHeight * aspectRatio;
      //   } else if (imageAspectRatio < aspectRatio) {
      //     outputHeight = outputWidth / aspectRatio;
      //   }
      // }

      console.log('crop',crop)
      if (effects) {
        ctx!.filter = effects;
      }
      if(step==='Cropping') {
        const canvasWidth = imageRatio>=1?700:700*imageRatio
        const canvasHeight = imageRatio>=1?700/imageRatio:700
        ctx!.canvas.width = canvasWidth
        ctx!.canvas.height = canvasHeight
        // ctx!.canvas.width = img.width
        // ctx!.canvas.height = img.height*scaleX
        ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);

      } else {
        console.log(imageAspectRatio,'image aspect ')
        const canvasWidth = imageAspectRatio >= 1 ? 700 : 700 * imageAspectRatio
        const canvasHeight = imageAspectRatio >= 1 ? 700 / imageAspectRatio : 700
        console.log(canvasHeight,canvasWidth)
        ctx!.canvas.width = canvasWidth
        ctx!.canvas.height = canvasHeight
        ctx!.drawImage(img, crop.x!*scale, crop.y!*scale, crop.width * scale, crop.height * scale, 0, 0, canvasWidth, canvasHeight);

      }
    }
  }, [imageSRC, filters,step]);

  return step === 'Cropping' ?
      <ImageCropper ref={canvasRef} src={imageSRC}>
        <canvas ref={canvasRef}/>
      </ImageCropper>
      :
      <canvas ref={canvasRef}/>

};
