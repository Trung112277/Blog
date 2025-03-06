// scroll category
document.addEventListener("DOMContentLoaded", function () {
    const menuList = document.querySelector(".categories nav");

    let isDown = false;
    let startX;
    let scrollLeft;

    menuList.addEventListener("mousedown", (e) => {
        isDown = true;
        menuList.classList.add("active-scroll");
        startX = e.pageX - menuList.offsetLeft;
        scrollLeft = menuList.scrollLeft;
    });

    menuList.addEventListener("mouseleave", () => {
        isDown = false;
        menuList.classList.remove("active-scroll");
    });

    menuList.addEventListener("mouseup", () => {
        isDown = false;
        menuList.classList.remove("active-scroll");
    });

    menuList.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - menuList.offsetLeft;
        const walk = (x - startX) * 2;
        menuList.scrollLeft = scrollLeft - walk;
    });
});

// pagination blogs
document.addEventListener('DOMContentLoaded', function () {
    const blogs = document.querySelectorAll('.grid-blog');
    const gridContainer = document.querySelector('.main');
    const pageNumbers = document.querySelector('.page-numbers');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const blogsPerPage = 9;
    let currentPage = 1;

    function showBlogs(page) {
        const start = (page - 1) * blogsPerPage;
        const end = start + blogsPerPage;

        blogs.forEach((blog, index) => {
            if (index >= start && index < end) {
                blog.style.display = 'grid';
            } else {
                blog.style.display = 'none';
            }
        });
    }

    function updatePagination() {
        const totalPages = Math.ceil(blogs.length / blogsPerPage);
        pageNumbers.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            span.classList.add('page-number');
            if (i === currentPage) {
                span.classList.add('active');
            }
            span.addEventListener('click', () => {
                currentPage = i;
                showBlogs(currentPage);
                updatePagination();
            });
            pageNumbers.appendChild(span);
        }

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showBlogs(currentPage);
            updatePagination();
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(blogs.length / blogsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showBlogs(currentPage);
            updatePagination();
        }
    });

    showBlogs(currentPage);
    updatePagination();
});

