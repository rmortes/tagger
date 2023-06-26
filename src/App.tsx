import { createSignal, type Component } from 'solid-js';
import Header from './header';
import Step from './step';
import PreviewImage from './previewImage';
import sanitizeHtml from 'sanitize-html';
import renderAndDownloadImages from './utils/renderAndDownloadImages';
import downloadIcon from './assets/icons/download.svg';
import Footer from './footer';

const defaultDiv = `<div>
  <div style="background: rgb(81 236 8 / 40%); padding: 4px; position: absolute; top: 10px; right: 0; color: white; font-size: 200%;">
    This is such a great tag...
  </div>
</div>
`;


const App: Component = () => {
  const [images, setImages] = createSignal<File[]>([]);
  const [rawHtml, setRawHtml] = createSignal<string>(defaultDiv);
  const [candidateHtml, setCandidateHtml] = createSignal<string>();
  const [clickedDownload, setClickedDownload] = createSignal<boolean>(false);
  const validatedHtml = () => sanitizeHtml(rawHtml(), {
    parseStyleAttributes: false,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['style'],
    }
  })
  const generateImages = () => {
    setCandidateHtml(validatedHtml());
    document.getElementById('step-Step 3')?.scrollIntoView({ behavior: 'smooth' });
  }
  function addImages(files: FileList) {
    setImages([...Array.from(files), ...images()]);
    document.getElementById('step-Step 2')?.scrollIntoView({ behavior: 'smooth' });
  }
  function removeImage(index: number) {
    setImages(images().filter((_, i) => i !== index));
  }
  function download() {
    renderAndDownloadImages(images(), candidateHtml())
    setClickedDownload(true);
    document.getElementById('step-Step 4')?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div class="max-w-800px w-90vw mx-auto mt-32px mb-128px">
      <Header />
      <Step
        title="Step 1"
        description="Select the images you want to apply the tag to"
      >
        <label for="file-upload" data-type="file">
          <span>Drag and drop your images here</span>
          <input id="file-upload" type="file" multiple onChange={(e) => addImages(e.target.files!)} />
        </label>
        <div class="flex flex-nowrap flex-row gap-10px w-full overflow-auto overflow-y-hidden mt-32px">
          {images().map((image, index) => (
            <div class="relative h-300px">
              <img src={URL.createObjectURL(image)} alt="" class="h-full" />
              <button
                class="
                  absolute 
                  top-4px
                  right-4px
                  text-24px
                  w-32px
                  h-32px
                  border-0
                  rd-4px
                  bg-lightblue
                  color-white
                "
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </Step>
      {images().length && <Step
        title="Step 2"
        description="Write the HTML code you want over your images"
      >
        <div class="flex flex-row gap-10px w-full overflow-x-auto overflow-y-hidden flex-wrap lg:flex-nowrap">
          <div class="flex flex-1 w-full">
            <textarea
              class="w-full image-height"
              value={rawHtml()}
              onInput={(e) => setRawHtml(e.target.value)}
            />
          </div>
          <div class="flex justify-center w-full lg:w-auto">
            <PreviewImage imageFile={images()[0]} html={validatedHtml()} />
          </div>
        </div>
      </Step>}
      {images().length && <Step
        title="Step 3"
        description="Generate and preview your images"
      >
        <button class="action" onClick={generateImages}>Generate</button>
        {candidateHtml() && <div class="flex flex-nowrap flex-row gap-10px w-full overflow-auto overflow-y-hidden mt-32px">
          {images().map((image, index) => (
            <div class="image-height">
              <PreviewImage imageFile={image} html={candidateHtml()} />
            </div>
          ))}
        </div>
        }
      </Step>}
      {candidateHtml() && <Step
        title="Step 4"
        description="Download your images"
      >
        <button class="action" onClick={download}>
          <img src={downloadIcon} alt="" class="w-24px h-24px mr-8px" />
          Download
        </button>
        {clickedDownload() && <div class="mt-24px">This may take a while depending on the number of images you have</div>}
      </Step>}
      <Footer />
    </div>
  );
};

export default App;
