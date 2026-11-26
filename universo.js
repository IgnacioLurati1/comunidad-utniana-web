// Antes de pintar: si esta compu puede mostrar el universo en 3D, la portada es el universo y no se deja ver la de
// las herramientas mientras carga. Es un archivo aparte porque la CSP no deja scripts dentro del HTML.
// El resultado queda en <html data-placa> para src/lib/universo.js, que así no vuelve a probar la placa.
(function () {
  var html = document.documentElement;
  var si = false;
  try {
    if (window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) {
      var lienzo = document.createElement('canvas');
      // Sin la placa de video (aceleración por hardware apagada) el navegador no da el contexto con esta opción.
      var opciones = { failIfMajorPerformanceCaveat: true };
      var gl = lienzo.getContext('webgl2', opciones) || lienzo.getContext('webgl', opciones);
      if (gl) {
        var info = gl.getExtension('WEBGL_debug_renderer_info');
        var placa = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
        var perder = gl.getExtension('WEBGL_lose_context');
        if (perder) perder.loseContext();
        si = !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(placa);
      }
    }
  } catch (e) {
    si = false;
  }
  html.dataset.placa = si ? 'si' : 'no';
  var base = new URL('./', document.currentScript.src).pathname;
  if (si && location.pathname === base) html.classList.add('va-universo');
})();
