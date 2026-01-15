document.addEventListener("DOMContentLoaded", () => {

    const imageHomepage = document.querySelectorAll("#imageHomepage");
    const contextHomepage = document.querySelectorAll("#contextHomepage");
    const contextProgressBar = document.querySelectorAll("#contextProgressBar");
    const bar = document.querySelectorAll(".progress-fill");
    
    function runSequence(index){
        if(index >= bar.length){
            runSequence(0);
            return;
        }

        const currentBar = bar[index];
        const currentContextProgressBar = contextProgressBar[index];
        const currentContextHomepage = contextHomepage[index];
        const currentImageHomepage = imageHomepage[index];

        const nextIndex = (index + 1 >= bar.length) ? 0 : index + 1;
        const nextContextHomepage = contextHomepage[nextIndex];
        const nextImageHomepage = imageHomepage[nextIndex];

        currentBar.classList.add("run-loading");
        currentBar.classList.add("bg-[#76b900]");
        currentContextProgressBar.classList.add("!opacity-100");
        if(index === 0){
            currentContextHomepage.classList.add("!opacity-100");
            currentImageHomepage.classList.add("!opacity-100");
        }

        currentBar.addEventListener("animationend", () => {
            currentBar.classList.remove("run-loading");
            currentBar.classList.remove("bg-[#76b900]");

            currentContextProgressBar.classList.remove("!opacity-100");

            currentContextHomepage.classList.remove("!opacity-100"); 
            currentContextHomepage.classList.remove("fadeInAnimation");
            currentImageHomepage.classList.remove("!opacity-100"); 
            currentImageHomepage.classList.remove("fadeInAnimation");

            currentContextHomepage.classList.add("fadeOutAnimation");
            nextContextHomepage.classList.add("fadeInAnimation");
            nextContextHomepage.classList.remove("fadeOutAnimation");
            currentImageHomepage.classList.add("fadeOutAnimation");
            nextImageHomepage.classList.add("fadeInAnimation");
            nextImageHomepage.classList.remove("fadeOutAnimation");
            
            runSequence(index+1);

        }, { once : true });
    }

    runSequence(0);
});