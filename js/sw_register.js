if (navigator.serviceWorker) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(response => {
        console.log("Service worker registered");
      })
      .catch(error => {
        console.log(error);
      });
  });
}
