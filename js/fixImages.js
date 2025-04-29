document.addEventListener("DOMContentLoaded", function () {
  // 图像加载错误处理
  const imgElements = document.querySelectorAll("img");

  imgElements.forEach((img) => {
    // 保存原始路径，以便在控制台输出
    const originalSrc = img.src;

    img.onerror = function () {
      console.error(`Failed to load image: ${originalSrc}`);

      // 针对不同类型的图像设置不同的备用图像
      if (originalSrc.includes("logo.png")) {
        this.src = "assets/favicon.png";
        this.style.maxWidth = "250px";
        this.style.margin = "auto";
      } else if (originalSrc.endsWith(".svg")) {
        // SVG文件加载失败时的处理
        this.src = "assets/favicon.png";
        this.style.maxWidth = "200px";
        this.style.margin = "auto";
      } else {
        // 其他图像文件加载失败时的处理
        this.src = "assets/favicon.png";
        this.style.maxWidth = "200px";
        this.style.margin = "auto";
      }

      // 防止循环触发错误事件
      this.onerror = null;
    };
  });

  // 检查logo加载情况
  const logoImg = document.querySelector("#intro img");
  if (logoImg) {
    setTimeout(function () {
      // 判断图像是否已完成加载
      if (!logoImg.complete || logoImg.naturalWidth === 0) {
        console.warn(
          "Logo might not be loading correctly. Attempting to reload..."
        );
        const currentSrc = logoImg.src;
        logoImg.src = "assets/favicon.png";
        setTimeout(() => {
          logoImg.src = currentSrc;
        }, 500);
      }
    }, 3000); // 3秒后检查
  }
});
