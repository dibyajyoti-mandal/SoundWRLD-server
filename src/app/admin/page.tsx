import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import db from "@/db/db"

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaid: true },
        _count: true,
    })
    return {
        amount: (data._sum?.pricePaid || 0),
        numberOfSales: data._count,
    }
}
async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaid: true },
        }),
    ])

    return {
        userCount,
        averageValuePerUser:
            userCount === 0
                ? 0
                : (orderData._sum.pricePaid || 0) / userCount,
    }
}

async function getProductData() {
    const productCnt = await Promise.all([
        db.product.count(),
    ])

    return productCnt
}


export default async function AdminDashboard() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
      ])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
                title="Sales"
                subtitle={`Items sold: ${salesData.amount}`}
                body={`Total sales: $ ${salesData.amount}`}
            />

            <DashboardCard
                title="Items"
                subtitle="Items admin section"
                body={`Items available:${productData}`}
            /><DashboardCard
                title="Customers"
                subtitle={`users : ${userData.userCount}`}
                body={`Avg. amount : $ ${userData.averageValuePerUser}`}
            />
        </div>
    )
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}