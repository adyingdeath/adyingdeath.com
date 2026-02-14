export default function GoogleAnalytics() {
    return (
        <>
            <script async src="/gtm.js"></script>
            <script dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-BJ6N4EE81Q');`.split("\n").map(e => e.trim()).join("")
            }}>
            </script>
        </>
    )
}