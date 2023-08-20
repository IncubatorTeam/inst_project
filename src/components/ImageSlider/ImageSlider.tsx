import { StepType } from "@/pages/post/createPostModal/CreatePostModal";
import { setCurrentImage } from '@/shared/lib/imageStore';
import { ImageType } from '@/shared/lib/types/store';
import { useAppDispatch } from '@/store';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Canvas } from '../Canvas/Canvas';
import s from './ImagesSlider.module.scss';


type ImageSliderPropsType = {
  currImage: {src: string, hash: string}
  images: Array<ImageType>;
  step: StepType
};

export const ImageSlider = ({ currImage, images, step }:ImageSliderPropsType) => {

  const dispatch = useAppDispatch();
  const itemsRef = useRef({});
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    //@ts-ignore
    itemsRef.current[currImage.src]?.scrollIntoView();
    const index = images.findIndex((image) => image.originalSRC === currImage.src);
    if (index > -1) {
      setCurrentImageIdx(index);
    }
  }, [currImage, images]);

  const bulletHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value) {
      dispatch(setCurrentImage(e.currentTarget.value));
    }
  };

  const changeCurrentImageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    images.forEach(({ originalSRC }, i) => {
      if (originalSRC === currImage.src) {
        let newIndex = i;
        if (value === 'prev' && i > 0) {
          --newIndex;
          setCurrentImageIdx(newIndex);
        }
        if (value === 'next' && images.length !== i + 1) {
          ++newIndex;
          setCurrentImageIdx(newIndex);
        }
        if (newIndex !== i) {
          dispatch(setCurrentImage(images[newIndex].originalSRC));
        }
      }
    });
  };

  return (
    <div className={s.slider}>
      {images.length > 1 && (
        <>
          {currentImageIdx > 0 && (
            <button value={'prev'} className={s.prevBtn} onClick={changeCurrentImageHandler}>
              <span className="icon_arrowIosBackLeft"></span>
            </button>
          )}
          {currentImageIdx + 1 < images.length && (
            <button value={'next'} className={s.nextBtn} onClick={changeCurrentImageHandler}>
              <span className="icon_arrowIosForwardRight"></span>
            </button>
          )}
        </>
      )}
      {images.length > 0 && (
        <ul className={s.slider__list}>
          {images.map(({ src, originalSRC, filters,crop }) => (
            <li
              key={src}
              className={s.slider__item}
              //@ts-ignore
              ref={(el) => (itemsRef.current[src] = el)}
            >
              <Canvas imageSRC={originalSRC} filters={filters} step={step} crop={crop} />
            </li>
          ))}
        </ul>
      )}

      {images.length > 1 && (
        <ul className={s.bullets}>
          {images.map(({originalSRC}) => (
            <li key={originalSRC} className={s.bullets__item}>
              <button
                className={s.btn + ' ' + (originalSRC === currImage.src ? s.btn_active : '')}
                value={originalSRC}
                onClick={bulletHandler}
              ></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
