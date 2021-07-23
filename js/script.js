/*setting time*/
let maskOptions = {
  overwrite: true,
  autofix: true,
  mask: "HH:MM",
  blocks: {
    HH: {
      mask: IMask.MaskedRange,
      placeholderChar: "HH",
      from: 0,
      to: 23,
      maxLength: 2,
    },
    MM: {
      mask: IMask.MaskedRange,
      placeholderChar: "MM",
      from: 0,
      to: 59,
      maxLength: 2,
    },
  },
};

var timeFormat = IMask(document.querySelector("#time-start"), maskOptions);
var timeEndFormat = IMask(document.querySelector("#time-end"), maskOptions);

const time_start = document.querySelector("#time-start").value;
const time_end = document.querySelector("#time-end").value;

console.log(time_start+ " - " +time_end);

/*setting button*/ 
document.querySelector("#btn-close").addEventListener("click", function () {
  window.close();
});


document.querySelector("#btn-save").addEventListener("click", function () {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const time_start = document.querySelector("#time-start").value;
  const time_end = document.querySelector("#time-end").value;
  const message = document.querySelector("#message");
  message.textContent = "";
  if (!email || !password) {
    message.textContent += "Không định nhập mail hoặc password à ?  ";
    return;
  }

  if(!time_end || !time_start) {
    message.textContent += "Nhập thời gian vào đi chứ ?";
    return;
  }

  if(time_end < time_start) {
    message.textContent += "Nhập thời gian cho đàng hoàng đi nào";
    return;
  }
});