import JSZip from "jszip";
import renderHtmlToImg from "./renderHtmlToImg";
import { saveAs } from 'file-saver';

export default async function renderAndDownloadImages(images: File[], html: string) {
  const imageResult: { [key: string]: string } = {};
  for (const image of images) {
    const reader = new FileReader();
    const readerPromise = new Promise<ProgressEvent<FileReader>>((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
    });
    reader.readAsDataURL(image);
    const readerResult = await readerPromise;
    const img = new Image();
    const imgPromise = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    img.src = readerResult.target!.result as string;
    await imgPromise;
    const imgElement = document.createElement('img');
    const renderedObjectB64 = await renderHtmlToImg(imgElement, img.src, { height: img.height, width: img.width }, html);

    const renderedImage = new Image();
    const renderedImagePromise = new Promise((resolve, reject) => {
      renderedImage.onload = resolve;
      renderedImage.onerror = reject;
    });
    renderedImage.src = renderedObjectB64;
    await renderedImagePromise;

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(renderedImage, 0, 0);

    imageResult[image.name] = canvas.toDataURL('image/png');
  }

  const zip = new JSZip();
  for (const [name, dataUrl] of Object.entries(imageResult)) {
    const nameParts = name.split('.');
    nameParts[nameParts.length - 1] = 'png';
    const pngName = nameParts.join('.');

    zip.file(pngName, dataUrl.split(',')[1], { base64: true });
  }
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'images.zip');

}