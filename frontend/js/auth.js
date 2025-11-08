// หมายเหตุ: โค้ดนี้สมมติว่าไฟล์ api.js ถูกโหลดเข้ามาก่อนหน้าในรูปแบบ Global Class (API) 
// เหมือนกับวิธีการใช้งานใน login.html

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // แก้ไข: เปลี่ยนจาก email เป็น username
    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value;

    try {
      // แก้ไข: ใช้ API.login() แทน apiFetch
      const response = await API.login(username, password);

      if (response.success) {
        // อ้างอิงจาก login.html: ใช้ response.data.token และ response.data.user
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // อ้างอิงจาก login.html: ใช้ role จาก response.data.user
        const role = response.data.user.role;

        // แก้ไข: ปรับเส้นทางให้สอดคล้องกับ login.html ที่ใช้โครงสร้าง ../role/dashboard.html
        if (role === "admin") location.href = "../admin/dashboard.html";
    else if (role === "support") location.href = "../staff/dashboard.html";
        else location.href = "../user/dashboard.html";
        
      } else {
        // การจัดการ Response ที่อาจถูกโยนออกมาโดย api.js
        alert("เข้าสู่ระบบไม่สำเร็จ: " + (response.message || "Unknown error"));
      }
    } catch (error) {
        // การจัดการ Error ที่ถูกโยนออกมาจาก API.request ใน api.js
        alert(error.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  });
});

export function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}