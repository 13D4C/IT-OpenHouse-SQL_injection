// src/routes/api/login/+server.js
import { json } from '@sveltejs/kit';
import db from '$lib/server/database.js';

export async function POST({ request }) {
  // 1. รับข้อมูลจาก request
  const { username, password } = await request.json();

  // 2. สร้าง SQL Query ที่มีช่องโหว่ (ส่วนนี้ถูกต้องแล้วจาก Log ของคุณ)
  const vulnerable_sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
  console.log("Executing SQL:", vulnerable_sql);

  // 3. รัน Query และรอผลลัพธ์ (จุดที่ต้องตรวจสอบ)
  // เราจะใช้ Promise เพื่อจัดการกับ callback ของ library 'sqlite3'
  const user = await new Promise((resolve, reject) => {
    db.get(vulnerable_sql, [], (err, row) => {
      // ถ้ามี error ในการรัน SQL ให้ reject promise
      if (err) {
        console.error("Database Query Error:", err.message);
        reject(err);
      }
      // ถ้าไม่มี error ให้ resolve promise ด้วยผลลัพธ์ (row)
      // ถ้าไม่เจอ user, 'row' จะเป็น undefined ซึ่งถูกต้อง
      else {
        resolve(row);
      }
    });
  });

  // 4. ตรวจสอบผลลัพธ์ (จุดที่ต้องตรวจสอบ)
  // 'user' คือผลลัพธ์ที่ได้จาก db.get
  if (user) {
    // ถ้า 'user' มีค่า (เจอข้อมูลใน DB) ให้ตอบกลับว่าสำเร็จ
    console.log("User found:", user);
    return json({ message: `Welcome, ${user.username}!` }, { status: 200 });
  } else {
    // ถ้า 'user' เป็น undefined (ไม่เจอข้อมูล) ให้ตอบกลับว่าล้มเหลว
    console.log("User not found.");
    return json({ message: 'Invalid username or password.' }, { status: 401 });
  }
}