import { useStore } from "../../store/useStore"
import { Card } from "../../components/ui/Card"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { Truck, DollarSign, CheckCircle, AlertTriangle } from "lucide-react"

export function SupplierReport() {
  const suppliers = useStore(state => state.suppliers)
  const purchaseOrders = useStore(state => state.purchaseOrders)
  
  return (
    <div className="space-y-6">
      {/* Supplier Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Suppliers</p>
              <p className="text-2xl font-bold">{suppliers.length}</p>
            </div>
          </div>
        </Card>
        {/* Add more stat cards */}
      </div>

      {/* Supplier Performance Table */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Supplier Performance</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Supplier</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Last Order</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map(supplier => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>
                  {purchaseOrders.filter((order: { supplierId: string }) => order.supplierId === supplier.id).length}
                </TableCell>
                <TableCell>{supplier.lastOrderDate || '—'}</TableCell>
                <TableCell>{supplier.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
