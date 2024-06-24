import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminItems() {
    return (
        <div>
        <div className="flex justify-between items-center gap-4">
            <span className="md:text-2xl">All items for sale:</span>
            <button className="buttons flex items-center">
                <Link href="/admin/item/add">
                <span className="">Add item </span>
                </Link>
            </button>
        </div>
        <ProductTable/>
        </div>
    )
}


function ProductTable()
{
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            NAME
                        </TableHead>
                        <TableHead>
                            PRICE
                        </TableHead>
                        <TableHead>
                            ORDERS
                        </TableHead>
                        
                    </TableRow>
                </TableHeader>
            </Table>
        </>

    )
}