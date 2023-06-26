export default function Footer() {
  return (
    <div class="flex flex-col items-center w-full py-12px fixed bottom-0 left-0 footer text-.8rem">
      <p class="text-center max-w-80%">
        Made with <span class="text-#1880a1">❤</span> by <a href="https://raul.zip" target="_blank" rel="noopener noreferrer">Raúl Mortes</a>
      </p>
      <p class="text-center max-w-80%">
        Source code available on <a href="https://github.com/rmortes/tagger" target="_blank" rel="noopener noreferrer">GitHub</a>.
        If something's broken, or you have a suggestion, please <a href="https://github.com/rmortes/tagger/issues" target="_blank" rel="noopener noreferrer">open an issue</a>.
      </p>
    </div>
  )
}