export default function Login() {
    return(
        <>
        <div className="flex h-screen items-center justify-center">
            <h1 className="text-3xl text-center mt-10">
               Login Page
             </h1>
        </div>

        <form className="flex flex-col gap-4">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        </>
    );
}