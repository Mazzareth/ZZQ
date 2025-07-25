"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log({ user, token });
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <Button className="w-full" onClick={handleGoogleLogin}>
      Continue with Google
    </Button>
  );
}
