const handleImageGeneration = (e) => {
  e.preventDefault();  // Prevent form from submitting the default way

  const userPrompt = e.srcElement[0].value; // Get the text prompt
  const userImgQuantity = parseInt(e.srcElement[1].value);  // Get the number of images

  generateBtn.setAttribute("disabled", true);
  generateBtn.innerText = "Generating";
  isImageGenerating = true;
  
  // Display loading images while waiting for response
  const imgCardMarkup = Array.from({ length: userImgQuantity }, () => 
      `<div class="img-card loading">
        <img src="images/loader.svg" alt="AI generated image">
        <a class="download-btn" href="#">Download</a>
      </div>`
  ).join("");
  
  imageGallery.innerHTML = imgCardMarkup;

  // Sending the POST request with the prompt and quantity
  fetch("http://127.0.0.1:5000/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: userPrompt,
      n: userImgQuantity,
      size: "512x512",
      response_format: "b64_json"
    }),
  })
  .then(response => response.json())
  .then(data => {
    updateImageCard(data);
  })
  .catch(error => {
    alert(error.message);
  })
  .finally(() => {
    generateBtn.removeAttribute("disabled");
    generateBtn.innerText = "Generate";
    isImageGenerating = false;
  });
}
