import { createSignal, type Component } from 'solid-js';
import Header from './header';
import Step from './step';
import PreviewImage from './previewImage';
import sanitizeHtml from 'sanitize-html';
import renderAndDownloadImages from './utils/renderAndDownloadImages';
import downloadIcon from './assets/icons/download.svg';
import helpIcon from './assets/icons/help.svg';
import Footer from './footer';
import { useScopedI18n } from '@solid-primitives/i18n';
import Modal from './modal';


const App: Component = () => {
  const [t] = useScopedI18n("app");
  const [images, setImages] = createSignal<File[]>([]);
  const [rawHtml, setRawHtml] = createSignal<string>();
  const [styleSheet, setStyleSheet] = createSignal<string>('');
  const [candidateHtml, setCandidateHtml] = createSignal<string>();
  const [clickedDownload, setClickedDownload] = createSignal<boolean>(false);
  const validatedHtml = () => sanitizeHtml(rawHtml(), {
    parseStyleAttributes: false,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['style', 'class'],
    },
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['style']),
    allowVulnerableTags: true,
  })
  const generateImages = () => {
    setCandidateHtml(validatedHtml());
    document.getElementById('step-3')?.scrollIntoView({ behavior: 'smooth' });
  }
  function addImages(files: FileList) {
    if (images().length === 0) setRawHtml(t("step_2.default_html"));
    setImages([...Array.from(files), ...images()]);
    document.getElementById('step-2')?.scrollIntoView({ behavior: 'smooth' });
  }
  function removeImage(index: number) {
    setImages(images().filter((_, i) => i !== index));
  }
  function download() {
    renderAndDownloadImages(images(), candidateHtml())
    setClickedDownload(true);
    document.getElementById('step-4')?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div class="max-w-800px w-90vw mx-auto mt-32px mb-128px">
      <Header />
      <Step
        id="step-1"
        title={t("step_1.title")}
        description={t("step_1.description")}
      >
        <label for="file-upload" data-type="file">
          <span>{t("step_1.drag_and_drop")}</span>
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
        id="step-2"
        title={t("step_2.title")}
        description={t("step_2.description")}
      >
        <div class="flex flex-row gap-10px w-full overflow-x-auto overflow-y-hidden flex-wrap lg:flex-nowrap">
          <div class="flex flex-1 flex-col w-full">
            <h3 class="m-0 mb-4px">{t("step_2.style")}
              <Modal button={
                <img src={helpIcon} alt="" class="w-24px cursor-pointer" />
              }>
                <h2 class="pe-24px">{t("step_2.info.title")}</h2>
                <p>{t("step_2.info.description")}</p>
                <details class="mt-16px">
                  <summary><h3 class="inline">{t("step_2.info.load_fonts.title")}</h3></summary>
                  <p innerHTML={t("step_2.info.load_fonts.body")} class="font-200"></p>
                </details>
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
                  onClick={(e) => e.target.dispatchEvent(new CustomEvent('modal:close', { bubbles: true, }))}>
                  X
                </button>
              </Modal>
            </h3>
            <textarea
              class="w-full h-full"
              value={styleSheet()}
              onInput={(e) => setStyleSheet(e.target.value)}
            />
            <h3 class="m-0 mb-4px">{t("step_2.html")}</h3>
            <textarea
              class="w-full h-full"
              value={rawHtml()}
              onInput={(e) => setRawHtml(e.target.value)}
            />
          </div>
          <div class="flex justify-center w-full lg:w-auto">
            <PreviewImage imageFile={images()[0]} html={validatedHtml()} styleSheet={styleSheet()} />
          </div>
        </div>
      </Step>}
      {
        images().length && <Step
          id="step-3"
          title={t("step_3.title")}
          description={t("step_3.description")}
        >
          <button class="action" onClick={generateImages}>{t("step_3.generate")}</button>
          {candidateHtml() && <div class="flex flex-nowrap flex-row gap-10px w-full overflow-auto overflow-y-hidden mt-32px">
            {images().map((image, index) => (
              <div class="image-height">
                <PreviewImage imageFile={image} html={candidateHtml()} styleSheet={styleSheet()} />
              </div>
            ))}
          </div>
          }
        </Step>
      }
      {
        candidateHtml() && <Step
          id="step-4"
          title={t("step_4.title")}
          description={t("step_4.description")}
        >
          <button class="action" onClick={download}>
            <img src={downloadIcon} alt="" class="w-24px h-24px mr-8px" />
            {t("step_4.download")}
          </button>
          {clickedDownload() && <div class="mt-24px">{t("step_4.may_take_a_while")}</div>}
        </Step>
      }
      <Footer />
    </div >
  );
};

export default App;
