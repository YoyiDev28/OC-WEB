//function to validate user email address
const form = document.getElementById('form');
function criteria() { 
    const validChars = ['.', '@', '_','-'];
    let email = document.getElementById('email').value;    
    let msg = document.getElementById('msg');
    let firstAt = email.indexOf('@');
    let lastAt = email.lastIndexOf('@');
    let lastDot = email.lastIndexOf('.');
    let firstChar = email.charAt(0);
    
    let state = true;
    
    email = email.trim().toLowerCase();
    msg.innerHTML = '';

    if(firstChar=='@' || firstChar=='.' ||firstChar=='_' || firstChar=='-' ||  !isNaN(firstChar)){
        msg.innerHTML = "invalid fisrt character for Email address";
        state = false;
    }
    else if(email.length<8){
        msg.innerHTML = "your email is too short!";
        state = false;
    }
    else if((firstAt<2) || (firstAt!=lastAt)){
        msg.innerHTML = "Error in @";
        state = false;
    }
    else if(lastDot-lastAt<3){
        msg.innerHTML = "Error in domain name";
        state = false;
    }
    else if(email.length-lastDot<3){
        msg.innerHTML = "Error in .com";
        state = false;
    }
    else {
        for(var i=0; i<email.length && state == true; i++){
       
            if((email.charCodeAt(i)>=97 && email.charCodeAt(i)<=122)){
                continue;
            }
            else if ((email.charCodeAt(i)>=48 && email.charCodeAt(i)<=57)) {
                continue;
            }
            else if (validChars.indexOf(email.charAt(i))!=-1){
                continue;
            }
            else {
                msg.innerHTML = "Please use valid email characters";
                state = false;
            }
         }
    }

    if (state == true) {
        msg.innerHTML = 'Thank You :) Your Message has been submitted successfully. <br> You shall here form us very soon!';
        document.getElementById('email').classList.remove("invalid")
    }
    else {
        document.getElementById('email').classList.add("invalid")
    }   
}    

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        criteria();
    });
}

//SEARCH
const search = document.getElementById('search');
const searchBar = document.getElementById('searchBar');
if (search && searchBar) {
    search.addEventListener('click', function (){
        searchBar.classList.toggle('show')
        searchBar.classList.toggle('hide')
    })
}
//press escape to close the search bar
 document.addEventListener('keydown', (event) => {
     var keyName = event.key;
     console.log("keyName");
     if (searchBar && keyName === 'Escape' && searchBar.classList.contains('show')) {
            searchBar.classList.toggle('show')
            searchBar.classList.toggle('hide')    
         }
 } )

// Carousel controls for sec-4
// Removed - carousel replaced with collage

// Sticky header
const headerTop = document.querySelector('#sec-0 header.top, #sec-0 header:first-of-type');
const headerMain = document.querySelector('#sec-0 header:last-of-type');

window.addEventListener('scroll', () => {
    if (!headerTop) {
        return;
    }

    const topHeight = headerTop.offsetHeight;
    if (window.scrollY > topHeight) {
        document.body.classList.add('header-fixed');
    } else {
        document.body.classList.remove('header-fixed');
    }
});

// Smooth scroll for internal anchors
const smoothAnchors = document.querySelectorAll('a[href^="#"]');
smoothAnchors.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        const menuCheckbox = document.getElementById('menu');

        if (!targetElement) {
            return;
        }

        event.preventDefault();
        const headerHeight = headerMain ? headerMain.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        if (menuCheckbox) {
            menuCheckbox.checked = false;
        }
    });
});

// Scroll reveal animations
const revealingSelectors = [
    '#sec-0 article',
    '#sec-1 article',
    '#sec-1 aside',
    '#sec-2 .container > h1',
    '#sec-2 .container > p',
    '#sec-2 article figure',
    '#sec-3 .card',
    '.sec-emp .logo-item',
    '#sec-4 .collage img',
    '#sec-5 .quoteblock',
    '#sec-5 .contactUs',
    '#sec-6 .about',
    '#sec-6 .links',
    '#sec-6 .contact'
];

const revealElements = revealingSelectors.reduce((list, selector) => {
    return list.concat(Array.from(document.querySelectorAll(selector)));
}, []);

revealElements.forEach(el => {
    el.classList.add('reveal');

    if (el.matches('#sec-1 article, #sec-2 .container > h1, #sec-4 .collage img, #sec-5 .quoteblock')) {
        el.classList.add('reveal-up');
    } else if (el.matches('#sec-1 aside, #sec-6 .contact')) {
        el.classList.add('reveal-right');
    } else if (el.matches('#sec-2 article figure')) {
        el.classList.add('reveal-left');
    }
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Parallax movement for hero image
const parallaxElements = document.querySelectorAll('.parallax');
const updateParallax = () => {
    const scrollTop = window.pageYOffset;
    parallaxElements.forEach(el => {
        const speed = Number(el.dataset.parallaxSpeed || 0.16);
        el.style.transform = `translateY(${scrollTop * speed}px)`;
    });
};

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

const heroImage = document.querySelector('#sec-0 article img');
if (heroImage) {
    heroImage.classList.add('parallax');
    heroImage.dataset.parallaxSpeed = '0.16';
}

