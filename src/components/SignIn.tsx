"use client";
import { authClient } from "@/utils/authClient";
import React from "react";

export default function TempSignin() {
    const sesh = authClient.useSession();
    if (sesh && sesh.data) {
        return (
            <div className="flex flex-col gap-2 items-center">
                <div>Logged in as {sesh.data.user.name}</div>
                <a
                    className="cursor-pointer hover:underline hover:text-stone-500"
                    onClick={async () => {
                        await authClient.signOut();
                    }}
                >
                    Sign out
                </a>
            </div>
        );
    }
    return (
        <a
            className="cursor-pointer hover:underline hover:text-stone-500"
            onClick={async () => {
                await authClient.signIn.social({
                    provider: "discord",
                });
            }}
        >
            Sign in
        </a>
    );
}
