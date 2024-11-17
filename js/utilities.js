
 export function showSnackBar(message, autoclose) {
  const SnackBar = document.querySelector("#snackbar");
  SnackBar.innerHTML = message;
  SnackBar.className = "show";

  // escondemos el snackbar
  if (autoclose) {
    setTimeout(() => {
      SnackBar.className = SnackBar.className.replace("show", "");
    }, 5000);
  }
}

// funcion para detectar cambios en la conexion a internet
export function noInternet() {
  showSnackBar("Se ha perdido la conexión a Internet", false);
}

//
export function internetRestored() {
  showSnackBar("La conexión a interent a sido reestablecida", true);
}

