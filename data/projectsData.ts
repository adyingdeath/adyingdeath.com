interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Mightool: useful tools here',
    description: `The website combines many practical small tools, including random password generators, text editors, text statistics, and other online tools that can be used for free without registration. The toolset has powerful and practical functions, covering text processing, conversion, security and other needs. It is a high-quality collection of tool applications on the web.`,
    imgSrc: '/static/images/projects/mightool.webp',
    href: 'https://www.mightool.com/en/',
  },
  {
    title: 'Promptcove: helpful prompt manager',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://www.promptcove.com/',
  },
  {
    title: 'INJ: superpower for Minecraft datapacks developers',
    description: `INJ is a progressive programming language designed for Minecraft datapack development. It enhances mcfunction files with features like conditionals and loops while preserving the original command syntax. This allows developers to gradually adopt INJ's powerful features without rewriting existing code, making datapack development more efficient and maintainable.`,
    imgSrc: '/static/images/projects/inj.webp',
    href: 'https://inj.adyingdeath.com/',
  },
]

export default projectsData
