async function newPostFormHandler (e) {
    e.preventDefault();

    const unformattedCity = document.querySelector('.city-list').value.toLowerCase();
    const city = unformattedCity.replace(/\s/g, '');
    const title = document.querySelector('.restaurant-name').value.trim();
    const text_body = document.querySelector('.comment_body').value.trim();

    if (city && title && text_body) {
        const response = await fetch ('api/posts/', {
            method: 'post', 
            body: JSON.stringify({
                city,
                title, 
                text_body
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } 
    
}



document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);