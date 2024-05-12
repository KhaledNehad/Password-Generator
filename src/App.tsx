import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

function App() {
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSpecialChars, setIncludeSpecialChars] =
    useState<boolean>(false);

  const [passwordLength, setPasswordLength] = useState<number>(15);
  const [password, setPassword] = useState<string>("");
  const [mobile, setMobile] = useState<boolean>(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generatePassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const lowercase: string = "abcdefghijklmnopqrstuvwxyz";
    const uppercase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers: string = "0123456789";
    const specialChars: string = "!@#$%^&*()_+=-[]{}|:<>?,.";

    const chars: string =
      lowercase +
      (includeUppercase ? uppercase : "") +
      (includeNumbers ? numbers : "") +
      (includeSpecialChars ? specialChars : "");

    let pw: string = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex: number = Math.floor(Math.random() * chars.length);
      pw += chars[randomIndex];
    }
    setPassword(pw);
  };

  const copyPasswordToClipboard = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    e.preventDefault();

    if (!password) {
      return;
    }

    navigator.clipboard.writeText(password);

    successBox.current?.classList.add("message-show");
    setTimeout(() => {
      successBox.current?.classList.remove("message-show");
    }, 1500);
  };

  const successBox = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card>
        <form onSubmit={generatePassword}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-blue-900 dark:text-blue-300">
              Password Generator
            </CardTitle>
            <CardDescription className="text-gray-900 dark:text-gray-300">
              Generate a random password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              <label
                htmlFor="include-uppercase"
                className="inline-flex cursor-pointer items-center"
              >
                <Switch
                  id="uppercase"
                  name="include-uppercase"
                  checked={includeUppercase}
                  onClick={() => setIncludeUppercase((prev) => !prev)}
                />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Include Uppercase
                </span>
              </label>
              <label
                htmlFor="include-numbers"
                className="inline-flex cursor-pointer items-center"
              >
                <Switch
                  id="numbers"
                  name="include-numbers"
                  checked={includeNumbers}
                  onClick={() => setIncludeNumbers((prev) => !prev)}
                />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Include Numbers
                </span>
              </label>

              <label
                htmlFor="include-special-chars"
                className="inline-flex cursor-pointer items-center"
              >
                <Switch
                  id="special-chars"
                  name="include-special-chars"
                  checked={includeSpecialChars}
                  onClick={() => setIncludeSpecialChars((prev) => !prev)}
                />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Include Special Characters
                </span>
              </label>
              <label
                htmlFor="password-length"
                className="inline-flex cursor-pointer items-center space-x-2"
              >
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Password Length
                </span>
                <input
                  id="password-length"
                  type="range"
                  min="5"
                  max="25"
                  name="password-length"
                  value={passwordLength}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                  onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                />

                <span className=" w-2 text-center text-sm font-medium text-gray-900 ">
                  {passwordLength}
                </span>
              </label>
            </div>

            <div className="mt-6 rounded-lg bg-blue-100 p-4 text-center text-sm font-semibold text-blue-900 lg:text-2xl">
              {password || "Your Password"}
            </div>

            <div className="mt-6 flex justify-around">
              <Button
                onClick={copyPasswordToClipboard}
                disabled={!password}
                size={mobile ? "sm" : "lg"}
              >
                Copy Password
              </Button>

              <Button type="submit" size={mobile ? "sm" : "lg"}>
                Generate Password
              </Button>
            </div>

            <div
              className="message-hide dark:duration-400 mt-6 w-full rounded-lg bg-green-100 p-4 text-center text-green-900 transition-all duration-700 ease-in-out "
              ref={successBox}
            >
              <p>Password copied to clipboard!</p>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

export default App;
