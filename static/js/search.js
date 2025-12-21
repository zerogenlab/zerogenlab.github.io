
let fuse = null;
let pages = [];
let lastResults = [];


const input = document.getElementById("siteSearch");
if (!input) {

  console.warn("[search] #siteSearch not found");
} else {
  const box = document.getElementById("searchResult");


  const indexUrl = input.dataset.indexUrl || "search.json";


  function hideBox() {
    if (!box) return;
    box.classList.add("hidden");
    box.innerHTML = "";
  }

  function showBox(html) {
    if (!box) return;
    box.classList.remove("hidden");
    box.innerHTML = html;
  }


  fetch(indexUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load search index");
      }
      return res.json();
    })
    .then(data => {
      pages = data;
      fuse = new Fuse(pages, {
      keys: ["title", "content"],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 1
    });

    })
    .catch(err => {
      console.warn("[search] index load failed:", err);
    });

  
  input.addEventListener("input", () => {
    const q = input.value.trim();
    lastResults = [];

    if (!fuse || !q) {
      hideBox();
      return;
    }

    lastResults = fuse.search(q).slice(0, 6);

    if (lastResults.length === 0) {
      hideBox();
      return;
    }

    const html = lastResults.map(r => `
      <a href="${r.item.url}"
         class="block px-3 py-2 hover:bg-black/5">
        <div class="text-sm font-600">${r.item.title}</div>
        <div class="text-xs text-black/50 line-clamp-1">
        </div>
      </a>
    `).join("");

    showBox(html);
  });

  // ---------- 回车：跳转到第一条结果 ----------
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault(); 

    if (lastResults.length > 0) {
      window.location.href = lastResults[0].item.url;
    } else {
      hideBox();
    }
  });


  document.addEventListener("click", (e) => {
    if (!box) return;
    if (e.target === input || box.contains(e.target)) return;
    hideBox();
  });
}
