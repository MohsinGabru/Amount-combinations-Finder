// Create a home button
var homeButton = document.createElement('a');
homeButton.href = '../index.html';
homeButton.textContent = 'Home';
homeButton.id = 'home-button';

// Create a link Fonts
var linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap';

// Create a style
var styleElement = document.createElement('style');
styleElement.innerHTML = `
/* width */
::-webkit-scrollbar {
    width: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 15px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgb(90, 90, 90);
}

#home-button {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-family: Arial, 'sans-serif';
    font-size: 16px;
    font-weight: bold;
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
    background-color: #f2f2f2;
    font-size: 16px;
    font-family: 'Indie Flower', cursive;
}

@media only screen and (max-width: 600px) {
    #home-button {
        top: 5px;
        left: 5px;
        padding: 5px;
    }

    footer {
        padding: 8px 10px;
    }
}

@media only screen and (max-width: 400px) {
    #home-button {
        top: 2px;
        left: 2px;
    }
}
`;

// Create a footer
var footerElement = document.createElement('footer');
footerElement.textContent = 'Created by Mohsin Gabru';

// Append the elements to the head and body
document.head.appendChild(linkElement);
document.head.appendChild(styleElement);
document.body.appendChild(homeButton);
document.body.appendChild(footerElement);
