const es = {
  header: {
    credits: "Por Raúl Mortes",
    subtitle: "Ayudándote a añadir etiquetas a tus imágenes (en 4 sencillos pasos!) desde hace por lo menos 10 minutos",
  },
  footer: {
    made_with: "Hecho con",
    by: "por",
    source_available: "Código fuente disponible en",
    if_broken: "Si algo no funciona, o tienes una sugerencia, por favor",
    open_issue: "abre una issue",
  },
  app: {
    step_1: {
      title: "Paso 1",
      description: "Selecciona las imágenes a las que quieres añadir la etiqueta",
      drag_and_drop: "Arrastra y suelta tus imágenes aquí",
    },
    step_2: {
      title: "Paso 2",
      description: "Escribe el código HTML que quieres sobre tus imágenes",
      default_html: () => `<div>
  <div style="background: rgb(81 236 8 / 40%); padding: 4px; position: absolute; top: 10px; right: 0; color: white; font-size: 200%;">
    ¡Hoy tienes buena pinta!
  </div>
</div>
`,
    },
    step_3: {
      title: "Paso 3",
      description: "Genera y previsualiza tus imágenes",
      generate: "Generar",
    },
    step_4: {
      title: "Paso 4",
      description: "Descarga tus imágenes",
      download: "Descargar",
      may_take_a_while: "Esto puede tardar un rato dependiendo del número de imágenes que tengas",
    }
  }
}

export default es;