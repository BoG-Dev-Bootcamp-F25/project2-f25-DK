import EditTrainingLogForm from "@/components/EditTrainingLogForm";
import LoginForm from "@/components/LoginForm";
import TrainingLogCard, { mockData } from "@/components/TrainingLogCard";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black">
        <EditTrainingLogForm />
      </main>
    </div>
  );
}
