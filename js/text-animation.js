document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function splitLines(element) {
        let words = element.innerHTML.split(" ");
        element.innerHTML = ""; // Clear original content

        let tempSpan = document.createElement("span");
        tempSpan.style.display = "inline-block";
        tempSpan.style.visibility = "hidden"; // Hide for measurement
        element.appendChild(tempSpan);

        let lines = [];
        let currentLine = [];

        words.forEach(word => {
            tempSpan.innerHTML = currentLine.concat(word).join(" ");
            if (tempSpan.offsetHeight > element.clientHeight) {
                lines.push(`<span>${currentLine.join(" ")}</span>`);
                currentLine = [word];
            } else {
                currentLine.push(word);
            }
        });

        if (currentLine.length) lines.push(`<span>${currentLine.join(" ")}</span>`);
        element.innerHTML = lines.join(""); // Replace with spans
    }

    // Apply to all elements with .animated-text
    document.querySelectorAll(".animated-text").forEach(textElement => {
        splitLines(textElement);

        gsap.from(textElement.querySelectorAll("span"), {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: textElement,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    });
});
