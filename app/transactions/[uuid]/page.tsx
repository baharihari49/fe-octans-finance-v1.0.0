import { notFound } from "next/navigation";
import { serverApiRequest } from "@/services/serverApiRequest";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Define the type for the transaction data
type TransactionData = {
  no_transactions: string;
  date: string;
  descriptions: string | null;
  transaction_type: {
    name: string;
  };
  transaction_category: {
    name: string;
  };
  vendor?: {
    name: string;
  };
  amount: number;
};

type PageProps = {
  params: Promise<{ uuid: string }>; // Await `params` if it is a Promise
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await params if it is a Promise
  const { uuid } = resolvedParams;

  try {
    // Explicitly type the response data
    const response = await serverApiRequest<{ data: TransactionData }>({
      url: `/transactions/${uuid}`,
      method: "GET",
    });

    if (!response || !response.data) {
      notFound(); // Show 404 page if no data is found
    }

    const data = response.data;

    return (
      <div>
        <h1 className="text-2xl font-semibold mt-2 mb-3">Detail Transaksi</h1>
        <div className="bg-white border rounded-2xl p-6">
          <div className="grid lg:grid-cols-2 text-base text-gray-700">
            <div className="col-span-1">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-3">No Transaksi</td>
                    <td>: {data.no_transactions}</td>
                  </tr>
                  <tr>
                    <td className="py-3">Tanggal</td>
                    <td>: {data.date}</td>
                  </tr>
                  <tr>
                    <td className="py-3">Deskripsi</td>
                    <td>: {data.descriptions ?? ""}</td>
                  </tr>
                  <tr>
                    <td className="py-3">Jenis transaksi</td>
                    <td>: {data.transaction_type.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-span-1">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-3">Kategori Transaksi</td>
                    <td>: {data.transaction_category.name}</td>
                  </tr>
                  <tr>
                    <td>Vendor</td>
                    <td>: {data.vendor?.name ?? ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori transaksi</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{data.transaction_category.name}</TableCell>
                  <TableCell className="text-right">{data.amount}</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell>Jumlah</TableCell>
                  <TableCell className="text-right">{data.amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <hr className="my-5" />
          <div className="space-x-3">
            <Link
              className="border py-2.5 px-5 rounded-md text-gray-700"
              href="/transactions"
            >
              Kembali
            </Link>
            <button className="py-1.5 bg-red-600 px-5 rounded-md text-white">
              Void
            </button>
            <a
              className="py-2.5 px-5 rounded-md text-white bg-primary"
              href="#"
            >
              Print
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound(); // Handle errors by rendering 404 page
  }
}
