document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.querySelector(".blogs");
    const blogForm = document.getElementById("blogForm");

    blogForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addBlog();
    });

    function addBlog() {
        const title = document.getElementById("blogTitle").value;
        const author = document.getElementById("blogAuthor").value;
        const content = document.getElementById("blogContent").value;

        const blog = document.createElement("article");
        blog.classList.add("blog");
        blog.innerHTML = `
            <div class="person">
                <div class="personInfo">
                    <h4>${title}</h4>
                    <p>${author}</p>
                </div>
            </div>
            <div class="content">${content}</div>
        `;

        blogContainer.appendChild(blog);
        blogForm.reset();
    }
});
