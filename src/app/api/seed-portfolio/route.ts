// src/app/api/seed-portfolio/route.ts
import { NextResponse } from "next/server";
import { seedPortfolio } from "../../lib/seed-portfolio";

export async function GET() {
  try {
    console.log("🚀 Starting portfolio seeding via API route");
    await seedPortfolio();
    return NextResponse.json({
      success: true,
      message: "Portfolio data seeded successfully",
    });
  } catch (error) {
    console.error("Failed to seed portfolio data:", error);
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
