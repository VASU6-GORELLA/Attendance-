const students = [
  "25NU1A4202",
  "25NU1A4209",
  "25NU1A4216",
  "25NU1A4217",
  "25NU1A4220",
  "25NU1A4223",
  "25NU1A4224",
  "25NU1A4225",
  "25NU1A4229",
  "25NU1A4231",
  "25NU1A4233",
  "25NU1A4234",
  "25NU1A4235",
  "25NU1A4240",
  "25NU1A4243",
  "25NU1A4246",
  "25NU1A4251",
  "25NU1A4253",
  "25NU1A4257",
  "25NU1A4261",
  "25NU1A4266",
  "25NU1A4268",
  "25NU1A4270",
  "25NU1A4273",
  "25NU1A4276",
  "25NU1A4277",
  "25NU1A4278",
  "25NU1A4281",
  "25NU1A4282",
  "25NU1A4283",
  "25NU1A4285",
  "25NU1A4288",
  "25NU1A4289",
  "25NU1A4291",
  "25NU1A4294",
  "25NU1A4296",
  "25NU1A4298",
  "25NU1A42A8",
  "25NU1A42B0",
  "25NU1A42B5",
  "25NU1A42B6",
  "25NU1A42B7",
  "25NU1A42B8",
  "25NU1A42C0",
  "25NU1A42C4",
  "25NU1A42C6",
  "25NU1A42D1",
  "25NU1A42D7",
  "25NU1A42E9",
  "25NU1A42F2",
  "25NU1A42F5",
  "25NU1A42F8",
  "25NU1A42G0",
  "25NU1A42G3",
  "25NU1A42G6",
  "25NU1A42H2",
  "25NU1A42H3",
  "25NU1A42H4",
  "25NU1A42H5",
  "25NU1A42H9",
  "25NU1A42I5",
  "25NU1A42J3",
  "25NU1A42J4",
  "25NU1A42J6",
  "25NU1A42K6",
  "25NU1A42M7",
  "26NU5A4207",
  "26NU5A4208",
  "26NU5A4212",
  "26NU5A4217",
  "26NU5A4218",
  "26NU5A4221"
].map((roll, index) => ({ id: index + 1, label: roll, present: true }));

const TOTAL = students.length;
const dateInput = document.getElementById("date");
const grid = document.getElementById("students");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const percentage = document.getElementById("percentage");
const message = document.getElementById("message");
const toast = document.getElementById("toast");

function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

dateInput.value = todayString();

function displayDate() {
  const parts = dateInput.value.split("-");
  return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : "";
}

function render() {
  grid.innerHTML = "";
  students.forEach(student => {
    const button = document.createElement("button");
    button.className = "student" + (student.present ? "" : " absent");
    button.type = "button";
    button.innerHTML = `
      <span class="symbol">${student.present ? "✅" : "❌"}</span>
      <span class="roll">${student.label}</span>
      <span class="status">${student.present ? "PRESENT" : "ABSENT"}</span>
    `;
    button.addEventListener("click", () => {
      student.present = !student.present;
      render();
    });
    grid.appendChild(button);
  });

  const present = students.filter(s => s.present).length;
  const absent = TOTAL - present;
  const percent = Math.round((present / TOTAL) * 100);

  presentCount.textContent = present;
  absentCount.textContent = absent;
  percentage.textContent = `${percent}%`;

  const absentStudents = students.filter(s => !s.present).map(s => s.label);
  message.value = `${displayDate()}

CSM 2 absentees :
${absentStudents.length ? absentStudents.join(", ") : "None"}

Present : ${present}/${TOTAL}
Percentage : ${percent}%`;
}

document.getElementById("allPresent").addEventListener("click", () => {
  students.forEach(s => s.present = true);
  render();
});

document.getElementById("clearAll").addEventListener("click", () => {
  students.forEach(s => s.present = false);
  render();
});

dateInput.addEventListener("change", render);

document.getElementById("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(message.value);
  } catch {
    message.select();
    document.execCommand("copy");
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1300);
});

render();
