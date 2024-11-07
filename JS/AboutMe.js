const linkedin = document.querySelector("#linkedin");
const email = document.querySelector("#email");

linkedin.addEventListener("click", () => {
  window.open("https://www.linkedin.com/in/manvichaddha/");
})

email.addEventListener("click", () => {
  const emailAddress = "chaddhamanvi2@gmail.com"; // Replace with your actual email address
  const subject = "Subject of the email"; // Optional: You can set a default subject
  const body = "Body of the email"; // Optional: You can set a default body

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.open(mailtoLink, '_blank');
});

email.addEventListener("click", () => {
  console.log("email");
})
const carouselText = [
    { text: "Software Engineer", color: "red" },
    { text: "Web Developer", color: "orange" },
    { text: "Cloud Architect", color: "yellow" },
  ];
  
  $(document).ready(async function () {
    carousel(carouselText, "#feature-text");
  });
  
  async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
      await waitForMs(delay);
      $(eleRef).append(letters[i]);
      i++;
    }
    return;
  }
  
  async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
      await waitForMs(100);
      letters.pop();
      $(eleRef).html(letters.join(""));
    }
  }
  
  async function carousel(carouselList, eleRef) {
    var i = 0;
    while (true) {
      updateFontColor(eleRef, carouselList[i].color);
      await typeSentence(carouselList[i].text, eleRef);
      await waitForMs(1500);
      await deleteSentence(eleRef);
      await waitForMs(500);
      i++;
      if (i >= carouselList.length) {
        i = 0;
      }
    }
  }
  
  function updateFontColor(eleRef, color) {
    $(eleRef).css("color", color);
  }
  
  function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  