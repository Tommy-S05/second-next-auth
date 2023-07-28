import Modal from "@/app/components/Modal";
import RegisterModal from "@/app/components/RegisterModal";
import LoginModal from "@/app/components/LoginModal";

export default function Home() {
    return (
        <main className="h-screen bg-black">
            {/*<Modal title={'tommy'} actionLabel={'Login'} disabled={false}/>*/}
            <LoginModal/>
            <RegisterModal/>
        </main>
    )
}
