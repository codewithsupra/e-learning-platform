'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4 font-mono text-sm">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="mx-auto w-full sm:w-96 space-y-6 bg-white px-6 py-10 border-4 border-black shadow-[8px_8px_0_0_#000] rounded-lg"
        >
          {/* HEADER */}
          <header className="text-center">
            <Image
              src="/smile.png"
              alt="Clover Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
            <h1 className="mt-3 text-base font-bold tracking-wide text-black uppercase">
              Sign in to Clover
            </h1>
          </header>

          <Clerk.GlobalError className="block text-sm text-red-500" />

          {/* GOOGLE LOGIN */}
          <Clerk.Connection
            name="google"
            className="flex w-full  cursor-pointer items-center justify-center gap-3 px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none font-bold rounded-md"
          >
            Login with Google
          </Clerk.Connection>

          {/* EMAIL & PASSWORD */}
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-1">
              <Clerk.Label className="font-bold text-black uppercase">
                Email
              </Clerk.Label>
              <Clerk.Input
                type="email"
                required
                className="w-full px-3 py-2 bg-white border-2 border-black shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-500 rounded-md"
              />
              <Clerk.FieldError className="text-sm text-red-500" />
            </Clerk.Field>

            <Clerk.Field name="password" className="space-y-1">
              <Clerk.Label className="font-bold text-black uppercase">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full px-3 py-2 bg-white border-2 border-black shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-500 rounded-md"
              />
              <Clerk.FieldError className="text-sm text-red-500" />
            </Clerk.Field>
          </div>

          {/* SUBMIT BUTTON */}
          <SignIn.Action
            submit
            className="w-full cursor-pointer px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase rounded-md"
          >
            Sign In
          </SignIn.Action>

          {/* CREATE ACCOUNT */}
          <p className="text-center text-xs text-black">
            No account?{' '}
            <Clerk.Link
              navigate="sign-up"
              className="font-bold underline underline-offset-2 hover:text-yellow-600"
            >
              Create an account
            </Clerk.Link>
          </p>

          {/* RETURN TO HOME */}
          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-sm text-blue-600 underline hover:text-blue-400"
            >
              ← Return to landing page
            </Link>
          </div>

          {/* EXTERNAL CLERK DOCS LINK */}
          <div className="text-center">
            <a
              href="https://clerk.com/user-authentication?utm_source=google&utm_medium=cpc&utm_campaign=%7Bcampaignname%7D&utm_adgroup=%7Badgroupname%7D&utm_term=clerk+docs&gad_source=1&gad_campaignid=23228885670&gbraid=0AAAAAqJUiX6gC1H1EmGvmVriosslFNkgg&gclid=Cj0KCQiAubrJBhCbARIsAHIdxD-QVKTtHPYR2LnKPWZs2gxWzxFrbaVaG54GbblU0T3pFVN0Eee7cWwaApCpEALw_wcB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 underline hover:text-gray-800"
            >
              View Clerk authentication docs →
            </a>
          </div>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
