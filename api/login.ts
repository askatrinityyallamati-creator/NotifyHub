import { neon } from "@neondatabase/serverless";

declare const process: {
  env: Record<string, string | undefined>;
};

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { username, password } = req.body;

    // Check empty fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user in Neon database
    const users = await sql`
      SELECT id, username, password
      FROM users
      WHERE username = ${username}
      LIMIT 1
    `;

    // User doesn't exist
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const user = users[0];

    // Plain-text password comparison
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.username,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}