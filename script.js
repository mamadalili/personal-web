// نمایش سال جاری
document.getElementById("year").textContent = new Date().getFullYear();

const getStartedBtn = document.getElementById("get-started-btn");
const usernameInput = document.getElementById("username");
const toast = document.getElementById("toast");

getStartedBtn.addEventListener("click", (e) => {
  e.preventDefault(); // جلوی reload صفحه رو می‌گیره

  const name = usernameInput.value.trim();

  // نمایش داده در console
  console.log("User input:", name);

  if (!name) {
    showToast("Please enter your name");
    return;
  }

  // ذخیره در LocalStorage
  localStorage.setItem("username", name);

  showToast(`${name} welcome, thanks for your visit 🌸`);
  usernameInput.value = ""; // پاک کردن input بعد از submit
});

// تابع نمایش Toast
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// نمونه: خواندن داده ذخیره شده (مثلاً برای خوشامدگویی بعدی)
const savedName = localStorage.getItem("username");
if (savedName) {
  console.log("Saved username from previous visit:", savedName);
}
