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

    resultBox.innerText = "Uploading image to Pollinations...";

    try {
      const base64 = await toBase64(file);

      // 1. Kirim ke Pollinations (image-to-text)
      const captionResponse = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 })
      });

      const captionData = await captionResponse.json();
      const rawPrompt = captionData?.prompt || captionData?.text || "";

      if (!rawPrompt) {
        resultBox.innerText = "No prompt returned from image.";
        return;
      }

      resultBox.innerText = `Image described as: "${rawPrompt}"\nEnhancing...`;

      // 2. Enhance deskripsi via GET ke /{prompt}
      const enhancedResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(rawPrompt)}`);
      const enhancedPrompt = await enhancedResponse.text();

      // 3. Tampilkan hasil akhir dan isi textarea
      resultBox.innerText = `Enhanced Prompt:\n${enhancedPrompt}`;
      promptTextarea.value = enhancedPrompt;
    } catch (err) {
      console.error(err);
      resultBox.innerText = "Failed to analyze image with Pollinations.";
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
