// navbar animation start
const getAnimate = () => {
  const tl = gsap.timeline();
  tl.from("nav", {
    y: -25,
    duration: 1.5,
    opacity: 0,
    delay: 0.2,
    scale: 0.5,
    ease: "power3.out",
  });
};

// navbar animation end

// loader animation start
document.addEventListener("DOMContentLoaded", function () {
  // Set initial state for progress bar
  gsap.set("#progress-bar", { width: 0 });

  // Animate brand name
  gsap.to("#brand-name", {
    opacity: 1,
    duration: 1.2,
    ease: "power2.out",
    y: -20,
  });

  // Initialize progress animation
  const progressBar = document.getElementById("progress-bar");
  const percentageDisplay = document.getElementById("percentage-display");

  // Define the loading steps with percentages and durations
  const loadingSteps = [
    { to: 23, duration: 1, delay: 0.1 },
    { pause: 0.1 },
    { to: 42, duration: 1.2, delay: 0.1 },
    { pause: 0.1 },
    { to: 65, duration: 1, delay: 0.1 },
    { pause: 0.1 },
    { to: 83, duration: 1.5, delay: 0.1 },
    { pause: 0.1 },
    { to: 100, duration: 1.2, delay: 0.1 },
  ];

  let timeline = gsap.timeline({
    onComplete: completeLoading,
  });

  // Function to animate percentage text character by character
  function animatePercentageText(percentage) {
    // Clear previous percentage
    percentageDisplay.innerHTML = "";

    // Create character elements
    const chars = percentage.toString().split("");
    if (chars[chars.length - 1] !== "%") {
      chars.push("%");
    }

    chars.forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.className = "percentage-char";
      charSpan.textContent = char;
      if (!isNaN(char) || char === "%") {
        charSpan.style.width = "0.7em";
        charSpan.style.textAlign = "center";
      }
      percentageDisplay.appendChild(charSpan);
    });

    const charElements = percentageDisplay.querySelectorAll(".percentage-char");
    gsap.to(charElements, {
      opacity: 1,
      x: 0,
      duration: 0.2,
      stagger: 0.1,
      ease: "power2.out",
    });
  }

  loadingSteps.forEach((step, index) => {
    if (step.to !== undefined) {
      timeline.add(() => {
        animatePercentageText(step.to);
      }, "+=" + (step.delay || 0));

      timeline.to(
        progressBar,
        {
          width: step.to + "%",
          duration: step.duration,
          ease: "power1.out",
          force3D: true,
        },
        "+=0.1"
      );
    } else if (step.pause) {
      timeline.add(() => {
        gsap.to(progressBar, {
          y: -1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });
      }, "+=" + step.pause);
    }
  });

  function completeLoading() {
    gsap.to("#brand-name", {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
    });

    gsap.to("#loading-screen", {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.in",
      onComplete: function () {
        document.getElementById("loading-screen").classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        window.scrollTo(0, 0); // Scroll to top of the page
        const mainContent = document.querySelector("main");
        if (mainContent) {
          mainContent.classList.remove("hidden"); // Show main content
          getAnimate(); // Trigger navbar animation
          gsap.from(mainContent, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          });
        }
      },
    });
  }
});
// loader animation end
