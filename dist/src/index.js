const URL_API = "https://condensed-api.onrender.com";

const copyUrl = (targetUrl) => {
  document.addEventListener("click", (event) => {
    if (
      event.target.matches("span") &&
      event.target.classList.contains("clipboard")
    ) {
      navigator.clipboard.writeText(targetUrl);
    }
  });
};

let content = document.querySelector(".urlLink");

const displayUrl = (url) => {
  let condensedUrl = document.createElement("div");
  condensedUrl.classList.add("condensedUrl");

  let urlLink = document.createElement("a");
  urlLink.classList.add("urlLink");
  urlLink.href = url;
  urlLink.target = "_blank";
  urlLink.textContent = url;

  let clipboardButton = document.createElement("span");
  clipboardButton.classList.add("clipboard");

  condensedUrl.appendChild(urlLink);
  condensedUrl.appendChild(clipboardButton);

  content.appendChild(condensedUrl);
};

const urlForm = document.querySelector(".urlForm");

urlForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(urlForm);

  // Make request to API
  try {
    let request = await fetch(`${URL_API}/condense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: formData.get("url") }),
    });

    let response = await request.json();

    if (response.newUrl) {
      displayUrl(response.newUrl);
      copyUrl(response.newUrl);
    } else {
      displayUrl("Something went wrong");
    }
  } catch (err) {
    console.error(err);
  }
});
