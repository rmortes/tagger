export default async function renderHtmlToImg(styleSheet: string, baseImageSrc: string, { height, width }: { height: number, width: number }, html: string) {
  const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${width}"
  height="${height}">
  <defs>
    <style>
    ${styleSheet}
    </style>
  </defs>
  <image
    width="${width}" height="${height}"
    xlink:href="${baseImageSrc}"
  />
<foreignObject width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml">
    ${html}
  </div>
</foreignObject>
</svg>`;
  console.log(svg);
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const reader = new FileReader();
  const readerPromise = new Promise<ProgressEvent<FileReader>>((resolve, reject) => {
    reader.onload = resolve;
    reader.onerror = reject;
  });
  reader.readAsDataURL(svgBlob);
  const readerResult = await readerPromise;
  return readerResult.target!.result as string;
}