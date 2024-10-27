// searchToggle.js

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleSearchButton');
    const searchInput = document.getElementById('search');
    let searchMode = 'name'; // Default search mode

    toggleButton.addEventListener('click', function() {
        // Toggle the search mode
        searchMode = searchMode === 'name' ? 'description' : 'name';

        // Update the placeholder text based on the current search mode
        searchInput.placeholder = `Search by ${searchMode}...`;

        // Update the button text to reflect the current search mode
        toggleButton.textContent = `Toggle Search Mode To ${searchMode === 'name' ? 'Description' : 'Name'}`;

        // Reset the search input value
        searchInput.value = '';
        // Trigger the filtering function
        filterFiles();
    });

    searchInput.addEventListener('keyup', function() {
        filterFiles();
    });

    function filterFiles() {
        const filter = searchInput.value.toLowerCase();
        const listItems = document.querySelectorAll('#fileList li');

        listItems.forEach(item => {
            const fileName = item.querySelector('a').textContent.toLowerCase();
            const fileDescription = item.getAttribute('data-description').toLowerCase();

            // Check if the current search mode is by name or description
            if (searchMode === 'name') {
                // Search by file name
                item.style.display = fileName.includes(filter) ? '' : 'none';
            } else {
                // Search by description
                item.style.display = fileDescription.includes(filter) ? '' : 'none';
            }
        });
    }
});
