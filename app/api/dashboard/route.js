import { getUser } from "@/app/lib/dal";

export async function GET() {
    try {
      const user = getUser();
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Error fetching users" },
        { status: 500 }
      );
    }
  }