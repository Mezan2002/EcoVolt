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
      timeline.add(
        () => {
          animatePercentageText(step.to);
        },
        "+=" + (step.delay || 0),
      );

      timeline.to(
        progressBar,
        {
          width: step.to + "%",
          duration: step.duration,
          ease: "power1.out",
          force3D: true,
        },
        "+=0.1",
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

// ============================================================
// PREMIUM SCROLL ANIMATIONS — added on top of existing code
// ============================================================
gsap.registerPlugin(ScrollTrigger);

function initPremiumAnimations() {
  // ── Nav icon pop-up animations ──
  const navIcons = document.querySelectorAll("nav a");
  if (navIcons.length) {
    gsap.from(navIcons, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.5,
    });
  }

  // ── Hero section entrance animations ──
  // Stagger the hero heading lines
  const heroHeadings = document.querySelectorAll("nav + section h2");
  if (heroHeadings.length) {
    gsap.from(heroHeadings, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.3,
    });
  }

  // Hero user avatars — pop in with elastic
  const heroAvatars = document.querySelectorAll(
    "nav + section > div:first-child img",
  );
  if (heroAvatars.length) {
    gsap.from(heroAvatars, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      delay: 0.2,
    });
  }

  // Hero subtitle
  const heroSubtitle = document.querySelector("nav + section h6");
  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.4,
    });
  }

  // Hero CTA button
  const heroCTA = document.querySelector("nav + section button");
  if (heroCTA) {
    gsap.from(heroCTA, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.8,
    });
  }

  // ── Hero image — Left-to-right clip reveal on SCROLL ──
  const heroImage = document.querySelector("nav + section .mx-auto.px-5 img");
  if (heroImage) {
    const imgWrap = heroImage.parentElement;
    imgWrap.style.overflow = "hidden";
    imgWrap.style.position = "relative";

    gsap.fromTo(
      heroImage,
      { clipPath: "inset(0 100% 0 0)", scale: 1.15 },
      {
        clipPath: "inset(0 0% 0 0)",
        scale: 1,
        duration: 1.8,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imgWrap,
          start: "top 85%",
        },
      },
    );
  }

  // ── About Us section ──
  const aboutSection = document.querySelectorAll("main > section")[1]; // 2nd section
  if (aboutSection) {
    // "About Us" label
    const aboutLabel = aboutSection.querySelector("h6");
    if (aboutLabel) {
      gsap.from(aboutLabel, {
        scrollTrigger: { trigger: aboutSection, start: "top 80%" },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
    // Main heading
    const aboutHeading = aboutSection.querySelector("h4");
    if (aboutHeading) {
      gsap.from(aboutHeading, {
        scrollTrigger: { trigger: aboutSection, start: "top 75%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
    // Tree icon circle
    const treeIcon = aboutSection.querySelector(".size-20");
    if (treeIcon) {
      gsap.from(treeIcon, {
        scrollTrigger: { trigger: treeIcon, start: "top 85%" },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }
    // About right side text — NO animation per user request
    // 450K number — count-up style scale
    const bigNumber = aboutSection.querySelector(".text-\\[19rem\\]");
    if (bigNumber) {
      gsap.from(bigNumber, {
        scrollTrigger: { trigger: bigNumber, start: "top 85%" },
        scale: 0.5,
        opacity: 0,
        duration: 1.4,
        ease: "elastic.out(1, 0.6)",
      });
    }
    // Stats boxes stagger
    const statsBoxes = aboutSection.querySelectorAll(".grid-cols-2 > div");
    if (statsBoxes.length) {
      gsap.from(statsBoxes, {
        scrollTrigger: { trigger: statsBoxes[0], start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }

  // ── Simple Savings Calculator section ──
  const calcSection = document.querySelectorAll("main > section")[2];
  if (calcSection) {
    const calcTitle = calcSection.querySelector("h4");
    if (calcTitle) {
      gsap.from(calcTitle, {
        scrollTrigger: { trigger: calcSection, start: "top 80%" },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
    const calcIcon = calcSection.querySelector(".size-20");
    if (calcIcon) {
      gsap.from(calcIcon, {
        scrollTrigger: { trigger: calcSection, start: "top 80%" },
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }
  }

  // ── Enter Your Location section — circle items stagger ──
  const locationSection = document.querySelectorAll("main > section")[3];
  if (locationSection) {
    // The 3 dashed circle containers
    const circles = locationSection.querySelectorAll(".aspect-square");
    if (circles.length) {
      gsap.from(circles, {
        scrollTrigger: { trigger: locationSection, start: "top 70%" },
        scale: 0.6,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.4)",
      });
    }
    // The floating icon buttons at bottom of circles
    const floatingIcons = locationSection.querySelectorAll(".w-20.h-20");
    if (floatingIcons.length) {
      gsap.from(floatingIcons, {
        scrollTrigger: { trigger: locationSection, start: "top 65%" },
        y: 30,
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(2)",
      });
    }
    // Right side text & button
    const locText = locationSection.querySelector(".col-span-3 h4");
    if (locText) {
      gsap.from(locText, {
        scrollTrigger: { trigger: locText, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
    const locBtn = locationSection.querySelector(".col-span-3 button");
    if (locBtn) {
      gsap.from(locBtn, {
        scrollTrigger: { trigger: locBtn, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }

  // ── Customer Testimonials section ──
  const testimonialSection = document.querySelectorAll("main > section")[4];
  if (testimonialSection) {
    // Title
    const testTitle = testimonialSection.querySelector("h4");
    if (testTitle) {
      gsap.from(testTitle, {
        scrollTrigger: { trigger: testimonialSection, start: "top 75%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
    }
    // Testimonial image — left-to-right clip reveal
    const testImg = testimonialSection.querySelector(".rounded-4xl");
    if (testImg) {
      gsap.fromTo(
        testImg,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: { trigger: testImg, start: "top 75%" },
        },
      );
    }
    // Quote text
    const quoteText = testimonialSection.querySelector(
      ".text-3xl.text-\\[\\#D0D0D0\\]",
    );
    if (quoteText) {
      gsap.from(quoteText, {
        scrollTrigger: { trigger: quoteText, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
    // Quote icons
    const quoteIcons = testimonialSection.querySelectorAll(".bi-quote");
    if (quoteIcons.length) {
      gsap.from(quoteIcons, {
        scrollTrigger: { trigger: quoteIcons[0], start: "top 80%" },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }
    // "Our Customers Love Going Solar" heading
    const loveTitle = testimonialSection.querySelector(
      ".flex.items-baseline h5",
    );
    if (loveTitle) {
      gsap.from(loveTitle, {
        scrollTrigger: { trigger: loveTitle, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
    // Author 2 image
    const author2 = testimonialSection.querySelector(
      ".flex.items-baseline img",
    );
    if (author2) {
      gsap.from(author2, {
        scrollTrigger: { trigger: author2, start: "top 85%" },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }

  // ── Company logos — infinite marquee animation ──
  const companySection = document.querySelector(".marquee-content");
  if (companySection) {
    const logos = companySection.querySelectorAll("img");
    if (logos.length) {
      gsap.from(logos, {
        scrollTrigger: { trigger: companySection, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }

  // ── Footer ──
  const footer = document.querySelector("footer");
  if (footer) {
    // Footer heading
    const footerTitle = footer.querySelector("h4");
    if (footerTitle) {
      gsap.from(footerTitle, {
        scrollTrigger: { trigger: footer, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
    // Footer description
    const footerDesc = footer.querySelector("p.text-xl");
    if (footerDesc) {
      gsap.from(footerDesc, {
        scrollTrigger: { trigger: footerDesc, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
    // Footer link columns stagger in
    const footerLinkCols = footer.querySelectorAll("ul");
    if (footerLinkCols.length) {
      gsap.from(footerLinkCols, {
        scrollTrigger: { trigger: footerLinkCols[0], start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
    // Footer link items — individual stagger
    const footerLinks = footer.querySelectorAll("ul li a");
    footerLinks.forEach((link) => {
      link.style.transition = "color 0.3s ease, transform 0.3s ease";
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { x: 8, color: "#3A67FF", duration: 0.3 });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { x: 0, color: "#ffffff", duration: 0.3 });
      });
    });
    // Big footer text parallax
    const bigFooterText = footer.querySelector(".text-\\[21rem\\]");
    if (bigFooterText) {
      gsap.fromTo(
        bigFooterText,
        { y: 50 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: bigFooterText,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );
    }
    // "Get Started Now" button
    const getStartedBtn = footer.querySelector("button");
    if (getStartedBtn) {
      gsap.from(getStartedBtn, {
        scrollTrigger: { trigger: getStartedBtn, start: "top 90%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }

  // ── Magnetic hover on all CTA buttons ──
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: "power3.out",
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    });
  });
}

// Initialize premium animations after the page has loaded and the loader is done
// We hook into the same DOMContentLoaded but with a slight delay to let the loader finish
window.addEventListener("load", () => {
  // Wait for the loader timeline to complete (approx 8-9 seconds)
  // We use a MutationObserver on the loading screen to detect when it's hidden
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          loadingScreen.classList.contains("hidden")
        ) {
          // Small delay to let the main content fade in first
          setTimeout(initPremiumAnimations, 400);
          observer.disconnect();
        }
      });
    });
    observer.observe(loadingScreen, {
      attributes: true,
      attributeFilter: ["class"],
    });
  } else {
    // Fallback if loading screen doesn't exist
    initPremiumAnimations();
  }
});
