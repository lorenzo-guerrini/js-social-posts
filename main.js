const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2018-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-01-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    },
    {
        "id": 6,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": null,
        "author": {
            "name": "Mario Rossi",
            "image": null
        },
        "likes": 118,
        "created": "2021-12-21"
    }
];

//Variabile postsContainer
const postsContainer = document.getElementById("container");

//Stampa i post
postsPrinter();

//Fotmatta le date
formatUSDateAll();

// ---- Funzioni ----

//Ritorna una stringa contenente l'HTML del post
function postHTMLGen(post) {
    //Crea post temporaneo e ne inizia a generale l'html
    let tempPostHTML = `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">
                `;

    //Se author ha propic la inserisce nel post, altrimenti mette le sue iniziali
    if (post.author.image) {
        tempPostHTML += `
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">
                    </div>
                    `;
    } else {
        tempPostHTML += `
                    <div class="post-meta__icon">
                        <div class="profile-pic no-img">TODO</div>
                    </div>
                    `;
    }

    //Inserisce nome autore e data del post
    tempPostHTML += `
                    <div class="post-meta__data">
                        <div class="post-meta__author">${post.author.name}</div>
                        <div class="post-meta__time">${postDateCalculator(post)}</div>
                    </div>
                </div>
            </div>
            <div class="post__text">${post.content}</div>
            `;

    //Se il post ha immagini le inserisce
    if (post.media) {
        tempPostHTML += `
        <div class="post__image">
                <img src="${post.media}" alt="">
        </div>
        `;
    }

    //Finisce HTML con like buttone contatore like
    tempPostHTML += `
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="1">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-1" class="js-likes-counter">${post.likes}</b> persone
                    </div>
                </div>
            </div>
        </div>
   `

    return tempPostHTML;
}

//Ritorna tempo passato da pubblicazione
function postDateCalculator(post) {
    //Splitta la data del post e crea una Date per essa e una per la data corrente
    let dateArray = post.created.split("-");
    let postDate = new Date(dateArray[0], dateArray[1], dateArray[2]);
    let today = new Date();

    //Calcola la differenza tra le due date in millisecondi e in giorni, ritorna quest'ultima se è passato meno di un mese
    let dateDiffTime = Math.abs(today - postDate);
    let dateDiffDays = Math.ceil(dateDiffTime / (1000 * 60 * 60 * 24));

    if (dateDiffDays < 30) {
        return dateDiffDays + " giorni fa";
    }

    //Calcola la differenza tra le due date in mesi, ritorna questa se è passato meno di un anno
    let dateDiffMonths = Math.ceil(dateDiffDays / 30);

    if (dateDiffMonths < 12) {
        return dateDiffMonths + " mesi fa"
    }

    //Calcola la differenza tra le due date in anni, ritorna questa se è passato almeno un anno
    let dateDiffYears = Math.ceil(dateDiffMonths / 12)

    if (dateDiffYears == 1) {
        return "1 anno fa";
    }

    return dateDiffYears + " anni fa";
}

//Stampa nel postsContainer i post
function postsPrinter() {
    for (let i = 0; i < posts.length; i++) {
        postsContainer.innerHTML += postHTMLGen(posts[i]);
    }
}

//Formatta le date di tutti i post in formato Americano
function formatUSDateAll() {
    for (let i = 0; i < posts.length; i++) {
        let dateArray = posts[i].created.split("-");
        let newDate = dateArray[1] + "-" + dateArray[2] + "-" + dateArray[0];
        posts[i].created = newDate;
    }
}