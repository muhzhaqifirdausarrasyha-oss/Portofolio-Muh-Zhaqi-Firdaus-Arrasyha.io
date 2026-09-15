const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener('resize', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

});


let orbsArray = [];


class Orb {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.4;

        this.speedY =
            (Math.random() - 0.5) * 0.4;

        this.color =
            `rgba(
                233,
                121,
                93,
                ${Math.random() * 0.6 + 0.1}
            )`;

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            this.color;


        ctx.shadowBlur = 12;

        ctx.shadowColor =
            'rgba(233, 121, 93, 0.8)';


        ctx.fill();

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (
            this.x > canvas.width ||
            this.x < 0
        ) {

            this.speedX =
                -this.speedX;

        }


        if (
            this.y > canvas.height ||
            this.y < 0
        ) {

            this.speedY =
                -this.speedY;

        }


        this.draw();

    }

}



function init() {

    orbsArray = [];


    const numberOfOrbs =
        (canvas.width * canvas.height) / 12000;


    for (
        let i = 0;
        i < numberOfOrbs;
        i++
    ) {

        orbsArray.push(
            new Orb()
        );

    }

}



function animate() {

    requestAnimationFrame(
        animate
    );


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        let i = 0;
        i < orbsArray.length;
        i++
    ) {

        orbsArray[i].update();

    }

}


init();
animate();



const themeToggle =
    document.getElementById(
        'themeToggle'
    );


const themeIcon =
    document.getElementById(
        'themeIcon'
    );


const themeText =
    document.getElementById(
        'themeText'
    );



const savedTheme =
    localStorage.getItem(
        'portfolio-theme'
    );


if (savedTheme === 'light') {

    document.body.classList.add(
        'light-mode'
    );

}



function updateThemeButton() {

    if (
        document.body.classList.contains(
            'light-mode'
        )
    ) {

        themeIcon.textContent = '🌙';
        themeText.textContent = 'Malam';
    } else {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Terang';

    }

}


updateThemeButton();


themeToggle.addEventListener(
    'click',
    function () {

        document.body.classList.toggle(
            'light-mode'
        );


        const currentTheme =
            document.body.classList.contains(
                'light-mode'
            )
                ? 'light'
                : 'dark';


        localStorage.setItem(
            'portfolio-theme',
            currentTheme
        );


        updateThemeButton();

    }
);