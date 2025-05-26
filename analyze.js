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

    resultBox.innerHTML = `<div class="spinner"></div> Analyzing image using Pollinations AI...`;

    try {
      const base64 = await toBase64(file); // FULL DataURL

      // Step 1: Kirim gambar ke Pollinations AI
      const captionResponse = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }) // Kirim full base64 (data:image/...)
      });

      // Debug: log isi response mentah
      const rawText = await captionResponse.text();
      console.log("Pollinations /openai response:", rawText);

      let prompt;
      try {
        const data = JSON.parse(rawText);
        prompt = data?.prompt || data?.text;
      } catch {
        resultBox.innerText = "Failed to parse Pollinations response.";
        return;
      }

      if (!prompt) {
        resultBox.innerText = "No prompt returned from Pollinations.";
        return;
      }

      resultBox.innerText = `Described as: "${prompt}"\nEnhancing...`;

      // Step 2: Enhance prompt
      const enhanceResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
      const enhancedPrompt = await enhanceResponse.text();

      // Step 3: Tampilkan dan isi textarea
      resultBox.innerText = `Enhanced Prompt:\n${enhancedPrompt}`;
      promptTextarea.value = enhancedPrompt;

      // Efek highlight
      promptTextarea.classList.add("highlight-flash");
      setTimeout(() => promptTextarea.classList.remove("highlight-flash"), 1000);

      // Scroll ke preview
      document.querySelector(".preview-panel")?.scrollIntoView({ behavior: "smooth" });

    } catch (err) {
      console.error("Analyze failed:", err);
      resultBox.innerText = "Failed to analyze image.";
    }
  });

  // Fungsi base64 dengan DataURL lengkap
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // JANGAN split
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
