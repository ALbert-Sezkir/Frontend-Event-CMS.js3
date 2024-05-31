import { inter } from './fonts'
import "./globals.css";
import SignedOutPage from './_components/signed-outForm';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'



export const metadata = {
  title: "Event Website",
  description: "Event Webpage (school project)",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          
            <SignedIn>
              
              {children}
            </SignedIn>
            
            <SignedOut>
            <UserButton />
              <SignedOutPage />
            </SignedOut>

        </body>
      </html>
    </ClerkProvider>
  );
}

