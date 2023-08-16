import {getServerSession} from "next-auth";
import RegisterModal from "@/app/components/RegisterModal";
import LoginModal from "@/app/components/LoginModal";
import {handler} from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
    
    const session = await getServerSession(handler)
    console.log(session)
    return (
        <>
            <div className="h-screen bg-black">
                <RegisterModal/>
                <LoginModal/>
                <pre className="text-white">{session && JSON.stringify(session.user?.name)}</pre>
            </div>
        </>
    )
}
