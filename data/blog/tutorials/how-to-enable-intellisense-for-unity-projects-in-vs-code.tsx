import { md, Img, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "How to Enable IntelliSense for Unity Projects in VS Code",
  summary: "A step-by-step guide to setting up IntelliSense for Unity development in VS Code, including required plugins installation, Unity configuration, and troubleshooting .NET SDK issues.",
  date: "2025-12-05",
};

export default function post() {
  return (
    <>
      {md`
Though Unity uses Visual Studio as its default IDE, I still prefer VS Code. It's my everyday editor for programming. But there wasn't any IntelliSense from the first day I started using it with my Unity project, and I had been writing code without IntelliSense for quite some time. I can write code, though, but it's not comfortable. I even need to search on Google for some basic attributes of GameObject or so.

Today, after some searching, I've figured out how to bring IntelliSense for Unity projects into VS Code, so you can write code just like in Visual Studio.
      `}

      <h2>Prepare the Plugins</h2>

      {md`
You should first install these plugins:
      `}

      <h3>C#</h3>
      <Img src="/static/images/blog/2025-12-05_22-01-16.png" width={800} height={400} alt="C# extension" />

      <h3>C# Dev Kit</h3>
      <Img src="/static/images/blog/2025-12-05_22-06-15.png" width={800} height={400} alt="C# Dev Kit extension" />

      <h3>Unity</h3>
      <Img src="/static/images/blog/2025-12-05_22-07-35.png" width={800} height={400} alt="Unity extension" />

      <h2>Configure Unity</h2>

      {md`
After installing the plugins, we're halfway there.

Firstly, open one of your Unity projects, find \`Edit > Preferences > External Tools\`. Then, you can find an option called \`External Script Editor\`, exactly the first option on my Unity. Click the dropdown. Click \`Browse...\`. Go to the path where your VS Code is installed and select the VS Code executable file.
      `}

      <Img src="/static/images/blog/2025-12-05_22-15-05.png" width={800} height={400} alt="Unity External Tools settings" />

      {md`
Secondly, uncheck all the options in the section named \`Generate .csproj files for:\`, just like the image below. Then, click the \`Regenerate project files\` button. You will find some new files generated in the project folder, like \`.sln\`, \`.csproj\`, etc.
      `}

      <Img src="/static/images/blog/2025-12-05_22-15-51.png" width={800} height={400} alt="Unity project file generation settings" />

      {md`
Finally, close VS Code and reopen it. Or open the Command Palette (the shortcut is \`Ctrl + Shift + P\` on my VS Code) and run \`Developer: Reload Window\`. Wait patiently until all the resources complete loading. Now, you can try writing code to see if there is IntelliSense.
      `}

      <h2>{`If you encounter "No required version of a NET SDK was found"`}</h2>

      {md`
If C# Dev Kit shows you a message saying "No required version of a NET SDK was found", like in the image below:
      `}

      <Img src="/static/images/blog/mvqf927h7qktnhsf.png" width={800} height={400} alt=".NET SDK not found error" />

      {md`
Run \`dotnet --info\`. In the \`.NET SDKs installed:\` section, you'll see your installed .NET SDKs.
      `}

      <CodeBlock
        language="plaintext"
        code={`# If there are .NET SDKs installed, it will be something like below.
.NET SDKs installed:
  x.x.xxx [xxx\\dotnet\\sdk]

# If there aren't .NET SDKs installed, it will be something like below.
.NET SDKs installed:
  No SDKs were found.`}
      />

      {md`
Unity doesn't provide a complete .NET SDK for development, so you need to install it yourself. The output of \`dotnet --info\` includes a link to the SDKs download page. Go there, download an SDK, and install it. After installation completes, close VS Code completely and reopen your Unity project with VS Code, and it should work.
      `}

      <h3>The problem still exists</h3>

      {md`
**However**, if you still see the "No required version of a NET SDK was found" message, you need to do a bit more.
      `}

      <blockquote>
        <p>
          Check if there are files under
          <code>C:\Program Files (x86)\dotnet</code>
        </p>
        <p>
          If so, delete them all. Make sure to backup the files first, or you
          can just move them away to try.
        </p>
        <p>
          Then, open your project again to see if it works.
        </p>
      </blockquote>

      <h2>Reference</h2>

      {md`
The [Configure Unity](#configure-unity) section is from an online comment, which you can find [here](https://discussions.unity.com/t/intellisense-not-working-for-visual-studio-code/773026/8).

The [The problem still exists](#the-problem-still-exists) section is from [solid1](https://stackoverflow.com/users/19321395/solid1) on Stack Overflow, available [here](https://stackoverflow.com/a/73248077).
      `}
    </>
  );
}
