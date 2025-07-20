import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import Pagination from "../../../Component/Pagination/Pagination";

const MyPayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["payments", user?.email,currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const payments = data.payments || [];
  const total = data.total || 0;

  const totalPages = Math.ceil(total / itemsPerPage);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Payments</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Class Title</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{payment.classTitle}</td>
              <td className="text-xs break-all">{payment.transactionId}</td>
              <td>${payment.amount}</td>
              <td>{payment.paymentMethod}</td>
              <td>{new Date(payment.paid).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default MyPayment;
