// 等待文档加载完成
document.addEventListener("DOMContentLoaded", function () {
  // 添加滚动动画效果
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  // 检查元素是否在视口中
  function checkInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // 元素露出多少px时触发动画

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("is-visible");
      }
    });
  }

  // 首次加载时检查一次
  checkInView();

  // 监听滚动事件
  window.addEventListener("scroll", checkInView);

  // 平滑滚动到指定元素
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 导航栏滚动时变化
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 给轮播图添加淡入淡出效果
  const carousel = document.getElementById("carouselExampleIndicators");
  if (carousel) {
    const carouselItems = carousel.querySelectorAll(".carousel-item");

    carouselItems.forEach((item) => {
      item.classList.add("carousel-fade");
    });
  }

  // 添加图像懒加载
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          imageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach((image) => {
      imageObserver.observe(image);
    });
  } else {
    // 回退到传统加载方法
    let lazyLoadThrottleTimeout;

    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout);
      }

      lazyLoadThrottleTimeout = setTimeout(function () {
        const scrollTop = window.pageYOffset;

        lazyImages.forEach((img) => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });

        if (lazyImages.length == 0) {
          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
          window.removeEventListener("orientationChange", lazyLoad);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationChange", lazyLoad);
  }
});
