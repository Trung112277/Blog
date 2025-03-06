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
    const gridContainer = document.querySelector('.grid-container');
    const pageNumbers = document.querySelector('.page-numbers');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const meshButton = document.querySelector('.mesh');
    const rowButton = document.querySelector('.row');
    const blogsPerPage = 9;
    let currentPage = 1;

    // Hiển thị blog theo trang
    function showBlogs(page) {
        const start = (page - 1) * blogsPerPage;
        const end = start + blogsPerPage;

        blogs.forEach((blog, i) => {
            if (i >= start && i < end) {
                blog.style.display = 'grid';
            } else {
                blog.style.display = 'none';
            }
        });
    }

    // Cập nhật phân trang
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

    // Chuyển đổi chế độ hiển thị lưới
    meshButton.addEventListener('click', () => {
        gridContainer.classList.remove('row-layout');

    });

    // Chuyển đổi chế độ hiển thị hàng ngang
    rowButton.addEventListener('click', () => {
        gridContainer.classList.add('row-layout');

    });

    // Sự kiện nút Previous
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showBlogs(currentPage);
            updatePagination();
        }
    });

    // Sự kiện nút Next
    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(blogs.length / blogsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showBlogs(currentPage);
            updatePagination();
        }
    });

    // Hiển thị blog đầu tiên khi trang được tải
    showBlogs(currentPage);
    updatePagination();
});

