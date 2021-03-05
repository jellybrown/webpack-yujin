import "./app.css";
import nyancat from "./nyancat.jpg";
import hat from "./hat.png";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
        <img src="${nyancat}" /><br />
        <img src="${hat}" />

    `;
});
