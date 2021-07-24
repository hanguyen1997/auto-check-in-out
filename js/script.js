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
const STORAGE_KEY_DAY_OF_WEEK_SELECTED = "day_of_week_selected";
const time_start = document.querySelector("#time-start").value;
const time_end = document.querySelector("#time-end").value;

console.log(time_start+ " - " +time_end);

/*setting button*/ 
document.querySelector("#btn-close").addEventListener("click", function () {
  window.close();
});

function setDayOfWeek(day_of_week_selected) {
  for (const day of day_of_week_selected) {
    const inputElm = document.querySelector(`input[data-index="${day}"]`);
    inputElm.checked = true;
  }
}


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

  // get date
  const inputElms = document.querySelectorAll(`input[data-index]`);
  const new_day_of_week_selected = [];
  for (const inputElm of inputElms) {
    if (inputElm.checked) {
      new_day_of_week_selected.push(inputElm.getAttribute("data-index"));
    }
  }
  setDayOfWeek(new_day_of_week_selected);
  
  const WEEK_DAYS = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  //saves
  chrome.storage.sync.set({ time_start: time_start }, function () {
  });

  chrome.storage.sync.set({ time_end: time_end }, function () {
  });

  chrome.storage.sync.set({ email: email }, function () {
  });

  chrome.storage.sync.set({ password: password }, function () {
  });

  chrome.storage.sync.set({ day_of_week_selected: new_day_of_week_selected },function () {
  });

});

// get value 
chrome.storage.sync.get(["email", "password", "time_start", "time_end"], function (result) {
    if (result.email){
      document.querySelector("#email").value = result.email;
      document.querySelector("#email").classList.add("active");
    }
    if (result.password) {
      document.querySelector("#password").value = result.password;
      document.querySelector("#password").classList.add("active");
    }
    document.querySelector("#time-start").value = result.time_start || "07:29";
    document.querySelector("#time-end").value = result.time_end || "17:31";
});

chrome.storage.sync.get('day_of_week_selected', function (result) {
  const day_of_week_selected = result.day_of_week_selected;
  setDayOfWeek(day_of_week_selected);
});
