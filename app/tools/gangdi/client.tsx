'use client'

import { useState } from 'react'

interface Result {
    totalCostRMB: number
    process: string[]
}

export default function ClientComponent() {
    const [selectedTicket, setSelectedTicket] = useState('')
    const [purchasePriceRMB, setPurchasePriceRMB] = useState('')
    const [exchangeRate, setExchangeRate] = useState('0.9154') // 默认港币到人民币汇率
    const [result, setResult] = useState<Result | null>(null)

    const tickets = [
        { id: 'oneDayWeekday', label: '一日票(一级)', info: '周二到周四', deduction: 669 },
        { id: 'oneDayWeekend', label: '一日票(二级)', info: '周五到周一', deduction: 759 },
        { id: 'twoDayWeekday', label: '两日票(一级)', info: '周二到周四', deduction: 769 },
        { id: 'twoDayWeekend', label: '两日票(二级)', info: '周五到周一', deduction: 859 },
    ]

    const calculate = () => {
        if (!selectedTicket || !purchasePriceRMB || !exchangeRate) {
            alert('请填写所有字段')
            return
        }

        const ticket = tickets.find(t => t.id === selectedTicket)
        if (!ticket) {
            alert('未找到选中的票种')
            return
        }
        const currentDate = new Date()

        const discountHKD = ticket.deduction

        // 检查是否在9.9之前
        const discountDate = new Date(currentDate.getFullYear(), 8, 9) // 9月9日
        const isBeforeDiscount = currentDate <= discountDate

        const silverCardPriceHKD = 1178 // 银卡学生票价
        let discountedPriceHKD = silverCardPriceHKD

        if (isBeforeDiscount) {
            discountedPriceHKD -= 200
        }

        const amountToPayHKD = discountedPriceHKD - discountHKD
        const amountToPayRMB = amountToPayHKD * parseFloat(exchangeRate)

        const totalCostRMB = parseFloat(purchasePriceRMB) + amountToPayRMB

        const process = [
            `港迪银卡学生票价: ${silverCardPriceHKD}港币`,
            `是否在9.9号及之前: ${isBeforeDiscount ? '是' : '否'}`,
            isBeforeDiscount ? `银卡折扣: -200港币，折扣后价格: ${discountedPriceHKD}港币` : '',
            `选中票种抵扣价格: ${discountHKD}港币`,
            `需要支付银卡费用: ${amountToPayHKD}港币`,
            `港币到人民币汇率: ${exchangeRate}`,
            `需要支付银卡费用（人民币）: ${amountToPayRMB.toFixed(2)}元`,
            `闲鱼购票费用（人民币）: ${purchasePriceRMB}元`,
            `获得银卡总费用: ${totalCostRMB.toFixed(2)}元`
        ].filter(Boolean)

        setResult({ totalCostRMB, process })
    }

    return (
        <div className="space-y-6">
            <div>
                <h4 className="block font-semibold mb-2">选择票种</h4>
                <div className="grid grid-cols-2 gap-4">
                    {tickets.map(ticket => (
                        <label key={ticket.id} htmlFor={ticket.id} className="block">
                            <div className="flex items-center mb-1">
                                <input
                                    id={ticket.id}
                                    name="ticket"
                                    type="radio"
                                    value={ticket.id}
                                    checked={selectedTicket === ticket.id}
                                    onChange={e => setSelectedTicket(e.target.value)}
                                    className="mr-2"
                                />
                                {ticket.label}
                            </div>
                            <span className="text-sm text-gray-600 ml-6">{ticket.info}，抵扣价格: {ticket.deduction}港币</span>
                        </label>
                    ))}
                </div>
            </div>



            <div>
                <label htmlFor="purchasePrice" className="block font-semibold mb-2">闲鱼购票金额（人民币）</label>
                <input
                    id="purchasePrice"
                    type="number"
                    value={purchasePriceRMB}
                    onChange={e => setPurchasePriceRMB(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="例如: 50.00"
                />
            </div>

            <div>
                <label htmlFor="exchangeRate" className="block font-semibold mb-2">港币到人民币汇率</label>
                <input
                    id="exchangeRate"
                    type="number"
                    value={exchangeRate}
                    onChange={e => setExchangeRate(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="默认: 0.87"
                    step="0.01"
                />
            </div>

            <button
                onClick={calculate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                计算
            </button>

            {result && (
                <div className="mt-6 p-4 border rounded">
                    <h2 className="text-xl font-bold mb-4">计算结果</h2>
                    <div className="mb-4">
                        <p className="text-lg">
                            <strong>总费用: {result.totalCostRMB.toFixed(2)} 元人民币</strong>
                        </p>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">详细计算过程：</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {result.process.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
