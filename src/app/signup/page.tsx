import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black">
        <SignUpForm />
      </main>
    </div>
  );
}
