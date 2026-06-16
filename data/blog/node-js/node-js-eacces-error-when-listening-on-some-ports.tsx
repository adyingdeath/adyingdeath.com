import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "Node.js EACCES error when listening on some ports",
  summary: "Node.js EACCES error when listening on some ports",
  date: "2025-02-27",
};

export default function post() {
  return (
    <>
      {md`
Today, I was working on one of my projects(a Next.js site) and got the following error when I tried to start the program:
      `}

      <CodeBlock
        language="plaintext"
        code={` ⨯ Failed to start server
Error: listen EACCES: permission denied 0.0.0.0:3000
    at <unknown> (Error: listen EACCES: permission denied 0.0.0.0:3000)
    at new Promise (<anonymous>) {
  code: 'EACCES',
  errno: -4092,
  syscall: 'listen',
  address: '0.0.0.0',
  port: 3000
}`}
      />

      {md`
I was originally thinking that the port was already in use, so I checked if it was and then found that it wasn't.

After some research, I figured out how to fix it.
      `}

      <h2>Solution</h2>

      <p><em>Note: The solution is from a
      <a href="https://stackoverflow.com/a/9166332/22344092">StackOverflow post</a>.</em></p>

      <hr />

      <h3>Running locally (Mac OS, Linux)</h3>

      {md`
As a general rule, processes running without root privileges cannot bind to ports below 1024.

So try a higher port, or run with elevated privileges via \`sudo\`. You can downgrade privileges after you have bound to the low port using \`process.setgid\` and \`process.setuid\`.
      `}

      <h3>Running locally (Windows)</h3>

      {md`
It's possible another process is already listening on this port, or the ports have been added to an excluded range.

To show excluded ranges:
      `}

      <CodeBlock
        language="bash"
        code={`netsh interface ipv4 show excludedportrange protocol=tcp`}
      />

      {md`
To remedy, either choose another port, or you can try to release the ranges by restarting the \`winnat\` service.

Run \`cmd\` with admin rights.
      `}

      <CodeBlock
        language="bash"
        code={`net stop winnat
net start winnat`}
      />

      <h3>Running on PaaS (eg: heroku)</h3>

      {md`
When running your apps on most platform as a service offerings, you have to use the port as specified in the PORT environment variable.

See http://devcenter.heroku.com/articles/node-js for an example
      `}

      <CodeBlock
        language="javascript"
        code={`const server = require('http').createServer();
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(\`Listening on \${port}\`));`}
      />
    </>
  );
}
