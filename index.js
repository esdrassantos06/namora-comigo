let counter = 0;
    let pixels = [];
    const btnContainer = document.getElementById("btn-container");
    const btn = document.getElementById("botao");

    btn.addEventListener("mouseover", () => {
      desvia(btn);
    });

    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      desvia(btn);
    });

    function sim() {
      alert("Você aceitou namorar comigo! :)");
      window.open("https://www.youtube.com/watch?v=izGwDsrQ1eQ");
    }

    function randomNum(max) {
      return Math.floor(Math.random() * max);
    }

    function desvia(btn) {
      const containerRect = btnContainer.getBoundingClientRect();

      const maxW = containerRect.width - btn.offsetWidth;
      const maxH = containerRect.height - btn.offsetHeight;

      btn.style.position = "absolute";

      const randomX = randomNum(maxW);
      const randomY = randomNum(maxH);

      btn.style.left = randomX + "px";
      btn.style.top = randomY + "px";

      counter++;

      if (counter >= 10) {
        desintegrate(btn);
      }
    }

    function desintegrate(btn) {
      btn.classList.add("desintegrating");

      const btnRect = btn.getBoundingClientRect();
      const containerRect = btnContainer.getBoundingClientRect();

      const relativeLeft = btnRect.left - containerRect.left;
      const relativeTop = btnRect.top - containerRect.top;

      const pixelCount = 30;

      for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";

        const x = relativeLeft + Math.random() * btnRect.width;
        const y = relativeTop + Math.random() * btnRect.height;

        pixel.style.left = `${x}px`;
        pixel.style.top = `${y}px`;

        btnContainer.appendChild(pixel);
        pixels.push(pixel);

        setTimeout(() => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 100;

          pixel.style.transform = `translate(${Math.cos(angle) * distance}px, ${
            Math.sin(angle) * distance
          }px) rotate(${Math.random() * 360}deg)`;
          pixel.style.opacity = "0";
        }, i * 10);
      }

      btn.style.opacity = "0";
      btn.style.pointerEvents = "none";

      setTimeout(() => {
        const message = document.createElement("h3");
        message.textContent = "Não tem como fugir... só me aceitar! 💕";
        message.style.color = "#e74c3c";
        message.style.fontWeight = "semibold";
        btnContainer.appendChild(message);
      }, 800);

      setTimeout(() => {
        pixels.forEach((p) => {
          if (p.parentNode) {
            p.parentNode.removeChild(p);
          }
        });
        pixels = [];
      }, 1000);
    }