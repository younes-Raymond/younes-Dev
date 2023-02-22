
// check if there is storage color option 
let maincolor = localStorage.getItem("color_option");

if(maincolor !== null){

    // console.log("local storage is not empty you can set it on root now")
    // let maincolor = localStorage.getItem("color_option");

    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));

        // remove active class from all colors list item 
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

            // add active class on element with data-color === local storage item 
            if (element.dataset.color === maincolor){
                // add active class
                element.classList.add("active");
            }

    }); // closin tag foreach loop color list

}; // closing tag if conditions 

// random background option
let backgrondoption = true; 

// variable to controle the background interval 
let backgrondinterval;

// check if there's local storage random background Item
  let backgrondlocalitem = localStorage.getItem("background_option");

  // check if random local storage is not empty

  if (backgrondlocalitem !== null) {
    
    if(backgrondlocalitem === 'true') {

        backgrondoption = true;

    } else {
        backgrondoption = false;
    }

    // remove active class from all spans 

    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgrondlocalitem === 'true'){

let backgroundRandom =    document.querySelector(".random-backgrounds .yes")
       backgroundRandom .classList.add("active");

    } else{ 

        document.querySelector(".random-backgrounds .no").classList.add("active");

    }



  }

// click on toogle settings clock
document.querySelector(".toggle-settings .fa-clock").onclick = function () {

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");

};
      
                 // change color of text introduction and about us 

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// loop on all list items 
colorsLi.forEach(li => {

    // loop on every list items
    li.addEventListener("click", (e) => {
        console.log(e.target.dataset.color);

        // set color on root 
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set color on local storage 
        localStorage.setItem("color_option", e.target.dataset.color);

        handleactive(e);


        // remove active class from all childrens 

        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
}); // closing tag addeventlistener

}); // closing tag foreach loop 














// switch random background option 
const randombackel = document.querySelectorAll(".random-backgrounds span");

// loop on all spans
randombackel.forEach(span => {

    // click on every span 
    span.addEventListener("click", (e) => {
        handleactive(e);
    
  if(e.target.dataset.background === 'yes'){

    backgrondoption = true;

    randomizeimages();

    localStorage.setItem("background_option", true);

  }else {
    backgrondoption = false;

    clearInterval(backgrondinterval);

    localStorage.setItem("background_option", false);


  }


}); // closing tag addeventlistener

}); // closing tag foreach loop 

// select landing page eleement 
let landingpage = document.querySelector(".landing-page");

// get array of images 
let imagearray  = ["01.jpg","02.webp","03.jpg","04.jpg","05.jpeg","06.webp","07.jpeg","08.jpg","09.jpg","10.jpg"];

// // random background option

// let backgrondoption = true;

// // variable to controle the interval 

// let backgrondinterval;



// function to randomize images 
function randomizeimages () {

    if (backgrondoption === true){

        backgrondinterval = setInterval(() => {
            // get random number 
            let randomnumber = Math.floor(Math.random() * imagearray.length);

        // change background url 
            landingpage.style.backgroundImage = 'url("/images/' + imagearray[randomnumber] + '")';
        
        }, 10000);
    }
}

randomizeimages();



// start progress skills . selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

// skills  offset top
    let skillsOffseTop = ourSkills.offsetTop;

    // skills outer height
    let  skilsouterheight  =  ourSkills.offsetHeight;

    // window height 

    let  windowHeight = this.innerHeight;
    // window scrolltop 
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffseTop + skilsouterheight - windowHeight)) {

        let allskills = document.querySelectorAll(".skills-box .skill-progress span");

        allskills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        
        });

    }
};



// end progress skills

// start creat popup with the image
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img => {

    img.addEventListener('click', (e) =>  {

        // creat overlay element 

        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        // create the popup box 

        let popupbox = document.createElement("div");

        // add class to the popup box 

        popupbox.className = 'popup-box';

        if(img.alt !== null) {

            // create heading
            let imgheading = document.createElement("h3");

            // create text for heading 
            let imgText = document.createTextNode(img.alt);

            // append the test to the heading 
            imgheading.appendChild(imgText);

            //append the heading to the popup box 
            popupbox.appendChild(imgheading);
            

        }// close if condition 




        // creat the images 
        let popupimage = document.createElement("img");

                // add image source 
        popupimage.src = img.src;

        // add image to popup box
        popupbox.appendChild(popupimage);

       // append the popup box to body
        document.body.appendChild(popupbox);

        // create the close span 
        let closeboton = document.createElement("span");

        // craete the close button text 
        let closebotontext = document.createTextNode("X");

        // append text to close button 
        closeboton.appendChild(closebotontext);

        //add class to close button 
        closeboton.className = 'close-button';

        //add close button to the popup box 
        popupbox.appendChild(closeboton);  

    })
    });

    // close popup
    document.addEventListener("click", function (e) {
        if (e.target.className == 'close-button'){
            // remove the current popup 
        e.target.parentNode.remove();

        // remove overlay 
        document.querySelector(".popup-overlay").remove();
        }
    })


// select bullet
const allbullets = document.querySelectorAll(".nav-bullets .bullet");

const alllinks = document.querySelectorAll(".links a");
function scrolltosomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'
            });
        });
    });

}

scrolltosomewhere(allbullets);
scrolltosomewhere(alllinks);


// handle active state
function handleactive (ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");

}


let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets ");

let bulletlocalitem = localStorage.getItem("bullets-option");

if (bulletlocalitem !== null) {

    bulletSpan.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletlocalitem === 'block') {

        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletSpan.forEach(span => {

  span.addEventListener("click", (e) => {

    if(span.dataset.display === 'show') {


        bulletsContainer.style.display = 'block';
        localStorage.setItem("bullets-option", "block");


    } else {

        bulletsContainer.style.display = 'none'
        localStorage.setItem("bullets-option", 'none');

    }
    handleactive(e)
});

});


// reset button 

document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear(); // if you want to reset all option
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");

    // reload window 
    window.location.reload();
}

let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

togglebtn.onclick = function () {

    // toggle class "menu-active" on button 
    this.classList.toggle("menu-active");

    //toggle class "open on links " 
    tlinks.classList.toggle("open");

};

// click anywhere outside menu and toggle button 
document.addEventListener("click", (e) => {

    if (e.target !== togglebtn && e.target !== tlinks) {

        // check if menu is open 

        if (tlinks.classList.contains("open")) {

        // toggle class "menu-active" on button 
        togglebtn.classList.toggle("menu-active");

        //toggle class "open on links " 
        tlinks.classList.toggle("open");

        }
    }
});

// stop propagation on menu 
tlinks.onclick = function (e) {
    e.stopPropagation();
};

// logo handler 
// const  Funlogo = () => {
//   let logo = document.getElementById('logo') 
// logo.setAttribute('src','/images/170.png')


// }
// Funlogo();

// interface ModeButton extends HTMLButtonElement {
//     mode: 'light' | 'dark';
//   }
  
  document.addEventListener("DOMContentLoaded", function () {
  
    const btn_mode = document.querySelector('.toggleButton') 
    //as ModeButton;
    btn_mode.addEventListener('click', toggleDarkMode);
  
    
  function toggleDarkMode() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      navBar?.classList.remove('dark-theme');
      btn_mode.classList.toggle('bg-white');
      btn_mode.mode = 'light';
    } else {
      body.classList.add('dark-theme');
    //   navBar?.classList.add('dark-theme');
      btn_mode.style.setProperty('background', 'black');
      btn_mode.style.cssText = "border-radius:10px; background:white;"
      btn_mode.mode = 'dark';
    }
  }
  });


let solution = document.getElementById('solution');

solution.addEventListener('click', () => {
    window.location.href = 'solution'
})
  
  