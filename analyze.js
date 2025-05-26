 // analyze.js
document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze-btn");
  const fileInput = document.getElementById("image-input");
  const resultBox = document.getElementById("analyze-result");
  const promptTextarea = document.getElementById("prompt");
  const previewPanel = document.querySelector(".preview-panel");

  analyzeBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      resultBox.innerText = "Please upload an image first.";
      return;
    }

    resultBox.innerHTML = `<div class="spinner"></div> Analyzing image using Pollinations AI...`;

    try {
      const base64 = await toBase64(file);

      const captionResponse = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 })
      });

      const captionData = await captionResponse.json();
      const prompt = captionData?.prompt || captionData?.text;

      if (!prompt) {
        resultBox.innerText = "No prompt received from Pollinations.";
        return;
      }

      resultBox.innerText = `Image described as: "${prompt}"\nEnhancing...`;

      const enhanceResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
      const enhancedPrompt = await enhanceResponse.text();

      resultBox.innerText = `Enhanced Prompt:\n${enhancedPrompt}`;
      promptTextarea.value = enhancedPrompt;

      // Highlight textarea
      promptTextarea.classList.add("highlight-flash");
      setTimeout(() => promptTextarea.classList.remove("highlight-flash"), 1000);

      // Scroll ke preview
      if (previewPanel) {
        previewPanel.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      resultBox.innerText = "Failed to process image.";
    }
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
