import { JSX, createEffect, createSignal } from "solid-js";
import renderHtmlToImg from "./utils/renderHtmlToImg";

interface PreviewImageProps {
  imageFile: File;
  html: string;
  styleSheet: string;
}

export default function PreviewImage(props: PreviewImageProps) {
  const [originalImageSrc, setOriginalImageSrc] = createSignal<string>();
  const [imgDimensions, setImgDimensions] = createSignal<{ height: number, width: number }>();
  const [editedImageSrc, setEditedImageSrc] = createSignal<string>();

  const img = <img src={editedImageSrc()} alt="" class="image-height" /> as HTMLImageElement;

  createEffect(() => {
    if (!props.imageFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImageSrc(e.target!.result as string);
      const img = new Image();
      img.onload = function () {
        setImgDimensions({ height: img.height, width: img.width });
      }
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(props.imageFile);
  });

  createEffect(async () => {
    if (!props.html || !originalImageSrc() || !imgDimensions()) return;
    setEditedImageSrc(await renderHtmlToImg(props.styleSheet, originalImageSrc(), imgDimensions(), props.html));
  });

  return (
    <div class="relative image-height">
      {img}
    </div>
  );
}