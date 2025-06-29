export default function GoogleAnalytics({ gid }: { gid: string }) {
    return (
        <>
            <script async src="/gtm.js"></script>
            <script>
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gid}');`}
            </script>
        </>
    )
}