(function () {
      const theme = localStorage.getItem("theme");
      if (theme) {
        document.documentElement.setAttribute("data-bs-theme", theme);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-bs-theme", prefersDark ? "dark" : "light");
      }
    })();