const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/upload", {
        method: "POST",
        body: formData
    });

    alert("Uploaded!");
    loadFiles();
});

// Load files
async function loadFiles() {
    const res = await fetch("/files");
    const data = await res.json();

    const pdfList = document.getElementById("pdfList");
    const videoList = document.getElementById("videoList");

    pdfList.innerHTML = "";
    videoList.innerHTML = "";

    data.pdfs.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="/uploads/pdfs/${file}" target="_blank">${file}</a>`;
        pdfList.appendChild(li);
    });

    data.videos.forEach(file => {
        const video = document.createElement("video");
        video.src = `/uploads/videos/${file}`;
        video.controls = true;
        videoList.appendChild(video);
    });
}

loadFiles();
