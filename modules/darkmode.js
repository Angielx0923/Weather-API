export function darkModeModule() {

    let darkModeBtn      = document.querySelector('#darkModeCheckbox');
    let html             = document.querySelector('html');
    let sun              = document.querySelector('#sun');
    let moon             = document.querySelector('#moon');

    if(localStorage.getItem('theme') && localStorage.getItem('theme') == 'dark') {
    darkMode();
    };

    function darkMode() {
        html.classList.add('dark');
        // start animation button
        sun.style.transform = 'translateX(0) rotate(-25deg)';
        sun.style.filter = 'invert(1)';
        moon.style.transform = 'translate(52px, -60px)';
        // end button animation
        localStorage.setItem('theme', 'dark');
    };


    darkModeBtn.addEventListener('click', () => {
        if(html.classList.contains('dark')) {
            html.classList.remove('dark');
            moon.style.transform = 'translateX(0)';
            sun.style.filter = 'invert(0)';
            sun.style.transform = 'translate(-80px, 43px) rotate(-125deg)';
            localStorage.setItem('theme', 'light');
        }
        else {
            darkMode();
        }
    });
};

