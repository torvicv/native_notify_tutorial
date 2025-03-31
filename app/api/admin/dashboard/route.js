import { getUser } from "@/app/lib/dal";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
      const session = await getServerSession(authOptions);
      
      const user = getUser();
  
      return NextResponse.json({user: JSON.stringify(user), session: JSON.stringify(session)}, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Error fetching users" },
        { status: 500 }
      );
    }
  }