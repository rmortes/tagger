const en = {
  header: {
    credits: "By Raúl Mortes",
    subtitle: "Helping you add tags to images (in 4 easy steps!) since probably yesterday",
  },
  footer: {
    made_with: "Made with",
    by: "by",
    source_available: "Source code available on",
    if_broken: "If something's broken, or you have a suggestion, please",
    open_issue: "open an issue",
  },
  app: {
    step_1: {
      title: "Step 1",
      description: "Select the images you want to apply the tag to",
      drag_and_drop: "Drag and drop your images here",
    },
    step_2: {
      title: "Step 2",
      description: "Write the HTML code you want over your images",
      default_html: () => `<div>
  <div style="background: rgb(81 236 8 / 40%); padding: 4px; position: absolute; top: 10px; right: 0; color: white; font-size: 200%;">
    This is such a great tag...
  </div>
</div>
`,
    },
    step_3: {
      title: "Step 3",
      description: "Generate and preview your images",
      generate: "Generate",
    },
    step_4: {
      title: "Step 4",
      description: "Download your images",
      download: "Download",
      may_take_a_while: "This may take a while depending on the number of images you have",
    }
  }
}

export default en;