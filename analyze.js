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

    resultBox.innerText = "Generating description from image...";

    try {
      // 1. Simulasi image-to-text (captioning)
      const dummyCaptions = [
        "a futuristic city skyline at night",
        "a serene lake surrounded by mountains",
        "a cat wearing sunglasses on the beach",
        "a cyberpunk woman with neon lights",
        "a fantasy dragon flying through the clouds"
      ];
      await new Promise(res => setTimeout(res, 1500)); // Simulasi delay
      const caption = dummyCaptions[Math.floor(Math.random() * dummyCaptions.length)];

      resultBox.innerText = `Image description: "${caption}"\nFetching enhanced prompt...`;

      // 2. Kirim caption ke Pollinations
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(caption)}`);
      const pollinationPrompt = await response.text();

      // 3. Tampilkan dan isi prompt
      resultBox.innerText = `Pollinations Prompt:\n${pollinationPrompt}`;
      promptTextarea.value = pollinationPrompt;
    } catch (err) {
      console.error(err);
      resultBox.innerText = "Failed to analyze image and fetch prompt.";
    }
  });
});
