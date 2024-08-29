import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ReactQueryClientProvider from "@/config/ReactQueryClientProvider";
const inter = Inter({ subsets: ["latin"] });
import { cookies } from "next/headers";
import LogOutLink from "@/components/LogOutLink";
import { CardProvider } from "@/store/Card";
export const metadata = {
  title: "HemenAL",
  description: "HemenAL is a marketplace for buying and selling items.",
};

export default async function RootLayout({ children }) {

  const c = cookies()
  const isAuth = !!c.get('token_hemenal')
  const role = c.get('user_role_hemenal')


  return (
    <ReactQueryClientProvider>
      <CardProvider >
        <html lang="en">
          <body className={`${inter.className} text-[13px] md:text-sm`} >
            <main className=" pb-6 max-w-[1200px] bg-slate-50 m-auto min-h-[calc(100vh-50px)]" >
              <header className="px-3 bg-blue-300 flex justify-between items-center h-[50px] mb-8">
                <Link href={"/"}>
                  <span className="text-white">Hemen</span>
                  <span className="text-white font-bold" >AL</span>
                </Link>

                <div className="flex space-x-3 text-white" >
                  <Link href={'/card'}>Card</Link>
                  {isAuth && <LogOutLink />}
                  {!isAuth && <Link href={'login'}>Log In</Link>}
                  {!isAuth && <Link href={'/sign-up'}>Sign In</Link>}
                  {role && role.value === 'ROLE_ADMIN' && <Link href={'/add-product'} >Add Product</Link>}
                  <Link href={'/profile'} >Profile</Link>
                </div>

              </header>
              {children}
            </main>
            <footer className="px-3 bg-blue-300 flex justify-center items-center text-sm text-white h-[50px] max-w-[1200px] m-auto">
              @2024 HemenAL
            </footer>
          </body>
        </html>
      </CardProvider>
    </ReactQueryClientProvider>
  );
}
