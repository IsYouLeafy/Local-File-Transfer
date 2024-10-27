// filter.js

// Function to filter files based on search input
function filterFiles() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const fileList = document.getElementById('fileList');
    const items = fileList.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const fileName = item.getElementsByTagName('a')[0].innerText.toLowerCase();

        // Check if the file name includes the search input
        if (fileName.includes(searchInput)) {
            item.style.display = ""; // Show the item
        } else {
            item.style.display = "none"; // Hide the item
        }
    }
}
