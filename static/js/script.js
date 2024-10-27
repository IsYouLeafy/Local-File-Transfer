// JavaScript to handle hover previews
function showPreview(event, src) {
    const preview = document.getElementById('preview');
    preview.src = src;
    preview.style.top = event.pageY + 'px';
    preview.style.left = event.pageX + 'px';
    preview.style.display = 'block';
}

function hidePreview() {
    const preview = document.getElementById('preview');
    preview.style.display = 'none';
}
