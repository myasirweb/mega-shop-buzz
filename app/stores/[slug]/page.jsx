import StoreDetail from "@/components/stores/StoreDetail";

export default function StoreDetailPage({ params }) {
  return <StoreDetail slug={params.slug} />;
}
