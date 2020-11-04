const findSec = (index) =>{
    switch(index){
        case 0 : return(".sec1");break;
        case 1 : return(".sec2");break;
        case 2 : return(".sec3");break;
        case 3 : return(".sec4");break;
        case 4 : return(".sec5");break;
    }
}
new fullpage('#fullpage',{
    
    css3:true,
    anchors:['firstpage','secondpage','thirdpage','fourthpage','fifthpage'],
    menu: '#menu',
    autoScrolling:true,
    scrollHorizontally: true,
    paddingTop:'30px',
    parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
    onLeave: (origin,destination,direction)=>{
        let sec = findSec(destination.index);
        let secPrev = findSec(origin.index);
        const back = gsap.timeline({defaults:{ease:"power1.out"}});
        if(destination.isFirst){
            back.pause()
        }else if(direction==="down"){
            if(!(destination.isLast ))
                back.fromTo(sec,{rotation: -5},{rotation: 1,duration: 1,delay: 0.7});
            if(!(origin.isFirst))
               back.fromTo(secPrev,{rotation: 0},{rotation: 5,duration: 1,delay: 0},'-=1.7'); 
        }
        else if(direction==="up"){
            if(!(destination.isFirst)){

            // back.fromTo('.sectionContainer',{rotation: -5},{rotation: 0,duration: 1,delay: 0.7});    
            back.fromTo(sec,{rotation: 5},{rotation: 0,duration: 1,delay: 1});
                if(!(origin.isLast)){
                back.fromTo(secPrev,{rotation: 0},{rotation: -5,duration: 1,delay: 0});   
                }else{
                    //showSlides();
                }
            } 
        }
    }  
});

fullpage_api.setScrollingSpeed(1000);
const timeline = gsap.timeline({defaults:{ease:"power1.out"}});
timeline.fromTo("nav",{opacity: 0},{opacity: 1,duration: 1.5,})
    .to("#scroll",{opacity:1, duration: 1,delay:.3},"-=1")
    .fromTo("#logo",{opacity:0 ,y:"+3%"},{opacity:1,y:"0%",duration: 0.4},"-=1.3");

// Code for the slideshow
var slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activated", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
// Automating the slideshow

function syncSetTimeout(func, ms, callback) {
    (function sync(done) {
        if (!done) {
            setTimeout(function() {
                func.apply(func);
                sync(true);
            }, ms);
            return;
        }
        callback.apply(callback);
    })();
}
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  console.log("slideIndex-1 is "+(slideIndex-1));
  slides[slideIndex-1].style.display = "block";
   // Change image every 2 seconds
   syncSetTimeout(showSlides,4000,showSlides);
   sleep(2000);
}
