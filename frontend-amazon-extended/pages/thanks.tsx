import { Heading } from "@/ui/heading";
import Layout from "@/ui/layout";
import { Meta } from "@/ui/meta";
import { NextPage } from "next";

const ThanksPage: NextPage = () => {
  return (
    <Meta title="Оплата прошла успешно!">
      <Layout>
        <Heading>Оплата прошла успешно!</Heading>
      </Layout>
    </Meta>
  );
};

export default ThanksPage;
