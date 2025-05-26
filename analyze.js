 // analyze.js
document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze-btn");
  const fileInput = document.getElementById("image-input");
  const resultBox = document.getElementById("analyze-result");
  const promptTextarea = document.getElementById("prompt");

  analyzeBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      resultBox.innerText = "Please upload an image first.";
      return;
    }

    resultBox.innerText = "Analyzing image using Pollinations AI...";

    try {
      const base64 = await toBase64(file);

      const response = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: base64 }) // Asumsi endpoint menerima "image"
      });

      const data = await response.json();
      const prompt = data?.prompt || data?.text || "No prompt received.";

      resultBox.innerText = `Prompt: ${prompt}`;
      promptTextarea.value = prompt; // Otomatis isi textarea
    } catch (err) {
      console.error(err);
      resultBox.innerText = "Failed to analyze image.";
    }
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // Full base64 with header
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
