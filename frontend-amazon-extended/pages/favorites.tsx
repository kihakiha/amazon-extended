import { useProfile } from "@/components/hooks/useProfile";
import { NextPageAuth } from "@/store/providers/auth-provider/auth-page.types";
import { Catalog } from "@/ui/catalog";
import Layout from "@/ui/layout";
import { Meta } from "@/ui/meta";

const FavoritesPage: NextPageAuth = () => {
  const { profile } = useProfile();

  return (
    <Meta title="Избранное">
      <Layout>
        <Catalog products={profile?.favorite || []} title="Избранные товары" />
      </Layout>
    </Meta>
  );
};

FavoritesPage.isOnlyUser = true;

export default FavoritesPage;
