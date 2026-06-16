import { md, Img, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "How to change 7-zip temp folder location",
  summary: "Learn how to change the temporary folder location for 7-zip.",
  date: "2025-05-03",
};

export default function post() {
  return (
    <>
      <blockquote>
        <p>
          Open 7-zip, press <code>F9</code> and the GUI will split into two zones.
        </p>
        <p>
          Open your archive file using 7-zip, and navigate in the other zone
          to where you want to extract the files.
        </p>
        <p>Simply drag and drop your files into your desired destination.</p>
      </blockquote>

      {md`
Recently, I needed to extract a very large zip file and ran into an issue where 7-zip was using a temp folder on my C: drive (where space was limited and insufficient).

So, I started looking for a solution.

At first, I found a setting in 7-zip to change the temp folder location to a different drive, but it wasn't working. It was still extracting and then copying the files from the temp folder on the C: drive.
      `}

      <Img
        src="/static/images/blog/2025-05-03_22-19-12.webp"
        width={800}
        height={400}
        alt="7-zip temp folder setting screenshot"
      />

      {md`
Here is the solution from a Reddit post [here](https://www.reddit.com/r/techsupport/comments/fyahjo/comment/kgoqr82/).

The solution originally came from [this post](https://superuser.com/posts/717198/revisions).

I'm recording this tip here for future reference.
      `}
    </>
  );
}
