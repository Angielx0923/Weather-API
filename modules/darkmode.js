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
        sun.style.opacity = '100%';
        moon.style.opacity = '0';
        sun.style.left = '21px';
        localStorage.setItem('theme', 'dark');
    };

    // function btnAnimationDark() {
    //     for(let i = 0; i < 2; i++) {
    //         icons[i].classList.add('checked');
    //         localStorage.setItem('theme', 'dark');
    //     }
    // };

    // function btnAnimationLight() {
    //     for(let i = 0; i < 2; i++) {
    //         if(icons.classList.contains('checked')) {
    //             icons[i].classList.remove('checked');
    //             localStorage.setItem('theme', 'light');
    //         }
    //     }
    // };

    darkModeBtn.addEventListener('click', () => {
        if(html.classList.contains('dark')) {
            html.classList.remove('dark');
            moon.style.opacity = '100%';
            sun.style.opacity = '0'
            localStorage.setItem('theme', 'light');
            // btnAnimationLight();
        }
        else {
            // btnAnimationDark();
            darkMode();
        }
    });
};

