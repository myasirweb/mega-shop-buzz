import StoreDetail from "@/components/stores/StoreDetail";

export default async function StoreDetailPage({ params }) {
  const { slug } = await params;
  return <StoreDetail slug={slug} />;
}
