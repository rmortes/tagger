export default async function renderHtmlToImg(imgElement: HTMLImageElement, baseImageSrc: string, { height, width }: { height: number, width: number }, html: string) {
  const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${width}"
  height="${height}">
  <image
    width="${width}" height="${height}"
    xlink:href="${baseImageSrc}"
  />
<foreignObject width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml">${html}</div>
</foreignObject>
</svg>`;

  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  // const svgObjectUrl = URL.createObjectURL(svgBlob);

  // const oldSrc = imgElement.src;
  // if (oldSrc && oldSrc.startsWith('blob:')) { // See https://stackoverflow.com/a/75848053/159145
  //   URL.revokeObjectURL(oldSrc);
  // }

  // return svgObjectUrl;
  const reader = new FileReader();
  const readerPromise = new Promise<ProgressEvent<FileReader>>((resolve, reject) => {
    reader.onload = resolve;
    reader.onerror = reject;
  });
  reader.readAsDataURL(svgBlob);
  const readerResult = await readerPromise;
  return readerResult.target!.result as string;
}