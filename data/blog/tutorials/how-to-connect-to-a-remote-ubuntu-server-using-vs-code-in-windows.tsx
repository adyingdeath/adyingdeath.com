import { md, Img, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "How to Connect to a Remote Ubuntu Server Using VS Code in Windows",
  summary: "A step-by-step guide to connecting VS Code to your Ubuntu server through SSH, allowing you to edit files directly on the server.",
  date: "2025-09-01",
};

export default function post() {
  return (
    <>
      {md`
It can be very helpful to connect VS Code to your Ubuntu server through SSH, allowing you to edit files directly on the server. Here, I'll guide you step by step on how to do this.
      `}

      <h2>Install the Extension</h2>

      {md`
The first step is to install the extension for SSH connections. It's called \`Remote - SSH\`. You can easily find it in the VS Code Extensions tab by searching for \`SSH\`.
      `}

      <div className="w-full flex justify-center">
        <Img
          src="/static/images/blog/2025-09-01_16-17-17.png"
          width={800}
          height={400}
          alt="Remote - SSH extension in VS Code"
        />
      </div>

      {md`
Install the extension and then we'll move to the next step.
      `}

      <h2>Generate Key Pair</h2>

      {md`
Open PowerShell or CMD, enter the following command:
      `}

      <CodeBlock
        language="bash"
        code={`ssh-keygen -t rsa -b 4096 -C "some comments for distinguish"`}
      />

      {md`
The comment is optional and will be appended to the tail of the public key for identification purposes.
      `}

      <CodeBlock
        language="bash"
        code={`> ssh-keygen -t rsa -b 4096 -C "some comments for distinguish"
Generating public/private rsa key pair.
Enter file in which to save the key (C:\\Users\\Administrator/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:`}
      />

      {md`
The passphrase is optional too; it increases security by adding a password to your secret key.

The file location is relative to your home directory. For example:
      `}

      <CodeBlock
        language="bash"
        code={`Enter file in which to save the key (C:\\Users\\Administrator/.ssh/id_rsa): test
Generated keys:
 - C:\\Users\\Administrator\\test
 - C:\\Users\\Administrator\\test.pub

Enter file in which to save the key (C:\\Users\\Administrator/.ssh/id_rsa): .ssh/test
Generated keys:
 - C:\\Users\\Administrator\\.ssh\\test
 - C:\\Users\\Administrator\\.ssh\\test.pub`}
      />

      {md`
After generating, find your keys and proceed to the next step.
      `}

      <h2>Copy the Public Key to Your Server</h2>

      {md`
On your server, edit the \`~/.ssh/authorized_keys\` file (note: it's a file, not a folder):
      `}

      <CodeBlock language="bash" code={`vim ~/.ssh/authorized_keys`} />

      {md`
If you're opening it for the first time, it's okay if it's empty. You should open the \`<keyname>.pub\` file you generated earlier and copy its contents into \`authorized_keys\` on a new line:
      `}

      <CodeBlock
        language="plaintext"
        code={`... maybe old keys added before ...
ssh-rsa AAAA....../BB23SUe......0FmUdWw== your_comment`}
      />

      <h2>Configure SSH in VS Code</h2>

      {md`
Press \`Ctrl + Shift + P\` to open the command palette, and type \`ssh configuration\` into it. You will find an option named \`Remote-SSH: Open SSH Configuration File...\`. Click it, and you'll be prompted to select an SSH configuration file to update. The first one is fine.
      `}

      <div className="w-full flex justify-center">
        <Img
          src="/static/images/blog/2025-09-01_16-41-31.png"
          width={800}
          height={400}
          alt="Remote-SSH: Open SSH Configuration File"
        />
      </div>

      {md`
Then, a configuration file will open in VS Code. Add these lines to it:
      `}

      <CodeBlock
        language="plaintext"
        code={`Host <random_name_you_want>
  HostName <your_server_ip_address_without_port>
  User <the_user_you_want_to_log_in_to_your_server>`}
      />

      {md`
Save the file, then navigate to the \`Remote Explorer\` in the left sidebar. You will see an SSH configuration entry with the \`<random_name_you_want>\`. Click the connect button.
      `}

      <div className="w-full flex justify-center">
        <Img
          src="/static/images/blog/2025-09-01_16-47-11.png"
          width={800}
          height={400}
          alt="Remote Explorer showing SSH target"
        />
      </div>

      {md`
Then, click \`Open Folder\` and select a folder on your server to open.
      `}

      <div className="w-full flex justify-center">
        <Img
          src="/static/images/blog/2025-09-01_16-49-02.png"
          width={800}
          height={400}
          alt="Open folder on remote server"
        />
      </div>

      {md`
Well done! Now you're able to directly edit files on your Ubuntu server. Other systems work similarly, so feel free to explore on your own.
      `}
    </>
  );
}
