 // analyze.js
document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze-btn");
  const fileInput = document.getElementById("image-input");
  const resultBox = document.getElementById("analyze-result");

  analyzeBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      resultBox.innerText = "Please upload an image first.";
      return;
    }

    resultBox.innerText = "Analyzing image...";

    try {
      const base64 = await toBase64(file);
      const response = await fetch("https://image.pollinations.ai/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 })
      });

      const data = await response.json();
      resultBox.innerText = `Prompt: ${data.prompt || "No prompt returned."}`;
    } catch (err) {
      console.error(err);
      resultBox.innerText = "Failed to analyze image.";
    }
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
