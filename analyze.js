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

    resultBox.innerText = "Simulating artistic description from image...";

    try {
      // Daftar caption gaya seni & tema kaya
      const dummyCaptions = [
        "a dreamy surrealist landscape with floating islands and melting clocks, in the style of Salvador Dalí",
        "a futuristic cyberpunk alleyway glowing with neon lights and rain, cinematic composition",
        "a photorealistic close-up of a tiger in misty jungle, soft lighting",
        "an anime-style schoolgirl standing under sakura trees during golden hour",
        "a medieval fantasy castle on a cliff, surrounded by dragons and stormy skies",
        "a watercolor painting of a peaceful Japanese koi pond with lily pads",
        "a highly detailed steampunk airship floating over a Victorian city",
        "a fractal-style glowing portal in a dark cosmic dimension",
        "a mystical forest path lit by glowing mushrooms and fairies, Studio Ghibli-inspired",
        "a cinematic sci-fi battle on a barren planet with massive starships",
        "a hyperrealistic portrait of an old wizard with glowing eyes and a flowing beard",
        "a minimalist digital art of mountains and sun in pastel colors",
        "a baroque-style oil painting of a banquet scene with rich textures and ornate lighting",
        "a digital painting of a cat astronaut floating in space with Earth in the background",
        "a charcoal sketch of a rainy Paris street scene with vintage cars and umbrellas",
        "a retro 80s synthwave city with glowing grid roads and a pink sky",
        "a fantasy underwater kingdom with mermaids and coral castles",
        "a gothic cathedral interior with stained glass and candlelight",
        "a cinematic scene of a lone wanderer in a sandstorm desert, inspired by Dune",
        "an abstract generative artwork made of colorful geometry and noise textures"
      ];

      // Delay palsu seolah-olah sedang menganalisis
      await new Promise(res => setTimeout(res, 1000));
      const caption = dummyCaptions[Math.floor(Math.random() * dummyCaptions.length)];

      resultBox.innerText = `Image described as: "${caption}"\nEnhancing prompt...`;

      // Kirim ke Pollinations enhancer
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(caption)}`);
      const pollinationPrompt = await response.text();

      // Tampilkan dan isi prompt
      resultBox.innerText = `Enhanced Prompt:\n${pollinationPrompt}`;
      promptTextarea.value = pollinationPrompt;

      // Efek visual ke prompt
      promptTextarea.classList.add("highlight-flash");
      setTimeout(() => promptTextarea.classList.remove("highlight-flash"), 1000);
    } catch (err) {
      console.error(err);
      resultBox.innerText = "Failed to simulate and enhance prompt.";
    }
  });
});
