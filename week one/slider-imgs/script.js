const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", "next"];
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel {
  constructor(container, items, controls) {
    this.CarouselContainer = container;
    this.CarouselControls = controls;
    this.CarouselArrey = [...items];
    this.interval = null;
  }

  updateGallery() {
    this.CarouselArrey.forEach((item) => {
      item.classList.remove(
        "gallery-item-1",
        "gallery-item-2",
        "gallery-item-3",
        "gallery-item-4",
        "gallery-item-5"
      );
    });

    this.CarouselArrey.slice(0, 5).forEach((item, index) => {
      item.classList.add(`gallery-item-${index + 1}`);
    });
  }

  setCurrentState(direction) {
    this.stopAutoTransition(); // Clear the interval on manual control
    if (direction.classList.contains("gallery-controls-previous")) {
      this.CarouselArrey.unshift(this.CarouselArrey.pop());
    } else {
      this.CarouselArrey.push(this.CarouselArrey.shift());
    }
    this.updateGallery();
    this.startAutoTransition(); // Restart the interval
  }

  setControls() {
    this.CarouselControls.forEach((control) => {
      const button = document.createElement("button");
      button.className = `gallery-controls-${control}`;
      button.innerText = control;
      galleryControlsContainer.appendChild(button);
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(trigger);
      });
    });
  }

  startAutoTransition() {
    this.interval = setInterval(() => {
      this.setCurrentState(document.querySelector(".gallery-controls-next"));
    }, 3000); // 3 seconds interval for the transition
  }

  stopAutoTransition() {
    clearInterval(this.interval);
  }

  init() {
    this.setControls();
    this.useControls();
    this.startAutoTransition();

    // Pause on hover
    this.CarouselContainer.addEventListener("mouseenter", () =>
      this.stopAutoTransition()
    );
    this.CarouselContainer.addEventListener("mouseleave", () =>
      this.startAutoTransition()
    );
  }
}

const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);
exampleCarousel.init();
