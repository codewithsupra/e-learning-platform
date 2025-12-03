'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 font-mono text-sm text-white">
      <SignUp.Root>
        {/* START STEP */}
        <SignUp.Step
          name="start"
          className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-6 py-10 border-4 border-black shadow-[8px_8px_0_0_#000] rounded-lg"
        >
          <header className="text-center">
            <Image
                          src="/smile.png"
                          alt="Clover Logo"
                          width={80}
                          height={80}
                          className="mx-auto"
                        />

            <h1 className="mt-3 text-base text-xl font-bold tracking-wide text-yellow-400 uppercase">
              Create Account
            </h1>
          </header>

          <Clerk.GlobalError className="block text-sm text-red-500" />

          <div className="space-y-4">
            <Clerk.Field name="emailAddress" className="space-y-1">
              <Clerk.Label className="font-bold text-yellow-400 uppercase">
                Email
              </Clerk.Label>
              <Clerk.Input
                type="email"
                required
                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black rounded-md shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-400 text-white"
              />
              <Clerk.FieldError className="text-sm text-red-500" />
            </Clerk.Field>

            <Clerk.Field name="password" className="space-y-1">
              <Clerk.Label className="font-bold text-yellow-400 uppercase">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black rounded-md shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-400 text-white"
              />
              <Clerk.FieldError className="text-sm text-red-500" />
            </Clerk.Field>
          </div>

          <SignUp.Action
            submit
            className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase rounded-md"
          >
            Sign Up
          </SignUp.Action>

          <p className="text-center text-xs text-yellow-400">
            Already have an account?{' '}
            <Clerk.Link
              navigate="sign-in"
              className="font-bold underline underline-offset-2 hover:text-yellow-200"
            >
              Sign in
            </Clerk.Link>
          </p>

          {/* Return to Home */}
          <div className="text-center mt-2">
            <Link
              href="/"
              className="text-xs text-blue-400 underline hover:text-blue-300"
            >
              ← Return to landing page
            </Link>
          </div>

          {/* Clerk Docs */}
          <div className="text-center">
            <a
              href="https://clerk.com/user-authentication?utm_source=google&utm_medium=cpc&utm_campaign=%7Bcampaignname%7D&utm_adgroup=%7Badgroupname%7D&utm_term=clerk+docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 underline hover:text-gray-200"
            >
              View Clerk authentication docs →
            </a>
          </div>
        </SignUp.Step>

        {/* VERIFICATION STEP */}
        <SignUp.Step
          name="verifications"
          className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-6 py-10 border-4 border-black shadow-[8px_8px_0_0_#000] rounded-lg"
        >
          <header className="text-center">
            <h1 className="text-base font-bold tracking-wide text-yellow-400 uppercase">
              Verify Email Code
            </h1>
          </header>

          <Clerk.GlobalError className="block text-sm text-red-500" />

          <SignUp.Strategy name="email_code">
            <Clerk.Field name="code" className="space-y-1">
              <Clerk.Label className="font-bold text-yellow-400 uppercase">
                Email Code
              </Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black rounded-md shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-400 text-white"
              />
              <Clerk.FieldError className="text-sm text-red-500" />
            </Clerk.Field>

            <SignUp.Action
              submit
              className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase rounded-md"
            >
              Verify
            </SignUp.Action>
          </SignUp.Strategy>
        </SignUp.Step>

        {/* CONTINUE STEP */}
        <SignUp.Step
          name="continue"
          className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-6 py-10 border-4 border-black shadow-[8px_8px_0_0_#000] rounded-lg"
        >
          <header className="text-center">
            <h1 className="text-base font-bold tracking-wide text-yellow-400 uppercase">
              Continue Registration
            </h1>
          </header>

          <Clerk.GlobalError className="block text-sm text-red-500" />

          <Clerk.Field name="username" className="space-y-1">
            <Clerk.Label className="font-bold text-yellow-400 uppercase">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full px-3 py-2 bg-zinc-900 border-2 border-black rounded-md shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-400 text-white"
            />
            <Clerk.FieldError className="text-sm text-red-500" />
          </Clerk.Field>

          <SignUp.Action
            submit
            className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase rounded-md"
          >
            Continue
          </SignUp.Action>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
}
