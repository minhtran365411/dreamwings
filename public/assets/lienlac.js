const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("https://pacific-citadel-65786.herokuapp.com/thong-tin-lien-lac", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};