import { OrderService } from "@/services/order/order.service";
import { NextPageAuth } from "@/store/providers/auth-provider/auth-page.types";
import { Heading } from "@/ui/heading";
import Layout from "@/ui/layout";
import { Meta } from "@/ui/meta";
import { useQuery } from "@tanstack/react-query";

const OrdersPage: NextPageAuth = () => {
  const { data: orders } = useQuery({
    queryKey: ["my orders"],
    queryFn: () => OrderService.getAll(),
    select: ({ data }) => data,
  });

  return (
    <Meta title="Мои заказы">
      <Layout>
        <Heading>Мои заказы</Heading>
        <section>
          <div className="bg-secondary flex gap-10 p-4 text-white rounded-xl my-7">
            <span>#</span>
            <span>Статус</span>
            <span>Дата заказа</span>
            <span>Сумма</span>
          </div>
          {orders?.length ? (
            orders.map((order) => (
              <div
                className="bg-secondary flex gap-10 p-4 text-white rounded-xl my-7"
                key={order.id}
              >
                <span>#{order.id}</span>
                <span>{order.status}</span>
                <span>
                  {new Date(order.createdAt).toLocaleDateString("ru-Ru")}
                </span>
                <span>{order.total}Р</span>
              </div>
            ))
          ) : (
            <div>
              <span>Заказов пока нет :d</span>
            </div>
          )}
        </section>
      </Layout>
    </Meta>
  );
};

OrdersPage.isOnlyUser = true;

export default OrdersPage;
