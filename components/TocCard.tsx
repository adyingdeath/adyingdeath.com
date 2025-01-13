'use client'

import type { Toc } from 'pliny/mdx-plugins'
import { useEffect, useState, useRef } from 'react'

interface TocElement {
    url: string
    value: string
    depth: number
    width: string
    prev: number
    next: number
    svgWidth: string
}

interface HeadingPosition {
    id: string
    top: number
}

export default function TocCard({ toc }: { toc: Toc }) {
    const [activeIds, setActiveIds] = useState<string[]>([])
    const [translateY, setTranslateY] = useState(0)
    const tocRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateActiveHeadings = () => {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
            const headingPositions: HeadingPosition[] = headings.map((heading) => ({
                id: heading.id,
                top: heading.getBoundingClientRect().top,
            }))

            // Sort headings by their position from top to bottom
            headingPositions.sort((a, b) => a.top - b.top)

            const viewportHeight = window.innerHeight
            const activeHeadings: string[] = []

            // Find the last heading above viewport top edge (or at least closest to it)
            const currentMainHeading = headingPositions.reduce(
                (prev, current) => {
                    if (current.top <= 0) return current
                    if (prev && prev.top <= 0) return prev
                    // If no heading is above viewport, take the first heading
                    return prev || current
                },
                null as HeadingPosition | null
            )

            if (currentMainHeading) {
                activeHeadings.push(currentMainHeading.id)
            }

            // Add any headings that are between viewport top and bottom
            headingPositions.forEach((heading) => {
                if (heading.top > 0 && heading.top < viewportHeight) {
                    activeHeadings.push(heading.id)
                }
            })

            setActiveIds(activeHeadings)
        }

        // Initial update
        updateActiveHeadings()

        // Add scroll event listener
        window.addEventListener('scroll', updateActiveHeadings)
        // Add resize event listener to handle window size changes
        window.addEventListener('resize', updateActiveHeadings)

        return () => {
            window.removeEventListener('scroll', updateActiveHeadings)
            window.removeEventListener('resize', updateActiveHeadings)
        }
    }, [])

    // Effect to handle TOC position
    useEffect(() => {
        if (activeIds.length > 0 && tocRef.current) {
            const tocContainer = tocRef.current
            const activeElement = tocContainer.querySelector(
                `a[href="#${activeIds[0]}"]`
            )?.parentElement

            if (activeElement) {
                const containerHeight = tocContainer.parentElement?.clientHeight || 0
                const elementTop = activeElement.offsetTop
                const elementHeight = activeElement.clientHeight

                // Calculate the ideal position to center the active element
                const idealPosition = elementTop - containerHeight / 2 + elementHeight * 2

                // Set the transform with a smooth transition
                setTranslateY(-idealPosition)
            }
        }
    }, [activeIds])

    const depth = ['w-0', 'w-4', 'w-8', 'w-12', 'w-16', 'w-20']
    const width = ['w-2', 'w-4', 'w-6', 'w-8', 'w-10', 'w-12']
    const tocElements: TocElement[] = toc.map((item, index, array) => ({
        url: item.url,
        value: item.value,
        depth: item.depth,
        width: depth[item.depth - 1],
        prev: index > 0 ? array[index - 1].depth : item.depth,
        next: index < array.length - 1 ? array[index + 1].depth : item.depth,
        svgWidth: width[item.depth - 1],
    }))

    return (
        <div className="dark:prose-dark prose sticky top-[50%] max-h-64 max-w-none overflow-hidden py-10">
            {/* Top fade gradient */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent dark:from-gray-950"></div>
            <div
                ref={tocRef}
                className="flex flex-col transition-transform duration-200"
                style={{ transform: `translateY(${translateY}px)` }}
            >
                {tocElements.map((item) => {
                    const isActive = activeIds.includes(item.url.slice(1)) // Remove # from the url
                    return (
                        <div className="flex items-center" key={item.url}>
                            <svg
                                className={`${item.svgWidth} h-8 ${isActive ? 'stroke-orange-600' : 'stroke-orange-600/40 dark:stroke-orange-900'} flex-shrink-0 fill-none transition-colors duration-200`}
                                viewBox={`0 0 ${item.depth * 4} 16`}
                            >
                                <path
                                    d={`M${item.prev * 4 - 2} 0V1L${item.depth * 4 - 2} 2V14L${item.depth * 4 - 2} 15v1`}
                                    strokeWidth={0.7}
                                ></path>
                            </svg>
                            <a
                                className={`ml-3 inline-block max-h-8 overflow-x-hidden text-ellipsis text-nowrap no-underline transition-colors duration-200
                                    ${isActive ? 'font-medium text-orange-600' : 'text-orange-600/40 dark:text-orange-900'}`}
                                href={item.url}
                            >
                                {item.value}
                            </a>
                        </div>
                    )
                })}
            </div>
            {/* Bottom fade gradient */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-950"></div>
        </div>
    )
}
