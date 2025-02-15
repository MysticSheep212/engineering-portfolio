fetch('../html/head.html')
    .then(response => response.text())
    .then(data => {
        document.head.innerHTML = data;

        // Check if there are additional head elements to add
        if (typeof additionalHeadElements === 'function') {
            additionalHeadElements();
        }
    });
