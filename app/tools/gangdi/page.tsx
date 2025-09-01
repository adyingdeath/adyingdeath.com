import ClientComponent from './client'

export default function GangdiCalculator() {
    return (
        <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-3xl font-bold">港迪银卡票价计算器</h1>
            <ClientComponent />
        </div>
    )
}
